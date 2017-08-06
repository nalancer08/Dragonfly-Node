/**
	Version 1.6
	Created by: biohzrd <https://github.com/biohzrd>
	Revised by: nalancer08 <https://github.com/nalancer08>
	Last revision: 25/07/2017
**/

var _ = require('underscore');
var http = require('http');
var url = require('url') ;
var crypto = require('crypto');

var Request  = require('./request.js');
var Response = require('./response.js');

function Server(options, shared) {

	this.http = null;
	this.verbose = true;
	this.routes = {
		"*": [],
		"get": [],
		"post": []
	},
	this.defaultRoute = '';
	// Call initialization callback
	this.init(options, shared);
}

Server.prototype.init = function(options, shared) {

	var obj = this
		opts = options || {},
		security = shared || {};

	_.defaults(opts, {
		base_url: '',
		onNotFound: obj.onNotFound
	});
	obj.options = opts;

	_.defaults(security, {
		pass_salt: '1234567890',
		token_salt: '0987654321'
	});
	obj.security = security;

	// Create the base HTTP server and bind the request handler
	obj.http = http.createServer(function(req, res) {
		// LOG
		var hostname = req.headers.host; // hostname = 'localhost:8080'
  		var pathname = url.parse(req.url).pathname; // pathname = '/MyApp'
  		console.log('http://' + hostname + pathname);

		obj.onRequest.call(obj, req, res);
	});
	obj.onNotFound = opts.onNotFound;
}

Server.prototype.start = function() {

	var obj = this;
	var port = (obj.options.port && obj.options.port != '') ? obj.options.port : 8080;
	// Listen on the specified port
	obj.http.listen(port);
	obj.log('Dragonfly Hyper server started');
	obj.log(' > Listening on ' + obj.options.site_url + ':' + obj.options.port + obj.options.base_url);
	//obj.log(' > Listening on port ' + port);
}

Server.prototype.log = function(value) {

	var obj = this;
	if (obj.verbose) {
		console.log(value);
	}
}

Server.prototype.routeToRegExp = function(route) {

	var optionalParam = /\((.*?)\)/g,
		namedParam    = /(\(\?)?:\w+/g,
		splatParam    = /\*\w+/g,
		escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;
	// Convert route to regular expression, this was taken from Backbone's router
	route = route.replace(escapeRegExp, '\\$&')
			.replace(optionalParam, '(?:$1)?')
			.replace(namedParam, function(match, optional) {
			return optional ? match : '([^/?]+)';
		})
		.replace(splatParam, '([^?]*?)');
	return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
}

Server.prototype.addRoute = function(method, route, handler, insert) {

	var obj = this,
		insert = insert || false,
		method = method.toLowerCase(),
		prev = (obj.options.base_url && obj.options.base_url != '' && obj.options.base_url != '/') ? obj.options.base_url : '',
		instance = {
		regexp: obj.routeToRegExp(prev + route),
		handler: handler
	};
	// Add the route, may be at the beginning or at the end
	if (insert) { // Adding the route at the beginning of the route's array
		obj.routes[method].unshift(instance);
	} else { // Adding the route at the end of the route's array
		obj.routes[method].push(instance);
	}
}

Server.prototype.removeRoute = function(method, route) {
	
	// TBD
}

Server.prototype.onRequest = function(req, res) {

	var obj = this;
	var isMatch = false;
	var response = new Response(res);
	var request = new Request(req, {
		onDataReceived: function() {

			// Try with the routes for the current method (get or post)
			_.each(obj.routes[request.type], function(route) {
				if ( request.path.match(route.regexp) ) {
					isMatch = true;
					handled = route.handler.call(obj, request, response);
				}
			});

			// If not handled yet, try with the wildcard ones
			if (!handled) {
				_.each(obj.routes["*"], function(route) {
					if ( request.path.match(route.regexp) ) {
						isMatch = true;
						handled = route.handler.call(obj, request, response);
					}
				});
			}

			// Not handled? Well, at this point we call it 404
			if (handled == false && isMatch == false ) {
				obj.onNotFound(request, response);
			}
		}
	}),
	handled = false;
	isMatch = false;
}

Server.prototype.onNotFound = function(request, response) {

	response.setStatus(404);
	response.respond(); // response.res.end();
	//return true;
}

/**
* This method allows to set the default route for the api
* @param route: String name for the route
**/
Server.prototype.setDefaultRoute = function(route) {

	var obj = this;
	obj.defaultRoute = route;
}

Server.prototype.getDefaultRoute = function() {

	var obj = this,
		prev = (obj.options.base_url && obj.options.base_url != '' && obj.options.base_url != '/') ? obj.options.base_url : '';

	return (prev + obj.defaultRoute);
}

Server.prototype.hashToken = function(value) {

	var obj = this,
		security = obj.security;

	return crypto.createHash('md5').update(security.token_salt + value).digest('hex');
}

Server.prototype.shaToken = function(value) {

	var obj = this,
		security = obj.security;

	return crypto.createHash('sha512').update(security.token_salt + value).digest('hex');
}

Server.prototype.hashPassword = function(value) {

	var obj = this,
		security = obj.security;

	return crypto.createHash('md5').update(security.pass_salt + value).digest('hex');
}

Server.prototype.shaPassword = function(value) {

	var obj = this,
		security = obj.security;

	return crypto.createHash('sha512').update(security.pass_salt + value).digest('hex');
}

Server.prototype.validateToken = function(token, value) {

	var obj = this,
		security = obj.security,
		check = obj.hashToken(value);
			
	return (token == check);
}

Server.prototype.validateShaToken = function(token, value) {

	var obj = this,
		security = obj.security,
		check = obj.shaToken(value);

	return (token == check);
}

module.exports = Server;