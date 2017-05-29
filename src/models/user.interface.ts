import * as mongoose from 'mongoose';
export interface IUser {
  profile : {
      createdOn : Date;
      updatedOn : Date; 
      email     : string;
      user_name  : string;
      accountStatus : number;
  };
  data : {
    oauth : string, 
  }
}

export interface IUserDocument extends  IUser, mongoose.Document {

}