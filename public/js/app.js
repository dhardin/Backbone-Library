var app = app || {};

$(function(){
	var books = [
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
			coverImage: 'img/Backbone.jpg',
			title: 'Developing Backbone.js Applications',

		}
	];

	new app.LibraryView(books);
})