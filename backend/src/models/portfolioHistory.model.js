import mongoose, { Schema } from "mongoose";

const breakdownItemSchema = new Schema({
  symbol: { 
    type: String, 
    required: true 
  },
  shares: { 
    type: Number, 
    required: true 
  },
  avgBuyPrice: { 
    type: Number, 
    required: true 
  },
  currentPrice: { 
    type: Number, 
    required: true 
  },
  currentValue: { 
    type: Number, 
    required: true 
  },
  investedValue: { 
    type: Number, 
    required: true 
  },
  profitLoss: { 
    type: Number, 
    required: true 
  },
}, { _id: false });

const portfolioHistorySchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true, 
    index: true 
  },
  totalValue: { 
    type: Number, 
    required: true 
  },
  profitLoss: { 
    type: Number, 
    required: true 
  },
  breakdown: [breakdownItemSchema],
  timestamp: { 
    type: Date, 
    default: Date.now, 
    index: true 
  },
}, { timestamps: true });

export const PortfolioHistory = mongoose.model("PortfolioHistory", portfolioHistorySchema);
