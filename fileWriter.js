var _options = {};
var fs = require('fs');
var _writeTimes = 1;
var _buffer = [];

var _onError = function(e) {
	if (e) console.log("Error:", e);
};

var _writeComplete = function() {
	console.log("File created");
	if (_options.callback !== undefined) callback();
};

var _writeToFile = function(jsData) {

	var jsonData = JSON.stringify(jsData);



	if (_options.create === true) {
		fs.writeFile(_options.path, jsonData, _writeComplete);
	} else {
		fs.appendFile(_options.path, jsonData, _writeComplete);
	}
};

var _write = function(jsData) {
	jsData.forEach(function(d) {
		_buffer.push(d);
	});
	_writeTimes++;

	if (_writeTimes == _options.chunkSize + 1) {
		_writeToFile(_buffer);
	}
};

var _fileWriter = function(options) {
	_options = options;

	return {
		write: _write

	};
};

module.exports = _fileWriter;