"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("Express");
const databaseconnection_1 = require("../utilities/databaseconnection");
class Product {
    constructor() {
        this.router = express.Router();
        this.setRoutes();
    }
    getRouter() {
        return this.router;
    }
    setRoutes() {
        this.router.get("/", this.getAll);
        this.router.get('/id/:id', this.getProductById);
        this.router.get('/category/:id', this.getProductByCategory);
    }
    getProductById(req, res) {
        var model = databaseconnection_1.DatabaseConnection.getModels();
        model.product.findById(req.params.id).populate('category').exec().then(product => {
            res.json({ product: product });
        }, err => { res.send("Error"); });
    }
    getProductByCategory(req, res) {
        var model = databaseconnection_1.DatabaseConnection.getModels();
        model.product.find({ "category": req.params.id }).populate('category').exec().then(products => {
            res.json({ products: products });
        }, err => { res.send("Error"); });
    }
    getAll(req, res) {
        var model = databaseconnection_1.DatabaseConnection.getModels();
        model.product.find().populate('category').exec().then(products => {
            res.json({ products: products });
        }, err => { res.send("Error"); });
    }
}
exports.Product = Product;
