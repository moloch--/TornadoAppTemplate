"use strict";

module.exports = {
    options: {
        shorthandCompacting: false,
        roundingPrecision: -1,
        keepSpecialComments: 0
    },
    target: {
        files: {
            /* Management */
            "./dist/css/dependancies.min.css": [
                "./bower_components/bootstrap/dist/bootstrap.css",
                "./bower_components/bootswatch/cosmo/bootstrap.css",
                "./bower_components/animate.css/animate.css",
                "./bower_components/font-awesome/css/font-awesome.css",
                "./bower_components/datatables.net-bs/css/dataTables.bootstrap.css"
            ],
            "./dist/css/fonts.min.css": [
                "./static/css/open-sans.css",
                "./static/css/source-sans.css"
            ],
            "./dist/css/app.min.css": [
                "./static/css/app.css"
            ]
        }
    }
};
