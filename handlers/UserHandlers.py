# -*- coding: utf-8 -*-
"""
@author: moloch
Copyright 2015
"""
# pylint: disable=W0221,W0613


from base64 import b64encode
from cStringIO import StringIO

import qrcode
from handlers.BaseHandlers import APIBaseHandler
from libs.JsonAPI import BAD_REQUEST, json_api_method
from libs.SecurityDecorators import authenticated, authorized
from libs.ValidationError import ValidationError
from models.Permission import ADMIN_PERMISSION, Permission
from models.User import User


class MeAPIHandler(APIBaseHandler):

    @authenticated
    @json_api_method(None)
    def get(self, *args):
        """
        Returns the current user's settings (email/etc)
        Ignore the Backbone.js ID values, and use the session.
        """
        user = self.get_current_user()
        self.write(user.to_dict())

    @authenticated
    @json_api_method({
        "type": "object",
        "properties": {
            "email_address": {"type": "string", "format": "email"},
            "email_updates": {"type": "boolean"},
            "new_password": {"type": "string", "minLength": 1, "maxLength": 72},
            "old_password": {"type": "string", "minLength": 1, "maxLength": 72}
        }
    })
    def put(self, *args):
        """
        This function edit's the current user's settings (email/password/etc)
        Ignore the Backbone.js ID values, and use the session.
        """
        user = self.get_current_user()
        new_password = self.get_argument("new_password", "")
        old_password = self.get_argument("old_password", "")
        if len(new_password):
            if user.validate_password(old_password):
                user.password = new_password
            else:
                raise ValidationError("Old password is not valid")
        user.email_address = self.get_argument("email_address", "")
        user.email_updates = self.get_argument("email_updates", False)
        self.dbsession.add(user)
        self.dbsession.commit()
        self.write(user.to_dict())


class OTPEnrollmentAPIHandler(APIBaseHandler):

    """ This handler manages a user 2FA/OTP settings """

    @authenticated
    @json_api_method({
        "type": "object",
        "properties": {}
    })
    def post(self):
        """ Enable OTP for the current user """
        user = self.get_current_user()
        if not user.otp_enabled:
            user.otp_enabled = True
            self.dbsession.add(user)
            self.dbsession.commit()
            user = self.get_current_user()  # Get the commit'd changes
            qr_image = qrcode.make(user.otp_provisioning_uri)
            data = StringIO()
            qr_image.save(data)
            data.seek(0)
            data_uri = "data:image/jpeg;base64,%s" % b64encode(data.read())
            self.write({
                "qrcode": data_uri,
                "uri": user.otp_provisioning_uri
            })
        else:
            self.write({"errors": ["OTP already enabled"]})

    @authenticated
    @json_api_method({
        "type": "object",
        "properties": {
            "enrollment": {"type": "string"},
            "otp": {"type": "string", "minLength": 8}
        },
        "required": ["otp"]
    })
    def put(self):
        """ Test an OTP code """
        user = self.get_current_user()
        otp = self.get_argument("otp", "")
        valid = user.validate_otp(otp)
        if not valid:
            self.set_status(BAD_REQUEST)
        self.write({"valid": valid})

    @authenticated
    @json_api_method({
        "type": "object",
        "properties": {
            "enrollment": {"type": "string"},
            "otp": {"type": "string", "minLength": 8}
        },
        "required": ["otp"]
    })
    def delete(self):
        """ Disable OTP for the current user, requires a valid/existing OTP """
        pass


class ManageUsersAPIHandler(APIBaseHandler):

    @authenticated
    @authorized(ADMIN_PERMISSION)
    @json_api_method(None)
    def get(self, user_id=""):
        """ Ignore the Backbone.js ID values, and use the session """
        user = self.get_current_user()
        if len(user_id) < 1:
            self.write([user.to_dict() for user in User.all()])
        else:
            _user = User.by_id(user_id)
            if _user is not None:
                self.write(_user.to_manager_dict())
            else:
                raise ValidationError("User not found")

    @authenticated
    @authorized(ADMIN_PERMISSION)
    @json_api_method(User.JSON_SCHEMA)
    def post(self, user_id=None):
        """ Create a new user account """
        name = self.get_argument("name", "")
        email = self.get_argument("email_address", "")
        password = self.get_argument("password", "")
        new_user = self.create_user(name, email, password)
        self.write(new_user.to_dict())

    @authenticated
    @authorized(ADMIN_PERMISSION)
    @json_api_method(User.JSON_SCHEMA)
    def put(self, user_id=""):
        ch_user = User.by_id(user_id)
        ch_user.name = self.get_argument("name", ch_user.name)

        email_address = self.get_argument("email_address", "")
        if 4 < len(email_address):
            ch_user.email_address = email_address
        else:
            ch_user.clear_email_address()
        ch_user.email_updates = self.get_argument("email_updates", False)

        if self.get_argument("is_admin"):
            self._make_admin(ch_user)
        elif ch_user.has_permission(ADMIN_PERMISSION):
            self._remove_admin(ch_user)

        if ch_user.account_locked:
            ch_user.account_locked = self.get_argument("account_locked", True)

        self.dbsession.add(ch_user)
        self.dbsession.commit()
        self.write(ch_user.to_dict())

    @authenticated
    @authorized(ADMIN_PERMISSION)
    @json_api_method(None)
    def delete(self, user_id=""):
        """ Delete an existing user """
        current_user = self.get_current_user()
        rm_user = User.by_id(user_id)
        if rm_user is not None and rm_user != current_user:
            rm_user.account_locked = True
            self.dbsession.add(rm_user)
            self.dbsession.commit()
            self.write(rm_user.to_dict())
        elif current_user == rm_user:
            raise ValidationError("You cannot delete yourself")
        else:
            raise ValidationError("User not found")

    def create_user(self, username, email_address, password):
        """ Create a new user """
        new_user = User(
            name=username,
            password=password)
        if 4 < len(email_address):
            new_user.email_address = email_address
        else:
            new_user.clear_email_address()
        if self.get_argument("is_admin", False):
            self._make_admin(new_user)
        self.dbsession.add(new_user)
        self.dbsession.commit()
        return new_user

    def _make_admin(self, user):
        """ Give a user ADMIN_PERMISSION permission """
        admin_permission = Permission(name=ADMIN_PERMISSION, user_id=user.id)
        user.permissions.append(admin_permission)
        self.dbsession.add(admin_permission)

    def _remove_admin(self, user):
        pass
