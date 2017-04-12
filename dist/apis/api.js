"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("Express");
const databaseconnection_1 = require("../utilities/databaseconnection");
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
