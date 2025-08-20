import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { buyStock, getPortfolioHistory, getPortfolioSummary, getStockDetailsInPortfolio, sellStock } from "../controllers/portfolio.controller.js";

const router = Router()

router.post("/buy", verifyJWT, buyStock)
router.post("/sell", verifyJWT, sellStock)

router.get("/summary", verifyJWT, getPortfolioSummary)
router.get("/history", verifyJWT, getPortfolioHistory)
router.get("/stock/:symbol", verifyJWT, getStockDetailsInPortfolio)

export default router