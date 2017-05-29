import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");
import mongoose = require("mongoose"); //import mongoose

//api 
import { API } from './apis/api';

//interfaces
import { IUser } from "./models/user.interface"; //import IUser

//models
import { IModel } from "./models/model"; //import IModel
import { IUserModel } from "./models/user.model"; //import IUserModel
//database
import { DatabaseConnection } from "./utilities/databaseconnection"
var Configuration = require( '../config.json')



/**
 * The server.
 *
 * @class Server
 */

export class Server {

  public app: express.Application;
  private model: IModel; //an instance of IModel

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
     this.model = Object(); 
    //create expressjs application
    this.app = express();

    //configure application
    this.config();

    //add routes
    this.setupRoutes();
  }

  /**
   * Create REST API routes
   *
   * @class Server
   * @method api
   */
  public setupRoutes() {
    this.app.use("/",(new API).getRouter());
  }
 
  /**
    * Configure application
    *
    * @class Server
    * @method config
    */
    
  public config() {

    //use q promises
    global.Promise = require("q").Promise;
    mongoose.Promise = global.Promise;

    //connect to mongoose
    DatabaseConnection.openConnection();
    
    
    //etag
    this.app.set('etag', false);
    //add static paths
    this.app.use(express.static(path.join(__dirname, "public")));

    //configure pug
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "pug");

    //use logger middlware
    this.app.use(logger("dev"));

    //use json form parser middlware
    this.app.use(bodyParser.json());

    //use query string parser middlware
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    //use cookie parker middleware middlware
    this.app.use(cookieParser(Configuration.cookie_secret));

    //use override middlware
    this.app.use(methodOverride());

    //catch 404 and forward to error handler
    this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        err.status = 404;
        next(err);
    });

    //error handling
    this.app.use(errorHandler());
  }

  /**
    * Create database models.
    *
    * @class Server
    * @method setModels
    * @return void
    */
  // private setModels(connection : mongoose.Connection){
  //     this.model.user = connection.model<IUserModel>("User", userSchema);
  // }

}
