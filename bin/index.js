#!/usr/bin/env node
"use strict";

//module dependencies
var server = require("../dist/server");
var debug = require("debug")("express:server");
var http = require("http");
var config = require("../config.json");
var DatabaseConnection = require("../dist/utilities/databaseconnection")


//create http server
var httpPort = normalizePort(process.env.PORT || config["portno"]);
var app = server.Server.bootstrap().app;
app.set("port", httpPort);
var httpServer = http.createServer(app);



//listen on provided ports
httpServer.listen(httpPort);

//add error handler
process.on("error", onError);

//start listening on port
process.on("listening", onListening);


/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string"
    ? "Pipe " + port
    : "Port " + port;

  // handle specific listen errors with friendly messages
  DatabaseConnection.DatabaseConnection.closeConnection();
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = httpServer.address();
  var bind = typeof addr === "string"
    ? "pipe " + addr
    : "port " + addr.port;
  debug("Listening on " + bind);
}