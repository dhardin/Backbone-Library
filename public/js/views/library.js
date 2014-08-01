var app = app || {};

app.LibraryView = Backbone.View.extend({
	template: _.template($('#libraryTemplate').html()),
	id: '#libraryContent',
	el: '#mainContent',

	initialize: function (initialBooks){
		this.collection = new app.Library(initialBooks);
		this.render();


		this.listenTo(this.collection, 'add', this.renderBook);
		this.listenTo(this.collection, 'reset', this.render)
	},

	render: function () {
		this.$el.html(this.template());
		this.$books = $('#books'); 	
		this.collection.each(function(item){
			this.renderBook(item);
		}, this);
	},

	renderBook : function(item){
		var bookView = new app.BookView({
			model: item
		});
		this.$books.append(bookView.render().el);
	}
});