import React, { useContext, useState } from 'react'
import { Eye, EyeOff, User, TrendingUp, TrendingDown, DollarSign, Clock, BarChart3, PieChart, Settings, ArrowLeft, Home } from 'lucide-react'
import { AuthContext } from '../Context/authContext'
import validator from 'validator'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {

  const { authUser, changePassword } = useContext(AuthContext);

  const navigate=useNavigate();

  const [showProfileSettings, setShowProfileSettings] = useState(false)
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confNewPass, setConfNewPass] = useState('');

  // Mock data - replace with actual user data
  const userData = {
    name: authUser.username,
    email: authUser.email,
    avatar: authUser.avatar, // Set to image URL when available
    totalInvestment: 25000,
    currentValue: 28750,
    profitLoss: 3750,
    profitLossPercent: 15.0
  }

  const currentStocks = [
    { symbol: "AAPL", name: "Apple Inc.", shares: 50, price: 185.20, value: 9260, change: 2.5 },
    { symbol: "GOOGL", name: "Alphabet Inc.", shares: 25, price: 142.80, value: 3570, change: -1.2 },
    { symbol: "MSFT", name: "Microsoft Corp.", shares: 40, price: 378.85, value: 15154, change: 0.8 },
    { symbol: "TSLA", name: "Tesla Inc.", shares: 15, price: 248.50, value: 3727.5, change: -3.1 }
  ]

  const transactionHistory = [
    { id: 1, type: "BUY", symbol: "AAPL", shares: 25, price: 180.50, date: "2024-06-15", total: 4512.50 },
    { id: 2, type: "SELL", symbol: "GOOGL", shares: 10, price: 145.20, date: "2024-06-10", total: 1452.00 },
    { id: 3, type: "BUY", symbol: "MSFT", shares: 20, price: 375.00, date: "2024-06-08", total: 7500.00 },
    { id: 4, type: "BUY", symbol: "TSLA", shares: 15, price: 255.80, date: "2024-06-05", total: 3837.00 }
  ]

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    const isStrongPassword = validator.isStrongPassword(newPass, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });

    if (!isStrongPassword) {
      toast.error("Enter a strong password!");
      return false
    }

    if (newPass !== confNewPass) {
      toast.error("Confirm New Password!");
      return false
    }

    changePassword(oldPass, newPass);
  }

  // useEffect(()=>{
  //   if(authUser) console.log(authUser);
    
  // },[])

  return (
    <div className="min-h-screen bg-gray-950 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Header */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={()=>{navigate('/'); scrollTo(0,0)}}
            className="group flex items-center space-x-3 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-gray-600 rounded-full px-6 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
          >
            <ArrowLeft size={20} className="text-white group-hover:text-blue-400 transition-colors" />
            <Home size={20} className="text-white group-hover:text-blue-400 transition-colors" />
            <span className="text-white font-medium group-hover:text-blue-400 transition-colors">
              Back to Home
            </span>
          </button>
          
          <div className="text-right">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Portfolio Dashboard
            </h1>
            <p className="text-gray-400 mt-1">Manage your investments</p>
          </div>
        </div>

        {/* Profile Header */}
        <div className="bg-gray-900 rounded-2xl shadow-xl border border-gray-800 p-6 sm:p-8 mb-8 hover:shadow-blue-500/10 transition-all duration-300">
          <div className="flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-8">
            {/* User Avatar */}
            <div className="flex-shrink-0 mx-auto lg:mx-0">
              <div className="w-28 h-28 bg-gray-800 rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-700 shadow-lg hover:scale-105 transition-transform duration-300">
                {userData.avatar ? (
                  <img src={userData.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={48} className="text-white/80" />
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 w-full">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    {authUser?.username || "John Doe"}
                  </h2>
                  <p className="text-gray-400 text-lg">{authUser?.email || "john.doe@example.com"}</p>
                </div>

                <button
                  onClick={() => setShowProfileSettings(!showProfileSettings)}
                  className="group flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg border border-blue-500 hover:border-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  <Settings className="text-white transition-colors" size={20} />
                  <span className="text-white font-medium transition-colors">
                    Change Password
                  </span>
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mt-8">
                <div className="bg-blue-600/20 rounded-lg p-5 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-blue-600/30 rounded-lg">
                      <DollarSign size={20} className="text-blue-400" />
                    </div>
                    <span className="text-sm font-semibold text-blue-300">Total Investment</span>
                  </div>
                  <p className="text-2xl font-bold text-white">${userData.totalInvestment.toLocaleString()}</p>
                </div>

                <div className="bg-green-600/20 rounded-lg p-5 border border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-green-600/30 rounded-lg">
                      <BarChart3 size={20} className="text-green-400" />
                    </div>
                    <span className="text-sm font-semibold text-green-300">Current Value</span>
                  </div>
                  <p className="text-2xl font-bold text-white">${userData.currentValue.toLocaleString()}</p>
                </div>

                <div className={`rounded-lg p-5 border transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  userData.profitLoss >= 0 
                    ? 'bg-emerald-600/20 border-emerald-500/30 hover:border-emerald-400/50 hover:shadow-emerald-500/25' 
                    : 'bg-red-600/20 border-red-500/30 hover:border-red-400/50 hover:shadow-red-500/25'
                }`}>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-2 rounded-lg ${userData.profitLoss >= 0 ? 'bg-emerald-600/30' : 'bg-red-600/30'}`}>
                      {userData.profitLoss >= 0 ? (
                        <TrendingUp size={20} className="text-emerald-400" />
                      ) : (
                        <TrendingDown size={20} className="text-red-400" />
                      )}
                    </div>
                    <span className={`text-sm font-semibold ${userData.profitLoss >= 0 ? 'text-emerald-300' : 'text-red-300'}`}>
                      Profit/Loss
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    ${Math.abs(userData.profitLoss).toLocaleString()}
                  </p>
                </div>

                <div className={`rounded-lg p-5 border transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  userData.profitLossPercent >= 0 
                    ? 'bg-emerald-600/20 border-emerald-500/30 hover:border-emerald-400/50 hover:shadow-emerald-500/25' 
                    : 'bg-red-600/20 border-red-500/30 hover:border-red-400/50 hover:shadow-red-500/25'
                }`}>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-2 rounded-lg ${userData.profitLossPercent >= 0 ? 'bg-emerald-600/30' : 'bg-red-600/30'}`}>
                      <PieChart size={20} className={userData.profitLossPercent >= 0 ? 'text-emerald-400' : 'text-red-400'} />
                    </div>
                    <span className={`text-sm font-semibold ${userData.profitLossPercent >= 0 ? 'text-emerald-300' : 'text-red-300'}`}>
                      Return %
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {userData.profitLossPercent >= 0 ? '+' : ''}{userData.profitLossPercent.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Change Password Section */}
        {showProfileSettings && (
          <div className="bg-gray-900 rounded-2xl shadow-xl border border-gray-800 p-6 sm:p-8 mb-8 animate-in slide-in-from-top duration-300">
            <h3 className="text-2xl font-bold text-white mb-8">
              Change Password
            </h3>

            <div className="max-w-md mx-auto">
              <div className="space-y-6">
                {/* Old Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      value={oldPass}
                      onChange={(e) => setOldPass(e.target.value)}
                      type={showOld ? 'text' : 'password'}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:bg-gray-700"
                      placeholder="Enter your current password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      onClick={() => setShowOld(!showOld)}
                    >
                      {showOld ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                      )}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      type={showNew ? 'text' : 'password'}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:bg-gray-700"
                      placeholder="Enter your new password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      onClick={() => setShowNew(!showNew)}
                    >
                      {showNew ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      value={confNewPass}
                      onChange={(e) => setConfNewPass(e.target.value)}
                      type={showConfirm ? 'text' : 'password'}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:bg-gray-700"
                      placeholder="Confirm your new password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      onClick={() => setShowConfirm(!showConfirm)}
                    >
                      {showConfirm ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleUpdatePassword}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Current Portfolio */}
        <div className="bg-gray-900 rounded-2xl shadow-xl border border-gray-800 p-6 sm:p-8 mb-8">
          <h3 className="text-2xl font-bold text-white mb-8">
            Current Portfolio
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-4 px-4 font-semibold text-gray-300">Symbol</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-300">Company</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-300">Shares</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-300">Price</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-300">Value</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-300">Change</th>
                </tr>
              </thead>
              <tbody>
                {currentStocks.map((stock, index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50 transition-all duration-200 hover:scale-[1.01]">
                    <td className="py-5 px-4">
                      <span className="font-bold text-white text-lg">{stock.symbol}</span>
                    </td>
                    <td className="py-5 px-4 text-gray-300">{stock.name}</td>
                    <td className="py-5 px-4 text-right text-white font-medium">{stock.shares}</td>
                    <td className="py-5 px-4 text-right text-white font-medium">${stock.price}</td>
                    <td className="py-5 px-4 text-right font-bold text-white">
                      ${stock.value.toLocaleString()}
                    </td>
                    <td className={`py-5 px-4 text-right font-bold ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-gray-900 rounded-2xl shadow-xl border border-gray-800 p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-white mb-8">
            Transaction History
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-4 px-4 font-semibold text-gray-300">Date</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-300">Type</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-300">Symbol</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-300">Shares</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-300">Price</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-300">Total</th>
                </tr>
              </thead>
              <tbody>
                {transactionHistory.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-white/10 hover:bg-white/5 transition-all duration-200 hover:scale-[1.01]">
                    <td className="py-5 px-4 text-gray-200">
                      <div className="flex items-center space-x-2">
                        <Clock size={16} className="text-gray-400" />
                        <span>{new Date(transaction.date).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="py-5 px-4">
                      <span className={`px-4 py-2 rounded-full text-xs font-bold border ${transaction.type === 'BUY'
                        ? 'bg-green-600/20 text-green-300 border-green-400/30'
                        : 'bg-red-600/20 text-red-300 border-red-400/30'
                        }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="py-5 px-4 font-bold text-white text-lg">{transaction.symbol}</td>
                    <td className="py-5 px-4 text-right text-white font-medium">{transaction.shares}</td>
                    <td className="py-5 px-4 text-right text-white font-medium">${transaction.price}</td>
                    <td className="py-5 px-4 text-right font-bold text-white">
                      ${transaction.total.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile