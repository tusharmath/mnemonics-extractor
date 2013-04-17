var $ = require('jQuery');
var _parserKeys = {};
var _callback;


var _findElements = function(node) {
	var data = {};
	for (var k in _parserKeys.elements) {
		var elementKey = _parserKeys.elements[k];

		var elements = $(node).find(elementKey);
		var text;
		if (elements.length > 1) {
			text = [];
			for (var i = 0; i < elements.length; i++) {
				text.push($(elements[i]).text().replace(/\s\s\s*/g, ''));
			}

		} else {
			text = $(elements[0]).text().replace(/\s\s\s*/g, '');
		}
		data[k] = text;
	}
	return data;
};

var _parse = function(content) {
	var elements = [];
	var nodes = $(content).find(_parserKeys.node);
	//console.log(nodes.length, "nodes count");
	for (var i = 0; i < nodes.length; i++) {
		var node = nodes[i];
		var e = _findElements(node);
		elements.push(e);
	}
	//TODO: Remove
	//console.log(elements);

	_callback(elements);
};


var _responseParse = function(parserKeys, callback) {
	_parserKeys = parserKeys;
	_callback = callback;
	return {
		parseContent: _parse
	};
};

module.exports = _responseParse;