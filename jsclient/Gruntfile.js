"use strict";

module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        /* Include individual task scripts */
        clean: {
            dist: ["./dist/"]
        },
        mkdir: require("./tasks/mkdir.js"),
        copy: require("./tasks/copy.js"),
        handlebars: require("./tasks/compile-handlebars.js"),
        uglify: require("./tasks/uglify.js")(grunt),
        cssmin: require("./tasks/cssmin.js"),
        "string-replace": require("./tasks/str-replace.js")
    });

    // Plugins
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-handlebars");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-retire");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-mkdir");
    grunt.loadNpmTasks("grunt-string-replace");

    // Build options
    grunt.registerTask("default", [
        "clean",
        "mkdir",
        "copy",
        "handlebars",
        "uglify",
        "cssmin",
        "string-replace"
    ]);

};
