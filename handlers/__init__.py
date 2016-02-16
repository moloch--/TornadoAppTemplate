# -*- coding: utf-8 -*-
"""
@author: moloch
Copyright 2015
"""

import logging

from hashlib import sha512
from tornado.options import options
from tornado.web import Application
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop

# Handlers
from .AuthenticationHandlers import LoginAuthenticationAPIHandler
from .ErrorHandlers import NotFoundHandler
from .UserHandlers import MeAPIHandler, OTPEnrollmentAPIHandler
from .UserHandlers import ManageUsersAPIHandler


# Hash the secrets, for the hell of it
COOKIE_SECRET = sha512(options.cookie_secret).hexdigest()
SESSION_SECRET = sha512(options.session_secret).hexdigest()

# URL Prefixes
API_V1 = "/api/v1"

# App application handlers
APP_HANDLERS = [


    # Authentication Handlers
    (API_V1 + r"/session", LoginAuthenticationAPIHandler),

    # Settings
    (r'/api/me(.*)', MeAPIHandler),
    (r'/api/otp/enrollment', OTPEnrollmentAPIHandler),
    (r'/api/user', ManageUsersAPIHandler),
    (r'/api/user/(.*)', ManageUsersAPIHandler),
]

# Wildcard handler is always at the end
APP_HANDLERS.append((r'(.*)', NotFoundHandler))


def start_app_server():
    """ Main entry point for the application """
    app_app = Application(
        handlers=APP_HANDLERS,
        cookie_secret=COOKIE_SECRET,
        session_secret=SESSION_SECRET,
        autoreload=False,
        xsrf_cookies=False)
    app_server = HTTPServer(app_app, xheaders=options.x_headers)
    app_server.listen(options.listen_port)
    io_loop = IOLoop.instance()
    try:
        io_loop.start()
    except KeyboardInterrupt:
        logging.warn("Keyboard interrupt, shutdown everything!")
    finally:
        io_loop.stop()
