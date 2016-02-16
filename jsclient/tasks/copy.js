"use strict";

/*
 * Note: CSS and JS is copied using CSSmin and Uglify
 */
module.exports = {
    main: {
        files: [

            /* HTML */
            {
                expand: true,
                flatten: true,
                filter: "isFile",
                src: ["./static/*.html"],
                dest: "./dist/"
            },

            /* Fonts */
            {
                expand: true,
                cwd: "./static/fonts",
                src: ["**"],
                dest: "./dist/fonts/"
            },
            {
                expand: true,
                flatten: true,
                src: ["./bower_components/bootstrap/dist/fonts/*"],
                dest: "./dist/fonts/"
            },
            {
                expand: true,
                flatten: true,
                src: ["./bower_components/font-awesome/fonts/*"],
                dest: "./dist/fonts/"
            },

            /* Images */
            {
                expand: true,
                cwd: "./static/images",
                src: ["**"],
                dest: "./dist/images/"
            },
            {
                expand: true,
                cwd: "./bower_components/datatables/media/images/",
                src: ["**"],
                dest: "./dist/images/"
            },

            /* Misc */
            {
                expand: true,
                flatten: true,
                filter: "isFile",
                src: ["./static/*.txt"],
                dest: "./dist/"
            }
        ]
    }
};
