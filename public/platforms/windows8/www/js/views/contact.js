var app = app || {};

app.ContactView = Backbone.View.extend({	
	template: _.template($('#contactTemplate').html()),

	render: function () {
		this.$el.html(this.template({}));

		return this;
	}

});
