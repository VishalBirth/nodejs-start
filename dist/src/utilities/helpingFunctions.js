"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpCodes_1 = require("./httpCodes");
class HelpingFunctions {
    static getResponseWithData(status, message, data) {
        return JSON.stringify({
            status: status,
            data: data,
            message: message
        });
    }
    static getResponseWithDataAndToken(status, message, data, token) {
        return JSON.stringify({
            status: status,
            data: data,
            message: message,
            token: token
        });
    }
    static handleError(res) {
        return (err) => {
            res.send(HelpingFunctions.getResponseWithData(httpCodes_1.HTTP_CODE.InternalServerError, err, null));
        };
    }
    static validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}
exports.HelpingFunctions = HelpingFunctions;
