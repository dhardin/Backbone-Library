var app = app || {},
	state_map = {
		folderName: '',
		fileName : '',
		uri: '',
		data: ''
	},
	callback_map = {
		'read': '',
		'write': ''
	};

Backbone.View.prototype.close = function(){
  this.remove();
  this.unbind();
  if (this.onClose){
    this.onClose();
  }
}

app.AppView = {

    showView: function(view) {
	    if (this.currentView){
	      this.currentView.close();
	    }
	 
	    this.currentView = view;
	    this.currentView.render();
	 
	    $("#mainContent").html(this.currentView.el);
  	}
 
};

app.Utility = {
	JSONtoCSV: function (JSONData, Title, ShowLabel) {
	    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
	    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
	    
	    var CSV = '';    
	    //Set Report title in first row or line
	    
	    CSV += Title + '\r\n\n';

	    //This condition will generate the Label/Header
	    if (ShowLabel) {
	        var row = "";
	        
	        //This loop will extract the label from 1st index of on array
	        for (var index in arrData[0]) {
	            
	            //Now convert each value to string and comma-seprated
	            row += index + ',';
	        }

	        row = row.slice(0, -1);
	        
	        //append Label row with line break
	        CSV += row + '\r\n';
	    }
	    
	    //1st loop is to extract each row
	    for (var i = 0; i < arrData.length; i++) {
	        var row = "";
	        
	        //2nd loop will extract each column and convert it in string comma-seprated
	        for (var index in arrData[i]) {
	            row += '"' + arrData[i][index] + '",';
	        }

	        row.slice(0, row.length - 1);
	        
	        //add a line break after each row
	        CSV += row + '\r\n';
	    }

	    if (CSV == '') {        
	        alert("Invalid data");
	        return;
	    }   
	 	
	 	return CSV;
	   
	}
};

function encodeData(data, type){
	   var mime_type = "",
	   	   encoding = "",
	   	   encodedData = encodeURI(data);

	switch(type){
		case 'json':
			mime_type = 'text/plain';
			encoding = 'utf-8';
		break;
		case 'csv':
			mime_type = 'text/csv';
			encoding = 'utf-8';
		break;
		case 'png':
			mine_type = 'image/png';
			encoding = 'utf-8';
			break;
		case 'jpg':
			mine_type = 'image/jpg';
			encoding = 'utf-8';
		break;
		case 'gif':
			mine_type = 'image/gif';
			encoding = 'utf-8';
			break;
		default: 
			mime_type = 'text/plain';
			encoding = 'utf-8';
			break;
	};

	uri = 'data:' + mime_type + ';charset=' + encoding + ',' + encodedData;

	return uri;
}

function writeFile(data, folderName, fileName, callback){
	if (!data || !folderName || !fileName){
		return;
	}
	state_map.folderName = folderName;
	state_map.fileName = fileName;
	state_map.data = data;
	callback_map.write = callback || '';
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, writeDataToFile, fileSystemFail);
}

function writeDataToFile(fileSystem){
    var directoryEntry = fileSystem.root; // to get root path of directory
    directoryEntry.getDirectory(state_map.folderName, { create: true, exclusive: false }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
    var rootdir = fileSystem.root;
   
	fileSystem.root.getFile(state_map.folderName + '/' + state_map.fileName, {create: true, exclusive: false}, gotFileEntryWrite, onFail);
}

function readFile(folderName, fileName, callback){
	state_map.folderName = folderName;
	state_map.fileName = fileName;
	callback_map.read = callback || '';
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, readDataFromFile, fileSystemFail);
	
}

function readDataFromFile(fileSystem){
	var directoryEntry = fileSystem.root; // to get root path of directory
    directoryEntry.getDirectory(state_map.folderName, 
    { create: false, exclusive: false }, 
    onDirectorySuccess, 
    onDirectoryFail); // creating folder in sdcard

    var rootdir = fileSystem.root;
   
	fileSystem.root.getFile(state_map.folderName + '/' + state_map.fileName, 
		{create: false, exclusive: false}, 
		gotFileEntryRead, 
		onFail);
}

//First step check parameters mismatch and checking network connection if available call    download function
function downloadFile(uri, folderName, fileName) {
	//Parameters mismatch check
	if (url == null && folderName == null && fileName == null) {
		return;
	}
	else {
		//checking Internet connection availablity
		if (!navigator.onLine) {
		    return;
		} else {
			state_map.folderName = folderName;
			state_map.fileName = fileName;
			state_map.uri = uri;
		    download(uri, folderName, fileName); //If available download function call
		}
	}
}

function download(url, folderName, fileName) {
	//step to request a file system 
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, downloadFileToSystem, fileSystemFail);
}

function downloadFileToSystem(fileSystem) {
    var download_link = state_map.url; 
    //ext = download_link.substr(download_link.lastIndexOf('.') + 1); //Get extension of URL

    var directoryEntry = fileSystem.root; // to get root path of directory
    directoryEntry.getDirectory(state_map.folderName, { create: true, exclusive: false }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
    var rootdir = fileSystem.root;
    var fp = rootdir.fullPath; // Returns Fulpath of local directory

    fp = fp + "/" + (state_map.folderName.length > 0 ? state_map.folderName  + "/" : '') + state_map.fileName; //+ "." + ext; // fullpath and name of the file which we want to give
    // download function call
    filetransfer(download_link, fp);
}

function onDirectorySuccess(parent) {
    // Directory created successfuly
}

function onDirectoryFail(error) {
    //Error while creating directory
    console.log("Unable to create new directory: " + error.code);
}

function onFail(error){
	console.log(error);
}

  function fileSystemFail(evt) {
    //Unable to access file system
    console.log(evt.target.error.code);
 }


function filetransfer(download_link, fp) {
	var fileTransfer = new FileTransfer();
	// File download function with URL and local path
	fileTransfer.download(download_link, fp,
                    function (entry) {
                        alert("download complete: " + entry.fullPath);
                    },
                 function (error) {
                     //Download abort errors or download failed errors
                     alert("download error source " + error.source);
                 }
            );
}

function gotFileEntryWrite(fileEntry) {
    fileEntry.createWriter(gotFileWriter, onFail);
}


function gotFileWriter(writer) {
    writer.onwriteend = function(evt) {
    	if (callback_map.write != ''){
    		callback_map.write();
    	}
    };

    writer.write(state_map.data);
}

function gotFileEntryRead(fileEntry) {
      fileEntry.file(gotFileRead, fail);
}

function gotFileRead(file) {
    var reader = new FileReader();

    reader.onloadend = function(evt) {
        if (callback_map.read != ''){
        	var result = JSON.parse(evt.target.result);
        	callback_map.read(result)
        };
    };

    reader.readAsText(file);
};

function fail(evt) {
    console.log(error.code);
};


function save(data, fileName, folder){
	//package collection as strinified array
	data = data || JSON.stringify(app.LibraryCollection);
	filename = filename || app.file_map.filename;
	folder = folder || app.file_map.folder;

	//save data
	writeFile(data, folder , filename);
}
