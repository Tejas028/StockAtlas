import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema({
  type: {
    type: String,
    enum: ["BUY", "SELL"],
    required: true,
  },
  shares: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, { _id: false });

const holdingSchema = new Schema({
  stock: {
    type: Schema.Types.ObjectId,
    ref: "Stock",
    required: true,
  },
  shares: {
    type: Number,
    required: true,
    min: 0,
  },
  avgBuyPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  transactions: [transactionSchema],
}, { _id: false });

const portfolioSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  holdings: [holdingSchema],
}, { timestamps: true });

export const Portfolio = mongoose.model("Portfolio", portfolioSchema);
