import { IUserModel } from '../models/user.model';
import * as express from 'Express';
import * as mongoose from 'mongoose';
import { DatabaseConnection } from '../utilities/databaseconnection';
import { IModel } from '../models/model';
import {Router, Request, Response} from "express";

export class User{
    
    private router : express.Router
    
    constructor(){
        this.router = express.Router();  
        this.setRoutes(); 
    
    }
    public getRouter(): express.Router{
        return this.router;
    }
    // private fboutput(req : Request, res : Response){
    //     FB.settings.setSecret('6fefa341f0bde9402c75894ad9c26be3');
    //     FB.settings.setClientId('644197232449850');
    //     res.send("hi.. output is on console.")
    // }

    private setRoutes(){
        this.router.get('/', this.getUsers);
        // this.router.get('/fboutput', this.fboutput)

//        this.setUpAuth( this.router);
        // this.router.use(require("express-session")({
        //      secret : "VishalKumar"
        // }))
        // this.router.use(passport.initialize());
        // this.router.use(passport.session());
        // this.router.get("/hi", (req, res)=>{res.send("Really!")})
        // this.router.get("/auth/facebook", passport.authenticate('facebook', {scope : ['email']}));
        // this.router.get("/auth/facebook/callback", passport.authenticate('facebook', {failureRedirect : '/fail'}), (req, res)=>{
        //     res.send("Welcome "+ req.user.profile.username);
        // })

        // this.router.post('/auth/facebook/token',
        //     passport.authenticate('facebook-token'),
        //     function (req, res) {
        //     // do something with req.user
        //         res.send(req.user? 200 : 401);
        //     }
        // );
    }

    private getUsers(req : Request, res : Response){
        var model = DatabaseConnection.getModels();
        model.user.findAll().exec().then((output)=>{
            res.send(output);
        })
    }
   /* private setUpAuth( app : express.Router){
         var User = DatabaseConnection.getModels().user
        passport.serializeUser((user, done)=>{
            done(null, user["_id"]);
        });
        passport.deserializeUser((id, done)=>{
            User.findOne({_id : id}).exec(done);
        })
        passport.use(new FacebookTokenStrategy(
            {
                clientID : "644197232449850", 
                clientSecret : "6fefa341f0bde9402c75894ad9c26be3"
                ,callbackURL : "http://localhost:2000/user/auth/facebook/callback"
            }, function(accessToken , refrestToken, profile, done){
                if(!profile.emails || !profile.emails.length){
                    return done('No email are associated with this account.')
                }

                User.findOneAndUpdate(
                    {'data.oauth' : profile.id},
                    {
                        $set:{
                            'profile.username' : profile.emails[0].value, 
                            'profile.picture' : 'http://graph.facebook.com/'+profile.id.toString()+'/picture?type=large'                            
                        }
                    }, 
                    { 'new': true, upsert : true, runValidators: true}, 
                    (err, user)=>{done(err, user);}
                )
            }
        ))
    }
    */
}