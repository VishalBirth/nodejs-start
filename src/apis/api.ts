import * as express from 'Express';
import * as mongoose from 'mongoose';
import { DatabaseConnection } from '../utilities/databaseconnection';
import { IModel } from '../models/model';
import {Router, Request, Response} from "express";

/**
 * APIs
 */
import { User } from './user.api';
import { Product } from './product.api';
import { Category } from './category.api';

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
        this.router.use("/category/", (new Category).getRouter());
        this.router.use("/product/", (new Product).getRouter());
        this.router.use( function (req, res, next){
            console.log(res.send("hehehehe"));
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
    
}