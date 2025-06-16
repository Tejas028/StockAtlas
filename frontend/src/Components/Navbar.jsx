import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Globe, ChevronDown, User } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const [showRegions, setShowRegions] = useState(false)

    return (
        <div className=' w-full'>
            <div onClick={() => navigate('/')} className=' bg-black/90 text-white flex flex-row justify-between px-8 py-5'>
                {/* Name */}
                <div className=' font-bold text-3xl cursor-pointer'>StockAtlas</div>

                <div className=' hidden md:flex gap-10'>
                    {/* Search Bar */}
                    <div className='group bg-white flex flex-row  gap-2 items-center px-3 rounded-full '>
                        <Search color="black" />
                        <input className=' hover:cursor-default border-none outline-none text-black font-normal text-lg w-[400px]  group-hover:placeholder:text-gray-900/80 transition-all duration-100' type="text" name="" id="" placeholder='Search a stock such as AAPL' />
                    </div>

                    {/* Region Selector */}
                    <div className=' flex flex-col items-center justify-center rounded-3xl py-2 hover:bg-gray-200/10 cursor-pointer'>
                        <div onClick={() => setShowRegions(!showRegions)} title='Select region' className=' text-black px-3 flex items-center justify-center gap-1'>
                            <Globe color='white' size={25} />
                            <ChevronDown color='white' size={20} />
                        </div>
                            {/* { showRegions && (
                                <div className=" absolute flex items-center justify-center z-20 mt-28">
                                    <select
                                        className=" bg-black/90 text-white outline-none border-none px-3 py-1"
                                        onChange={(e) => console.log('Selected region:', e.target.value)}
                                    >
                                        <option value="us">US</option>
                                        <option value="uk">UK</option>
                                        <option value="in">India</option>
                                        <option value="jp">Japan</option>
                                    </select>
                                </div>
                            )} */}
                    </div>

                    {/* User Profile */}
                    <div onClick={() => navigate('/profile')} className='hover:bg-gray-200/10 cursor-pointer flex items-center justify-center rounded-full p-2'>
                        <User />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar