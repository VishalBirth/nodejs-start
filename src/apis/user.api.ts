import { ACCOUNT_STATUS } from '../utilities/constants';
/**
 * Error Codes :
 * Failure : 101-149
 * Success : 151-199
 */

import { HelpingFunctions } from '../utilities/helpingFunctions';
import { IUserModel } from '../models/user.model';
import * as express from 'Express';
import * as mongoose from 'mongoose';
import { DatabaseConnection } from '../utilities/databaseconnection';
import { IModel } from '../models/model';
import {Router, Request, Response} from "express";

export class User{
    
    private router : express.Router
    
    constructor(){
        this.router = express.Router();  
        this.setRoutes(); 
    
    }
    public getRouter(): express.Router{
        return this.router;
    }

    private setRoutes(){
        this.router.get('/', this.getUsers);
        this.router.post('/', this.addUser);
        this.router.get('/:userId', this.verifyUser)
    }
    
    private verifyUser(req : Request, res : Response){
        var userId = req.params.userId
        var model = DatabaseConnection.getModels();
        model.user.findById(userId).exec().then(user =>{
            if(user != null){
                user.profile.accountStatus = ACCOUNT_STATUS.VERIFIED;
                user.save().then(user=>{
                    res.send(HelpingFunctions.getJsonSuccessResponse("Your account has been verified!", null, 152));
                }, HelpingFunctions.handleError(res))
            }else{
                res.send(HelpingFunctions.getJsonFailureResponse("Your Link has been expired, Please create your account again.", null, 103))
            }
        }, HelpingFunctions.handleError(res))
    }

    private addUser(req : Request, res : Response){
        var email = req.body.email;
        var username = req.body.username; 
        var password = req.body.password;
        var model = DatabaseConnection.getModels();
        model.user.findOne({"profile.email": email}).exec().then(user=>{
            if(user == null || user.profile.accountStatus == ACCOUNT_STATUS.REGISTERED){
                
                /**
                 * @TODO : SEND Email to User 
                 * and provide Response to user.
                */ 

                var text = "localhost:2000/user/"+user._id
                let mailOptions = {
                    to: email, // list of receivers
                    subject: 'Account Verification', // Subject line
                    text: text  // plain text body
                    //html: '<b>Hello world ?</b>' // html body
                };

                HelpingFunctions.sendEmail(mailOptions, (err, info)=>{
                    if (err) {
                        console.log(err);
                        res.send(HelpingFunctions.getJsonFailureResponse(err, null, 102))
                    }else{
                        if(user == null){
                            var newUser = new model.user({
                                profile : {
                                    email : email, 
                                    password : password, 
                                    user_name : username,  
                                }, 
                                data : {
                                    oauth : ""
                                }
                            })
                            newUser.save().then(user =>{
                                finalResponse(info)
                            }, HelpingFunctions.handleError(res))
                        }else{
                            finalResponse(info)
                        }
                    }
                })

            }else{
                res.send(HelpingFunctions.getJsonFailureResponse("Your account already exist!", null, 101));
            }
        }, HelpingFunctions.handleError(res))

        function finalResponse(info){
            console.log('Message %s sent: %s', info.messageId, info.response);
            res.send(HelpingFunctions.getJsonSuccessResponse("Authentication link has been delivered to your account. Please verify your account.", null, 151))
        }
    }
    private getUsers(req : Request, res : Response){
        var model = DatabaseConnection.getModels();
        model.user.find().exec().then(output => {
            res.send(output)
        })
    }
}