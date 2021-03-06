/**
	Created by: nalancer08 <https://github.com/nalancer08>
	Revision: 3.5
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

	// Adding websocket routes
	server.wsRouter.addRoute('/papi', 'EndpointApp.sockets');

	/* Set the default route, in case to recive / in URL */
	server.router.setDefaultRoute('/status');
}

EndpointApp.prototype.sockets = function(request, socket, server) {

	var connection = socket.accept(socket.origin);

	//connection.send("Hello from WebService Socket");
	console.log(request.get('name', '999'));
	console.log(' Connection accepted from ' + connection.remoteAddress + ' - Protocol Version ' + connection.webSocketVersion);

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            if (message.utf8Data === 'reset\n') {
                console.log((new Date()) + ' increment reset received');
                number = 0;
            }
        }
    });

    connection.on('close', function(closeReason, description) {
	        console.log(' Peer ' + connection.remoteAddress + ' disconnected, code: ' + closeReason + '.');
	});
}

EndpointApp.prototype.status = function(request, response, server) {

	var obj = this,
		ret = { status: 200, message: "Success", data: "Everything works!" };

	ret.data = "Hello world!";
	response.setHeader('Content-Type', 'application/json');
	response.setBody(JSON.stringify(ret));
	response.respond();
}

EndpointApp.prototype.test_uno = function(request, response, server) {

	var obj = this,
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