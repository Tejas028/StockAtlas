import React from 'react'
import { User, TrendingUp, TrendingDown, DollarSign, Clock, BarChart3, PieChart } from 'lucide-react'

const Profile = () => {
  // Mock data - replace with actual user data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: null, // Set to image URL when available
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

  return (
    <div className="min-h-screen bg-black/90 bg-gradient-to-b from-black/80 via-black/90 to-black/95 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-black/40 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 p-8 mb-6">
          <div className="flex items-start space-x-6">
            {/* User Avatar */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center overflow-hidden border-2 border-white/20">
                {userData.avatar ? (
                  <img src={userData.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={40} className="text-white/70" />
                )}
              </div>
            </div>
            
            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{userData.name}</h1>
              <p className="text-gray-200 text-lg mb-4">{userData.email}</p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-600/10 backdrop-blur-sm rounded-lg p-4 border border-blue-400/20">
                  <div className="flex items-center space-x-2">
                    <DollarSign size={20} className="text-blue-400" />
                    <span className="text-sm font-medium text-blue-300">Total Investment</span>
                  </div>
                  <p className="text-2xl font-bold text-white">${userData.totalInvestment.toLocaleString()}</p>
                </div>
                
                <div className="bg-green-600/10 backdrop-blur-sm rounded-lg p-4 border border-green-400/20">
                  <div className="flex items-center space-x-2">
                    <BarChart3 size={20} className="text-green-400" />
                    <span className="text-sm font-medium text-green-300">Current Value</span>
                  </div>
                  <p className="text-2xl font-bold text-white">${userData.currentValue.toLocaleString()}</p>
                </div>
                
                <div className={`backdrop-blur-sm rounded-lg p-4 border ${userData.profitLoss >= 0 ? 'bg-emerald-600/10 border-emerald-400/20' : 'bg-red-600/10 border-red-400/20'}`}>
                  <div className="flex items-center space-x-2">
                    {userData.profitLoss >= 0 ? (
                      <TrendingUp size={20} className="text-emerald-400" />
                    ) : (
                      <TrendingDown size={20} className="text-red-400" />
                    )}
                    <span className={`text-sm font-medium ${userData.profitLoss >= 0 ? 'text-emerald-300' : 'text-red-300'}`}>
                      Profit/Loss
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    ${Math.abs(userData.profitLoss).toLocaleString()}
                  </p>
                </div>
                
                <div className={`backdrop-blur-sm rounded-lg p-4 border ${userData.profitLossPercent >= 0 ? 'bg-emerald-600/10 border-emerald-400/20' : 'bg-red-600/10 border-red-400/20'}`}>
                  <div className="flex items-center space-x-2">
                    <PieChart size={20} className={userData.profitLossPercent >= 0 ? 'text-emerald-400' : 'text-red-400'} />
                    <span className={`text-sm font-medium ${userData.profitLossPercent >= 0 ? 'text-emerald-300' : 'text-red-300'}`}>
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

        {/* Current Portfolio */}
        <div className="bg-black/40 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 p-8 mb-6">
          <h2 className="text-2xl font-bold text-white mb-6">Current Portfolio</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 font-semibold text-gray-200">Symbol</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-200">Company</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-200">Shares</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-200">Price</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-200">Value</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-200">Change</th>
                </tr>
              </thead>
              <tbody>
                {currentStocks.map((stock, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4">
                      <span className="font-bold text-white">{stock.symbol}</span>
                    </td>
                    <td className="py-4 px-4 text-gray-200">{stock.name}</td>
                    <td className="py-4 px-4 text-right text-white">{stock.shares}</td>
                    <td className="py-4 px-4 text-right text-white">${stock.price}</td>
                    <td className="py-4 px-4 text-right font-semibold text-white">
                      ${stock.value.toLocaleString()}
                    </td>
                    <td className={`py-4 px-4 text-right font-semibold ${
                      stock.change >= 0 ? 'text-green-400' : 'text-red-400'
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
        <div className="bg-black/40 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Transaction History</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 font-semibold text-gray-200">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-200">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-200">Symbol</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-200">Shares</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-200">Price</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-200">Total</th>
                </tr>
              </thead>
              <tbody>
                {transactionHistory.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 text-gray-200">
                      <div className="flex items-center space-x-2">
                        <Clock size={16} className="text-gray-400" />
                        <span>{new Date(transaction.date).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        transaction.type === 'BUY' 
                          ? 'bg-green-600/20 text-green-300 border border-green-400/20' 
                          : 'bg-red-600/20 text-red-300 border border-red-400/20'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-bold text-white">{transaction.symbol}</td>
                    <td className="py-4 px-4 text-right text-white">{transaction.shares}</td>
                    <td className="py-4 px-4 text-right text-white">${transaction.price}</td>
                    <td className="py-4 px-4 text-right font-semibold text-white">
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