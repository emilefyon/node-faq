var Config = require('config');
var Hapi = require('hapi');
var Path = require('path');

var compiler = require('./lib/compiler.js');

var server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'app')
            }
        }
    }
});

server.connection(Config.connection);

server.route({
    method: 'GET',
    path: '/',
    handler: {
        file: function (request) {
            return 'index.html';
        }
    }
});

server.route({
    method: 'GET',
    path: '/compile',
    handler: function(request, reply) {
        compiler(Config.faq.input, Config.faq.output);
        return reply.redirect('/');
    }
});

server.route({
    method: 'GET',
    path: '/{filename*}',
    handler: {
        file: function (request) {
            return request.params.filename;
        }
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
