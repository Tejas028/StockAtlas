import mongoose, { Schema } from "mongoose";

const stockSchema = new Schema({
    symbol: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        index: true,
    },
    name: {
        type: String
    },
    exchange: {
        type: String
    },
    currency: {
        type: String
    }
}, {timestamps: true})

export const Stock = mongoose.model("Stock", stockSchema);