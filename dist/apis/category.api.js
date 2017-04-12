"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("Express");
const databaseconnection_1 = require("../utilities/databaseconnection");
class Category {
    constructor() {
        this.router = express.Router();
        this.setRoutes();
    }
    getRouter() {
        return this.router;
    }
    setRoutes() {
        this.router.get("/", this.getAll);
        this.router.get('/id/:id', this.getCategoryById);
        this.router.get('/parent/:id', this.getParentCategory);
    }
    getCategoryById(req, res) {
        var model = databaseconnection_1.DatabaseConnection.getModels();
        model.category.findById(req.params.id).exec().then(category => {
            res.json({ category: category });
        }, err => { res.send("Error"); });
    }
    getParentCategory(req, res) {
        var model = databaseconnection_1.DatabaseConnection.getModels();
        model.category.find({ parent: req.params.id }).exec().then(categories => {
            res.json({ categories: categories });
        }, err => { res.send("Error"); });
    }
    getAll(req, res) {
        var model = databaseconnection_1.DatabaseConnection.getModels();
        model.category.find().exec().then(categories => {
            res.json({ categories: categories });
        }, err => { res.send("Error"); });
    }
}
exports.Category = Category;
