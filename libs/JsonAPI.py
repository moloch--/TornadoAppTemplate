# -*- coding: utf-8 -*-
"""
@author: moloch
Copyright 2015
"""


import functools
import logging

from tornado.options import options

from jsonschema import validate
from jsonschema.exceptions import ValidationError as JsonValidationError
from jsonschema.exceptions import SchemaError
from libs.ValidationError import ValidationError

# Session expires in `x` seconds
SESSION_EXPIRES = 3600  # 1 hr

# HTTP 400
BAD_REQUEST = 400
SERVER_ERROR = 500
FORBIDDEN = 403  # Authentication
NOT_AUTHENTICATED = 403
NOT_AUTHORIZED = 418  # Authorization
NOT_FOUND = 404


def json_api_method(schema):
    """
    This is a simple wrapper to make JSON API more consistent. If the wrapped
    method raises an exception, this will return a JSON error message. It can
    also optionally validation a request schema if one is provided (else None).
    """

    def func(method):
        @functools.wraps(method)
        def wrapper(self, *method_args, **method_kwargs):
            logging.debug("JSON Schema for %s -> %s", self.request.method, self.__class__)
            try:
                if schema is not None:
                    logging.debug("Validating json schema")
                    validate(self.api_request, schema)
                elif self.request.method not in ["GET", "HEAD", "DELETE"]:
                    raise SchemaError("Request method %s must have a schema" %
                                      self.request.method)
                else:
                    logging.debug("No json schema for request, skipping")
                return method(self, *method_args, **method_kwargs)
            except (JsonValidationError, ValidationError) as error:
                self.set_status(BAD_REQUEST)
                self.write({"errors": [
                    {"title": "Error", "message": str(error)}
                ]})
                self.finish()
            except SchemaError as error:
                self.set_status(BAD_REQUEST)
                if options.debug:
                    logging.exception("Request triggered exception")
                    self.write({"errors": [
                        {"title": "JSON Error", "message": str(error)}
                    ]})
                else:
                    self.write({"errors": [{
                        "title": "Error",
                        "message": "JSON request not formatted properly"}
                    ]})
                self.finish()
        return wrapper
    return func
