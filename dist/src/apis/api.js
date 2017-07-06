"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_api_1 = require("./user.api");
const express = require("Express");
const databaseconnection_1 = require("../utilities/databaseconnection");
const config_1 = require("../../config");
const helpingFunctions_1 = require("../utilities/helpingFunctions");
var jwt = require('jsonwebtoken');
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
        this.router.use(function (req, res, next) {
            res.send("hehehehe");
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
    verifyToken(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, config_1.config.secret, function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                }
                else {
                    req['decoded'] = decoded;
                    databaseconnection_1.DatabaseConnection.getModels().user.findById(decoded._id).exec().then(user => {
                        req['user'] = user;
                        next();
                    }, helpingFunctions_1.HelpingFunctions.handleError(res));
                }
            });
        }
        else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    }
}
exports.API = API;
