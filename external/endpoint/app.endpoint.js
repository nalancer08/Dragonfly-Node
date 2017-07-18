/**
	Created by: nalancer08 <https://github.com/nalancer08>
	Revision: 1.0
**/

var client = require('../../index').client;

function EndpointApp(server) {

	var obj = this,
		server = server;

	server.addRoute('*', '/hello/:id', this.someMethod);
	server.addRoute('*', '/status', this.status);
	server.addRoute('post', '/response/new', this.addResponse);

	//server.setDefaultRoute('/status');
}

EndpointApp.prototype.someMethod = function(request, response, obj) {

	var ret = { status: 500, message: "Error", data: [] };

	response.setHeader('Content-Type', 'application/json, charset=utf-8');
	response.setBody(JSON.stringify(ret));
	response.respond();
	return true;
}

EndpointApp.prototype.status = function(request, response, obj) {

	var ret = { status: 200, message: "Success", data: "Everything works!" };

	var cassandra = require('cassandra-driver');
	const authProvider = new cassandra.auth.PlainTextAuthProvider('cassandra', 'qctCyRz2');
    var client = new cassandra.Client({ contactPoints: ['104.154.220.78'], keyspace: 'api_managment', authProvider: authProvider });
    
    var query = 'SELECT * FROM response;';
    client.execute(query, function(err, result){

		if (!err) {

			ret.data = result.rows;
			response.setHeader('Content-Type', 'application/json, charset=utf-8');
			response.setBody(JSON.stringify(ret));
			response.respond();
		}

	});

    
    //return true;
}

EndpointApp.prototype.addResponse = function(request, response, obj) {

	var obj = this,
		client = require('../../index').client,
		ret = { status: 500, message: "Error" };

	var params = request.params.post,
		user_id = params.user_id,
		app_id = params.app_id,
		request_ip = params.request_ip,
		route = params.route,
		size = params.size,
		key_slug = params.key_slug,
		created = params.created,
		modified = params.modified; 

	var query_params = [];
	for (var param in params) {
	    query_params.push(params[param]);
	}

	var query = "INSERT INTO api_managment.response " + 
		"(id, user_id, app_id, request_ip, route, size, key_slug, created, modified) " +
		"values (now(), ?, ?, ?, ?, ?, ?, toTimestamp(now()), toTimestamp(now()));";

	// var query = "INSERT INTO api_managment.response " + 
	// 	"(id, user_id, app_id, request_ip, route, size, key_slug, created, modified) " +
	// 	"values (now(), 3, 1, '192.168.1.13', '/tasks', 1024, 'web', toTimestamp(now()), toTimestamp(now()));";

	client.execute(query, query_params, { prepare: true }, function(err, result){

		if (!err) {

			ret.status = 200;
			ret.message = "Success";
			ret.data = result.rows ? result.rows : result;
			response.setHeader('Content-Type', 'application/json, charset=utf-8');
			response.setBody(JSON.stringify(ret));
			response.respond();
		
		} else {

			console.log(err);
			response.setStatus(500);
			response.respond();
		}
	});
}

module.exports = EndpointApp;