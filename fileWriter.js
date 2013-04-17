var _options = {};
var fs = require('fs');

var _onError = function(e) {
	console.log("Error:", e);
};

var _writeToFile = function(data, create) {

	data = JSON.stringify(data);
	fs.writeFile(_options.path, data, function(err) {

		if (err) {

			_onError(err);
		} else {
			console.log("file was saved!");
		}
	});

};

var _fileWriter = function(options) {
	_options = options;

	return {
		write: _writeToFile
	};
};

module.exports = _fileWriter;