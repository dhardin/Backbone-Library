var app = app || {};


	/*books = [
		{
			coverImage: 'img/ejs.png',
			title: 'JavaScript: The Good Parts',
			author: 'Douglas Crockford',
			releaseDate: '2008',
			keywords: 'JavaScript, Programming'
		},
		{
			coverImage: 'img/spa.jpg',
			title: 'Single Page Web Applications',

		},
		{
			coverImage: 'img/backbone.jpg',
			title: 'Developing Backbone.js Applications',

		}
	];*/
 app.LibraryCollection = new app.Library([]);
 app.file_map = {filename: 'backboneLibSave.json', folder: 'backbone library'};

	//new app.LibraryView(books);
