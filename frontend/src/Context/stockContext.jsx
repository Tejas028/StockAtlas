import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import toast from 'react-hot-toast'
import validator from 'validator'
import { AuthContext } from "./authContext";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL
axios.defaults.baseURL = backendUrl
axios.defaults.withCredentials = true;

export const StockContext = createContext();

export const StockProvider = ({ children }) => {

    const { state } = useContext(AuthContext);
    const navigate = useNavigate();

    const searchStock = async (query) => {
        try {
            if (state === 'Sign Up') {
                toast("Please login to continue!");
                navigate('/login');
                return;
            }
            const response = await axios.get('/api/v1/stocks/search', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                params: { q: query }
            })

            if (response.data.success) {
                console.log(response.data);
                return response.data.data.result;
            } else {
                toast.error(response.data.message || 'No stocks found!');
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast.error(message);
        }
    }

    const getStockQuote = async (symbol) => {
        try {
            const response = await axios.get(`/api/v1/stocks/quote/${symbol}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })

            if (response.data.success) {
                return response.data;
            } else {
                toast.error(response.data.message || 'No stocks found!');
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast.error(message);
        }
    }

    const getCompanyProfile = async (symbol) => {
        try {
            const response = await axios.get(`/api/v1/stocks/profile/${symbol}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                }
            })

            if (response.data.success) {
                return response.data;
            } else {
                toast.error(response.data.message || 'Company not found!');
            }

        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast.error(message);
        }
    }

    const getCompanyNews = async (symbol) => {
        try {
            const today = new Date();
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(today.getDate() - 200);

            const formatDate = (date) => date.toISOString().split('T')[0];

            const from = formatDate(sevenDaysAgo);
            const to = formatDate(today);

            const response = await axios.get(`/api/v1/stocks/company-news/${symbol}`, {
                params: {
                    from, to
                },
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('accessToken')}`
                }
            });

            if(response.data.success){
                // console.log(response.data.data.slice(0,10));
                
                return response.data.data;
            }else{
                toast.error(response.data.message || 'Company News not found!');
            }

        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast.error(message);
        }
    }

    const getMarketNews=async(category)=>{
        try {
            const response=await axios.get('/api/v1/stocks/market-news',{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('accessToken')}`,
                },
                params:{
                    category
                }
            })
            if(response.data.success){
                
                return response.data.data;
            }else{
                toast.error(response.data.message || 'News not found!');
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast.error(message);
        }
    }

    const value = {
        searchStock,
        getStockQuote,
        getCompanyProfile,
        getCompanyNews,
        getMarketNews
    }

    return (
        <StockContext.Provider value={value}>
            {children}
        </StockContext.Provider>
    )
}