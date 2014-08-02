var app = app || {};

app.LibraryView = Backbone.View.extend({
	template: _.template($('#libraryTemplate').html()),
	id: '#libraryContent',




	initialize: function (initialBooks){
		this.collection = app.LibraryCollection;
		this.render();

		this.listenTo(this.collection, 'add', function(){app_router.navigate('//library', { trigger: true });});
		this.listenTo(this.collection, 'reset', this.render)
	},

	
	render: function () {
		this.$el.html(this.template());
		this.$books = this.$el.find('#books'); 	
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