var app = app || {};

app.Book = Backbone.Model.extend({
	defaults: {
		coverImage: 'img/placeholder.png',
		title: 'N/A',
		author: 'N/A',
		releaseDate: 'N/A',
		keywords: 'None'
	}
});