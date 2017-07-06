import {Router, Request, Response} from "express";
import { HTTP_CODE } from './httpCodes';

export class HelpingFunctions  {
    /**
     * successResponseWithData
     */
    public static getResponseWithData(status : any, message : string, data : any) {
        return JSON.stringify({
            status : status, 
            data : data, 
            message : message
        });
    }
    public static getResponseWithDataAndToken(status : any, message : string, data : any, token : any) {
        return JSON.stringify({
            status : status, 
            data : data, 
            message : message, 
            token : token
        });
    }

    public static handleError(res : Response){
        return (err)=>{
            res.send(HelpingFunctions.getResponseWithData(HTTP_CODE.InternalServerError, err, null))
        }
    }
    public static validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

}