"use strict";

module.export = {
    js: [
        "../static/js/*.js"
    ],
    node: [".."],
    options: {
        verbose: false,
        packageOnly: true,
        jsRepository: "https://raw.github.com/RetireJS/retire.js/master/repository/jsrepository.json",
        nodeRepository: "https://raw.github.com/RetireJS/retire.js/master/repository/npmrepository.json"
    }
};
