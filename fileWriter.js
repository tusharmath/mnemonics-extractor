var _options = {};
var fs = require('fs');
var _writeTimes = 1;
var _onError = function(e) {
	if (e) console.log("Error:", e);
};

var _writeToFile = function(data) {
	console.log("Writing to file ", _writeTimes++, " time");
	data = JSON.stringify(data);

	//file writing should be sync
	var err;
	if (_options.create === true) {
		fs.writeFile(_options.path, data, _onError);
	} else {
		fs.appendFile(_options.path, data, _onError);
	}
};

var _fileWriter = function(options) {
	_options = options;

	return {
		write: _writeToFile
	};
};

module.exports = _fileWriter;