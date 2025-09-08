import cron from "node-cron";
import mongoose from "mongoose";
import { Portfolio } from "../models/portfolio.model.js";
import { Stock } from "../models/stock.model.js";
import { PortfolioHistory } from "../models/portfolioHistory.model.js";
import { fetchFinnhubData } from "./finnhub.js";
import { ApiError } from "../utils/ApiError.js";

const fetchQuotesForSymbols = async (symbols = []) => {
  const unique = Array.from(new Set(symbols.map(s => String(s).toUpperCase())));
  const map = new Map();

  await Promise.all(unique.map(async (sym) => {
    try {
      const data = await fetchFinnhubData("/quote", { symbol: sym });
      // store whole quote object (data.c is current price)
      map.set(sym, data);
    } catch (err) {
      // if Finnhub fails for a symbol, set a zero-price fallback to avoid crashing
      console.error(`Finnhub error for ${sym}:`, err.message || err);
      map.set(sym, { c: 0 });
    }
  }));

  return map;
};


const buyStock = async (userId, symbolRaw, quantityRaw, priceRaw) => {
  const symbol = String(symbolRaw).toUpperCase();
  const quantity = Number(quantityRaw);
  const price = Number(priceRaw);

  if (!symbol || !quantity || quantity <= 0 || !price || price <= 0) {
    throw new ApiError(400, "Invalid buy request");
  }

  let stock = await Stock.findOne({ symbol });
  if (!stock) {
    // Fetch metadata (best-effort) then create
    try {
      const profile = await fetchFinnhubData("/stock/profile2", { symbol });
      stock = await Stock.create({
        symbol,
        name: profile?.name || symbol,
        exchange: profile?.exchange || "",
        currency: profile?.currency || "USD",
      });
    } catch (err) {
      // create minimal stock doc if metadata fails
      stock = await Stock.create({ symbol, name: symbol });
    }
  }

  // Ensure portfolio doc exists (one per user)
  let portfolio = await Portfolio.findOne({ user: userId });
  if (!portfolio) {
    portfolio = await Portfolio.create({ user: userId, holdings: [] });
  }

  const holdingIndex = portfolio.holdings.findIndex(h => h.stock.toString() === stock._id.toString());
  if (holdingIndex >= 0) {
    // update existing holding: weighted average
    const holding = portfolio.holdings[holdingIndex];
    const prevShares = Number(holding.shares);
    const prevAvg = Number(holding.avgBuyPrice);
    const newShares = prevShares + quantity;
    const newAvg = ((prevAvg * prevShares) + (price * quantity)) / newShares;

    holding.shares = newShares;
    holding.avgBuyPrice = Number(newAvg.toFixed(8));
    holding.transactions.push({ type: "BUY", shares: quantity, price });
  } else {
    portfolio.holdings.push({
      stock: stock._id,
      shares: quantity,
      avgBuyPrice: price,
      transactions: [{ type: "BUY", shares: quantity, price }],
    });
  }

  await portfolio.save();
  return portfolio;
};

const sellStock = async (userId, symbolRaw, quantityRaw, priceRaw) => {
  const symbol = String(symbolRaw).toUpperCase();
  const quantity = Number(quantityRaw);
  const price = Number(priceRaw);

  if (!symbol || !quantity || quantity <= 0 || !price || price <= 0) {
    throw new ApiError(400, "Invalid sell request");
  }

  const stock = await Stock.findOne({ symbol });
  if (!stock) throw new ApiError(404, "Stock not found");

  const portfolio = await Portfolio.findOne({ user: userId });
  if (!portfolio) throw new ApiError(404, "Portfolio not found");

  const holdingIndex = portfolio.holdings.findIndex(h => h.stock.toString() === stock._id.toString());
  if (holdingIndex < 0) throw new ApiError(400, "You do not own this stock");

  const holding = portfolio.holdings[holdingIndex];
  if (holding.shares < quantity) throw new ApiError(400, "Not enough shares to sell");

  holding.shares = holding.shares - quantity;
  holding.transactions.push({ type: "SELL", shares: quantity, price });

  if (holding.shares <= 0) {
    portfolio.holdings.splice(holdingIndex, 1);
  }

  await portfolio.save();
  return portfolio;
};

