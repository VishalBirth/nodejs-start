"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.categorySchema = new mongoose_1.Schema({
    _id: { type: String },
    parent: {
        type: String,
        ref: "Category"
    },
    ancestors: [{
            type: String, ref: "Category"
        }]
});
