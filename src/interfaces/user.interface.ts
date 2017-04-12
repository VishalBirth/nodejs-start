import * as mongoose from 'mongoose';
export interface IUser {
  profile : {
      createdAt: Date;
      email : string;
      userName : string;
  };
  data : {
    oauth : string, 
    cart : [{
      product : mongoose.Schema.Types.ObjectId,
      quantity : number
    }]
  }
}

export interface IUserDocument extends  IUser, mongoose.Document {

}