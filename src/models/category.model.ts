import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { ICategoryDocument } from '../interfaces/category.interface';
import { Schema } from "mongoose";

export interface ICategoryModel extends mongoose.Model<ICategoryDocument> {

}
export var categorySchema: Schema = new Schema({
    _id : { type : String }, 
    parent : {
        type : String, 
        ref : "Category"
    }, 
    ancestors : [{
        type : String, ref : "Category"
    }]
});
