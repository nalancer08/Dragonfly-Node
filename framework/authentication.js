/**
	Version 1.1
	Created by: nalancer08 <https://github.com/nalancer08>
	Last revision: 04/08/2017
**/

var _ = require('underscore');
var crypto = require('crypto');

function Authentication() {}

Authentication.prototype.generateToken = function(app_id) {

	var obj = this,
		server = require('../index').server,
		app_key = server.options.app_key,
		app_clients = server.options.app_clients;

	// HMAC-hash the token
	var digest = crypto.createHmac('sha256', app_key).update(app_id).digest('hex'),
		token = digest + '.' + app_id,
		ret = (typeof app_clients[app_id] !== 'undefined') ? token : false;

	return ret;
}

Authentication.prototype.checkToken = function(app_id, token) {

	var obj = this,
		server = require('../index').server,
		app_clients = server.options.app_clients,
		check = obj.generateToken(app_id),
		ret = ( (check == token) && (typeof app_clients[app_id] !== 'undefined') ) ;

	return ret;
}

Authentication.prototype.requireToken = function(request, response) {

	var obj = this,
		server = require('../index').server,
		app_clients = server.options.app_clients,
		token = request.get('token', ''),
		app_id = token.substr(token.lastIndexOf('.') + 1); // Extract app_id

	if ( (typeof app_id === 'undefined') || app_id == '' || (typeof token === 'undefined') || token == '' || !obj.checkToken(app_id, token) ) {

		//var ret = { status: 403, , result: 'error', message: "A valid App Token is required for accesing this API endpoint." };
		response.setStatus(500);
		response.respond();
		return false;
	
	} else {

		app_clients[app_id].id = app_id;
		return app_clients[app_id];
	}
}

Authentication.prototype.requireTokenFrom = function(request, response, client) {

	var obj = this,
		server = require('../index').server,
		app_clients = server.options.app_clients,
		token = request.get('token', ''),
		app_id = token.substr(token.lastIndexOf('.') + 1); // Extract app_id

	if ( (typeof app_id === 'undefined') || app_id == '' || (typeof token === 'undefined') || token == '' || !obj.checkToken(app_id, token) ) {

		//var ret = { status: 403, , result: 'error', message: "A valid App Token is required for accesing this API endpoint." };
		response.setStatus(500);
		response.respond();
		return false;
	
	} else {

		if (app_clients[app_id].key != client) {

			//var ret = { status: 403, , result: 'error', message: "A valid App Toolbelt Token is required for accesing this API endpoint." };
			response.setStatus(500);
			response.respond();
			return false;
		}

		app_clients[app_id].id = app_id;
		return app_clients[app_id];
	}
}

Authentication.prototype.requireTokenForToolBeltTransactions = function(request, response) {

	this.requireTokenFrom(request, response, 'toolbelt');
}

Authentication.prototype.requireBearer = function(user_id, bearer) {

	var obj = this,
		server = require('../index').server,
		check = server.hashToken(user_id),
		ret = (bearer == check);

	return ret;
}

module.exports = Authentication;