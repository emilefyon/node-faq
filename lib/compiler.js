var marked = require('meta-marked');
var fs = require('fs');
var path = require('path');

module.exports = exports = function(input, output) {

	var data = fs.readdirSync(path.resolve(input)).map(function(name) {
		return marked(fs.readFileSync(path.resolve(input, name)).toString());
	});

	fs.writeFileSync(path.resolve(output), JSON.stringify(data));

};