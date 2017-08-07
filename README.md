# Dragonfly-Node-Hyper
 Dragonfly Node Hyper it's a framework to build APIS with NodeJS so simple, it's a incoplete project of biohzrd user, so we decided to taken and remastered


## Change Log

- Version 1.0
	- Can deploy APIS
	- Can create basic endpoints as a JS class

- Version 1.1
	- Can use endpoints as a node module

- Version 1.2
	- Endpoint modified to get the server into any route

- Version 1.3
	- Fixed 404 or don't found response

- Version 1.4
	- Request fixed to handle not exists routes
	- Request fixed to handle '/' route

- Version 1.5
	- Can set default route in '/'

- Version 1.6
	- Can set config
		- site_url
		- base_url
		- port
	- The routes are automatic config with base_url option
	- addRoute have to have updated to manage base_url option
	- getDefaultRoute have to have updated to manage base_url option

- Version 1.6.1
	- Fixed the way to get parameters from request
		- Used with request class

- Version 1.7
	- Added MD5 hash methods for:
		- token
		- password
	- Added extra configuration into config file for:
		- passsword salt
		- token salt

- Version 1.7.5
	- Added SHA-512 hash methods for:
		- token
		- password
	- Fixed MD5 hashed methods

- Version 1.7.6
	- Added first version of Authentication class, for tokens into the app
	- And added the first route example for use the class

- Version 1.7.8
	- Finish Authentication class
	- Fix previus version