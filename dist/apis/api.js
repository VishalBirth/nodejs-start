"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("Express");
const databaseconnection_1 = require("../utilities/databaseconnection");
const user_api_1 = require("./user.api");
const product_api_1 = require("./product.api");
const category_api_1 = require("./category.api");
class API {
    constructor() {
        this.router = express.Router();
        this.setRoutes();
    }
    getRouter() {
        return this.router;
    }
    setRoutes() {
        this.router.get('/', this.showMessage);
        this.router.use("/user/", (new user_api_1.User).getRouter());
        this.router.use("/category/", (new category_api_1.Category).getRouter());
        this.router.use("/product/", (new product_api_1.Product).getRouter());
        this.router.use(function (req, res, next) {
            console.log(res.send("hehehehe"));
            next();
        });
    }
    showMessage(req, res) {
        res.send("Hello to the Vishal World!");
    }
    checkDatabase(req, res, cb) {
        var model;
        model = databaseconnection_1.DatabaseConnection.getModels();
        if (model == null) {
            res.send("Error");
        }
        else {
            cb(req, res, model);
        }
    }
}
exports.API = API;
