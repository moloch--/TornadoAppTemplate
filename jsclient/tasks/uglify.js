"use strict";

module.exports = function(grunt) {

    var module = {

        options: {
            banner: "/* <%= grunt.template.today(\"yyyy-mm-dd\") %> */\n",
            sourceMap: grunt.option("source-map", true)
        },

        dependancies: {
            src: [
                "bower_components/jquery/dist/jquery.min.js",
                "bower_components/underscore/underscore-min.js",
                "bower_components/backbone/backbone-min.js",
                "bower_components/handlebars/handlebars.runtime.min.js",
                "bower_components/bootstrap/dist/js/bootstrap.min.js",
                "bower_components/datatables.net/js/jquery.dataTables.js",
                "bower_components/datatables.net-bs/js/dataTables.bootstrap.js"
            ],
            dest: "./dist/js/dependancies.min.js"
        },

        app: {

            // Keep in mind the the order matters, do not re-arrange these
            // unless you know the file does not depend on a prior one.
            src: [

                // Namespaces
                "app/namespace.js",

                // Templates
                "app/handlebars-helpers.js",
                "app/templates.js",

                // Models
                "app/models/alert.js",
                "app/models/session.js",
                "app/models/user.js",
                "app/models/otp.js",

                // Collections
                "app/collections/users.js",

                // Views
                "app/views/menus.js",
                "app/views/alert.js",
                "app/views/login.js",
                "app/views/settings.js",
                "app/views/home.js",


                // Routers
                "app/router.js",

                // Main management app
                "app/app.js"
            ],
            dest: "./dist/js/<%= pkg.name %>.min.js"
        }
    };

    return module;
};
