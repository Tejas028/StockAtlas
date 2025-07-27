import React, { useContext, useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, ArrowLeft, Calendar, DollarSign, BarChart3, Activity, Building2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StockContext } from '../Context/stockContext';

const StockDetails = ({ symbol, onBack }) => {

  const navigate = useNavigate();
  const { getStockQuote } = useContext(StockContext)
  // Mock stock context for demo - replace with your actual context
  // const getStockQuote = async (symbol) => {
  //   // Mock data - replace with your actual API call
  //   return {
  //     data: {
  //       c: 150.25,
  //       d: 2.15,
  //       dp: 1.45,
  //       h: 152.30,
  //       l: 148.90,
  //       o: 149.50,
  //       pc: 148.10,
  //       t: Math.floor(Date.now() / 1000)
  //     }
  //   };
  // };

  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCompanyProfile, setShowCompanyProfile] = useState(false);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getStockQuote(symbol);
        // const news=await getCompanyNews(symbol);
        // console.log(news);

        setQuote(data?.data);
      } catch (err) {
        console.error('Error fetching stock quote:', err);
        setError('Failed to load stock data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (symbol) {
      fetchQuote();
    }
  }, [symbol]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });
  };

  const isPositive = quote?.d >= 0;
  const isMarketOpen = () => {
    const now = new Date();
    const marketOpen = new Date();
    marketOpen.setHours(9, 30, 0, 0);
    const marketClose = new Date();
    marketClose.setHours(16, 0, 0, 0);
    return now >= marketOpen && now <= marketClose && now.getDay() >= 1 && now.getDay() <= 5;
  };

  // Handle showing company profile - Mock component for demo
  // const CompanyProfile = ({ symbol, onBack }) => (
  //   <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-800 text-white p-8">
  //     <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
  //       <ArrowLeft size={20} />
  //       Back to Stock Details
  //     </button>
  //     <h1 className="text-4xl font-bold mb-4">Company Profile - {symbol}</h1>
  //     <p className="text-gray-300">Company profile content would go here...</p>
  //   </div>
  // );

  // if (showCompanyProfile) {
  //   return <CompanyProfile symbol={symbol} onBack={() => setShowCompanyProfile(false)} />;
  // }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading stock data...</p>
        </div>
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-6 mb-6">
            <p className="text-red-300 text-lg mb-4">{error || 'Failed to load stock data.'}</p>
            <button
              onClick={onBack || (() => { })}
              className="bg-red-600/80 hover:bg-red-600 px-6 py-2 rounded-lg text-white transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white">
      {/* Header */}
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack || (() => { })}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Search</span>
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-2">{symbol?.toUpperCase()}</h1>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${isMarketOpen()
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                  : 'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}>
                  {isMarketOpen() ? 'Market Open' : 'Market Closed'}
                </span>
                <span className="text-gray-400 text-sm">
                  Last updated: {formatTime(quote.t)}
                </span>
              </div>
            </div>

            {/* Company Profile Button */}
            <div className="flex gap-3">
              <button
                onClick={() => { navigate(`/company/${symbol}`); scrollTo(0, 0) }}
                className="bg-blue-600/80 hover:bg-blue-600 border border-blue-500/50 hover:border-blue-400/50 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 group"
              >
                <Building2 size={20} className="group-hover:scale-110 transition-transform" />
                <span>Know About This Company</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Price Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-5xl sm:text-6xl font-bold">
                  {formatCurrency(quote.c)}
                </span>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${isPositive
                  ? 'bg-green-500/20 text-green-300'
                  : 'bg-red-500/20 text-red-300'
                  }`}>
                  {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                  <span className="font-semibold">
                    {formatCurrency(Math.abs(quote.d))} ({formatPercentage(quote.dp)})
                  </span>
                </div>
              </div>
              <p className="text-gray-400">Current Price</p>
            </div>

            <div className="text-right">
              <p className="text-gray-400 text-sm mb-1">Previous Close</p>
              <p className="text-2xl font-semibold">{formatCurrency(quote.pc)}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions Bar */}
        {/* <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-xl p-4 mb-8">
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            <button
              onClick={() => setShowCompanyProfile(true)}
              className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 hover:border-blue-400/50 px-4 py-2 rounded-lg text-blue-300 hover:text-blue-200 transition-all duration-200 flex items-center gap-2 group"
            >
              <Building2 size={16} />
              <span className="text-sm font-medium">Company Profile</span>
            </button>
            <button className="bg-gray-700/20 hover:bg-gray-700/30 border border-gray-600/30 hover:border-gray-500/50 px-4 py-2 rounded-lg text-gray-300 hover:text-gray-200 transition-all duration-200 flex items-center gap-2">
              <BarChart3 size={16} />
              <span className="text-sm font-medium">Technical Analysis</span>
            </button>
            <button className="bg-gray-700/20 hover:bg-gray-700/30 border border-gray-600/30 hover:border-gray-500/50 px-4 py-2 rounded-lg text-gray-300 hover:text-gray-200 transition-all duration-200 flex items-center gap-2">
              <Activity size={16} />
              <span className="text-sm font-medium">Company News</span>
            </button>
          </div>
        </div> */}

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Open Price */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <DollarSign size={20} className="text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold">Open</h3>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(quote.o)}</p>
            <p className="text-gray-400 text-sm mt-1">Today's opening price</p>
          </div>

          {/* Day High */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <TrendingUp size={20} className="text-green-400" />
              </div>
              <h3 className="text-lg font-semibold">Day High</h3>
            </div>
            <p className="text-2xl font-bold text-green-400">{formatCurrency(quote.h)}</p>
            <p className="text-gray-400 text-sm mt-1">Highest price today</p>
          </div>

          {/* Day Low */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <TrendingDown size={20} className="text-red-400" />
              </div>
              <h3 className="text-lg font-semibold">Day Low</h3>
            </div>
            <p className="text-2xl font-bold text-red-400">{formatCurrency(quote.l)}</p>
            <p className="text-gray-400 text-sm mt-1">Lowest price today</p>
          </div>

          {/* Day Range */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <BarChart3 size={20} className="text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold">Day Range</h3>
            </div>
            <p className="text-lg font-bold">
              {formatCurrency(quote.l)} - {formatCurrency(quote.h)}
            </p>
            <p className="text-gray-400 text-sm mt-1">Today's trading range</p>
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Trading Summary */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Activity size={20} className="text-orange-400" />
              </div>
              <h2 className="text-xl font-bold">Trading Summary</h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-700/30">
                <span className="text-gray-400">Current Price</span>
                <span className="font-semibold">{formatCurrency(quote.c)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-700/30">
                <span className="text-gray-400">Change</span>
                <span className={`font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {formatCurrency(quote.d)} ({formatPercentage(quote.dp)})
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-700/30">
                <span className="text-gray-400">Previous Close</span>
                <span className="font-semibold">{formatCurrency(quote.pc)}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-400">Day's Range</span>
                <span className="font-semibold">
                  {formatCurrency(quote.l)} - {formatCurrency(quote.h)}
                </span>
              </div>
            </div>
          </div>

          {/* Market Information */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <Calendar size={20} className="text-cyan-400" />
              </div>
              <h2 className="text-xl font-bold">Market Information</h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-700/30">
                <span className="text-gray-400">Symbol</span>
                <span className="font-semibold font-mono">{symbol?.toUpperCase()}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-700/30">
                <span className="text-gray-400">Last Updated</span>
                <span className="font-semibold">{formatTime(quote.t)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-700/30">
                <span className="text-gray-400">Date</span>
                <span className="font-semibold">{formatDate(quote.t)}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-400">Market Status</span>
                <span className={`font-semibold ${isMarketOpen() ? 'text-green-400' : 'text-red-400'
                  }`}>
                  {isMarketOpen() ? 'Open' : 'Closed'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Indicator */}
        <div className="mt-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Performance Indicator</h2>
          <div className="relative">
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${isPositive ? 'bg-gradient-to-r from-green-500 to-green-400' : 'bg-gradient-to-r from-red-500 to-red-400'
                  }`}
                style={{
                  width: `${Math.min(Math.abs(quote.dp) * 10, 100)}%`
                }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>Day Low: {formatCurrency(quote.l)}</span>
              <span className="font-semibold text-white">Current: {formatCurrency(quote.c)}</span>
              <span>Day High: {formatCurrency(quote.h)}</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Want to learn more about {symbol?.toUpperCase()}?</h3>
              <p className="text-gray-300">Get detailed company information, financials, and business insights.</p>
            </div>
            <button
              onClick={() => {navigate(`/company/${symbol}`); scrollTo(0,0)}}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 group"
            >
              <Building2 size={20} />
              <span>View Company Profile</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* <CompanyProfile symbol={symbol} onBack={() => navigate(-1)}/>
      <CompanyNews symbol={symbol} onBack={() => navigate(-1)}/> */}
    </div>
  );
};

export default StockDetails;