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


from sqlalchemy import create_engine
from sqlalchemy import Column, ForeignKey, Table
from sqlalchemy.types import Integer
from sqlalchemy.orm import sessionmaker
from models.BaseModels import DatabaseObject
from libs.ConfigManager import ConfigManager

config = ConfigManager.instance()

### Setup the database session
engine = create_engine(config.db_connection)
setattr(engine, 'echo', False)
Session = sessionmaker(bind=engine, autocommit=True)
dbsession = Session(autoflush=True)
metadata = DatabaseObject.metadata


# Import models
from models.Permission import Permission
from models.User import User


def _create_tables(sqla_engine, sqla_metadata):
    ''' Create all the tables '''
    setattr(sqla_engine, 'echo', True) 
    sqla_metadata.create_all(sqla_engine)

create_tables = lambda: _create_tables(engine, metadata)