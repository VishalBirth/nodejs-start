import { User } from './user.api';
import * as express from 'Express';
import * as mongoose from 'mongoose';
import { DatabaseConnection } from '../utilities/databaseconnection';
import { IModel } from '../models/model';
import {Router, Request, Response} from "express";
import { config } from '../../config';
import { HelpingFunctions } from '../utilities/helpingFunctions';

var jwt    = require('jsonwebtoken');


export class API{
    
    private router : express.Router
    
    constructor(){
        this.router = express.Router();  
        this.setRoutes(); 
    }

    public getRouter(): express.Router{
        return this.router;
    }

    private setRoutes(){
        this.router.get('/', this.showMessage);
        this.router.use("/user/", (new User).getRouter());
        
        
        this.router.use( function (req, res, next){
            res.send("hehehehe");
            next();
        })

    }

    private showMessage(req : Request, res : Response){
        res.send("Hello to the Vishal World!");
    }


    private checkDatabase (req : Request, res : Response, cb){
        var model : IModel;
        model = DatabaseConnection.getModels();
        if(model == null){
            res.send("Error");
        }else{
            cb(req, res, model);
        }
    }
    private verifyToken(req : Request, res :Response, next : any){

          // check header or url parameters or post parameters for token
          var token = req.body.token || req.query.token || req.headers['x-access-token'];
        
          // decode token
          if (token) {
            // verifies secret and checks exp
            jwt.verify(token,  config.secret, function(err, decoded) {      
              if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });    
              } else {
                // if everything is good, save to request for use in other routes
                req['decoded'] = decoded;    
                DatabaseConnection.getModels().user.findById(decoded._id).exec().then(user=>{
                    req['user']=user;
                    next();
                },HelpingFunctions.handleError(res));    
              }
            });
          } else {
            // if there is no token
            // return an error
            return res.status(403).send({ 
                success: false, 
                message: 'No token provided.' 
            });            
          }
          
    }
    
}