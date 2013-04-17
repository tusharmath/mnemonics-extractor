//exports.area
//modules.exports
var http = require('http');
var _options = {};


var _onError = function(e) {
	console.log("Error:", e);
};

var _getResponse = function(resp) {
	resp.setEncoding('utf8');
	var data = "";
	resp.on('data', function(chunk) {
		data += chunk;
	});

	resp.on('end', function(chunk) {
		_options.callback(data);
	});
};

var _makeRequest = function(url) {

	var path = _options.path + url.toString();
	var data = "";


	console.log("Downloading:", path);
	http.get({
		host: _options.host,
		port: _options.port,
		path: path
	}, _getResponse)
		.on("error", _onError);

};


module.exports = function(options) {
	_options = options;
	return {
		makeRequest: _makeRequest

	};
};