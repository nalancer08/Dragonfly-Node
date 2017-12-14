/**
	Created by: nalancer08 <https://github.com/nalancer08>
	Revision: 3.0
**/

function EndpointApp(server) {

	var obj = this;
	
	/* Simple routes */
	server.router.addRoute('*', '/status', 'EndpointApp.status');
	server.router.addRoute('get', '/testGet', 'EndpointApp.test_uno');
	server.router.addRoute('post', '/testPost', 'EndpointApp.test_dos');

	/* Rest parameters routes */
	server.router.addRoute('get', '/demo/:id', 'EndpointApp.demo_uno');
	server.router.addRoute('post', '/path/:id', 'EndpointApp.demo_dos');

	/* Set the default route, in case to recive / in URL */
	server.router.setDefaultRoute('/status');
}

EndpointApp.prototype.status = function(request, response, server) {

	var obj = this,
		//authentication = require('../../index').authentication,
		tokenizr = require('../../framework/tokenizr'),
		ret = { status: 200, message: "Success", data: "Everything works!" };

	//token = authentication.generateToken('be72d1a7d3f0b1c52d95089056f202fe');
	//console.log(token);

	//check = authentication.checkToken('be72d1a7d3f0b1c52d95089056f202fe', token);
	//console.log("Token integrity : " + check);
	/* Your logic here */

	console.log("\n============ Dynamics tokens ==================");

	//dynamic = authentication.generateDynamicToken('be72d1a7d3f0b1c52d95089056f202fe');
	//console.log(dynamic);

	//c = authentication.checkDynamicToken(dynamic);
	//console.log("Dynamic token integrity : " + c);

	console.log("==================================================\n")

	e = 'erick';
	console.log(tokenizr.getToken(e));


	//if (authentication.requireToken(request, response)) {

		ret.data = "Hello world!";

		response.setHeader('Content-Type', 'application/json');
		response.setBody(JSON.stringify(ret));
		response.respond();
	//}
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