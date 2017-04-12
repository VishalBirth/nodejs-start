import { User } from './user.api';
import * as express from 'Express';
import * as mongoose from 'mongoose';
import { DatabaseConnection } from '../utilities/databaseconnection';
import { IModel } from '../models/model';
import {Router, Request, Response} from "express";
export class Product{
    
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
        this.router.get('/id/:id', this.getProductById);
        this.router.get('/category/:id', this.getProductByCategory);
    }

    private getProductById(req : Request, res : Response){
         var model = DatabaseConnection.getModels();
         model.product.findById(req.params.id).populate('category').exec().then(product =>{
             res.json({product : product});
         }, err=> {res.send("Error")});
    }


    private getProductByCategory(req : Request, res : Response){
         var model = DatabaseConnection.getModels();
         model.product.find({"category" : req.params.id}).populate('category').exec().then(products =>{
             res.json({products : products});
         }, err=> {res.send("Error")});
    }
    private getAll(req : Request, res : Response){
         var model = DatabaseConnection.getModels();
         model.product.find().populate('category').exec().then(products =>{
             res.json({products : products});
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