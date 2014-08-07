var app = app || {};

app.AboutView = Backbone.View.extend({
	template: _.template($('#aboutTemplate').html()),

	render: function () {
		this.$el.html(this.template({}));

		return this;
	}

});
