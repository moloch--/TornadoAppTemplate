#!/usr/bin/env python
"""
@author: moloch
Copyright 2016
"""
# pylint: disable=W0703


import logging
import os
import sys
import time

from tornado.options import define, options

from libs.ConsoleColors import BOLD, INFO, R, W, WARN

DELAY_START = 6


def start_app():
    """ Starts the main application """
    from handlers import start_app_server
    if options.debug:
        logger = logging.getLogger()
        logger.setLevel(logging.DEBUG)
    start_app_server()


############################################################
# >>> SETUP FUNCTIONS
############################################################
def setup_database():
    """ Creates/bootstraps the database """
    from setup.create_database import create_tables
    logging.info("Creating tables ...")
    create_tables()

    from setup.bootstrap import bootstrap_database
    bootstrap_database()

    # Display Details
    if options.setup.lower().startswith('dev'):
        environ = BOLD + R + "Developement boot strap" + W
        details = ", admin password is 'nimda123'."
    else:
        environ = BOLD + "Production boot strap" + W
        details = '.'
    print(INFO + '%s completed successfully%s' % (environ, details))


def upgrade_database():
    from setup.migrate_database import db_upgrade_to_head
    db_upgrade_to_head()


def revision_database():
    from setup.migrate_database import db_autogenerate_revision
    print(INFO + "Creating database revision file ...")
    db_autogenerate_revision()


def random_secret():
    return os.urandom(24).encode('base64')


def version():
    """ Display version information and exit """
    from setup import __version__
    from sqlalchemy import __version__ as orm_version
    from tornado import version as tornado_version
    print(BOLD + "    APP%s v%s" % (W, __version__))
    print(BOLD + " SQL Alchemy%s v%s" % (W, orm_version))
    print(BOLD + "     Torando%s v%s" % (W, tornado_version))


########################################################################
#                          Application Settings
########################################################################
def parse_env_options():
    """ Check for environment vairables/settings """

    # SQL Settings
    if 'SQL_PORT_5432_TCP_ADDR' in os.environ:
        options.sql_host = os.environ['SQL_PORT_5432_TCP_ADDR']
    if 'SQL_PORT_5432_TCP_PORT' in os.environ:
        options.sql_port = os.environ['SQL_PORT_5432_TCP_PORT']

    # MQ Settings
    if 'MQ_PORT_5672_TCP_ADDR' in os.environ:
        options.mq_hostname = os.environ['MQ_PORT_5672_TCP_ADDR']
    if 'MQ_PORT_5672_TCP_PORT' in os.environ:
        options.mq_port = os.environ['MQ_PORT_5672_TCP_PORT']


# Main application settings
define("origin",
       group="application",
       default=os.environ.get('APP_ORIGIN', "wss://localhost"),
       help="validate websocket connections against this origin")

define("listen_port",
       group="application",
       default=os.environ.get('APP_LISTEN_PORT', "8888"),
       help="run instances starting the given port",
       type=str)

define("x_headers",
       group="application",
       default=True,  # This app should always be behind nginx
       help="honor the `X-FORWARDED-FOR` and `X-REAL-IP` http headers",
       type=bool)

define("admin_ips",
       group="application",
       multiple=True,
       default=['127.0.0.1', '::1'],
       help="whitelist of ip addresses that can access the admin ui")

# >>> Security <<<
# If don't set these correctly you're living in a state of sin, and deserve
# whatever comes to you.
define("cookie_secret",
       group="secret",
       default=os.environ.get("APP_COOKIE_SECRET", random_secret()),
       help="the cookie hmac secret",
       type=str)

define("session_secret",
       group="secret",
       default=os.environ.get("APP_SESSION_SECRET", random_secret()),
       help="key material used encrypt session data",
       type=str)

# Database settings
define("sql_dialect",
       group="database",
       default=os.environ.get("APP_SQL_DIALECT", "postgres"),
       help="define the type of database (mysql|postgres|sqlite)")

define("sql_database",
       group="database",
       default=os.environ.get("APP_SQL_DATABASE", "app"),
       help="the sql database name")

define("sql_host",
       group="database",
       default=os.environ.get("APP_SQL_HOST", "127.0.0.1"),
       help="database sever hostname")

define("sql_port",
       group="database",
       default="3306",
       help="database tcp port")

define("sql_user",
       group="database",
       default=os.environ.get("APP_SQL_USER", "app"),
       help="database username")

define("sql_password",
       group="database",
       default=os.environ.get("APP_SQL_PASSWORD", "badpassword"),
       help="database password, if applicable")

define("sql_pool_recycle",
       group="database",
       default=int(os.environ.get("APP_SQL_POOL_RECYCLE", 3600)),
       help="timeout to refresh dbapi connections (seconds)",
       type=int)


# Other settings
define("debug",
       default=bool(os.environ.get("APP_DEBUG", False)),
       help="start server in debugging mode",
       group="debug",
       type=bool)

define("db_debug",
       default=bool(os.environ.get("APP_DB_DEBUG", False)),
       group="debug",
       help="enable database debugging",
       type=bool)

define("db_upgrade",
       default=bool(os.environ.get("APP_DB_UPGRADE", False)),
       group="modes",
       type=bool,
       help="upgrade the database to the latest database schema")

define("db_revision",
       default=bool(os.environ.get("APP_DB_REVISION", False)),
       group="modes",
       type=bool,
       help="create a versioned migration for the current database schema")

# Process modes
define("setup",
       default=os.environ.get("APP_SETUP", ""),
       group="modes",
       help="setup a database (prod|devel)")

define("app",
       default=bool(os.environ.get("APP_APP", False)),
       group="modes",
       help="start the process as a app instance",
       type=bool)

define("delay_start",
       default=os.environ.get("APP_DELAY_START", False),
       group="modes",
       help="enable a startup delays to wait for dependant service(s)",
       type=bool)

define("version",
       default=False,
       group="modes",
       help="display version information and exit",
       type=bool)


def main():
    """ Starts the app based on cli arguments """
    parse_env_options()

    if options.delay_start:
        logging.info("Delaying start to wait for dependant service(s) ...")
        for waited in range(0, DELAY_START):
            logging.info("Waited %d of %d second(s)", waited, DELAY_START)
            time.sleep(1)

    if options.setup.lower()[:3] in ['pro', 'dev']:
        logging.info("Starting %s database setup", options.setup)
        try:
            setup_database()
        except Exception as error:
            logging.exception("Error while creating database: %s", error)

    if options.db_revision:
        revision_database()
    if options.db_upgrade:
        upgrade_database()

    if options.app:
        start_app()
    elif options.version:
        version()


if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    try:
        options.parse_command_line()
    except IOError as error:
        print(WARN + str(error))
        sys.exit()
    main()
