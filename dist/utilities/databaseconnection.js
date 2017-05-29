"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Configuration = require('../../config.json');
const model_1 = require("../models/model");
const mongoose = require("mongoose");
class DatabaseConnection {
    constructor() {
        var connection_string = Configuration.mongodb_connection;
        this.connection = mongoose.createConnection(connection_string);
        this.model = model_1.ModelCreation.createModels(this.connection);
    }
    static openConnection() {
        if (this.instance == null) {
            this.instance = new DatabaseConnection();
        }
        return this.instance;
    }
    static getModels() {
        if (this.instance != null) {
            return this.openConnection().model;
        }
        else {
            return null;
        }
    }
    static closeConnection() {
        this.instance.connection.close();
    }
}
DatabaseConnection.instance = null;
exports.DatabaseConnection = DatabaseConnection;
