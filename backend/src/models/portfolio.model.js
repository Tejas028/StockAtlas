import mongoose, { Schema } from "mongoose";

const portfolioSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    holdings: [
        {
            stock: {
                type: Schema.Types.ObjectId,
                ref: "Stock",
                required: true
            },
            shares: {
                type: Number,
                required: true,
                min: 1
            },
            avgBuyPrice: {
                type: Number,
                required: true
            },
            transactions: [
                {
                    type: {
                        type: String,
                        enum: ["BUY", "SELL"],
                        required: true
                    },
                    shares: {
                        type: Number
                    },
                    price: {
                        type: Number
                    },
                    date: {
                        type: Date,
                        default: Date.now
                    }
                }
            ]
        }
    ]
}, {timestamps: true})

export const Portfolio = mongoose.model("Portfolio", portfolioSchema)