"use strict";


// Initialize and start the application
$(document).ready(function() {

    window.app = new App.Views.AppView();
    window.menu = new App.Views.MenuView();

    // Either restore saved session data, or start unauthenticated
    if (window.localStorage.session !== undefined) {
        try {
            var data = JSON.parse(window.localStorage.session);
            window.session = new App.Models.Session(data);
            var menu = new App.Views.UserMenu({ model: window.session });
            window.menu.renderMenu(menu);
            App.Events.trigger("app:authenticated");
            console.log("[App] Restored saved session data");
        } catch (error) {
            console.log("[App] Failed to parse local session data");
            console.log(error);
            console.log(window.localStorage.session);
            delete window.localStorage.session;
            window.session = new App.Models.Session();
        }
    } else {
        window.session = new App.Models.Session();
    }
    console.log("[App] Page load completed, starting router ...");
    window.router = new App.Routers.MainRouter();
    Backbone.history.start();
});


// This view wraps all the others and handles the cleanup/etc
// ------------------------------------------------------------
App.Views.MenuView = Backbone.View.extend({

    el: "#page-menu-wrapper",

    initialize: function() {
        this.currentMenu = null;
    },

    renderMenu: function(menu) {
        if (this.currentMenu) {
            this.currentMenu.cleanup();
            this.currentMenu.remove();
        }
        this.addFadeIn();
        this.$el.html(menu.render().el);
        this.currentMenu = menu;
    },

    addFadeIn: function() {
        this.$el.addClass("fadeIn");
        var _this = this;  // That's right, JS is terrible
        setTimeout(function() {
            _this.$el.removeClass("fadeIn");
        }, 500);
    }

});


// This view wraps all the others and handles the cleanup/etc
// ------------------------------------------------------------
App.Views.AppView = Backbone.View.extend({

    el: "#page-content-wrapper",
    tagName: "div",

    initialize: function() {
        console.log("[AppView] Initializing main app view");
        this.menu = new App.Views.MenuView();
        this.currentView = null;
        var _this = this;

        // Login Page
        App.Events.on("router:login", function() {
            delete window.session;
            delete window.localStorage.session;
            var menu = new App.Views.PublicMenu();
            _this.menu.renderMenu(menu);
            var session = new App.Models.Session();
            var view = new App.Views.Login({ model: session });
            _this.renderView(view);
        });

        // Home Page
        App.Events.on("router:home", function() {
            var activeInstances = new App.Collections.ActiveInstances();
            var view = new App.Views.Home({ collection: activeInstances });
            _this.renderView(view);
        });

        // Settings
        App.Events.on("router:settings", function() {
            var user = new App.Models.Me();
            var view = new App.Views.UserSettings({ model: user });
            _this.renderView(view);
        });

        // Enable OTP
        App.Events.on("router:enable-otp", function() {
            var user = new App.Models.Me();
            var view = new App.Views.EnableOtp({ model: user });
            _this.renderView(view);
        });

        // Manage Users
        App.Events.on("router:manage-users", function() {
            var users = new App.Collections.Users();
            var view = new App.Views.ManageUsers({ collection: users });
            _this.renderView(view);
        });

        // Logout
        App.Events.on("router:logout", function() {
            delete window.session;
            delete window.localStorage.session;
            window.router.navigate("#login", { trigger: false });
            App.Events.trigger("app:unauthenticated");
            location.reload(true);
        });
    },

    // This method takes a view and renders it with a fancy CSS3 animation
    renderView: function(view) {
        var _this = this;
        this.fadeView(function() {
            _this.$el.html(view.render().el);
            _this.currentView = view;
        });
    },

    fadeView: function(next) {
        this.$el.addClass("fadeOut");
        var _this = this;  // That's right, JS is terrible
        setTimeout(function() {
            // Okay the old view has been faded out, now clean it up before
            // rendering the new view.
            if (_this.currentView) {
                _this.currentView.cleanup();
                _this.currentView.remove();
            }
            _this.$el.removeClass("fadeOut");
            _this.fadeViewIn(next);
        }, 500);
    },

    fadeViewIn: function(next) {
        this.$el.addClass("fadeIn");
        var _this = this;  // That's right, JS is terrible
        setTimeout(function() {
            _this.$el.removeClass("fadeIn");
        }, 500);
        if (next) {
            next();
        }
    }

});
