import { Router } from "express";
import {
  getStockQuote,
  getCompanyProfile,
  getCompanyNews,
  getMarketNews,
  searchSymbols
} from "../controllers/stock.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/quote/:symbol", verifyJWT ,getStockQuote);
router.get("/profile/:symbol", verifyJWT ,getCompanyProfile);

router.get("/company-news/:symbol", verifyJWT ,getCompanyNews); 
router.get("/market-news", getMarketNews); 

router.get("/search", verifyJWT ,searchSymbols);

export default router;