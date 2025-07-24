import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { fetchFinnhubData } from "../utils/finnhub.js"; 
import { ApiError } from "../utils/ApiError.js";


const getStockQuote = asyncHandler(async (req, res) => {
  const { symbol } = req.params;
  const data = await fetchFinnhubData("/quote", { symbol });

  if(!data || (Array.isArray(data) && data.length === 0)){
    throw new ApiError(404, "Cannot Fetch the Stock Data");
  }

  return res
  .status(200)
  .json(new ApiResponse(200, data, "Stock Quote fetched Successfully"));

});

const getCompanyProfile = asyncHandler(async (req, res) => {
  const { symbol } = req.params;

  const data = await fetchFinnhubData("/stock/profile2", { symbol });

  if(!data || (Array.isArray(data) && data.length === 0)){
    throw new ApiError(404, "Error Fetching Company Profile");
  }

  return res
  .status(200)
  .json(new ApiResponse(200, data, "Profile fetched"));

});

const getCompanyNews = asyncHandler(async (req, res) => {
  const { symbol } = req.params;
  const { from, to } = req.query;

  if (!symbol) {
    throw new ApiError(400, "Stock symbol is required");
  }

  if (!from || !to) {
    throw new ApiError(400, "Both 'from' and 'to' dates are required");
  }

  const data = await fetchFinnhubData("/company-news", { 
    symbol, 
    from, 
    to 
  });

  if (!data || (Array.isArray(data) && data.length === 0)) {
    throw new ApiError(404, `No news found for ${symbol} between ${from} and ${to}`);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, data, "Company news fetched successfully"));
});

const getMarketNews = asyncHandler(async (req, res) => {
  const { category } = req.query;

  const data = await fetchFinnhubData("/news", { category: category || "general" });

  if(!data || (Array.isArray(data) && data.length === 0)){
    throw new ApiError(404, "Error Fetching Market News");
  }

  return res
  .status(200)
  .json(new ApiResponse(200, data, "Market news fetched"));

});

const searchSymbols = asyncHandler(async (req, res) => {
  const { q: query } = req.query;
  if(!query){
    throw new ApiError(400, "Search Query is Required");
  }

  const params = {q : query};

  const data = await fetchFinnhubData("/search", params);
  if(!data || (Array.isArray(data) && data.length === 0)){
    throw new ApiError(404, `No symbols found matching ${query}`);
  }

  return res
  .status(200)
  .json(new ApiResponse(200, data, "Symbol Search Results Fetched"));
})

export {
  getStockQuote,
  getCompanyProfile,
  getCompanyNews,
  getMarketNews,
  searchSymbols
};