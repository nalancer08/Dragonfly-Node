function User() {

	this.id = 'now()';
	this.fbid = '';
	this.email = '';
	this.nicename = '';
	this.created = 'toTimestamp(now())';
	this.modified = 'toTimestamp(now())';
}

User.prototype.getByEmail = function(value) {

	var obj = this,
		client = require('../../index').client,
		ret = false;

	var query = 'SELECT * FROM user WHERE email = ? ALLOW FILTERING;';
	var params = [value];

	client.execute(query, params, { prepare: true }, function(err, result){

		if (!err) {
			if (result.rows.length > 0) {
				console.log("Si existe alguien asi");
				ret = true;
			}
			//console.log("SUCCESS ::: " + JSON.stringify(result.rows));
		}
	});
	return ret;
}

User.prototype.save = function() {

	var obj = this,
		client = require('../../index').client,
		ret = false;

	var query = "SELECT * FROM user WHERE email = ? ALLOW FILTERING;";
	var params = [obj.email];

	client.execute(query, params, { prepare: true }, function(err, result){

		if (!err) {
			if (result.rows != undefined && result.rows.length <= 0) {

				var query = 'INSERT INTO umc.user (id, fbid, email, nicename, created, modified) VALUES (now(), ?, ?, ?, toTimestamp(now()), toTimestamp(now())) IF NOT EXISTS;';
				var params = [obj.fbid, obj.email, obj.nicename];
				//var params = [obj.id, obj.fbid, obj.email, obj.login, obj.nicename, obj.created, obj.modified];
				client.execute(query, params, { prepare: true });
			}
		}
	});
	return ret;
}

module.exports = User;