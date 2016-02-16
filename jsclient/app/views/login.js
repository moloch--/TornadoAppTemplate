"use strict";


// Login View
// ------------
App.Views.Login = App.Views.BaseView.extend({

    template: Handlebars.templates.Login,
    events: {
        "click #login-button": "loginAttempt"
    },

    initialize: function() {
        App.Events.on("keypress:enter", this.loginAttempt, this);
    },

    render: function() {
        this.$el.html(this.template());
        return this;
    },

    renderViewWithFade: function() {
        this.$el.addClass("fadeIn");
        this.render();
        var _this = this;  // Save context
        setTimeout(function() {
            _this.$el.removeClass("fadeIn");
        }, 500);
    },

    showError: function(title, message) {
        var error = new App.Models.Alert({
            "title": title,
            "message": message
        });
        var view = new App.Views.AlertError({ model: error });
        this.$("#login-errors").html(view.el);
    },

    loginAttempt: function() {
        console.log("[LoginView] Creating new session");
        var session = new App.Models.Session({
            "username": this.$("#login-username").val(),
            "password": this.$("#login-password").val(),
            "otp": this.$("#login-otp").val()
        });
        var _this = this;
        session.save(null, {
            success: function(model, response) {
                _this.loginSuccess(model, response);
            },
            error: function() {
                _this.showError("Error", "Authentication failure");
            },
            wait: true
        });
    },

    loginSuccess: function(model) {
        console.log("[LoginView] Login success!");
        window.localStorage.session = JSON.stringify(model.toJSON());
        window.session = model;
        var menu = new App.Views.UserMenu({ model: window.session });
        window.menu.renderMenu(menu);
        App.Events.trigger("app:authenticated");
        window.router.navigate("#home", { trigger: true });
    }

});
