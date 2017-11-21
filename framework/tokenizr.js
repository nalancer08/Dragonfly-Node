/**
	Version 1.1
	Created by: nalancer08 <https://github.com/nalancer08>
	Last revision: 06/08/2017
**/
var crypto = require('crypto');

function Tokenizr() {}

Tokenizr.getToken = function(data) {

	var obj = this,
		server = require('../index').server,
		key = server.security.token_salt,
		hash = crypto.createHmac('sha256', key).update(data).digest('hex');

	return data + '.' + hash;
}

Tokenizr.checkToken = function(token) {

	var obj = this,
		server = require('../index').server,
		key = server.security.token_salt,
		parts = token.split('.'),
		data = (typeof parts[0] !== 'undefined' || parts[0] != '') ? parts[0] : '',
		hash = (typeof parts[1] !== 'undefined' || parts[1] != '') ? parts[1] : '';

	if (data != '' && hash != '') {

		var check = crypto.createHmac('sha256', key).update(data).digest('hex');
		return (hash == check);
	}
	return false;
}

Tokenizr.getData = function(token) {

	var obj = this,
		server = require('../index').server,
		key = server.security.token_salt,
		parts = token.split('.'),
		data = (typeof parts[0] !== 'undefined' || parts[0] != '') ? parts[0] : '';

	return data;
}

module.exports = Tokenizr;