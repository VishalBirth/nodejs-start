"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const category_model_1 = require("../models/category.model");
const product_model_1 = require("../models/product.model");
class ModelCreation {
    static createModels(connection) {
        var model = Object();
        model.user = (connection.model("User", user_model_1.userSchema));
        model.category = (connection.model("Category", category_model_1.categorySchema));
        model.product = (connection.model("Product", product_model_1.productSchema));
        return model;
    }
}
exports.ModelCreation = ModelCreation;
