/**
	Created by: nalancer08 <https://github.com/nalancer08>
	Revision: 1.5
**/

function EndpointApp(server) {

	var obj = this;
	
	/* Simple routes */
	server.addRoute('*', '/status', 			'EndpointApp.status');
	server.addRoute('*', '/token', 				'EndpointApp.token');

	server.addRoute('*', '/user/new', 				'EndpointApp.newUser');
	
	server.addRoute('*', '/device/new', 				'EndpointApp.newDevice');

	//server.addRoute('get', '/testGet', 'EndpointApp.test_uno');
	//server.addRoute('post', '/testPost', 'EndpointApp.test_dos');

	/* Rest parameters routes */
	//server.addRoute('get', '/demo/:id', 'EndpointApp.demo_uno');
	//server.addRoute('post', '/path/:id', 'EndpointApp.demo_dos');

	/* Set the default route, in case to recive / in URL */
	server.setDefaultRoute('/status');
}

EndpointApp.prototype.status = function(request, response, server) {

	var obj = this,
		authentication = require('../../index').authentication,
		tokenizr = require('../../framework/tokenizr'),
		ret = { status: 200, message: "Success", data: "Everything works!" };

	response.setHeader('Content-Type', 'application/json');
	response.setBody(JSON.stringify(ret));
	response.respond();
}

EndpointApp.prototype.token = function(request, response, server) {

	var obj = this,
		authentication = require('../../index').authentication,
		tokenizr = require('../../framework/tokenizr'),
		ret = { status: 500, message: "error" };

	// TODO change this logic, to use, uniq information
	var app_id = request.post('app_id');

	// Generate token
	var token = authentication.generateToken(app_id);
	if (token != '') {
		ret.status = 200;
		ret.message = 'success';
		ret.data = token;
	} else {
		ret.message = 'Application no valid';
	}

	// Return payload
	response.setHeader('Content-Type', 'application/json');
	response.setBody(JSON.stringify(ret));
	response.respond();
}

EndpointApp.prototype.newUser = function(request, response, server) {

	var obj = this,
		authentication = require('../../index').authentication,
		tokenizr = require('../../framework/tokenizr'),
		userClass = require('../../external/model/user.model.js');
		ret = { status: 500, message: "error" };

	if (authentication.requireToken(request, response)) {

		// Getting user information
		var fbid = request.post('fbid'),
			email = request.post('email'),
			nicename = request.post('nicename');

		var user = new userClass();
		user.fbid = fbid;
		user.email = email;
		user.login = email;
		user.nicename = nicename;
		user.save();

		ret.status = 200;
		ret.message = "Successfully created";

		response.setHeader('Content-Type', 'application/json');
		response.setBody(JSON.stringify(ret));
		response.respond();
	}
}













EndpointApp.prototype.test_uno = function(request, response, server) {

	var obj = this,
		server = require('../../index').server,
		ret = { status: 500, message: "Error", data: [] };

	var name = request.get('name', 'mundo');

	/* Your logic here */
	
	ret.status = 200;
	ret.message = 'Works fine!';
	ret.data = 'Name passed by GET: ' + name;

	response.setHeader('Content-Type', 'application/json');
	response.setBody(JSON.stringify(ret));
	response.respond();
}

EndpointApp.prototype.test_dos = function(request, response, server) {

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

EndpointApp.prototype.demo_uno = function(request, response, server) {

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

EndpointApp.prototype.demo_dos = function(request, response, server) {

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