import { IUserModel, IUser } from '../models/user.model';
import * as express from 'Express';
import * as mongoose from 'mongoose';
import { DatabaseConnection } from '../utilities/databaseconnection';
import { IModel } from '../models/model';
import {Router, Request, Response} from "express";
import { HelpingFunctions } from '../utilities/helpingFunctions';
import { MailSender } from '../utilities/mailSender';
import { HTTP_CODE } from '../utilities/httpCodes';
import { ACCOUNT_STATUS } from '../utilities/restrictions';
import { config } from '../../config';

var jwt    = require('jsonwebtoken');
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
        this.router.get('/:userId/activate', this.activateUser);
        this.router.post('/login', this.loginUser);        
    }

    private getUsers(req : Request, res : Response){
        var model = DatabaseConnection.getModels();
        model.user.findAll().exec().then((output)=>{
            res.send(HelpingFunctions.getResponseWithData(HTTP_CODE.Success, "users", output));
        })
    }

    private activateUser(req: Request, res : Response){
        var userId = req.params.userId
        var model = DatabaseConnection.getModels();
        model.user.findByIdAndUpdate(userId, {$set: {"data.accountStatus": ACCOUNT_STATUS.EMAIL_VERIFIED}}, {new: true}).exec().then(user=>{
            if(user != null){
                res.send(HelpingFunctions.getResponseWithData(HTTP_CODE.Success, "Your Email has been verified", user));
            }else{
                res.send(HelpingFunctions.getResponseWithData(HTTP_CODE.Failure, "Incorrect Code! Please try again!", null))
            }
        }, HelpingFunctions.handleError(res));
    }

    private addUser(req: Request, res: Response){
        var email = req.body.email;
        var password = req.body.password;

        if(typeof email != 'undefined' && HelpingFunctions.validateEmail(email)){
            var model = DatabaseConnection.getModels();
            model.user.findOne({"profile.email" : email}).exec().then(userExist=>{
                if(userExist != null){
                    if(userExist.data.accountStatus == ACCOUNT_STATUS.EMAIL_VERIFIED){
                        res.send(HelpingFunctions.getResponseWithData(HTTP_CODE.Failure,"Your account already exist", null));
                    }else{
                        MailSender.sendMail(res, email)
                    }
                }else{
                    var user = new model.user({
                        profile : {
                            createdAt: new Date(),
                            email : email
                        },
                        data : {
                            password : password,
                            accountStatus : ACCOUNT_STATUS.SIGNUP
                        }
                    })

                    console.log("cha tho mokleen?")
                    user.save().then( output => {
                        MailSender.sendMail(res, email)
                    }, HelpingFunctions.handleError(res))
                }
            }, HelpingFunctions.handleError(res))
        }else{
            res.send(HelpingFunctions.getResponseWithData(HTTP_CODE.Failure, "Error! Please provide correct email address!", null))
        }
    }

    private loginUser(req : Request, res : Response){
        var email = req.body.email
        var password = req.body.password
        var model = DatabaseConnection.getModels();
        if(typeof email == 'undefined'){
            res.send(HelpingFunctions.getResponseWithData(HTTP_CODE.Failure,"Error! Email not found", null));
        }else{
            model.user.findOne({"profile.email" : email}).exec().then(user=>{
                if(user != null && user.data.password == password){
                    var tokenData = {
                        _id : user._id, 
                        email : user.profile.email
                    }
    
                    var token = jwt.sign(tokenData, config.secret, {});
                    // return the information including token as JSON
                    res.send(HelpingFunctions.getResponseWithDataAndToken(HTTP_CODE.Success, "Logined" , user, token))
                }else{
                    res.send(HelpingFunctions.getResponseWithData(HTTP_CODE.Failure, "Incorrect email/password", null));
                }
            }, HelpingFunctions.handleError(res))
        }
    }
}