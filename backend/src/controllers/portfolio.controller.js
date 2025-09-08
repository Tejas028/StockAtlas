import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { portfolioService } from "../services/portfolio.service.js";

const buyStock = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) throw new ApiError(404, "User not found");

  const { symbol, quantity, price } = req.body;
  if (!symbol || !quantity || !price) throw new ApiError(400, "Stock, Quantity and Price are required");

  const result = await portfolioService.buyStock(userId, symbol, quantity, price);
  return res.status(201).json(new ApiResponse(201, result, "Stock Purchased Successfully"));
});

const sellStock = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) throw new ApiError(404, "User not found");

  const { symbol, quantity, price } = req.body;
  if (!symbol || !quantity || !price) throw new ApiError(400, "Stock, Quantity and Price are required");

  const result = await portfolioService.sellStock(userId, symbol, quantity, price);
  return res.status(200).json(new ApiResponse(200, result, "Stock Sold Successfully"));
});

const getPortfolioSummary = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) throw new ApiError(404, "User not found");

  const summary = await portfolioService.getPortfolioSummary(userId);
  return res.status(200).json(new ApiResponse(200, summary, "Portfolio Summary Fetched"));
});

const getPortfolioHistory = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) throw new ApiError(404, "User not found");

  // optional: support limit via query param
  const limit = req.query.limit ? Number(req.query.limit) : 500;
  const history = await portfolioService.getPortfolioHistory(userId, { limit });
  return res.status(200).json(new ApiResponse(200, history, "Portfolio History Fetched"));
});

const getStockDetailsInPortfolio = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) throw new ApiError(404, "User not found");

  const { symbol } = req.params;
  if (!symbol) throw new ApiError(400, "Stock Symbol Required");

  const details = await portfolioService.getStockDetails(userId, symbol);
  return res.status(200).json(new ApiResponse(200, details, "Stock Details Fetched"));
});

export {
  buyStock,
  sellStock,
  getPortfolioSummary,
  getPortfolioHistory,
  getStockDetailsInPortfolio
};
