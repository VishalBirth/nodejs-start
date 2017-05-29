import { ACCOUNT_STATUS } from '../utilities/constants';
import { DatabaseConnection } from '../utilities/databaseconnection';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { IUser, IUserDocument } from './user.interface';
import { Schema } from "mongoose";

import { Model, Connection } from 'mongoose';

export interface IUserModel extends mongoose.Model<IUserDocument> {
  //custom methods for your model would be defined here
  findAll() : mongoose.Query<IUserModel[]>
}

export var userSchema: Schema = new Schema({
  profile : {
      createdOn : { type : Date, default: Date() }, 
      updatedOn : { type : Date },
      accountStatus : { type : Number, default : ACCOUNT_STATUS.REGISTERED }, 

      email     : { type : String, required : true, lowercase :  true},
      user_name  : { type : String, required : true}, 
      password  : { type : String, required : true}, 
      
  },
  data : {
    oauth : {type : String}
  }
});

userSchema.pre("save", function(next) {
  this.profile.updatedOn = new Date();
  next();
});

userSchema.statics ={
  findAll: function(){
    return this.find().exec();
  }
} 