# -*- coding: utf-8 -*-
"""
@author: moloch

This is the script that creates all of the database tables
"""
# pylint: disable=W0611


from tornado.options import options

from models.BaseModels import DatabaseObject

# Import models
from models.Permission import Permission
from models.User import User


def create_tables():
    """ Create all the tables """
    from models import engine  # Setup db connection
    setattr(engine, 'echo', options.db_debug)
    metadata = DatabaseObject.metadata
    metadata.create_all(engine)
