"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("Express");
const databaseconnection_1 = require("../utilities/databaseconnection");
const helpingFunctions_1 = require("../utilities/helpingFunctions");
const mailSender_1 = require("../utilities/mailSender");
const httpCodes_1 = require("../utilities/httpCodes");
const restrictions_1 = require("../utilities/restrictions");
const config_1 = require("../../config");
var jwt = require('jsonwebtoken');
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
        this.router.post('/', this.addUser);
        this.router.get('/:userId/activate', this.activateUser);
        this.router.post('/login', this.loginUser);
    }
    getUsers(req, res) {
        var model = databaseconnection_1.DatabaseConnection.getModels();
        model.user.findAll().exec().then((output) => {
            res.send(helpingFunctions_1.HelpingFunctions.getResponseWithData(httpCodes_1.HTTP_CODE.Success, "users", output));
        });
    }
    activateUser(req, res) {
        var userId = req.params.userId;
        var model = databaseconnection_1.DatabaseConnection.getModels();
        model.user.findByIdAndUpdate(userId, { $set: { "data.accountStatus": restrictions_1.ACCOUNT_STATUS.EMAIL_VERIFIED } }, { new: true }).exec().then(user => {
            if (user != null) {
                res.send(helpingFunctions_1.HelpingFunctions.getResponseWithData(httpCodes_1.HTTP_CODE.Success, "Your Email has been verified", user));
            }
            else {
                res.send(helpingFunctions_1.HelpingFunctions.getResponseWithData(httpCodes_1.HTTP_CODE.Failure, "Incorrect Code! Please try again!", null));
            }
        }, helpingFunctions_1.HelpingFunctions.handleError(res));
    }
    addUser(req, res) {
        var email = req.body.email;
        var password = req.body.password;
        if (typeof email != 'undefined' && helpingFunctions_1.HelpingFunctions.validateEmail(email)) {
            var model = databaseconnection_1.DatabaseConnection.getModels();
            model.user.findOne({ "profile.email": email }).exec().then(userExist => {
                if (userExist != null) {
                    if (userExist.data.accountStatus == restrictions_1.ACCOUNT_STATUS.EMAIL_VERIFIED) {
                        res.send(helpingFunctions_1.HelpingFunctions.getResponseWithData(httpCodes_1.HTTP_CODE.Failure, "Your account already exist", null));
                    }
                    else {
                        mailSender_1.MailSender.sendMail(res, email);
                    }
                }
                else {
                    var user = new model.user({
                        profile: {
                            createdAt: new Date(),
                            email: email
                        },
                        data: {
                            password: password,
                            accountStatus: restrictions_1.ACCOUNT_STATUS.SIGNUP
                        }
                    });
                    console.log("cha tho mokleen?");
                    user.save().then(output => {
                        mailSender_1.MailSender.sendMail(res, email);
                    }, helpingFunctions_1.HelpingFunctions.handleError(res));
                }
            }, helpingFunctions_1.HelpingFunctions.handleError(res));
        }
        else {
            res.send(helpingFunctions_1.HelpingFunctions.getResponseWithData(httpCodes_1.HTTP_CODE.Failure, "Error! Please provide correct email address!", null));
        }
    }
    loginUser(req, res) {
        var email = req.body.email;
        var password = req.body.password;
        var model = databaseconnection_1.DatabaseConnection.getModels();
        if (typeof email == 'undefined') {
            res.send(helpingFunctions_1.HelpingFunctions.getResponseWithData(httpCodes_1.HTTP_CODE.Failure, "Error! Email not found", null));
        }
        else {
            model.user.findOne({ "profile.email": email }).exec().then(user => {
                if (user != null && user.data.password == password) {
                    var tokenData = {
                        _id: user._id,
                        email: user.profile.email
                    };
                    var token = jwt.sign(tokenData, config_1.config.secret, {});
                    res.send(helpingFunctions_1.HelpingFunctions.getResponseWithDataAndToken(httpCodes_1.HTTP_CODE.Success, "Logined", user, token));
                }
                else {
                    res.send(helpingFunctions_1.HelpingFunctions.getResponseWithData(httpCodes_1.HTTP_CODE.Failure, "Incorrect email/password", null));
                }
            }, helpingFunctions_1.HelpingFunctions.handleError(res));
        }
    }
}
exports.User = User;
