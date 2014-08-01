var app = app || {};

var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'add': 'editBook',
		'edit/:id': 'editBook',
		'about': 'about',
		'contact': 'contact'
	},

	 initialize: function(options){
	    this.AppView = options.AppView;
	  },
	
	main: function  () {
		 var homeView = new app.LibraryView();
	    this.AppView.showView(homeView);
	},

	editBook: function(id){
		var book = new app.Book({id: id ||'' });
		var bookEditView = new app.BookEditView({model: book});
		this.AppView.showView(bookEditView);
	},

	about: function(){
		var s = new app.AboutView();
		this.AppView.showView(aboutView);
	},

	contact: function(){
		var concactView = new app.ContactView();
		this.AppView.showView(concactView);
	}


});
var app_router = new Router({AppView: app.AppView});


Backbone.history.start();