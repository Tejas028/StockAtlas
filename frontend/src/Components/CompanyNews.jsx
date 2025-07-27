import React, { useState, useEffect, useRef } from 'react';
import { Clock, ExternalLink, Calendar, Tag, ArrowLeft, Filter, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { useContext } from 'react';
import { StockContext } from '../Context/stockContext';

const CompanyNews = ({ symbol, onBack }) => {
    // Mock data - replace with your actual API call
    const [newsData, setNewsData] = useState([]);

    const { getCompanyNews } = useContext(StockContext);

    useEffect(() => {
        const fetchCompanyNews = async (symbol) => {
            const news = await getCompanyNews(symbol);
            setNewsData(news);
        }

        fetchCompanyNews(symbol);
    }, [symbol])

    const [filteredNews, setFilteredNews] = useState(newsData);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [visibleSlides, setVisibleSlides] = useState(1);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const sliderRef = useRef(null);
    const autoPlayRef = useRef(null);

    // Get number of visible slides based on screen size
    const getVisibleSlides = () => {
        if (typeof window === 'undefined') return 1;
        const width = window.innerWidth;
        if (width >= 1280) return 3; // xl screens
        if (width >= 768) return 2;  // md screens
        return 1; // small screens
    };

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            const newVisibleSlides = getVisibleSlides();
            setVisibleSlides(newVisibleSlides);
            // Reset slide if current position would be invalid
            setCurrentSlide(prev => {
                const maxSlide = Math.max(0, filteredNews.length - newVisibleSlides);
                return Math.min(prev, maxSlide);
            });
        };

        // Set initial value
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [filteredNews.length]);

    // Filter news
    useEffect(() => {
        if (selectedCategory === 'all') {
            setFilteredNews(newsData);
        } else {
            setFilteredNews(newsData.filter(news => news.category === selectedCategory));
        }
        setCurrentSlide(0);
    }, [selectedCategory, newsData]);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlay || filteredNews.length <= visibleSlides) return;

        const startAutoPlay = () => {
            autoPlayRef.current = setInterval(() => {
                setCurrentSlide(prev => {
                    const maxSlide = Math.max(0, filteredNews.length - visibleSlides);
                    return prev >= maxSlide ? 0 : prev + 1;
                });
            }, 4000);
        };

        startAutoPlay();

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [filteredNews.length, visibleSlides, isAutoPlay]);

    const formatDate = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getTimeAgo = (timestamp) => {
        const now = Date.now();
        const newsTime = timestamp * 1000;
        const diffInHours = Math.floor((now - newsTime) / (1000 * 60 * 60));

        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays}d ago`;
        return formatDate(timestamp);
    };

    const categories = ['all', 'company', 'market', 'earnings'];
    const maxSlide = Math.max(0, filteredNews.length - visibleSlides);

    const nextSlide = () => {
        setCurrentSlide(prev => Math.min(prev + 1, maxSlide));
        setIsAutoPlay(false);
    };

    const prevSlide = () => {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
        setIsAutoPlay(false);
    };

    const goToSlide = (index) => {
        setCurrentSlide(Math.min(index, maxSlide));
        setIsAutoPlay(false);
    };

    // Calculate transform percentage
    const getTransformValue = () => {
        if (filteredNews.length === 0) return 0;
        return -(currentSlide * (100 / visibleSlides));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-800 text-white">
            {/* Header */}
            <div className="pt-8 pb-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div>
                                <h1 className="text-4xl sm:text-5xl font-bold mb-2">Company News</h1>
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                        {symbol}
                                    </span>
                                    <span className="text-gray-400 text-sm">
                                        Latest updates and insights
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-500/20 rounded-lg">
                                <TrendingUp size={20} className="text-green-400" />
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            {/* News Slider */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                {filteredNews.length > 0 ? (
                    <div className="relative">
                        {/* Slider Container */}
                        <div className="overflow-hidden rounded-2xl">
                            <div
                                ref={sliderRef}
                                className="flex transition-transform duration-500 ease-out"
                                style={{
                                    transform: `translateX(${getTransformValue()}%)`,
                                    width: `${(filteredNews.length) * (100 / visibleSlides)}%`
                                }}
                            >
                                {filteredNews.filter(news => news.image !== 'https://s.yimg.com/rz/stage/p/yahoo_finance_en-US_h_p_finance_2.png' && news.image !== "").map((news) => (
                                    <div
                                        key={news.id}
                                        className="flex-shrink-0 px-3"
                                        style={{ width: `${100 / visibleSlides}%` }}
                                    >
                                        <article className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-gray-600/50 transition-all duration-300 group h-full">
                                            {/* Image */}
                                            {news.image && (
                                                <div className="relative h-48 overflow-hidden">
                                                    <img
                                                        src={news.image}
                                                        alt=""
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                        }}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                    <div className="absolute top-4 left-4">
                                                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 backdrop-blur-sm">
                                                            <Tag size={12} className="inline mr-1" />
                                                            {news.category}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Content */}
                                            <div className="p-6">
                                                {/* Header Info */}
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="text-xs font-medium text-gray-400 bg-gray-700/30 px-2 py-1 rounded">
                                                        {news.source}
                                                    </span>
                                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                                        <Clock size={12} />
                                                        <span>{getTimeAgo(news.datetime)}</span>
                                                    </div>
                                                </div>

                                                {/* Headline */}
                                                <h2 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-blue-300 transition-colors">
                                                    {news.headline}
                                                </h2>

                                                {/* Summary */}
                                                {news.summary && (
                                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                                        {news.summary}
                                                    </p>
                                                )}

                                                {/* Footer */}
                                                <div className="flex items-center justify-between pt-4 border-t border-gray-700/30">
                                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                                        <Calendar size={12} />
                                                        <span>{formatDate(news.datetime)} • {formatTime(news.datetime)}</span>
                                                    </div>
                                                    <a
                                                        href={news.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors"
                                                    >
                                                        Read More
                                                        <ExternalLink size={12} />
                                                    </a>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        {filteredNews.length > visibleSlides && (
                            <>
                                <button
                                    onClick={prevSlide}
                                    disabled={currentSlide === 0}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-gray-800/90 hover:bg-gray-700/90 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-600/50 hover:border-gray-500/50 rounded-full p-3 transition-all duration-200 backdrop-blur-sm"
                                >
                                    <ChevronLeft size={20} className="text-white" />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    disabled={currentSlide >= maxSlide}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-gray-800/90 hover:bg-gray-700/90 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-600/50 hover:border-gray-500/50 rounded-full p-3 transition-all duration-200 backdrop-blur-sm"
                                >
                                    <ChevronRight size={20} className="text-white" />
                                </button>
                            </>
                        )}

                        {/* Dots Indicator */}
                        {filteredNews.length > visibleSlides && maxSlide > 0 && (
                            <div className="flex justify-center mt-8 gap-2">
                                {Array.from({ length: maxSlide + 1 }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-200 ${currentSlide === index
                                            ? 'bg-blue-400 scale-110'
                                            : 'bg-gray-600 hover:bg-gray-500'
                                            }`}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Slide Counter */}
                        {/* {filteredNews.length > visibleSlides && maxSlide > 0 && (
                            <div className="text-center mt-4">
                                <span className="text-gray-400 text-sm">
                                    Showing {Math.min(currentSlide + visibleSlides, filteredNews.length)} of {filteredNews.length} articles
                                </span>
                            </div>
                        )} */}

                        {/* Auto-play indicator */}
                        {/* {filteredNews.length > visibleSlides && (
                            <div className="text-center mt-2">
                                <button
                                    onClick={() => setIsAutoPlay(!isAutoPlay)}
                                    className="text-xs text-gray-500 hover:text-gray-400 transition-colors"
                                >
                                    Auto-play: {isAutoPlay ? 'ON' : 'OFF'}
                                </button>
                            </div>
                        )} */}
                    </div>
                ) : (
                    /* No results message */
                    <div className="text-center py-12">
                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 max-w-md mx-auto">
                            <div className="p-3 bg-gray-700/30 rounded-full w-fit mx-auto mb-4">
                                <TrendingUp size={24} className="text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">No News Found</h3>
                            <p className="text-gray-400">
                                No news articles match your current filter. Try selecting a different category.
                            </p>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="mt-12 pt-6 border-t border-gray-700/30 text-center text-gray-400 text-sm">
                    <p>News data provided by financial news aggregators • Updated in real-time</p>
                </div>
            </div>
        </div>
    );
};

export default CompanyNews;