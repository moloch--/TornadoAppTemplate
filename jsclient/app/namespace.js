"use strict";


// App Global Namespace
window.App = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    Events: _.extend({}, Backbone.Events)
};


// URL Prefixes
window.API_V1 = "/api/v1";


// The stupidity of naming these functions "bota" and "atob" is beyond reason
window.b64encode = window.btoa;
window.b64decode = window.atob;

// Helper to fire events on keypresses
$(document).keyup(function(event) {

    // <enter>
    if (event.keyCode === 13) {
        App.Events.trigger("keypress:enter");
    }

});


// Helper function so we don't have to parse cookies
window.getCookie = function(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) {
        return parts.pop().split(";").shift();
    }
};


// Save the original method
Backbone._sync = Backbone.sync;
Backbone.sync = function(method, model, options, error) {

    options.beforeSend = function(xhr) {
        if (!window.session) {
            xhr.setRequestHeader("X-APP", "unauthenticated");
        } else {
            xhr.setRequestHeader("X-APP", window.session.get("data"));
        }
    };

    options.complete = function(xhr) {
        if (xhr.status === 403) {
            console.log("[sync] API call failed authentication");
            App.Events.trigger("router:logout");
        }
    };

    // Call the original method
    return Backbone._sync(method, model, options, error);
};


// Additional methods for Views that use the whole page
// ------------------------------------------------------
App.Views.BaseView = Backbone.View.extend({

    tagName: "div",
    attributes: {
        "class": "container"
    },

    cleanup: function() {

    }

});


App.Views.BaseSubView = Backbone.View.extend({

    cleanup: function() {

    }

});
