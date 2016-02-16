# -*- coding: utf-8 -*-
"""
@author: moloch
Copyright 2015
"""


import getpass
import sys

from tornado.options import options

from libs.ConsoleColors import PROMPT, WARN
from models import DBSession
from models.Permission import ADMIN_PERMISSION, Permission
from models.User import User


# Fills the database with some startup data.
def bootstrap_database():

    #
    # Create default admin user
    #
    password = ""
    dbsession = DBSession()
    if options.setup.lower().startswith('dev'):
        admin_user = 'admin'
        password = 'nimda123'
    else:
        admin_user = unicode(raw_input(PROMPT + "Admin username: "))
        sys.stdout.write(PROMPT + "New Admin ")
        sys.stdout.flush()
        password1 = getpass.getpass()
        sys.stdout.write(PROMPT + "Confirm New Admin ")
        sys.stdout.flush()
        password2 = getpass.getpass()
        if password1 == password2 and 12 <= len(password1):
            password = password1
        else:
            print(WARN +
                  'Error: Passwords did not match, or were less than 12 chars')
            sys.exit()

    user = User(name=admin_user, password=password)
    dbsession.add(user)
    dbsession.flush()
    admin_permission = Permission(name=ADMIN_PERMISSION, user_id=user.id)
    user.permissions.append(admin_permission)
    dbsession.add(admin_permission)
    dbsession.add(user)

    #
    # Commit it all
    #
    dbsession.commit()
