# -*- coding: utf-8 -*-
'''
    Copyright 2013

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
'''


import os
import sys
import getpass

from libs.ConsoleColors import *
from libs.ConfigManager import ConfigManager
from models import dbsession
from models.Permission import Permission, ADMIN_PERMISSION
from models.User import User

# Fills the database with some startup data.
config = ConfigManager.instance()
password = ""

if config.bootstrap == 'developement':
    admin_user = u'admin'
    password = 'nimda123'
else:
    admin_user = unicode(raw_input(PROMPT+"Admin username: "))
    sys.stdout.write(PROMPT+"New Admin ")
    sys.stdout.flush()
    password1 = getpass.getpass()
    sys.stdout.write(PROMPT+"Confirm New Admin ")
    sys.stdout.flush()
    password2 = getpass.getpass()
    if password1 == password2 and 12 <= len(password1):
        password = password1
    else:
        print(WARN+'Error: Passwords did not match, or were less than 12 chars')
        os._exit(1)

user = User(name=admin_user, password=password)
dbsession.add(user)
dbsession.flush()
admin_permission = Permission(name=ADMIN_PERMISSION, user_id=user.id)
user.permissions.append(admin_permission)
dbsession.add(admin_permission)
dbsession.add(user)
dbsession.commit()
