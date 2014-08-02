var app = app || {};

var Router = Backbone.Router.extend({
	routes: {
		'': 'main',
		'library': 'main',
		'add': 'editBook',
		'edit/:id': 'editBook',
		'about': 'about',
		'contact': 'contact'
	},

	 initialize: function(options){
	    this.AppView = options.AppView;
	  },
	
	main: function  () {
		 var libraryView = new app.LibraryView(app.books);
	    this.AppView.showView(libraryView);
	},

	editBook: function(id){
		var book = new app.Book({id: id ||'' });
		var bookEditView = new app.BookEditView({model: book});
		this.AppView.showView(bookEditView);
	},

	about: function(){
		var aboutView = new app.AboutView();
		this.AppView.showView(aboutView);
	},

	contact: function(){
		var concactView = new app.ContactView();
		this.AppView.showView(concactView);
	},
});
var app_router = new Router({AppView: app.AppView});


Backbone.history.start();