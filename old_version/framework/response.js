var _ = require('underscore');

function Response(res) {
	this.res = null;
	this.body = '';
	this.status = 200;
	this.headers = [];
	this.autoRespond = true;
	// Call initialization callback
	this.init(res);
}

Response.prototype.init = function(res) {
	var obj = this;
	obj.res = res;
}

Response.prototype.setBody = function(body) {
	var obj = this;
	obj.body = body;
}

Response.prototype.setStatus = function(status) {
	var obj = this;
	obj.status = status;
}

Response.prototype.setHeader = function(name, value) {
	var obj = this;
	obj.headers.push({
		name: name,
		value: value
	});
}

Response.prototype.getBody = function() {
	var obj = this;
	return obj.body;
}

Response.prototype.getStatus = function() {
	var obj = this;
	return obj.status;
}

Response.prototype.getHeader = function(name) {
	var obj = this,
		ret = null;
	ret = _.find(obj.headers, function(header) {
		return header.name == name;
	});
	return ret;
}

Response.prototype.respond = function() {

	var obj = this;
	this.setHeader('Access-Control-Allow-Origin', '*');

	_.each(obj.headers, function(header) {
		obj.res.setHeader(header.name, header.value);
	});
	obj.res.writeHead(obj.status);
	obj.res.end(obj.body);
}

module.exports = Response;