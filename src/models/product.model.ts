import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { IProductDocument } from './product.interface';
import { Schema } from "mongoose";

export interface IProductModel extends mongoose.Model<IProductDocument> {

}
export var productSchema: Schema = new Schema({
    name : { type : String, required : true }, 
    pictures : [{type : String, match : /^http:\/\//i }],
    price : {
        amount : {type : Number, required : true}, 
        currency : {
            type : String, 
            enum : ['USD', 'EUR', 'GBP'],
            required : true
        }
    },
    category : {type : String, ref : "Category"}
});
