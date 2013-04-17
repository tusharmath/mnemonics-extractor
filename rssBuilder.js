var rssFilePath = '/Users/tusharmathur/LocalStaticSites/public/rss/Output.xml';
var fs = require('fs');
var RSS = require('rss');


var logger = function(item) {
	process.stdout.clearLine(); // clear current text
	process.stdout.cursorTo(0); // move cursor to beginning of line
	process.stdout.write(item); // writ
};

/* lets create an rss feed */
var feed = new RSS({
	title: "GRE words",
	description: 'Contains GRE words with meaning and mnemonics',
	feed_url: 'http://example.com/rss.xml',
	site_url: 'http://example.com',
	image_url: 'http://example.com/icon.png',
	author: 'Tushar Mathur'
});

/* loop over data and add to feed */



var content = fs.readFileSync('/Users/tusharmathur/LocalStaticSites/public/json/output.json', {
	encoding: 'utf8'
});

var data = JSON.parse(content);
//content.length
for (var i = 0; i < data.length; i++) {
	c = data[i];
	//console.log(c);
	var percentage = Math.round((i / data.length * 100)).toString() + '% Complete, records: ' + i.toString();
	//console.log(percentage, "this is it");
	logger(percentage);

	feed.item({
		title: c.word,
		description: c.menmonics.join(' | '),
		url: 'http://example.com/word/' + c.word, // link to the item
		//guid: '1123', // optional - defaults to url
		author: c.meaning, // optional - defaults to feed author property
		date: 'Apr 17, 2013' // any format that js Date can parse.
	});

}



/* loop over data and add to feed */


// cache the xml
var rssData = feed.xml();
fs.writeFile(rssFilePath, rssData, function(a) {
	console.log('');
	console.log("RSS file created");
});