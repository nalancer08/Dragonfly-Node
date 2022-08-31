/**
	Version 3.6
	Config file for manage the router and ports
	Creatde by: nalancer08 <https://github.com/nalancer08>
	Revision 1: 05/07/2017
	Revision 2: 14/12/2017
	Revision 3: 03/10/2018
	Last revision: 31/08/2022
**/

const argv = require('minimist')(process.argv.slice(2));
const profile = argv.p || 'development';
const settings = {

	'development': {

		'site_url': 'localhost',
		'base_url': '/apis/api_name',
		'port': 8080,
		'wsServer': false,
		'database' : {

			'db_driver' : 'mongodb',
			'db_host' : '',
			'db_user' : '',
			'db_pass' : '',
			'db_name' : ''
		},
		'app_key': '00937ef9bfca40d1b6d16c13c3ca39bc',
		'app_clients': {
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
	}
	'shared': {
		'enviroment': profile
	},
	'security': {

		'pass_salt': 'M0f4Ukm=}ob%5S)FTZP#.<G$1[fLkzT6d!G"B+iz.i"9p4M`8y0G9JS}TXfQX,6O',
		'token_salt': '2f2J[SiwEV[PGI<9E4A0d&g-o$w~91cP_OjYcRb<[6EJbh!<0F7V*u?hQ^UF?hsY',
		'key': 'privkey.pem',
		'cert': 'cert.pem'
	}
};

module.exports = { profile, settings };