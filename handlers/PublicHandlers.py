# -*- coding: utf-8 -*-
'''
@author: moloch

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


from models.User import User
from models.Permission import ADMIN_PERMISSION
from handlers.BaseHandlers import BaseHandler


class LoginHandler(BaseHandler):

    def get(self, *args, **kwargs):
        if self.session is not None:
            self.redirect('/user')
        else:
            self.render('public/login.html', errors=None)

    def post(self, *args, **kwargs):
        user = User.by_name(self.get_argument('username', ''))
        password = self.get_argument('password', '')
        if user is not None:
            if user.validate_password(password):
                self.login_success(user)
                self.redirect('/user')
            else:
                self.login_failure()
        else:
            # Prevent user enumeration via timing attack
            User._hash_password(password)
            self.login_failure()

    def login_failure(self):
        self.render('public/login.html', errors=["Invalid username and/or password."])

    def login_success(self, user):
        self.start_session()
        self.session['user_id'] = user.id
        if user.has_permission(ADMIN_PERMISSION):
            self.session['user_menu'] = ADMIN_PERMISSION
        else:
            self.session['user_menu'] = 'user'
        self.session['user_name'] = user.name
        self.session.save()