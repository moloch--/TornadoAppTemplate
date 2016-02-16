"use strict";

module.exports = {
    compile: {
        options: {
            namespace: "Handlebars.templates",

            // We take only the file names
            processName: function(filePath) {
                var pieces = filePath.split("/");
                var fileName = pieces[pieces.length - 1];
                return fileName.split(".")[0];
            },
            processPartialName: function(filePath) {
                var pieces = filePath.split("/");
                return pieces[pieces.length - 1];
            },

            // Remove leading and trailing spaces in templates
            processContent: function(content) {
                return content.replace(/^[\x20\t]+/mg, "")
                              .replace(/[\x20\t]+$/mg, "")
                              .replace(/^[\r\n]+/, "")
                              .replace(/[\r\n]*$/, "\n");
            }
        },
        files: {
            "app/templates.js": ["handlebars/**/*.handlebars"]
        }
    }
};
