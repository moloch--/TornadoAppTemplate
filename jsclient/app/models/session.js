"use strict";


// Session Model
// ---------------
App.Models.Session = Backbone.Model.extend({

    urlRoot: window.API_V1 + "/session",
    defaults: {
        "username": "",
        "password": "",
        "otp": "",
        "debug": false
    },

    isValid: function() {
        // TODO: Better checks for this, like actually checking the timestamp
        return this.get("expires") !== null ? true : false;
    }

});
