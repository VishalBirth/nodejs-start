"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    profile: {
        createdAt: Date,
        email: { type: String, required: true, lowercase: true },
        userName: { type: String, lowercase: true }
    },
    data: {
        oauth: { type: String },
        password: { type: String },
        accountStatus: { type: Number }
    }
});
exports.userSchema.pre("save", function (next) {
    if (!this.profile.createdAt) {
        this.profile.createdAt = new Date();
    }
    next();
});
exports.userSchema.statics.findAll = function () {
    return this.find();
};
