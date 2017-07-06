import { DatabaseConnection } from '../utilities/databaseconnection';
import {Router, Request, Response} from "express";
import { HelpingFunctions } from './helpingFunctions';
import { HTTP_CODE } from './httpCodes';
import { config } from '../../config';
const nodemailer = require('nodemailer');

export class MailSender{
   
   public static sendMail (res: Response, email : String){
       
        var model = DatabaseConnection.getModels();
        var smtpConfig = {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: config.email,
                pass: config.password
            },
            tls: { rejectUnauthorized: false }
        };
        var transporter = nodemailer.createTransport(smtpConfig);
        model.user.findOne({"profile.email" : email}).exec().then(user=>{
            console.log('jaldi kr na baba ');

            let mailOptions = {
                from: config.email, // sender address
                to: email, // list of receivers
                subject: 'Account Verification', // Subject line
 //               html: '<h1> Code : '+temp.toString()+'</h1>'// plain text body
                text : config.ip +":"+config.portno+"/user/"+user._id.toString()+"/activate"
            };
            
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
                res.send(HelpingFunctions.getResponseWithData(HTTP_CODE.Success, "Mail has been delivered", null));
            });    
        })
    }
}