/**
 * Connection will be reopened even if server is closed..
 */


import { IModel, ModelCreation } from '../models/model';
import mongoose = require("mongoose")
var config = require("../../config.json")

import { IUserModel } from "../models/user.model"; //import IUserModel

/**
 * Singleton Database Connection class
 *
 * @class DatabaseConnection
 */
export class DatabaseConnection{
    
    // connection object 
    private connection: mongoose.Connection;
    public model : IModel;
    private static instance : DatabaseConnection = null;

    private constructor(){
        var connection_string : string = config["mongodb_connection"];
        this.connection = mongoose.createConnection(connection_string);
        this.model = ModelCreation.createModels(this.connection);
    }

    /**
     * estabilish  mongodbconnection
     *
     * @class DatabaseConnection
     * @method 
     * @static openConnection
     * @return  Returns the connection
     */

   
    public static openConnection() : DatabaseConnection{
        if(this.instance == null){
            this.instance = new DatabaseConnection();
            //getting connection name from config.json
        }
        return this.instance
    }
    
    public static getModels() : IModel {
        if(this.instance != null){
            return this.openConnection().model
        }else{
            return null;
        }
    }
    /**
     * close  mongodbconnection
     *
     * @class DatabaseConnection
     * @static closeConnection
     * @return  Returns the connection
     */
    
    public static closeConnection() {
        this.instance.connection.close();
    }
}