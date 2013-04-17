var webRequest = require('./webRequest');
var responseParser = require('./responseParse');



//http://www.mnemonicdictionary.com/wordlist/GREwordlist?page=787#


//Initializing parser

var parserKey = {
	node: '#home-middle-content > .row-fluid',
	elements: {
		word: 'h2',
		meaning:'p',
		menmonics: '.row-fluid > .span9'
	}
};

var parser = new responseParser(parserKey);

//Initializing requestBuilder

var requestOptions = {
	host: 'mnemonicdictionary.com',
	path: '/wordlist/GREwordlist?page=',
	callback: parser.parseContent
};


var req = new webRequest(requestOptions);


//Actual usage
req.makeRequest(1);
