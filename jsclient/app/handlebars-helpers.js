"use strict";

// Template Helper Functions
Handlebars.registerHelper("toHex", function(number) {
    return "0x" + parseInt(number, 10).toString(16);
});

Handlebars.registerHelper("inc", function(value) {
    return parseInt(value) + 1;
});

Handlebars.registerHelper("dec", function(value) {
    return parseInt(value) - 1;
});

Handlebars.registerHelper("floor", function(value) {
    return Math.floor(parseInt(value));
});

Handlebars.registerHelper("log", function(msg) {
    console.log(msg);
});

Handlebars.registerHelper("b64decode", function(value) {
    return window.b64decode(value);
});
