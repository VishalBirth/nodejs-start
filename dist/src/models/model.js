"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
class ModelCreation {
    static createModels(connection) {
        var model = Object();
        model.user = (connection.model("User", user_model_1.userSchema));
        return model;
    }
}
exports.ModelCreation = ModelCreation;
