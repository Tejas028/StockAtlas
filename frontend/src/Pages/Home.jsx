import React from 'react'
import Navbar from '../Components/Navbar'
import { Typewriter } from 'react-simple-typewriter'
import { useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'
import MarketNews from '../Components/MarketNews'

const Home = () => {

  const navigate=useNavigate();

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Image */}
        <img
          className="w-full h-full object-cover"
          src="/home.jpg"
          alt="Earth from space showing global stock markets"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/30 via-black/40 to-black/60"></div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <Typewriter
                words={["Your Atlas to the World's Stock Markets."]}
                loop={1}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={30}
                delaySpeed={2000}
              />
            </h1>

            {/* Optional subtitle that appears after typewriter */}
            <div className="mt-6 opacity-0 animate-fade-in-delayed">
              <p className="text-gray-200 text-lg sm:text-xl md:text-2xl font-light max-w-3xl mx-auto">
                Navigate global markets with confidence. Real-time data, comprehensive analysis, worldwide coverage.
              </p>

              {/* Call to action buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Explore Markets
                </button>
                <button onClick={()=>navigate('/about')} className="border-2 border-white/30 hover:border-white/60 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:bg-white/10 backdrop-blur-sm">
                  About Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add some content below the hero for scroll testing */}
      <MarketNews/>

      <Footer/>

      <style>{`
        @keyframes fade-in-delayed {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-delayed {
          animation: fade-in-delayed 1s ease-out 3s forwards;
        }
      `}</style>
    </div>
  )
}

export default Home