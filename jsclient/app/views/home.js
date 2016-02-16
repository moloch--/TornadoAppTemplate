"use strict";


// Home View
// -----------------
App.Views.Home = App.Views.BaseView.extend({

    template: Handlebars.templates.Home,

    initialize: function() {
        this.collection.on("reset", this.render, this);
        this.collection.on("update", this.render, this);
        this.collection.fetch();
    },

    render: function() {
        this.$el.html(this.template());
        return this;
    }

});
