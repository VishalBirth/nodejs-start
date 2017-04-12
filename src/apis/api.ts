import { User } from './user.api';
import * as express from 'Express';
import * as mongoose from 'mongoose';
import { DatabaseConnection } from '../utilities/databaseconnection';
import { IModel } from '../models/model';
import {Router, Request, Response} from "express";
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
    
}