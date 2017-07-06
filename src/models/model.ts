import { Model, Connection } from 'mongoose';
import { IUserModel } from "./user.model";
//importing schemas
import { userSchema } from "../models/user.model"; //import userSchema


export interface IModel extends Object {
    user: IUserModel;
}

export class ModelCreation {  
    public static createModels(connection : Connection ): IModel{
        var model : IModel = Object();

        // attaching models to the connection 
        model.user = <IUserModel>(connection.model("User",  userSchema))        

        return model;
    }
}
