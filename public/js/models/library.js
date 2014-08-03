var app = app || {};

app.Library = Backbone.Collection.extend({
	model: app.Book,

	search: function (text) {
		var regex, key;

		if (text.length == 0) {
			return this;
		}

		regex = new RegExp(text, "gi");

		return _(this.filter(function(data) {
			for (key in data.attributes){
				if (regex.test(data.attributes[key])){
					return true;
				}
			}
			return false;
		}));

	}
});