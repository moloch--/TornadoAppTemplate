"use strict";


// Admin Menu View
// -----------------
App.Views.AdminMenu = Backbone.View.extend({

    tagName: "li",
    template: Handlebars.templates.AdminMenu,
    attributes: {
        "class": "dropdown"
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    cleanup: function() {

    }

});


// User Menu View
// ----------------
App.Views.UserMenu = Backbone.View.extend({

    tagName: "div",
    template: Handlebars.templates.UserMenu,

    render: function() {
        var data = this.model.toJSON();
        this.$el.html(this.template(data));
        if (this.model.get("is_admin")) {
            var submenu = new App.Views.AdminMenu({
                model: this.model
            });
            this.$("#top-menu-rightnav").prepend(submenu.render().el);
        }
        return this;
    },

    cleanup: function() {

    }

});


// Public Menu View
// ------------------
App.Views.PublicMenu = Backbone.View.extend({

    tagName: "div",

    render: function() {
        this.$el.html("");
        return this;
    },

    cleanup: function() {

    }

});
