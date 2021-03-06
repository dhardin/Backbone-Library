var app = app || {};

app.BookView = Backbone.View.extend({
	tagName: 'div',
	className: 'bookContainer',
	template: _.template($('#bookTemplate').html()),

	events: {
		'click #editBookBtn': 'editBook',
		'click #deleteBookBtn': 'deleteBook'
	},

	editBook: function(e){
		var cid = this.model.cid;
		app_router.navigate('edit/' + cid, { trigger: true });
		//package collection as strinified array
		save();
	},

	deleteBook: function(e) {
		// Delete model
		this.model.destroy();
		// Delete view
		this.remove();
		save();
	},

	render: function () {
		this.$el.html(this.template(this.model.toJSON()));

		return this;
	}



});
