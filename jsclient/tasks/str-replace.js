"use strict";

module.exports = {

    mgmtCss: {
        files: {
            "dist/css/dependancies.min.css": "dist/css/dependancies.min.css"
        },
        options: {
            replacements: [
                {
                    /* Removes an external Font/CSS include from bootswatch */
                    pattern: /@import url\(https:\/\/fonts\.googleapis\.com\/css\?family=Source\+Sans\+Pro:300,400,700\);/,
                    replacement: "\n"
                }
            ]
        }
    }
};
