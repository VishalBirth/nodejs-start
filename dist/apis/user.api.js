"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("Express");
const databaseconnection_1 = require("../utilities/databaseconnection");
class User {
    constructor() {
        this.router = express.Router();
        this.setRoutes();
    }
    getRouter() {
        return this.router;
    }
    setRoutes() {
        this.router.get('/', this.getUsers);
    }
    getUsers(req, res) {
        var model = databaseconnection_1.DatabaseConnection.getModels();
        model.user.findAll().exec().then((output) => {
            res.send(output);
        });
    }
}
exports.User = User;
