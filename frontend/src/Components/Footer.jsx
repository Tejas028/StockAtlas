import React from 'react'

const Footer = () => {
  return (
    <div className='bg-gray-950 text-white pb-20'>
      <hr className="border-gray-700 border-t py-8" />

      <div className='flex flex-col md:flex-row justify-between px-20 gap-5'>
        {/* StockAtlas (Brand + Tagline) */}
        <div className='flex flex-col gap-3 justify-center'>
          <h1 className='text-4xl text-blue-800 font-bold mb-3'>StockAtlas</h1>
          <div className='text-base font-normal'>
            <p>Your Atlas to the World's</p>
            <p>Stock Markets</p>
          </div>
        </div>
        {/* About Us */}
        <div className='flex flex-col gap-3'>
          <h1 className='text-lg font-medium'>About Us</h1>
          <div>
            
          </div>
        </div>
        {/* Meet the Developers */}
        <div className='flex flex-col gap-3'>
          <h1 className='text-lg font-medium'>Meet the Developers</h1>
          <div className='text-base font-extralight flex flex-col gap-1'>
            <a className='hover:text-blue-500 transition-colors duration-200' href="https://www.linkedin.com/in/tejas-geria/" target='_blank' rel='noopener noreferrer'>Tejas Geria - Frontend Developer</a>
            <a className='hover:text-blue-500 transition-colors duration-200' href="https://www.linkedin.com/in/monish-patel-a594462b8/" target='_blank' rel='noopener noreferrer'>Monish Patel - Backend Developer</a>
          </div>
        </div>
        {/* Contact */}
        <div className='flex flex-col gap-3'>
          <h1 className='text-lg font-medium'>Contact Us</h1>
          <div className='text-base font-extralight flex flex-col gap-1'>
            <p className='cursor-pointer hover:text-blue-500 transition-colors duration-200'>support@stockatlas.app</p>
            <p className='cursor-pointer hover:text-blue-500 transition-colors duration-200'>Feedback</p>
          </div>
        </div>
        {/* Privacy Policy */}
        <div className='flex flex-col gap-3 justify-center'>
          <h1 className='text-lg font-medium'>Policies & Security</h1>
          <div className='text-base font-extralight flex flex-col gap-1'>
            <p className='cursor-pointer hover:text-blue-500 hover:font-normal transition-colors duration-200'>Terms of Use</p>
            <p className='cursor-pointer hover:text-blue-500 hover:font-normal transition-colors duration-200'>Disclaimer</p>
            <p className='cursor-pointer hover:text-blue-500 hover:font-normal transition-colors duration-200'>Privacy Policy</p>
          </div>
        </div>

      </div>
      
      {/* Copyright */}
      <div className='mt-12 pt-8 border-t border-gray-700 text-center'>
        <p className='text-sm text-gray-400'>
          © 2025 StockAtlas. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer