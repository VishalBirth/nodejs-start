import { ICategory } from './category.interface';
import * as mongoose from 'mongoose';
export interface IProduct {
    name :  string 
    pictures : string
    price : {
        amout : number 
        currency : string
    },
    category : ICategory
}

export interface IProductDocument extends  IProduct, mongoose.Document {

}