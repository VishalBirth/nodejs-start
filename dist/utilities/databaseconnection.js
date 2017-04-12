"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../models/model");
const mongoose = require("mongoose");
var config = require("../../config.json");
class DatabaseConnection {
    constructor() {
        var connection_string = config["mongodb_connection"];
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
