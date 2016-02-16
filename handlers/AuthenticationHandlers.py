# -*- coding: utf-8 -*-
"""
@author: moloch
Copyright 2015
"""


import json
import logging
from datetime import datetime

import bcrypt
from tornado.options import options

from libs.JsonAPI import json_api_method
from libs.ValidationError import ValidationError
from models.User import User

from .BaseHandlers import APIBaseHandler


class BaseAuthenticationAPIHandler(APIBaseHandler):

    AUTHENTICATION_TYPE = "base"

    def post(self):
        raise NotImplementedError()

    def login_success(self, user):
        """
        Create a session and return it to the client, sessions are *not*
        cookies, instead we use a an hmac'd JSON blob that we hand to
        the client. The client includes this hmac'd blob in a header
        `X-DYNAMITE` on all requests (including GETs).
        """
        logging.info("Successful authentication request for %s via '%s'",
                     user.name, self.AUTHENTICATION_TYPE)
        user.last_login = datetime.now()
        self.dbsession.add(user)
        self.dbsession.commit()
        session = self.start_session_for(user)
        session['ip_address'] = self.request.remote_ip
        secure_session = self.create_signed_value(name="session",
                                                  value=json.dumps(session))
        # We put some data in here so the client can know when the session
        # expires and what the user's name is, etc -but we never trust it.
        # Server-side we only trust values from the hmac'd session `data`
        return {
            "username": user.name,
            "password": None,
            "data": secure_session,
            "expires": int(session['expires']),
            "permissions": user.permission_names,
            "debug": options.debug,
        }

    def login_failure(self):
        raise NotImplementedError()


class LoginAuthenticationAPIHandler(BaseAuthenticationAPIHandler):

    """ This class handles login requests and creating sessions """

    AUTHENTICATION_TYPE = "login"

    @json_api_method({
        "type": "object",
        "properties": {
            "username": {"type": "string", "minLength": 1, "maxLength": 16},
            "password": {"type": "string", "minLength": 1, "maxLength": 72},
        },
        "required": ["username", "password"]
    })
    def post(self):
        """ Login and create a new session """
        user = User.by_name(self.get_argument('username', ''))
        if user is not None:
            session = self.login_attempt(user)
            self.write(session)
        else:
            # To prevent a timing attack to enumerate users, since hashing
            # takes non-zero time, we only we normally only hash if we got a
            # user from the db, we just hash whatever we got anyways before
            # telling the client the auth failed.
            bcrypt.hashpw("password", bcrypt.gensalt())
            self.login_failure()

    def login_attempt(self, user):
        """
        There's still a small timing attack here when we check the OTP, but to
        exploit it you need to know the username and password, so 'meh'
        """
        password = self.get_argument('password', '')
        if user.validate_password(password):
            if not user.otp_enabled:
                return self.login_success(user)
            else:
                return self.otp_attempt(user)
        else:
            self.login_failure()

    def otp_attempt(self, user):
        otp = self.get_argument("otp", "")
        if len(otp) != User.OTP_LENGTH:
            self.login_failure()
        if user.validate_otp(otp):
            return self.login_success(user)
        else:
            self.login_failure()

    def login_failure(self):
        logging.info("Failed authentication attempt from %s",
                     self.request.remote_ip)
        raise ValidationError("Incorrect username and/or password")
