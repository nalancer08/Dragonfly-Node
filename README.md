<p align="center">
  <img src="https://github.com/nalancer08/ABAIS/blob/master/logo.png">
</p>

# Dragonfly-Node
 Dragonfly Node it's a framework to build APIS with NodeJS so simple

## Change Log

- Version 3.5
	- Added WebSockets
		- The socket service can added as a normal route
		- Added WebSocketRouter to handle ws request
		- Added support for httpx to handle get parameters
		- Added variable into config file to manage wsServer as boolean
		- Added only ws dump-incremental and lws-mirror protocols
	- Added latets dependencies in package.json
	- Changed header comments for version 3.5

- Revision 3.1
	- Refactor http object to handle http and https connectios to httpx
	- Adding support in config file to hanlde WebSockets
	- Into server class added logic to manage WebSocketServer

- Revision 3.0.1
	- Fixed Authentication class to use global app
		- Fixed little bug for check dyanmic tokens
	- Add performance into Router passing only server instance

- Version 3.0
	- Added support for https servers
	- Refactor
		- server class
		- config instance
		- tokenizr class
		- endpoint base
	- Added
		- function class
		- router class
		- certs folder
	- Bigger refactor of server to handle in other way routes and support https

- Version 2.0
	- No more handlers calls in at onRequest
	- Route callback are called by static
		- Functions must to have prototypes of parent endpoint class
	- Can handle multiple endpoints
		- Need to be added into index endpoints array
	- Added function to match endpoint custom class with functions
		- Check if relation between endpoints array and name class string have the requested string function

- Version 1.8
	- Added Tokenizr class
		- With new static methods implementation

- Version 1.7.8
	- Finish Authentication class
	- Fix previus version

- Version 1.7.6
	- Added first version of Authentication class, for tokens into the app
	- And added the first route example for use the class

- Version 1.7.5
	- Added SHA-512 hash methods for:
		- token
		- password
	- Fixed MD5 hashed methods

- Version 1.7
	- Added MD5 hash methods for:
		- token
		- password
	- Added extra configuration into config file for:
		- passsword salt
		- token salt

- Version 1.6.1
	- Fixed the way to get parameters from request
		- Used with request class

- Version 1.6
	- Can set config
		- site_url
		- base_url
		- port
	- The routes are automatic config with base_url option
	- addRoute have to have updated to manage base_url option
	- getDefaultRoute have to have updated to manage base_url option

- Version 1.5
	- Can set default route in '/'

- Version 1.4
	- Request fixed to handle not exists routes
	- Request fixed to handle '/' route

- Version 1.3
	- Fixed 404 or don't found response

- Version 1.2
	- Endpoint modified to get the server into any route

- Version 1.1
	- Can use endpoints as a node module

- Version 1.0
	- Can deploy APIS
	- Can create basic endpoints as a JS class