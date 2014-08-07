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
		var i = 0, MAX_ROW_ITEMS = 4, $target;
		this.$el.html(this.template());
		this.$books = this.$el.find('#books'); 	
		this.$filter = this.$el.find('#search');
		this.collection.each(function(item){	
			if (i % MAX_ROW_ITEMS == 0){
				$target = $('<div class="rows"></div>');
				this.$books.append($target);

			}
			i++;
			this.renderBook(item, $target);

		}, this);
	},

	renderList: function(collection){
		var i = 0, MAX_ROW_ITEMS = 4, $target;
		this.$books.html('');
		collection.each(function(item){
			if (i % MAX_ROW_ITEMS == 0){
				$target = $('<div class="rows"></div>');
				this.$books.append($target);

			}
			i++;
			this.renderBook(item, $target);

		}, this);
	},

	renderBook : function(item, $target){
		var bookView = new app.BookView({
			model: item
		});
		$target.append(bookView.render().el);
	},

	search: function(e){
		var text = this.$filter.val();
		this.renderList(this.collection.search(text));
	}
});