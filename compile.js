var config = require('config');
var argv = require('minimist')(process.argv.slice(2));
var compiler = require('./lib/compiler.js');

var input = argv.i || argv.input || config.faq.input;
var output = argv.o || argv.output || config.faq.output;

if (!input || !output) {
	console.error('Input or output undefined.');
	process.exit(1);
}

compiler(input, output);
