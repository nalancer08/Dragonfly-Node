/**
	Created by: biohzrd <https://github.com/biohzrd>
	Revised by: nalancer08 <https://github.com/nalancer08>
	Revision: 1.1
**/

var _ = require('underscore');
var http = require('http');

var Request  = require('./request.js');
var Response = require('./response.js');

function Server(options) {

	this.http = null;
	this.verbose = true;
	this.routes = {
		"*": [],
		"get": [],
		"post": []
	},
	this.defaultRoute = '';
	// Call initialization callback
	this.init(options);
}

Server.prototype.init = function(options) {

	var obj = this
		opts = options || {};
	_.defaults(opts, {
		onNotFound: obj.onNotFound
	});
	// Create the base HTTP server and bind the request handler
	obj.http = http.createServer(function(req, res) {
		obj.onRequest.call(obj, req, res);
	});
	obj.onNotFound = opts.onNotFound;
}

Server.prototype.start = function(port) {

	var obj = this,
		port = port || 8080;
	// Listen on the specified port
	obj.http.listen(port);
	obj.log('Dragonfly Hyper server started');
	obj.log(' > Listening on port ' + port);
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
		instance = {
			regexp: obj.routeToRegExp(route),
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
	var response = new Response(res);
	var request = new Request(req, {
		onDataReceived: function() {
			// Try with the routes for the current method (get or post)
			_.each(obj.routes[request.type], function(route) {
				if ( request.path.match(route.regexp) ) {
					handled = route.handler.call(obj, request, response);
				}
			});
			// If not handled yet, try with the wildcard ones
			if (! handled ) {
				_.each(obj.routes["*"], function(route) {
					// console.log(route);
					if ( request.path.match(route.regexp) ) {
						handled = route.handler.call(obj, request, response);
					}
				});
			}
			// Not handled? Well, at this point we call it 404
			if (! handled ) {
				obj.onNotFound(request, response);
			} // else {
			// 	response.setBody(handled);
			// }

			// Profit!
			if (response.autoRespond) {
				response.respond();
			}
		}
	}),
	handled = false;
}

Server.prototype.onNotFound = function(request, response) {

	response.setStatus(404);
	return true;
}

/**
* This method allows to set the default route for the api
* @param route: String name for the route
**/
Server.prototype.setDefaultRoute = function(route) {

	var obj = this;
	obj.defaultRoute = route;
}

module.exports = Server;