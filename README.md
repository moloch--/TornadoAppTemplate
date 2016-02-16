# Tornado App Template

Basic outline of a Tornado web app.

# Building
 * Install Docker

### Build Base Docker Images
 * Build the nginx base image `cd setup/docker-base/nginx` and then `docker build -t app_nginx .`
 * Build the base Python image `cd setup/docker-base/nginx` and then `docker built -d app_python`

These images install all of the dependancies for the JavaScript front-end client, and the Python application respectively. By creating separate dependency images we don't need to re-download and re-compile when we want to rebuild the application containers. The main containers should only copy our code over.


### Build the App

 * From the root run `docker-compose build`
 * Run `docker-compose up`

# Layout
 * `handlers/` - This directory contains all of the Python/Tornado API code.
 * `jsclient/` - Code and files pertaining to the JavaScript front-end
    - `app/` - Backbone.js application code
    - `handlebars/` - Handlebars HTML templates
    - `nginx/` - Nginx configuration files
    - `static/` - Static resources not managed by bower
    - `tasks/` - Grunt task code
    - `bower.json` - Bower dependancies
    - `Dockerfile` - Dockerfile for JavaScript front-end/Nginx
    - `Gruntfile.js` - Grunt task runner script
    - `package.json` - NPM dependancies
 * `libs/` - Generic re-usable Python code
 * `models/` - Python database  models
 * `setup/` - Python code used for database setup, and initialization
