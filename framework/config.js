/**
	Config file for manage the router and ports
	Version 1.6
	Creatde by: nalancer08 <https://github.com/nalancer08>
	Last revision: 25/07/2017
**/

const profile = 'development';

const settings = {

	'development': {

		'site_url': 'localhost',
		'base_url': '/apis/api_name',
		'port': 8080
	},
	'testing': {

		'site_url': 'localhost',
		'base_url': '/',
		'port': 8080
	},
	'production': {

		'site_url': 'mydomain.com',
		'base_url': '/api/test/',
		'port': 1234
	},
	'shared': {

		'pass_salt': '',
		'token_salt': ''
	}
};

module.exports = {
  profile, settings
};