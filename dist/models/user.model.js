"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../utilities/constants");
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    profile: {
        createdOn: { type: Date, default: Date() },
        updatedOn: { type: Date },
        accountStatus: { type: Number, default: constants_1.ACCOUNT_STATUS.REGISTERED },
        email: { type: String, required: true, lowercase: true },
        user_name: { type: String, required: true },
        password: { type: String, required: true },
    },
    data: {
        oauth: { type: String }
    }
});
exports.userSchema.pre("save", function (next) {
    this.profile.updatedOn = new Date();
    next();
});
exports.userSchema.statics = {
    findAll: function () {
        return this.find().exec();
    }
};
