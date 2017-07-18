//         __                             ______
//    ____/ /________ _____ _____  ____  / __/ /_  __
//   / __  / ___/ __ `/ __ `/ __ \/ __ \/ /_/ / / / /
//  / /_/ / /  / /_/ / /_/ / /_/ / / / / __/ / /_/ /
//  \__,_/_/   \__,_/\__, /\____/_/ /_/_/ /_/\__, /
//                  /____/                  /____/

// Framwork
exports.Request  = require('./framework/request.js');
exports.Response = require('./framework/response.js');
exports.Server = require('./framework/server.js');

// Endpoints
exports.EndpointApp = require('./external/endpoint/app.endpoint.js');

// Cassandra driver
const cassandra = require('cassandra-driver');

// Cassandra conecction
const authProvider = new cassandra.auth.PlainTextAuthProvider('cassandra', 'qctCyRz2');
const client = new cassandra.Client({ 
	contactPoints: ['104.154.220.78'],
	keyspace: 'api_managment',
	authProvider: authProvider
});
client.connect(() => {});

// Creating server
const server = new exports.Server;
server.start();

// Adding endpoints
const endpoints = [];
endpoints['app'] = new exports.EndpointApp(server);

// Exports
module.exports = {
  endpoints, client, server
};
