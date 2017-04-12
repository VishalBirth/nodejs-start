import * as mongoose from 'mongoose';
export interface ICategory {
    _id : any, 
    parent : ICategory, 
    ancestors : [ICategory]
}

export interface ICategoryDocument extends  ICategory, mongoose.Document {

}