# -*- coding: utf-8 -*-
"""
@author: moloch

This file calls into the Alembic API and is used for versioning the database
schema, and upgrade/downgrading schemas.
"""

from alembic import command
from alembic.config import Config

# Contains some default values

alembic_cfg = Config()
alembic_cfg.set_main_option("script_location", "setup/migrations")


def db_upgrade_to_head():
    """ Upgrades the database to `HEAD` """
    from models import engine

    with engine.begin() as connection:
        alembic_cfg.attributes['connection'] = connection
        command.upgrade(alembic_cfg, "head")


def db_autogenerate_revision():
    """ Creates a versioned migration script for the current db scheme """
    from models import engine

    alembic_cfg.url = engine
    command.revision(alembic_cfg, autogenerate=True)
