var app = app || {};

app.LibraryView = Backbone.View.extend({
	template: _.template($('#libraryTemplate').html()),
	id: '#libraryContent',

	events: {
		'keyup #search' : 'search',
	},

	initialize: function (initialBooks){
		this.collection = app.LibraryCollection;
		this.render();
		

		this.listenTo(this.collection, 'add', function(){app_router.navigate('//library', { trigger: true });});
		this.listenTo(this.collection, 'reset', this.render)
	},

	render: function (collection, filterText) {
		this.$el.html(this.template());
		this.$books = this.$el.find('#books'); 	
		this.$filter = this.$el.find('#search');
		this.collection.each(function(item){
			this.renderBook(item);
		}, this);
	},

	renderList: function(collection){
		this.$books.html('');
		collection.each(function(item){
			this.renderBook(item);
		}, this);
	},

	renderBook : function(item){
		var bookView = new app.BookView({
			model: item
		});
		this.$books.append(bookView.render().el);
	},

	search: function(e){
		var text = this.$filter.val();
		this.renderList(this.collection.search(text));
	}
});