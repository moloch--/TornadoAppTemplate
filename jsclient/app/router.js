"use strict";


// App Base Router
// -----------------------
// Extended to redirect user to #login if no valid session exists on the server
App.Routers.BaseRouter = Backbone.Router.extend({

    execute: function(callback, args, name) {

        // Check to see if our current session is valid
        if (name !== "login" && !window.session.isValid()) {
            window.router.navigate("#login", { trigger: true });
            return false;
        }

        // Execute the route
        if (callback) {
            callback.apply(this, args);
        }
    }

});


// App Router
// -----------------
App.Routers.MainRouter = App.Routers.BaseRouter.extend({

    BASE_TITLE: "App: ",

    routes: {
        // Home
        "": "index",
        "home": "home",

        // Authentication
        "login": "login",
        "logout": "logout",

        // Settings
        "settings": "settings",
        "enable-otp": "enableOtp",
        "manage-users": "manageUsers",

        // Catch All
        "*other": "notfound"
    },

    index: function() {
        this.login();
    },

    login: function() {
        console.log("[Router] -> login");
        document.title = this.BASE_TITLE + "Login";
        App.Events.trigger("router:login");
    },

    logout: function() {
        console.log("[Router] -> logout");
        App.Events.trigger("router:logout");
    },

    home: function() {
        console.log("[Router] -> home");
        document.title = this.BASE_TITLE + "Home";
        App.Events.trigger("router:home");
    },

    settings: function() {
        console.log("[Router] -> settings");
        document.title = this.BASE_TITLE + "Settings";
        App.Events.trigger("router:settings");
    },

    enableOtp: function() {
        console.log("[Router] -> enable otp");
        document.title = this.BASE_TITLE + "Enable OTP";
        App.Events.trigger("router:enable-otp");
    },

    manageUsers: function() {
        console.log("[Router] -> manage-users");
        document.title = this.BASE_TITLE + "Manage Users";
        App.Events.trigger("router:manage-users");
    },

    notfound: function() {
        console.log("[Router] -> notfound");
        document.title = this.BASE_TITLE + "Not Found";
        App.Events.trigger("router:notfound");
    }
});
