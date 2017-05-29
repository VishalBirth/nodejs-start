var Configuration = require( '../../config.json')
import { Response } from 'express';
const nodemailer = require('nodemailer');

export class HelpingFunctions {
    public static getJsonFailureResponse(message : string, data : any, code : number){
        return JSON.stringify({
            status : "failure",
            message : message, 
            data : data, 
            code : code
        })
    }
    public static getJsonSuccessResponse(message : string, data : any, code : number){
        return JSON.stringify({
            status : "success",
            message : message, 
            data : data, 
            code : code
        })
    }
    public static handleError(res : Response){
        return (err)=>{
            res.send(HelpingFunctions.getJsonFailureResponse("Error!", null, 1))
        }
    }
    public static sendEmail( mailOptions : any, cb){
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: Configuration.email,
                pass: Configuration.password
            }
        });

        // setup email data with unicode symbols
        mailOptions['from'] = Configuration.email
        // send mail with defined transport object
        transporter.sendMail(mailOptions, cb);
        /*(error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });*/
    }
}