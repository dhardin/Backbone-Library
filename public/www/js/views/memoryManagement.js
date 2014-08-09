var app = app || {};

app.memoryManagementView = Backbone.View.extend({
	template: _.template($('#memoryManagementTemplate').html()),

	events: {
		'click #saveBtn' : 'saveData'
	},

	render: function () {
		this.$el.html(this.template({}));
		this.$saveTo = (this.$el.find('input:radio[name=saveTo]'));
		this.$saveAs = (this.$el.find('input:radio[name=saveAs]'));
		return this;
	},

	saveData: function(){
		var filetype = this.$saveAs.val(),
			filename = 'backboneLibrary' + '.' + filetype,
			data = this.getSaveAsData(filetype, filename);

		//call the appropriate api to save to the data
		//to using the data previously packaged.
		switch(this.$saveTo.val()){
			case 'local':
				DownloadFile(data, '', filename);
				break;
			case 'googleDrive':
				break;
			case 'dropbox':
				break;
			default:
				break;
		};
	},

	getSaveAsData: function (type, filename) {
		var data = {
				json: JSON.stringify(app.LibraryCollection),
				csv: '' 
			};
			//compile the data into the correct data file
			//prior to save
			switch(type){
				case 'csv':
					data.csv = app.Utility.JSONtoCSV(data.json, filename, true);
					return data.csv;
					break;
				case 'json':
					return data.json;
				default:
					break;
			}
	}

});
