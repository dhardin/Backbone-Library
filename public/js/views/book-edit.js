var app = app || {};

app.BookEditView = Backbone.View.extend({
	tagName: 'div',
	className: 'bookContainer',
	template: _.template($('#editBookTemplate').html()),

	events:{
		'click #addBookBtn':'addBook'
	},

	render: function () {
		this.$el.html(this.template((this.model ? this.model.toJSON() : {})));

		return this;
	},

	addBook: function( e ) {
		e.preventDefault();
		var formData = {};
		$( '#addBook' ).find( 'input' ).each( function( i, el ) {
		if( $( el ).val() != '' ){
			formData[ el.id ] = $( el ).val();
			}
		});
		app.LibraryCollection.add( new app.Book( formData ) );
		app_router.navigate('library', { trigger: true });
	
	}

});
