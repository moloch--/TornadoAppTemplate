# -*- coding: utf-8 -*-
"""
@author: moloch

Database scheme migration script created using Alembic

"""
from __future__ import with_statement

from tornado.options import options

from alembic import context
from models.BaseModels import DatabaseObject
# Import models
from models.User import User

TARGET_METADATA = DatabaseObject.metadata


def run_migrations_offline():
    """
    Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.
    """
    from libs.DatabaseConnection import DatabaseConnection

    url = DatabaseConnection(database=options.sql_database,
                             hostname=options.sql_host,
                             port=options.sql_port,
                             username=options.sql_user,
                             password=options.sql_password,
                             dialect=options.sql_dialect)
    context.configure(
        url=str(url), target_metadata=TARGET_METADATA, literal_binds=True)

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """
    Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.
    """
    from models import engine

    with engine.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=TARGET_METADATA
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
