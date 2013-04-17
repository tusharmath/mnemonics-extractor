var http = require('http');
//http://www.mnemonicdictionary.com/wordlist/GREwordlist?page=787#



var makeRequest = function(page, callback) {

	var path = '/wordlist/GREwordlist?page=' + page.toString();
	var data = "";

	http.get({
		host: 'mnemonicdictionary.com',
		port: 80,
		path: path
	}, function(resp) {
		//console.log(resp);

		resp.setEncoding('utf8');
		var i = 0;

		resp.on('data', function(chunk) {

			data += chunk;

		});

		resp.on('end', function(chunk) {

			callback(data);

		});
	}).on("error", function(e) {
		console.log("Got error: " + e.message);
	});

};
makeRequest(1, function(data) {
	console.log(data);

});