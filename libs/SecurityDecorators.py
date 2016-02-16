# -*- coding: utf-8 -*-
"""
@author: moloch
Copyright 2015
"""

import cStringIO
import functools
import logging
import traceback

from tornado.options import options

from libs.JsonAPI import NOT_AUTHENTICATED, NOT_AUTHORIZED


def dangerous(method):
    """
    This is a decorator which can be used to mark functions
    as dangerous. It will result in a warning being emitted
    when the function is used.
    """

    @functools.wraps(method)
    def wrapper(*args, **kwargs):
        if options.debug:
            stack = cStringIO.StringIO()
            traceback.print_stack(limit=3, file=stack)
            class_name = args[0].__class__ if len(args) else ''
            logging.warning("[DANGEROUS FUNCTION] `%s.%s`:\n%s",
                            class_name, method.__name__, stack.getvalue())
        return method(*args, **kwargs)
    return wrapper


def authenticated(method):
    """ Checks to see if a user has been authenticated """

    @functools.wraps(method)
    def wrapper(self, *args, **kwargs):
        if self.session is not None and self.session["ip_address"] == self.request.remote_ip:
            user = self.get_current_user()
            if user is not None and not user.account_locked:
                return method(self, *args, **kwargs)
        self.set_status(NOT_AUTHENTICATED)
        self.write({"errors": ["You are not authenticated"]})
    return wrapper


def restrict_ip_address(method):
    """ Only allows access to ip addresses in a provided list """

    @functools.wraps(method)
    def wrapper(self, *args, **kwargs):
        if self.request.remote_ip in self.config.admin_ips:
            return method(self, *args, **kwargs)
        else:
            logging.warning("Rejecting request from non-whitelisted admin ip")
            self.set_status(NOT_AUTHORIZED)
            self.write({"errors": ["You are not authorized"]})
    return wrapper


def authorized(permission):
    """ Checks user's permissions """

    def func(method):
        @functools.wraps(method)
        def wrapper(self, *args, **kwargs):
            if self.session is not None:
                user = self.get_current_user()
                if user is not None and user.has_permission(permission):
                    return method(self, *args, **kwargs)
                else:
                    logging.warning("Rejecting unauthorized request from '%s'",
                                    user.name)
            self.set_status(NOT_AUTHORIZED)
            self.write({"errors": ["You are not authorized"]})
        return wrapper
    return func


def authentication_type(auth_type):
    """
    Check if the current session was created using an appropriate
    authentication type (e.g. "login" or "apikey"), the argument is a whitelist
    (string or list object) of acceptable authentication types.
    """

    def func(method):
        @functools.wraps(method)
        def wrapper(self, *args, **kwargs):
            if self.session is not None:
                if isinstance(auth_type, basestring):
                    if self.session["authentication"] == auth_type:
                        return method(self, *args, **kwargs)
                elif isinstance(auth_type, list):
                    if self.session["authentication"] in auth_type:
                        return method(self, *args, **kwargs)
            self.set_status(NOT_AUTHORIZED)
            self.write({"errors": [
                "This session is authorized to call this method"
            ]})
        return wrapper
    return func
