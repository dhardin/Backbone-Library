var app = app || {};

app.LibraryView = Backbone.View.extend({
	template: _.template($('#libraryTemplate').html()),
	id: '#libraryContent',

	events:{
		'click #addBookBtn':'addBook'
	},


	initialize: function (initialBooks){
		this.collection = new app.Library(initialBooks);
		this.render();


		this.listenTo(this.collection, 'add', this.renderBook);
		this.listenTo(this.collection, 'reset', this.render)
	},

	addBook: function( e ) {
		e.preventDefault();
		var formData = {};
		$( '#addBook  div' ).children( 'input' ).each( function( i, el ) {
		if( $( el ).val() != '' ){
			formData[ el.id ] = $( el ).val();
			}
		});
		this.collection.add( new app.Book( formData ) );
		//app_router.navigate('//library', { trigger: true });
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