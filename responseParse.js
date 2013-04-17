var $ = require('jQuery');
var _parserKeys = {};


var _findElements = function(node) {
	var data = {};
	for (var k in _parserKeys.elements) {
		var el = _parserKeys.elements[k];
		data[k] = $(node).find(el).text();
	}
	return data;
};

var _parse = function(content) {
	var elements = [];
	var nodes = $(content).find(_parserKeys.node);
	console.log(nodes.length, "nodes count");
	for (var i = 0; i < nodes.length; i++) {
		var node = nodes[i];
		var e = _findElements(node);
		elements.push(e);
	}
	//TODO: Remove
	console.log(elements);
};


var _responseParse = function(parserKeys) {
	_parserKeys = parserKeys;
	return {
		parseContent: _parse
	};
};

module.exports = _responseParse;