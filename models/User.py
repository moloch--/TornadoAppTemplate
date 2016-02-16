# -*- coding: utf-8 -*-
"""
@author: moloch
Copyright 2016
"""


import re
import time
from os import urandom
from string import punctuation

import bcrypt
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.hashes import SHA512
from cryptography.hazmat.primitives.twofactor import InvalidToken
from cryptography.hazmat.primitives.twofactor.totp import TOTP
from sqlalchemy import Column
from sqlalchemy.orm import backref, relationship
from sqlalchemy.types import Boolean, DateTime, String, Unicode
from tornado.options import options

from libs.ValidationError import ValidationError
from models import DBSession
from models.BaseModels import DatabaseObject
from models.Permission import ADMIN_PERMISSION

MIN_PASSWORD_LENGTH = 18 if not options.debug else 1
EMAIL_REGEX = r"^[A-Za-z0-9\.\+_-]+@[A-Za-z0-9\._-]+\.[a-zA-Z]*$"


class User(DatabaseObject):

    """
    The user object, stores data related to an
    indiviudal user, such as account/password/etc
    """

    _name = Column(Unicode(16), unique=True, nullable=False)
    _email_address = Column(Unicode(64))
    email_updates = Column(Boolean, default=False)
    _password = Column(String(64))
    last_login = Column(DateTime)
    _account_locked = Column(Boolean, default=False)
    _otp_enabled = Column(Boolean, default=False)
    _otp_secret = Column(String(64), default="")

    permissions = relationship("Permission",
                               backref=backref("user", lazy="select"),
                               cascade="all,delete,delete-orphan")

    OTP_LENGTH = 8
    OTP_STEP = 60
    OTP_ISSUER = "APP"

    JSON_SCHEMA = {
        "type": "object",
        "properties": {
            "created": {"type": "string"},
            "name": {"type": "string"},
        }
    }

    @classmethod
    def all_users(cls):
        """ Return all non-admin user objects """
        return [user for user in cls.all() if not user.has_permission(ADMIN_PERMISSION)]

    @classmethod
    def by_name(cls, name):
        """ Returns a the object with name of name """
        return DBSession().query(cls).filter_by(_name=unicode(name)).first()

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, value):
        """
        Validation:
           - To unicode
           - Truncate after 16 chars
           - Check duplicates
           - Check length
        """
        value = unicode(value[:16])
        if self.by_name(value) is not None:
            raise ValidationError("Duplicate username")
        if len(value) < 3:
            raise ValidationError("Username is too short")
        self._name = value

    @property
    def email_address(self):
        return self._email_address

    @email_address.setter
    def email_address(self, value):
        """
        Validation:
          - To unicode or is None
          - Matches regex
        """
        if value is not None:
            value = unicode(value)
            if len(value) and re.match(EMAIL_REGEX, value):
                self._email_address = value
            else:
                raise ValidationError("Email is not formatted correctly")

    def clear_email_address(self):
        self._email_address = None

    @property
    def password(self):
        return self._password

    @password.setter
    def password(self, value):
        """
        Check length and basic complexity
        """
        if MIN_PASSWORD_LENGTH <= len(value):
            if not options.debug:
                self._password_complexity_check(value)
            self._password = bcrypt.hashpw(value, bcrypt.gensalt())
        else:
            raise ValidationError("Password must be at least %d characters" % (
                MIN_PASSWORD_LENGTH
            ))

    def _password_complexity_check(self, password):
        """ Basic complexity check for upper/lower/symbol/digit """
        if not any(char.islower() for char in password):
            raise ValidationError("Password must contain a lower case letter")
        if not any(char.isupper() for char in password):
            raise ValidationError("Password must contain an upper case letter")
        if not any(char.isdigit() for char in password):
            raise ValidationError("Password must contain a number")
        if not any(char in password for char in punctuation):
            raise ValidationError("Password must contain a symbol")

    @property
    def permission_names(self):
        """ Return a list with all permissions accounts granted to the user """
        return [permission.name for permission in self.permissions]

    def has_permission(self, permission):
        """ Return True if 'permission' is in permissions_names """
        return True if permission in self.permission_names else False

    @property
    def account_locked(self):
        return self._account_locked

    @account_locked.setter
    def account_locked(self, value):
        """ Lock account and revoke all API keys """
        assert isinstance(value, bool)
        if value:
            self._account_locked = True
        else:
            self._account_locked = False

    def validate_password(self, attempt):
        """ Check the password against existing credentials """
        if self._password is not None:
            if bcrypt.hashpw(attempt, self.password) == self.password:
                # Prevent timing attacks against locked accounts
                return True if self._account_locked is False else False
        return False

    def validate_otp(self, value):
        """ Validate a one-time password """
        try:
            otp_attempt = value.encode('ascii', 'ignore')
            self._otp.verify(otp_attempt, time.time())
            return True
        except InvalidToken:
            return False

    @property
    def otp_enabled(self):
        return self._otp_enabled

    @otp_enabled.setter
    def otp_enabled(self, value):
        """
        Ensures that when 2fa is enabled/disabled we always use a fresh key
        """
        assert isinstance(value, bool)
        if value:
            self._otp_enabled = True
            self._otp_secret = urandom(32).encode('hex')
        else:
            self._otp_enabled = False
            self._otp_secret = ""

    @property
    def _otp(self):
        """
        Current one time password implementation, time-based "TOTP"
        https://cryptography.io/en/latest/hazmat/primitives/twofactor/
        """
        if not self._otp_enabled or len(self._otp_secret) < 64:
            raise ValueError("2FA/OTP is not enabled for this user")
        key = self._otp_secret.decode('hex')
        return TOTP(key, self.OTP_LENGTH, SHA512(), self.OTP_STEP,
                    backend=default_backend())

    @property
    def otp_provisioning_uri(self):
        """ Generate an enrollment URI for Authetnicator apps """
        return self._otp.get_provisioning_uri(self.name, self.OTP_ISSUER)

    def to_dict(self):
        return {
            "id": self.id,
            "created": str(self.created),
            "name": self.name,
            "email_address": self.email_address,
            "email_updates": self.email_updates,
            "otp_enabled": self._otp_enabled,
        }

    def to_manager_dict(self):
        """ Managers can see more data about users """
        user_data = self.to_dict()
        login = str(self.last_login) if self.last_login is not None else None
        user_data["last_login"] = login
        user_data["account_locked"] = self.account_locked
        return user_data

    def __str__(self):
        return self.name
