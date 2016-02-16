# -*- coding: utf-8 -*-
"""
@author: moloch
Copyright 2015
"""

from sqlalchemy import Column, ForeignKey
from sqlalchemy.types import Unicode

from libs.DatabaseDatatypes import UUIDType
from models.BaseModels import DatabaseObject

# Permission constants
ADMIN_PERMISSION = u'admin'
MANAGER_PERMISSION = u'manager'


class Permission(DatabaseObject):

    """ Permission definition """

    name = Column(Unicode(64), nullable=False)
    user_id = Column(UUIDType(), ForeignKey('user._id'), nullable=False)

    def __repr__(self):
        return '<Permission - name: %s, user_id: %d>' % (
            self.name, self.user_id)

    def __unicode__(self):
        return self.name
