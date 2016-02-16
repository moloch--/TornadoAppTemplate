"use strict";


// User Model
// ------------
App.Models.User = Backbone.Model.extend({

    urlRoot: "api/user",
    defaults: {
        "created": "",
        "name": "",
        "permissions": [],
        "otp_enabled": false
    }

});


// Me Model
// ----------
App.Models.Me = App.Models.User.extend({

    urlRoot: "api/me"

});
