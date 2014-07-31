var app = app || {};

var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'add': 'editBook',
		'edit/:id': 'editBook',
		'about': 'about'
	},

	main: function  () {
		this.changePage(new MainPageView());
	},

	editBook: function(id){
		var book = new Book({id: id});
		this.changePage(new BookEditPageView({model: book}));
		book.fetch();
	},

	about: function(){
		this.changePage(new AboutPageView());
	},

	changePage: function(page){
		$(page.el).attr('data-role', 'page');

		page.render();

		//append page to some target

		//transition to new page
	}



});
var app_router = new Router;


Backbone.history.start();