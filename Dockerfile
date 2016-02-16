####################################
#
#  Dockerfile for Tornado App Template
#  v0.0.1 - By Moloch
#
####################################
FROM app_python:latest
MAINTAINER moloch

# Make a directory
RUN mkdir -p /opt/app

# Copy application into container
ADD . /opt/app

# Expose HTTP and start server
EXPOSE 8888

# Setup data volumes
VOLUME ["/opt/app/setup/alembic/versions"]

ENTRYPOINT ["/opt/app/app.py"]
