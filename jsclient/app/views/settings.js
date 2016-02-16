"use strict";


// User Settings
// ---------------
// This view is of the 'me' (current user) object
App.Views.UserSettings = App.Views.BaseView.extend({

    template: Handlebars.templates.UserSettings,
    events: {
        "click #save-settings": "saveSettings",
        "click #show-enable-otp": "showEnableOtp",
        "click #show-disable-otp": "showDisableOtp"
    },

    initialize: function() {
        this.model.on("change", this.render, this);
        this.model.fetch();
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    showSuccess: function() {
        var success = new App.Models.Alert({
            "title": "Success",
            "message": "Your account settings have been updated"
        });
        var view = new App.Views.AlertSuccess({ model: success });
        this.$("#alerts").empty();
        this.$("#alerts").html(view.el);
    },

    showError: function(title, message) {
        var error = new App.Models.Alert({
            "title": title,
            "message": message
        });
        var view = new App.Views.AlertError({ model: error });
        this.$("#alerts").empty();
        this.$("#alerts").html(view.el);
    },

    saveSettings: function() {

        this.model.set("email_address", $("#me-email-address").val());
        this.model.set("email_updates", $("#me-email-updates").is(":checked"));
        var password = $("#me-password").val();
        if (password && password.length) {
            this.model.set("new_password", password);
        }

        var _this = this;
        this.model.save(null, {
            type: "PUT",
            success: function() {
                console.log("[UserSettingsView] Successfully saved settings");
                _this.showSuccess();
            },
            error: function(model, response) {
                console.log("[UserSettingsView] Error while saving settings");
                _this.showError("Error", response.responseJSON.errors.message);
            },
            wait: true
        });
    },

    showEnableOtp: function() {
        window.router.navigate("#enable-otp", {"trigger": true });
    },

    showDisableOtp: function() {
        console.log("Diable OTP!");
    }

});


// Enable OTP
// ------------
// This view is of the 'me' (current user) object
App.Views.EnableOtp = App.Views.BaseView.extend({

    template: Handlebars.templates.EnableOTP,
    enrollmentTemplate: Handlebars.templates.OTPEnrollment,

    events: {
        "click #confirm-enable-otp": "enableOtp",
        "click #test-otp-code": "testOtpCode"
    },

    initialize: function() {
        this.model.on("change", this.render, this);
        this.model.fetch();
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    enableOtp: function() {
        var otp = new App.Models.OtpEnrollment();
        var _this = this;
        otp.save(null, {
            success: function(model) {
                _this.showEnrollment(model);
            },
            error: function() {
                console.log("Error enabling otp");
            },
            wait: true
        });
    },

    testOtpCode: function() {
        var otp = new App.Models.OtpEnrollment();
        otp.set("otp", $("#otp-code").val());
        var _this = this;
        otp.save(null, {
            method: "PUT",
            success: function() {
                _this.showOtpSuccess();
            },
            error: function() {
                _this.showOtpFailure();
            },
            wait: true
        });
    },

    showEnrollment: function(model) {
        var enroll = this.enrollmentTemplate(model.toJSON());
        this.$("#otp-enrollment").empty();
        this.$("#otp-enrollment").addClass("fadeIn");
        this.$("#otp-enrollment").html(enroll);
    },

    showOtpSuccess: function() {
        var success = new App.Models.Alert({
            "title": "Success",
            "message": "That was a valid OTP code"
        });
        var view = new App.Views.AlertSuccess({ model: success });
        this.$("#otp-alerts").empty();
        this.$("#otp-alerts").html(view.el);
    },

    showOtpFailure: function() {
        var error = new App.Models.Alert({
            "title": "Failure",
            "message": "That was not a valid OTP code, try again"
        });
        var view = new App.Views.AlertError({ model: error });
        this.$("#otp-alerts").empty();
        this.$("#otp-alerts").html(view.el);
    }

});


// User Table Row
// ----------------
App.Views.UserTableRow = Backbone.View.extend({

    tagName: "tr",
    template: Handlebars.templates.UserTableRow,

    initialize: function() {
        this.model.on("change", this.render, this);
        this.model.fetch();
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        if (this.model.get("account_locked")) {
            this.$el.addClass("danger");
        }
        return this;
    }

});


// Manage Users
// --------------
App.Views.ManageUsers = App.Views.BaseView.extend({

    template: Handlebars.templates.ManageUsers,
    events: {
        "click #add-user-save": "addUser",
        "click #lock-user-button": "showLockUser",
        "click #lock-user-save": "lockUser",
        "click #unlock-user-button": "showUnlockUser",
        "click #unlock-user-save": "unlockUser"
    },

    initialize: function() {
        this.collection.on("reset", this.render, this);
        this.collection.on("update", this.render, this);
        this.collection.fetch();
    },

    render: function() {
        this.$el.html(this.template());
        this.collection.each(function(user) {
            var row = new App.Views.UserTableRow({ model: user });
            this.$("#users-table").append( row.render().el );
        }, this);
        return this;
    },

    showAddUserAlert: function(title, message) {
        var alert = new App.Models.Alert({
            "title": title,
            "message": message
        });
        var view = new App.Views.AlertError({ model: alert });
        $("#add-user-alerts").html( view.render().el );
    },

    addUser: function() {
        var password1 = $("#add-user-password").val();
        var password2 = $("#add-user-confirm-password").val();

        if (password1 !== password2) {
            this.showAddUserAlert("Error", "Passwords do not match");
        } else if ($("#add-user-name").val().length <= 2) {
            this.showAddUserAlert("Error", "Invalid user name, too short");
        } else {

            var user = new App.Models.User();
            user.set("name", $("#add-user-name").val());
            user.set("email_address", $("#add-user-email-address").val());
            user.set("password", password1);

            var _this = this;
            user.save(null, {
                success: function() {
                    console.log("[ManageUsersView] Successfully added user");

                    // Reset all fields
                    $("#add-user-name").val("");
                    $("#add-user-email-address").val("");
                    $("#add-user-password").val("");
                    $("#add-user-confirm-password").val("");
                    $("body").removeClass("modal-open");
                    $(".modal-backdrop").remove();
                    _this.collection.fetch();  // Refresh data

                },
                error: function(model, response) {
                    console.log("[ManageUsersView] Failed to add new user");
                    console.log(response);
                    var msg = response.responseJSON.errors[0];
                    _this.showAddUserAlert("Error", msg);
                },
                wait: true
            });
        }

    },

    showLockUser: function(evt) {
        evt.preventDefault();
        var userId = $(evt.currentTarget).data("user");
        $("#lock-user-id").val(userId);
        $("#lock-user-modal").modal("show");
    },

    lockUser: function() {
        $("#lock-user-modal").modal("hide");
        $("body").removeClass("modal-open");
        $(".modal-backdrop").remove();

        var userId = $("#lock-user-id").val();
        console.log("[ManageUsersView] Attempting to lock user account: " + userId);
        var user = new App.Models.User({ "id": userId });

        var _this = this;
        user.destroy({
            success: function() {
                console.log("[ManageUsersView] User successfully destoryed");
                _this.collection.fetch();
            },
            error: function() {
                console.log("[ManageUsersView] Failed to delete user");
            },
            wait: true
        });
    },

    showUnlockUser: function(evt) {
        evt.preventDefault();
        var userId = $(evt.currentTarget).data("user");
        $("#unlock-user-id").val(userId);
        $("#unlock-user-modal").modal("show");
    }

});
