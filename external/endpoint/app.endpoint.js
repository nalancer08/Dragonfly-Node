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
		authentication = require('../../index').authentication,
		ret = { status: 200, message: "Success", data: "Everything works!" };

	token = authentication.generateToken('be72d1a7d3f0b1c52d95089056f202fe');
	console.log(token);

	check = authentication.checkToken('be72d1a7d3f0b1c52d95089056f202fe', '7ab76f494cf1fd3dbda6152333a70bcc19e4dd04c6aa7df3b67cab4e22dd7dab.be72d1a7d3f0b1c52d95089056f202fe');
	console.log(check);
	/* Your logic here */

	if (authentication.requireToken(request, response)) {

		ret.data = "Hello world!";

		response.setHeader('Content-Type', 'application/json');
		response.setBody(JSON.stringify(ret));
		response.respond();
	}
}

EndpointApp.prototype.test_uno = function(request, response, obj) {

	var obj = this,
		server = require('../../index').server,
		ret = { status: 500, message: "Error", data: [] };

	var name = request.get('name', '');

	/* Your logic here */
	
	ret.status = 200;
	ret.message = 'Works fine!';
	ret.data = 'NAme passed by GET: ' + name;

	response.setHeader('Content-Type', 'application/json');
	response.setBody(JSON.stringify(ret));
	response.respond();
}

EndpointApp.prototype.test_dos = function(request, response, obj) {

	var obj = this,
		server = require('../../index').server,
		ret = { status: 500, message: "Error", data: [] };

	// Getting POST variables
	var name = request.post('name', 'No name passed!');
	
	ret.status = 200;
	ret.message = 'Works fine!';
	ret.data = name;

	response.setHeader('Content-Type', 'application/json');
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

	response.setHeader('Content-Type', 'application/json');
	response.setBody(JSON.stringify(ret));
	response.respond();
}

EndpointApp.prototype.demo_dos = function(request, response, obj) {

	var obj = this,
	server = require('../../index').server,
	ret = { status: 500, message: "Error", data: [] },
	id = request.id, // Getting the id that comes from url as a rest variable
	token = request.get('token'), // Getting GET variables
	name = request.post('name', 'No name passed'); // Getting POST variables

	ret.status = 200;
	ret.message = 'Works fine!';
	ret.data = 'Passed param is =  ' + id + ' with token = ' + token + ' with this name = ' + name;

	response.setHeader('Content-Type', 'application/json');
	response.setBody(JSON.stringify(ret));
	response.respond();
}

module.exports = EndpointApp;