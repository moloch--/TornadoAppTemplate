"use strict";


// Alert Error View
// ------------------
App.Views.AlertError = Backbone.View.extend({

    tagName: "div",
    template: Handlebars.templates.AlertError,
    attributes: {
        "class": "alert alert-danger alert-dismissible",
        "role": "alert"
    },

    initialize: function() {
        this.render();
    },

    render: function() {
        console.log(this.model.toJSON());
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});


// Alert Success View
// --------------------
App.Views.AlertSuccess = Backbone.View.extend({

    tagName: "div",
    template: Handlebars.templates.AlertSuccess,
    attributes: {
        "class": "alert alert-success alert-dismissible",
        "role": "alert"
    },

    initialize: function() {
        this.render();
    },

    render: function() {
        console.log(this.model.toJSON());
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});
