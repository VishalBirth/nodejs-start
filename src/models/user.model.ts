import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { IUser, IUserDocument } from '../interfaces/user.interface';
import { Schema } from "mongoose";

export interface IUserModel extends mongoose.Model<IUserDocument> {
  //custom methods for your model would be defined here
  findAll() : mongoose.Query<IUserModel[]>
}

export var userSchema: Schema = new Schema({
  profile : {
      createdAt: Date,
      email : {type : String, required : true, lowercase :  true},
      userName : {type : String, required : true, lowercase :  true}
  },
  data : {
    oauth : {type : String, required : true}, 
    cart : [{
      product : Schema.Types.ObjectId,
      quantity : {
        type : Number, 
        default : 1, 
        min : 1
      } 
    }]
  }
});

userSchema.pre("save", function(next) {
  if (!this.profile.createdAt) {
    this.profile.createdAt = new Date();
  }
  next();
});

userSchema.statics.findAll = function() {
  return this.find();
}