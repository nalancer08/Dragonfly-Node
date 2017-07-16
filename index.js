//         __                             ______
//    ____/ /________ _____ _____  ____  / __/ /_  __
//   / __  / ___/ __ `/ __ `/ __ \/ __ \/ /_/ / / / /
//  / /_/ / /  / /_/ / /_/ / /_/ / / / / __/ / /_/ /
//  \__,_/_/   \__,_/\__, /\____/_/ /_/_/ /_/\__, /
//                  /____/                  /____/

// framwork
exports.Request  = require('./framework/request.js');
exports.Response = require('./framework/response.js');
exports.Server = require('./framework/server.js');

// Endpoints
exports.EndpointApp = require('./external/endpoint/app.endpoint.js');


const server = new exports.Server;
server.start();

const endpoints = [];
endpoints['app'] = new exports.EndpointApp(server);


