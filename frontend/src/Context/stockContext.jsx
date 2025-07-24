import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import toast from 'react-hot-toast'
import validator from 'validator'

const backendUrl = import.meta.env.VITE_BACKEND_URL
axios.defaults.baseURL = backendUrl
axios.defaults.withCredentials = true;

export const StockContext = createContext();

export const StockProvider = ({ children }) => {

    const searchStock = async (query) => {
        try {
            const response=await axios.get('/api/v1/stocks/search',{
                params:{q:query}
            })
            if(response.data.success){
                console.log(response.data);
                return response.data;
            }else{
                toast.error(response.data.message||'No stocks found!');
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast.error(message);
        }
    }

    const value = {
        searchStock
    }

    return (
        <StockContext.Provider value={value}>
            {children}
        </StockContext.Provider>
    )
}