var webRequest = require('./webRequest');
var $ = require('jQuery');
//http://www.mnemonicdictionary.com/wordlist/GREwordlist?page=787#


var createMJS = function(content) {
	var result = [];
	console.log(content);
	var finders = {
		word: '.row-fluid > h2',
		meaning: '',
		synonyms: '',
		usage: '',
		mnemonics: ''
	};
	var item = {};
	for (var i in finders) {

	}

};


var options = {
	host: 'mnemonicdictionary.com',
	path: '/wordlist/GREwordlist?page=',
	callback: createMJS
};


var req = new webRequest(options);

console.log(req);
req.makeRequest(1);