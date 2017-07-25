//         __                             ______
//    ____/ /________ _____ _____  ____  / __/ /_  __
//   / __  / ___/ __ `/ __ `/ __ \/ __ \/ /_/ / / / /
//  / /_/ / /  / /_/ / /_/ / /_/ / / / / __/ / /_/ /
//  \__,_/_/   \__,_/\__, /\____/_/ /_/_/ /_/\__, /
//                  /____/                  /____/
//
// Created by: biohzrd <https://github.com/biohzrd>
// Revised && updated: nalancer08 <https://github.com/nalancer08>
// Version 1.5
// Dragonfly Node Hyper

// Framwork
exports.Request  = require('./framework/request.js');
exports.Response = require('./framework/response.js');
exports.Server = require('./framework/server.js');

// Endpoints
exports.EndpointApp = require('./external/endpoint/app.endpoint.js');

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