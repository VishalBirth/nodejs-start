"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const databaseconnection_1 = require("../utilities/databaseconnection");
const helpingFunctions_1 = require("./helpingFunctions");
const httpCodes_1 = require("./httpCodes");
const config_1 = require("../../config");
const nodemailer = require('nodemailer');
class MailSender {
    static sendMail(res, email) {
        var model = databaseconnection_1.DatabaseConnection.getModels();
        var smtpConfig = {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: config_1.config.email,
                pass: config_1.config.password
            },
            tls: { rejectUnauthorized: false }
        };
        var transporter = nodemailer.createTransport(smtpConfig);
        model.user.findOne({ "profile.email": email }).exec().then(user => {
            console.log('jaldi kr na baba ');
            let mailOptions = {
                from: config_1.config.email,
                to: email,
                subject: 'Account Verification',
                text: config_1.config.ip + ":" + config_1.config.portno + "/user/" + user._id.toString() + "/activate"
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
                res.send(helpingFunctions_1.HelpingFunctions.getResponseWithData(httpCodes_1.HTTP_CODE.Success, "Mail has been delivered", null));
            });
        });
    }
}
exports.MailSender = MailSender;
