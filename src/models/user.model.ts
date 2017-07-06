import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Schema } from "mongoose";

export interface IUser {  
  profile : {
      createdAt: Date;
      email : string;
      userName : string;
  };
  data : {
    oauth : string, 
    password : string, 
    accountStatus : number
  }
}

export var userSchema: Schema = new Schema({
  profile : {
      createdAt: Date,
      email : {type : String, required : true, lowercase :  true},
      userName : {type : String, lowercase :  true}
  },
  data : {
    oauth : {type : String}, 
    password : {type : String}, 
    accountStatus : {type : Number}
  }
});

userSchema.pre("save", function(next) {
  if (!this.profile.createdAt) {
    this.profile.createdAt = new Date();
  }
  next();
});



export interface IUserDocument extends  IUser, mongoose.Document {}

export interface IUserModel extends mongoose.Model<IUserDocument> {
  //custom methods for your model would be defined here
  findAll() : mongoose.Query<IUserModel[]>
}

userSchema.statics.findAll = function() {
  return this.find();
}
