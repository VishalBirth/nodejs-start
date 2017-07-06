"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const errorHandler = require("errorhandler");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const api_1 = require("./apis/api");
const databaseconnection_1 = require("./utilities/databaseconnection");
const config_1 = require("../config");
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        this.model = Object();
        this.app = express();
        this.configuration();
        this.setupRoutes();
    }
    setupRoutes() {
        this.app.use("/", (new api_1.API).getRouter());
    }
    configuration() {
        global.Promise = require("q").Promise;
        mongoose.Promise = global.Promise;
        databaseconnection_1.DatabaseConnection.openConnection();
        this.app.set('etag', false);
        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "pug");
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(cookieParser(config_1.config.cookie_secret));
        this.app.use(methodOverride());
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        this.app.use(errorHandler());
    }
}
exports.Server = Server;