const getPortfolioSummary = async (userId) => {
  
  const rows = await Portfolio.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
    { $unwind: { path: "$holdings", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "stocks",
        localField: "holdings.stock",
        foreignField: "_id",
        as: "stockDetails"
      }
    },
    { $unwind: { path: "$stockDetails", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        symbol: { $toUpper: "$stockDetails.symbol" },
        shares: "$holdings.shares",
        avgBuyPrice: "$holdings.avgBuyPrice"
      }
    }
  ]);

  if (!rows || rows.length === 0) {
    return { totalValue: 0, investedValue: 0, profitLoss: 0, breakdown: [] };
  }

  const symbols = rows.map(r => r.symbol);
  const quotesMap = await fetchQuotesForSymbols(symbols);

  const breakdown = rows.map(r => {
    const q = quotesMap.get(r.symbol) || { c: 0 };
    const currentPrice = Number(q.c || 0);
    const investedValue = Number((r.shares * r.avgBuyPrice) || 0);
    const currentValue = Number((r.shares * currentPrice) || 0);
    const profitLoss = Number((currentValue - investedValue) || 0);
    return {
      symbol: r.symbol,
      shares: r.shares,
      avgBuyPrice: r.avgBuyPrice,
      currentPrice,
      currentValue,
      investedValue,
      profitLoss
    };
  });

  const totalValue = breakdown.reduce((s, b) => s + b.currentValue, 0);
  const investedValue = breakdown.reduce((s, b) => s + b.investedValue, 0);
  const profitLoss = totalValue - investedValue;

  return {
    totalValue,
    investedValue,
    profitLoss,
    breakdown
  };
};

const getPortfolioHistory = async (userId, { limit = 500 } = {}) => {
  
  const snaps = await PortfolioHistory.find({ user: userId })
    .sort({ timestamp: 1 })
    .limit(limit)
    .lean();
  return snaps;
};

const getStockDetails = async (userId, symbolRaw) => {
  const symbol = String(symbolRaw).toUpperCase();
  const stock = await Stock.findOne({ symbol });
  if (!stock) throw new ApiError(404, "Stock not found");

  const portfolio = await Portfolio.findOne({ user: userId, "holdings.stock": stock._id })
    .populate("holdings.stock");

  if (!portfolio) throw new ApiError(404, "Stock not found in portfolio");

  const holding = portfolio.holdings.find(h => h.stock.symbol === symbol);
  if (!holding) throw new ApiError(404, "Holding not found");

  const quote = await fetchFinnhubData("/quote", { symbol });

  const currentPrice = Number(quote.c || 0);
  const currentValue = Number(holding.shares * currentPrice);
  const investedValue = Number(holding.shares * holding.avgBuyPrice);
  const profitLoss = Number(currentValue - investedValue);

  return {
    symbol,
    name: holding.stock.name || symbol,
    shares: holding.shares,
    avgBuyPrice: holding.avgBuyPrice,
    currentPrice,
    currentValue,
    investedValue,
    profitLoss,
    transactions: holding.transactions || []
  };
};

cron.schedule("*/5 * * * *", async () => {
  try {
    console.log("📈 Portfolio snapshot cron: start");

    // load all portfolios with populated holdings.stock
    const portfolios = await Portfolio.find({}).populate("holdings.stock").lean();

    // collect all unique symbols once
    const allSymbols = [];
    for (const p of portfolios) {
      for (const h of (p.holdings || [])) {
        if (h.stock && h.stock.symbol) allSymbols.push(String(h.stock.symbol).toUpperCase());
      }
    }

    const quotesMap = await fetchQuotesForSymbols(allSymbols);

    // build and insert snapshots in a batch
    const bulkInserts = [];
    const now = new Date();

    for (const p of portfolios) {
      let totalValue = 0;
      let investedValue = 0;
      const breakdown = [];

      for (const h of (p.holdings || [])) {
        const sym = String(h.stock.symbol).toUpperCase();
        const q = quotesMap.get(sym) || { c: 0 };
        const currentPrice = Number(q.c || 0);
        const currentValue = Number((h.shares || 0) * currentPrice);
        const invested = Number((h.shares || 0) * (h.avgBuyPrice || 0));

        totalValue += currentValue;
        investedValue += invested;

        breakdown.push({
          symbol: sym,
          shares: h.shares || 0,
          avgBuyPrice: h.avgBuyPrice || 0,
          currentPrice,
          currentValue,
          investedValue: invested,
          profitLoss: Number((currentValue - invested).toFixed(8))
        });
      }

      bulkInserts.push({
        insertOne: {
          document: {
            user: p.user,
            totalValue: Number(totalValue.toFixed(8)),
            profitLoss: Number((totalValue - investedValue).toFixed(8)),
            breakdown,
            timestamp: now
          }
        }
      });
    }

    if (bulkInserts.length) {
      // use bulkWrite for efficiency
      await PortfolioHistory.bulkWrite(bulkInserts, { ordered: false });
    }

    console.log("📈 Portfolio snapshot cron: done");
  } catch (err) {
    console.error("Portfolio cron error:", err?.message || err);
  }
});

export const portfolioService = {
  buyStock,
  sellStock,
  getPortfolioSummary,
  getPortfolioHistory,
  getStockDetails
};
