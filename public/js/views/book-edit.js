var app = app || {};

app.BookEditView = Backbone.View.extend({
	tagName: 'div',
	className: 'bookContainer',
	template: _.template($('#editBookTemplate').html()),

	render: function () {
		this.$el.html(this.template((this.model ? this.model.toJSON() : {})));

		return this;
	}

});
