import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useContext } from 'react';
import { StockContext } from '../Context/stockContext';
import { useEffect } from 'react';
import { useState } from 'react';
import { AuthContext } from '../Context/authContext';

const MarketNews = () => {
  var settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: 'ease-in-out',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const [marketNews, setMarketNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getMarketNews } = useContext(StockContext);

  // Helper function to format timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const news = await getMarketNews();
        console.log(news);
        setMarketNews(news);
      } catch (error) {
        console.error('Error fetching market news:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className='bg-gray-950 text-white min-h-screen flex items-center justify-center'>
        <div className="text-xl">Loading market news...</div>
      </div>
    );
  }

  if (!marketNews || marketNews.length === 0) {
    return (
      <div className='bg-gray-950 text-white min-h-screen flex items-center justify-center'>
        <div className="text-xl">No market news available</div>
      </div>
    );
  }

  return (
    <div className='bg-gray-950 text-white min-h-screen py-8 px-4'>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Latest Market News</h1>
          <p className="text-gray-400">Stay updated with the latest financial news and market trends</p>
        </div>
        
        <Slider {...settings}>
          {marketNews.filter(news=>news.image!=="https://static2.finnhub.io/file/publicdatany/finnhubimage/market_watch_logo.png").map((news, index) => (
            <div key={news.id || index} className="px-3">
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl h-full flex flex-col">
                {/* News Image */}
                {news.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={news.image}
                      alt={news.headline}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {news.category || 'News'}
                      </span>
                    </div>
                  </div>
                )}
                
                {/* News Content */}
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-blue-400 font-medium text-sm">{news.source}</span>
                    <span className="text-gray-400 text-xs">
                      {formatDate(news.datetime)}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-3 leading-tight line-clamp-2 flex-1">
                    {news.headline}
                  </h3>
                  
                  {news.summary && (
                    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      {news.summary}
                    </p>
                  )}
                  
                  <div className="mt-auto">
                    <a
                      href={news.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-200 w-full text-center"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default MarketNews