"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../utilities/constants");
const helpingFunctions_1 = require("../utilities/helpingFunctions");
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
        this.router.post('/', this.addUser);
        this.router.get('/:userId', this.verifyUser);
    }
    verifyUser(req, res) {
        var userId = req.params.userId;
        var model = databaseconnection_1.DatabaseConnection.getModels();
        model.user.findById(userId).exec().then(user => {
            if (user != null) {
                user.profile.accountStatus = constants_1.ACCOUNT_STATUS.VERIFIED;
                user.save().then(user => {
                    res.send(helpingFunctions_1.HelpingFunctions.getJsonSuccessResponse("Your account has been verified!", null, 152));
                }, helpingFunctions_1.HelpingFunctions.handleError(res));
            }
            else {
                res.send(helpingFunctions_1.HelpingFunctions.getJsonFailureResponse("Your Link has been expired, Please create your account again.", null, 103));
            }
        }, helpingFunctions_1.HelpingFunctions.handleError(res));
    }
    addUser(req, res) {
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        var model = databaseconnection_1.DatabaseConnection.getModels();
        model.user.findOne({ "profile.email": email }).exec().then(user => {
            if (user == null || user.profile.accountStatus == constants_1.ACCOUNT_STATUS.REGISTERED) {
                var text = "localhost:2000/user/" + user._id;
                let mailOptions = {
                    to: email,
                    subject: 'Account Verification',
                    text: text
                };
                helpingFunctions_1.HelpingFunctions.sendEmail(mailOptions, (err, info) => {
                    if (err) {
                        console.log(err);
                        res.send(helpingFunctions_1.HelpingFunctions.getJsonFailureResponse(err, null, 102));
                    }
                    else {
                        if (user == null) {
                            var newUser = new model.user({
                                profile: {
                                    email: email,
                                    password: password,
                                    user_name: username,
                                },
                                data: {
                                    oauth: ""
                                }
                            });
                            newUser.save().then(user => {
                                finalResponse(info);
                            }, helpingFunctions_1.HelpingFunctions.handleError(res));
                        }
                        else {
                            finalResponse(info);
                        }
                    }
                });
            }
            else {
                res.send(helpingFunctions_1.HelpingFunctions.getJsonFailureResponse("Your account already exist!", null, 101));
            }
        }, helpingFunctions_1.HelpingFunctions.handleError(res));
        function finalResponse(info) {
            console.log('Message %s sent: %s', info.messageId, info.response);
            res.send(helpingFunctions_1.HelpingFunctions.getJsonSuccessResponse("Authentication link has been delivered to your account. Please verify your account.", null, 151));
        }
    }
    getUsers(req, res) {
        var model = databaseconnection_1.DatabaseConnection.getModels();
        model.user.find().exec().then(output => {
            res.send(output);
        });
    }
}
exports.User = User;
