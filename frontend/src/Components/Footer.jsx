import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {

  const navigate=useNavigate();

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
          <h1 className='text-lg font-medium cursor-pointer' onClick={()=>{navigate('/about'); scrollTo(0,0)}}>About Us</h1>
          <div className='text-base font-extralight flex flex-col gap-1'>
            <p>Our Mission</p>
            <p>Our Visison</p>
            <p>Core Values</p>
          </div>
        </div>
        {/* Meet the Developers */}
        <div className='flex flex-col gap-3'>
          <h1 onClick={()=>{navigate('/meet-the-developers',{state:{initTab:'all'}}); scrollTo(0,0)}} className='text-lg font-medium cursor-pointer'>Meet the Developers</h1>
          <div className='text-base font-extralight flex flex-col gap-1 cursor-pointer'>
            <p onClick={()=>{navigate('/meet-the-developers',{state:{initTab:'frontend'}}); scrollTo(0,0)}} className='hover:text-blue-500 transition-colors duration-200 cursor-pointer'>Tejas Geria - Frontend Developer</p>
            <p onClick={()=>{navigate('/meet-the-developers',{state:{initTab:'backend'}}); scrollTo(0,0)}} className='hover:text-blue-500 transition-colors duration-200'>Monish Patel - Backend Developer</p>
          </div>
        </div>
        {/* Contact */}
        <div className='flex flex-col gap-3'>
          <h1 className='text-lg font-medium'>Contact Us</h1>
          <div className='text-base font-extralight flex flex-col gap-1'>
            <p className='cursor-pointer hover:text-blue-500 transition-colors duration-200' >support@stockatlas.app</p>
            <p className='cursor-pointer hover:text-blue-500 transition-colors duration-200'>Feedback</p>
          </div>
        </div>
        {/* Privacy Policy */}
        <div className='flex flex-col gap-3 justify-center'>
          <h1 className='text-lg font-medium cursor-pointer' onClick={()=>{navigate('/policies', {state:{initTab: 'terms'}}); scrollTo(0,0)}}>Policies & Security</h1>
          <div className='text-base font-extralight flex flex-col gap-1'>
            <p onClick={()=>{navigate('/policies', {state:{initTab: 'terms'}}); scrollTo(0,0)}} className='cursor-pointer hover:text-blue-500 hover:font-normal transition-colors duration-200'>Terms of Use</p>
            <p onClick={()=>{navigate('/policies', {state:{initTab: 'disclaimer'}}); scrollTo(0,0)}} className='cursor-pointer hover:text-blue-500 hover:font-normal transition-colors duration-200'>Disclaimer</p>
            <p onClick={()=>{navigate('/policies', {state:{initTab: 'privacy'}}); scrollTo(0,0)}} className='cursor-pointer hover:text-blue-500 hover:font-normal transition-colors duration-200'>Privacy Policy</p>
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