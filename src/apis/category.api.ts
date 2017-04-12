import { User } from './user.api';
import * as express from 'Express';
import * as mongoose from 'mongoose';
import { DatabaseConnection } from '../utilities/databaseconnection';
import { IModel } from '../models/model';
import {Router, Request, Response} from "express";


export class Category{
    
    private router : express.Router
    
    constructor(){
        this.router = express.Router();  
        this.setRoutes(); 
    }
    public getRouter(): express.Router{
        return this.router;
    }


    private setRoutes(){
        this.router.get("/", this.getAll)
        this.router.get('/id/:id', this.getCategoryById);
        this.router.get('/parent/:id', this.getParentCategory);
    }

    private getCategoryById(req : Request, res : Response){
         var model = DatabaseConnection.getModels();
         model.category.findById(req.params.id).exec().then(category =>{
             res.json({category : category});
         }, err=> {res.send("Error")});
    }
    private getParentCategory(req : Request, res : Response){
         var model = DatabaseConnection.getModels();
         model.category.find({parent : req.params.id}).exec().then(categories =>{
             res.json({categories : categories});
         }, err=> {res.send("Error")});
    }
    private getAll(req : Request, res : Response){
         var model = DatabaseConnection.getModels();
         model.category.find().exec().then(categories =>{
             res.json({categories : categories});
         }, err=> {res.send("Error")});
    }
    // private addCategory (req : Request, res : Response){
    //     var model = DatabaseConnection.getModels();
    //     var category = new  model.category({
    //         _id : req.body.name, 
    //         parent : req.body.parent, 

    //     })
    // }
    


}
