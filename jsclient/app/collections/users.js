"use strict";


// Users Collection
// -----------------
App.Collections.Users = Backbone.Collection.extend({

    model: App.Models.User,
    url: "api/user"

});
