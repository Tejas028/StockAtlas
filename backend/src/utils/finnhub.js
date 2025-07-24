import axios from "axios";
import { ApiError } from "../utils/ApiError.js";
import { cache } from "./finnhubResponseCache.js";

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
const  FINNHUB_BASE_URL = "https://finnhub.io/api/v1";

const fetchFinnhubData = async (endpoint, params = {}) => {

    const cacheKey = `${endpoint}:${JSON.stringify(params)}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        console.log(`✅ Cache HIT for key: ${cacheKey}`);
        return cachedData;
    }
    console.log(`❌ Cache MISS for key: ${cacheKey}`);

    try {
        const response = await axios.get(`${FINNHUB_BASE_URL}${endpoint}`, {
            params: {
                ...params,
                token: FINNHUB_API_KEY,
            }
        });
        cache.set(cacheKey, response.data);
        return response.data;
    } catch (error) {
        throw new ApiError(
            error.response?.status || 500, 
            error.response?.data?.error || error.message || `Failed to fetch data from Finnhub endpoint: ${endpoint}`
        );
    }
}

export { fetchFinnhubData };