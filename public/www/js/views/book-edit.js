var app = app || {};

app.BookEditView = Backbone.View.extend({
	tagName: 'div',
	className: 'bookContainer',
	template: _.template($('#editBookTemplate').html()),

	events:{
		'click #saveBookBtn':'saveBook'
	},

	render: function () {
		this.$el.html(this.template((this.model ? this.model.toJSON() : {})));

		return this;
	},

	saveBook: function( e ) {
		e.preventDefault();
		var formData = {}, book,
		data;


		$( '#saveBook' ).find( 'input' ).each( function( i, el ) {
			if( $( el ).val() != '' ){
				formData[ el.id ] = $( el ).val();
			}
		});

		if (app.LibraryCollection.get({cid: this.model.cid})){
			book = this.model;
			book.set(formData);
		} else {
			book = new app.Book( formData );
			app.LibraryCollection.add(book);
		}
		//package collection as strinified array
		data = JSON.stringify(app.LibraryCollection);
		//save data
		writeFile(data, app.file_map.folder, app.file_map.filename);
		app_router.navigate('library', { trigger: true });
	
	}

});
