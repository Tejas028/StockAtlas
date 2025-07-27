import React, { useContext, useEffect, useState } from 'react';
import { ExternalLink, Building2, Globe, Phone, Calendar, DollarSign, TrendingUp, Hash, ArrowLeft } from 'lucide-react';
import { StockContext } from '../Context/stockContext';
import { useNavigate, useParams } from 'react-router-dom';
import CompanyNews from './CompanyNews';

const CompanyProfile = () => {
    const { getCompanyProfile } = useContext(StockContext);
    const {symbol}=useParams();
    const navigate = useNavigate();

    const [stockData, setStockData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompanyProfile = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getCompanyProfile(symbol);
                setStockData(data?.data);
            } catch (err) {
                console.error('Error fetching stock quote:', err);
                setError('Failed to load stock data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        if (symbol) {
            fetchCompanyProfile();
        }
    }, [symbol, setStockData]);

    const formatCurrency = (value, currency = 'USD') => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const formatNumber = (value) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatPhone = (phone) => {
        const cleaned = phone.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
        }
        return phone;
    };

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

    if (error || !stockData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
                <div className="text-center">
                    <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-6 mb-6">
                        <p className="text-red-300 text-lg mb-4">{error || 'Failed to load stock data.'}</p>
                        <button
                            onClick={() => navigate(-1)}
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
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 text-white">
            <h1 className=' text-center font-bold text-5xl pt-10'>About the Company</h1>

            {/* Header */}
            <div className="pt-20 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <button
                                onClick={(() => {navigate(-1)})}
                                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
                              >
                                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                                <span>Back to Stock</span>
                              </button>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <img
                                src={stockData.logo}
                                alt={`${stockData.name} logo`}
                                className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-gray-700/50 rounded-xl p-2"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                            <div>
                                <h1 className="text-4xl sm:text-5xl font-bold mb-2">{stockData.name}</h1>
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                        {stockData.ticker}
                                    </span>
                                    <span className="text-gray-400 text-sm">
                                        {stockData.exchange}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                {/* Key Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* Market Cap */}
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-green-500/20 rounded-lg">
                                <TrendingUp size={20} className="text-green-400" />
                            </div>
                            <h3 className="text-lg font-semibold">Market Cap</h3>
                        </div>
                        <p className="text-2xl font-bold text-green-400">
                            {formatCurrency(stockData.marketCapitalization * 1000000)}
                        </p>
                        <p className="text-gray-400 text-sm mt-1">Total market value</p>
                    </div>

                    {/* Shares Outstanding */}
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-500/20 rounded-lg">
                                <Hash size={20} className="text-blue-400" />
                            </div>
                            <h3 className="text-lg font-semibold">Shares Outstanding</h3>
                        </div>
                        <p className="text-2xl font-bold text-blue-400">
                            {formatNumber(stockData.shareOutstanding)}M
                        </p>
                        <p className="text-gray-400 text-sm mt-1">Total shares issued</p>
                    </div>

                    {/* Industry */}
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-purple-500/20 rounded-lg">
                                <Building2 size={20} className="text-purple-400" />
                            </div>
                            <h3 className="text-lg font-semibold">Industry</h3>
                        </div>
                        <p className="text-xl font-bold text-purple-400">
                            {stockData.finnhubIndustry}
                        </p>
                        <p className="text-gray-400 text-sm mt-1">Business sector</p>
                    </div>
                </div>

                {/* Detailed Information Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Company Information */}
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-orange-500/20 rounded-lg">
                                <Building2 size={20} className="text-orange-400" />
                            </div>
                            <h2 className="text-xl font-bold">Company Information</h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-3 border-b border-gray-700/30">
                                <div className="flex items-center gap-3">
                                    <Globe size={16} className="text-gray-400" />
                                    <span className="text-gray-400">Country</span>
                                </div>
                                <span className="font-semibold">{stockData.country}</span>
                            </div>

                            <div className="flex justify-between items-center py-3 border-b border-gray-700/30">
                                <div className="flex items-center gap-3">
                                    <Calendar size={16} className="text-gray-400" />
                                    <span className="text-gray-400">IPO Date</span>
                                </div>
                                <span className="font-semibold">{formatDate(stockData.ipo)}</span>
                            </div>

                            <div className="flex justify-between items-center py-3 border-b border-gray-700/30">
                                <div className="flex items-center gap-3">
                                    <Phone size={16} className="text-gray-400" />
                                    <span className="text-gray-400">Phone</span>
                                </div>
                                <span className="font-semibold">{formatPhone(stockData.phone)}</span>
                            </div>

                            <div className="flex justify-between items-center py-3">
                                <div className="flex items-center gap-3">
                                    <ExternalLink size={16} className="text-gray-400" />
                                    <span className="text-gray-400">Website</span>
                                </div>
                                <a
                                    href={stockData.weburl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                                >
                                    Visit Website
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Trading Information */}
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-cyan-500/20 rounded-lg">
                                <DollarSign size={20} className="text-cyan-400" />
                            </div>
                            <h2 className="text-xl font-bold">Trading Information</h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-3 border-b border-gray-700/30">
                                <span className="text-gray-400">Symbol</span>
                                <span className="font-semibold font-mono text-lg">{stockData.ticker}</span>
                            </div>

                            <div className="flex justify-between items-center py-3 border-b border-gray-700/30">
                                <span className="text-gray-400">Exchange</span>
                                <span className="font-semibold">{stockData.exchange}</span>
                            </div>

                            <div className="flex justify-between items-center py-3 border-b border-gray-700/30">
                                <span className="text-gray-400">Currency</span>
                                <span className="font-semibold">{stockData.currency}</span>
                            </div>

                            <div className="flex justify-between items-center py-3">
                                <span className="text-gray-400">Estimate Currency</span>
                                <span className="font-semibold">{stockData.estimateCurrency}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Company Overview Summary */}
                <div className="mt-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-4">Company Overview</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">
                                {formatCurrency(stockData.marketCapitalization * 1000000)}
                            </div>
                            <div className="text-gray-400 text-sm">Market Cap</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-400">
                                {formatNumber(stockData.shareOutstanding)}M
                            </div>
                            <div className="text-gray-400 text-sm">Shares Outstanding</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-400">
                                {stockData.finnhubIndustry}
                            </div>
                            <div className="text-gray-400 text-sm">Industry</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-orange-400">
                                {new Date(stockData.ipo).getFullYear()}
                            </div>
                            <div className="text-gray-400 text-sm">IPO Year</div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-gray-700/30 text-center text-gray-400 text-sm">
                    <p>Company information provided by Finnhub</p>
                </div>
            </div>

            <CompanyNews symbol={symbol} onBack={()=>useNavigate(-1)} />
        </div>
    );
};

export default CompanyProfile;