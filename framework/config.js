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
		'base_url': '/appbuilders/apis/pigdata/umc',
		'port': 8080,
		'app_key': '00937ef9bfca40d1b6d16c13c3ca39bc',
		'app_clients': {
			'8b948989779e27ec69c584c98339bc49': {
				'key': 'toolbelt',
				'name': 'ToolBelt',
				'requires': '1.0',
				'permissions': [
					'write',
					'read'
				]
			},
			'e6fda0f0d3e0adfff69e334462d1ef6a': {
				'key': 'android',
				'name': 'Android',
				'requires': '1.0',
				'permissions': [
					'write',
					'read'
				]
			},
			'be72d1a7d3f0b1c52d95089056f202fe': {
				'key': 'web',
				'name': 'Web',
				'requires': '1.0',
				'permissions': [
					'write',
					'read'
				]
			}
		}
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

		'pass_salt': 'M0f4Ukm=}ob%5S)FTZP#.<G$1[fLkzT6d!G"B+iz.i"9p4M`8y0G9JS}TXfQX,6O',
		'token_salt': '2f2J[SiwEV[PGI<9E4A0d&g-o$w~91cP_OjYcRb<[6EJbh!<0F7V*u?hQ^UF?hsY'
	}
};

module.exports = {
  profile, settings
};