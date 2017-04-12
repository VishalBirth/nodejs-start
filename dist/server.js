"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_api_1 = require("./apis/product.api");
const category_api_1 = require("./apis/category.api");
const user_api_1 = require("./apis/user.api");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const errorHandler = require("errorhandler");
const methodOverride = require("method-override");
var config = require("../config.json");
const mongoose = require("mongoose");
const api_1 = require("./apis/api");
const databaseconnection_1 = require("./utilities/databaseconnection");
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        this.model = Object();
        this.app = express();
        this.config();
        this.setupRoutes();
    }
    setupRoutes() {
        this.app.use("/", (new api_1.API).getRouter());
        this.app.use("/user/", (new user_api_1.User).getRouter());
        this.app.use("/category/", (new category_api_1.Category).getRouter());
        this.app.use("/product/", (new product_api_1.Product).getRouter());
        this.app.use(function (req, res, next) {
            console.log(res.send("hehehehe"));
            next();
        });
    }
    config() {
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
        this.app.use(cookieParser(config["cookie_secret"]));
        this.app.use(methodOverride());
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        this.app.use(errorHandler());
    }
}
exports.Server = Server;
