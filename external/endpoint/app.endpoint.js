/**
	Created by: nalancer08 <https://github.com/nalancer08>
	Revision: 1.0
**/
function EndpointApp(server) {

	var obj = this;
	server.addRoute('*', '/hello/:id', this.someMethod);
	//server.addRoute('*', '/status', this.status);
	server.addRoute('get', '/status', this.status);
	server.addRoute('post', '/response/new', this.addResponse);
	server.addRoute('*', '/abais/watson/personality', this.watsonPersonality);

	server.setDefaultRoute('/status');
}

EndpointApp.prototype.someMethod = function(request, response, obj) {

	var obj = this,
		server = require('../../index').server,
		client = require('../../index').client,
		ret = { status: 500, message: "Error", data: [] };
	
	response.setHeader('Content-Type', 'application/json, charset=utf-8');
	response.setBody(JSON.stringify(ret));
	response.respond();
	return true;
}

EndpointApp.prototype.status = function(request, response, obj) {

	var obj = this,
		server = require('../../index').server,
		client = require('../../index').client,
		ret = { status: 200, message: "Success", data: "Everything works!" },
		query = 'SELECT * FROM response;';

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
		server = require('../../index').server,
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

EndpointApp.prototype.watsonPersonality = function(request, response, obj) {

	var obj = this,
		server = require('../../index').server,
		fs  = require("fs"),
		path = require('path'),
		personality_text = fs.readFileSync(path.join(__dirname, '../data/', 'personality.txt')).toString(),
		ret = { status: 500, message: 'Error', data: '' };

	//console.log(personality_text);

	var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
	var personality = new PersonalityInsightsV3({

		username: '4d1ccde3-c042-4df9-9149-ef2d7522daeb',
		password: 'qrSoyhwmFdVK',
		version_date: '2016-10-19'
	});

	personality.profile({

		text: personality_text,
		consumption_preferences: true
	},
	function(err, resp) {
		if (err)
			console.log('error:', err);
		else
			ret.status = 200;
			ret.message = 'Success';
			ret.data = resp;
			response.setHeader('Content-Type', 'application/json, charset=utf-8');
			response.setBody(JSON.stringify(ret));
			response.respond();
	});
}

module.exports = EndpointApp;