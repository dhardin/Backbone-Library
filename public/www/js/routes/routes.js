var app = app || {};

var Router = Backbone.Router.extend({
	routes: {
		'': 'main',
		'library': 'main',
		'add': 'editBook',
		'edit/:id': 'editBook',
		'about': 'about',
		'contact': 'contact',
		'save-load': 'memoryManagement',
		'exit': 'exit'
	},

	 initialize: function(options){
	    this.AppView = options.AppView;
	  },
	
	main: function  () {
		 var libraryView = new app.LibraryView(app.books);
	    this.AppView.showView(libraryView);
	},

	editBook: function(id){
		var book = (id ? app.LibraryCollection.get({cid: id}) : new app.Book());
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

	memoryManagement: function(){
		var memoryManagemetView = new app.memoryManagementView();
		this.AppView.showView(memoryManagemetView);
	},

	exit: function(){
		navigator.app.exitApp();
	}
});

var app_router = new Router({AppView: app.AppView});

Backbone.history.start();