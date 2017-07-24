/**
	Created by: nalancer08 <https://github.com/nalancer08>
	Revision: 1.5
**/

function EndpointApp(server) {

	var obj = this;
	
	/* Simple routes */
	server.addRoute('*', '/status', this.status);
	server.addRoute('get', '/testGet', this.test_uno);
	server.addRoute('post', '/testPost', this.test_dos);

	/* Rest parameters routes */
	server.addRoute('get', '/demo/:id', this.demo_uno);
	server.addRoute('post', '/path/:id', this.demo_dos);

	/* Set the default route, in case to recive / in URL */
	server.setDefaultRoute('/status');
}

EndpointApp.prototype.status = function(request, response, obj) {

	var obj = this,
		server = require('../../index').server,
		ret = { status: 200, message: "Success", data: "Everything works!" };

	/* Your logic here */

	ret.data = "Hello world";

	response.setHeader('Content-Type', 'application/json, charset=utf-8');
	response.setBody(JSON.stringify(ret));
	response.respond();
}

EndpointApp.prototype.test_uno = function(request, response, obj) {

	var obj = this,
		server = require('../../index').server,
		ret = { status: 500, message: "Error", data: [] };

	/* Your logic here */
	
	ret.status = 200;
	ret.message = 'Works fine!';

	response.setHeader('Content-Type', 'application/json, charset=utf-8');
	response.setBody(JSON.stringify(ret));
	response.respond();
}

EndpointApp.prototype.test_dos = function(request, response, obj) {

	var obj = this,
		server = require('../../index').server,
		ret = { status: 500, message: "Error", data: [] };

	// Getting POST variables
	var params = request.params.post,
		name = params.name;
	
	ret.status = 200;
	ret.message = 'Works fine!';
	ret.data = name;

	response.setHeader('Content-Type', 'application/json, charset=utf-8');
	response.setBody(JSON.stringify(ret));
	response.respond();
}

EndpointApp.prototype.demo_uno = function(request, response, obj) {

	var obj = this,
	server = require('../../index').server,
	ret = { status: 500, message: "Error", data: [] };

	// Getting the id that comes from url as a rest variable
	var id = request.id;

	ret.status = 200;
	ret.message = 'Works fine!';
	ret.data = 'Passed param is: ' + id;

	response.setHeader('Content-Type', 'application/json, charset=utf-8');
	response.setBody(JSON.stringify(ret));
	response.respond();
}

EndpointApp.prototype.demo_dos = function(request, response, obj) {

	var obj = this,
	server = require('../../index').server,
	ret = { status: 500, message: "Error", data: [] },
	get = request.params.get,
	post = request.params.post;

	// Getting the id that comes from url as a rest variable
	var id = request.id;

	// Getting GET variables
	var token = get.token;

	// Getting POST variables
	var name = post.name;

	ret.status = 200;
	ret.message = 'Works fine!';
	ret.data = 'Passed param is =  ' + id + ' with token = ' + token + ' with this name = ' + name;

	response.setHeader('Content-Type', 'application/json, charset=utf-8');
	response.setBody(JSON.stringify(ret));
	response.respond();
}

module.exports = EndpointApp;