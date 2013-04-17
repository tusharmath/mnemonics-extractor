window.gecka = window.gecka === undefined ? {} : window.gecka;
gecka.fileManager = function() {
	//init
	var _fileSystem;
	var _scriptsFolder;
	var _styleSheetFolder;
	var _fileList = [];

	var options = {
		storage: (5 * 1024 * 1024) // 5Mb
	};

	//window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
	//window.requestFileSystem(window.PERSISTENT, options.storage, _onRequestFileSystem);

	//helpers

	function errorHandler(e) {
		var msg = '';

		switch (e.code) {
			case FileError.QUOTA_EXCEEDED_ERR:
				msg = 'QUOTA_EXCEEDED_ERR';
				break;
			case FileError.NOT_FOUND_ERR:
				msg = 'NOT_FOUND_ERR';
				break;
			case FileError.SECURITY_ERR:
				msg = 'SECURITY_ERR';
				break;
			case FileError.INVALID_MODIFICATION_ERR:
				msg = 'INVALID_MODIFICATION_ERR';
				break;
			case FileError.INVALID_STATE_ERR:
				msg = 'INVALID_STATE_ERR';
				break;
			default:
				msg = 'Unknown Error';
				break;
		}

		console.log('Error: ' + msg);
	};



	var _onRequestFileSystem = function(fs) {
		_fileSystem = fs;

		//creating scripts folder
		fs.root.getDirectory('scripts', {
			create: true
		}, function(dir) {
			_scriptsFolder = dir;
		});

		//creating stylesheets folder
		fs.root.getDirectory('stylesheets', {
			create: true
		}, function(dir) {
			_styleSheetFolder = dir;
		});
	};



	var _createFile = function(fileName, type) {
		var file;
		var folder;
		if (type == gecka.fileManager.fileType.SCRIPT) {
			folder = _scriptsFolder;
		} else if (type == gecka.fileManager.fileType.SCRIPT) {

			folder = _styleSheetFolder;
		}

		folder.getFile(fileName, {
			create: true,
			exclusive: true
		}, function(f) {
			debugger;
			file = f;
		});
		return file;
	};

	var _writeFile = function(fileEntry, content) {
		fileEntry.createWriter(function(fileWriter) {

			fileWriter.onwriteend = function(e) {
				console.log('Write completed.');
			};

			fileWriter.onerror = function(e) {
				console.log('Write failed: ' + e.toString());
			};

			// Create a new Blob and write it to log.txt.
			var blob = new Blob(content, {
				type: 'text/javascript'
			});

			fileWriter.write(blob);

		}, errorHandler);

	};

	//private


	_addFile = function(filename, type, content) {
		var file = _createFile(filename, type);
		_writeFile(file, content);
		_fileList.push(file);
	};

	_listFiles = function() {

	};

	//Init
	window.webkitStorageInfo.requestQuota(PERSISTENT, options.storage, function(grantedBytes) {
		window.webkitRequestFileSystem(PERSISTENT, grantedBytes, _onRequestFileSystem, errorHandler);
	});

	window.webkitRequestFileSystem(window.TEMPORARY, 1024 * 1024, _onRequestFileSystem, errorHandler);

	//public
	this.addFile = _addFile;
	this.listFiles = _listFiles;
};

gecka.fileManager.fileType = {
	SCRIPT: 0,
	STYLESHEET: 1
};