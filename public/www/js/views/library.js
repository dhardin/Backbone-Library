var app = app || {};

app.LibraryView = Backbone.View.extend({
	template: _.template($('#libraryTemplate').html()),
	id: '#libraryContent',

	events: {
		'keyup #search' : 'search',
	},

	initialize: function (initialBooks){
		var folder = 'Backbone Library',
			file = 'backboneLibSave.dat';

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
		if (this.collection.length > 0){
		this.collection.each(function(item){	
			if (i % MAX_ROW_ITEMS == 0){
				$target = $('<div class="rows"></div>');
				this.$books.append($target);

			}
			i++;
			this.renderBook(item, $target);

		}, this);
		} else {
			this.$books.html($('#noBooksTemplate').html());
		}
	},

	renderList: function(collection){
		var i = 0, MAX_ROW_ITEMS = 4, $target,
		totalItems = this.collection.length,
		numItemsDisplayed = collection.toArray().length;
		this.$books.html('Displaying ' + numItemsDisplayed + ' out of ' + totalItems);
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
		if (text.length > 0){
			this.renderList(this.collection.search(text));
		} else {
			this.render(this.collection);
		}
	}
});