"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    pictures: [{ type: String, match: /^http:\/\//i }],
    price: {
        amount: { type: Number, required: true },
        currency: {
            type: String,
            enum: ['USD', 'EUR', 'GBP'],
            required: true
        }
    },
    category: { type: String, ref: "Category" }
});
