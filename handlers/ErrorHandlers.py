# -*- coding: utf-8 -*-
"""
@author: moloch
Copyright 2015
"""


from handlers.BaseHandlers import BaseHandler


class NotFoundHandler(BaseHandler):

    """ JSON four-oh-four """

    def get(self, *args, **kwargs):
        self.set_header("Content-type", "application/json")
        self.set_status(404)
        self.write({"errors": ["page not found"]})

    def post(self, *args, **kwargs):
        self.get()
