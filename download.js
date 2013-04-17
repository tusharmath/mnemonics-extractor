var webRequest = require('./webRequest');
var responseParser = require('./responseParse');
var fileWriter = require('./fileWriter');



//http://www.mnemonicdictionary.com/wordlist/GREwordlist?page=787#


//Initilizing file appender
var fileWriterOptions = {
	path: '/Users/tusharmathur/Desktop/Output.json'
};
var writer = new fileWriter(fileWriterOptions);


//Initializing parser

var parserKey = {
	node: '#home-middle-content > .row-fluid',
	elements: {
		word: 'h2',
		meaning: 'p',
		menmonics: '.row-fluid > .span9'
	}
};

var parser = new responseParser(parserKey, writer.write);

//Initializing requestBuilder

var requestOptions = {
	host: 'mnemonicdictionary.com',
	path: '/wordlist/GREwordlist?page=',
	callback: parser.parseContent
};


var req = new webRequest(requestOptions);


//Actual usage
for (var i = 0; i < 787; i++) {
	req.makeRequest(i);
}