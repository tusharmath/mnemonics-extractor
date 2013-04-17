var _options = {};
var fs = require('fs');

var _onError = function(e) {
	console.log("Error:", e);
};

var _writeToFile = function(data, create) {
	console.log("Writing to file");
	data = JSON.stringify(data);

	//file writing should be sync
	var err;
	if (create === true) {
		err = fs.writeFileSync(_options.path, data);
	} else {
		err = fs.appendFileSync(_options.path, data);
	}

	if (err) {

		_onError(err);
	} else {
		console.log("File updated");
	}


};

var _fileWriter = function(options) {
	_options = options;

	return {
		write: _writeToFile
	};
};

module.exports = _fileWriter;