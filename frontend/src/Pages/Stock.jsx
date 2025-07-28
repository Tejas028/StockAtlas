import {React, useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { StockContext } from '../Context/stockContext';
import StockDetails from '../Components/StockDetails';
import { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Stock = () => {
    const navigate=useNavigate();
    const { symbol } = useParams();
    const { getStockQuote, getCompanyNews, getCompanyProfile } = useContext(StockContext);

    return (
        <div>
            {/* <Navbar/> */}
            <StockDetails symbol={symbol} onBack={()=>navigate(-1)}/>
            {/* <Footer/> */}
        </div>
    )
}

export default Stock