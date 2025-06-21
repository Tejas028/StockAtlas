import React, { useContext, useState } from 'react'
import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/authContext'

const Login = () => {

  const navigate = useNavigate();

  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassConditions, setShowPassConditions] = useState(false)
  const { register, state, setState, login } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (state === 'Sign Up') {
      const result = await register({ username, email, password })
      if (result) {
        setState('Sign In')
        navigate('/login');
      } else {
        setShowPassConditions(true)
        return
      }
    } else {
      const result = await login({ username, email, password })
      if (result) {
        navigate('/');
      }
    }

  }

  return (
    <div className="min-h-screen relative">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/login.jpg"
          alt="Login background"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className=" flex items-start p-7 justify-end absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/60 text-white">
        </div>
      </div>

      {/* Login Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">{state === 'Sign Up' ? 'Sign Up' : 'Welcome Back'}</h1>
              <p className="text-gray-200"> {state === 'Sign Up' ? 'Create a new account' : 'Sign in to your account'} </p>
            </div>

            {/* Login Form */}
            <div className="space-y-6">
              {/* Username Field */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter username"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your password"
                />
                {
                  showPassConditions
                  ? <p className=' text-red-500 text-xs pt-1'>* The password should contain atleast 8 letters, atleast 1 Uppercase, atleast 1 Lowercase, atleast 1 Number and atleast 1 Symbol </p>
                  : null
                }
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-200">Remember me</span>
                </label>
                <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 transform hover:scale-[1.02]"
              >
                {state === 'Sign Up' ? 'Sign Up' : 'Sign In'}
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="mt-6 text-center text-gray-300">
              {state === 'Sign Up' ? 'Already' : "Don't"} have an account?{' '}
              <button onClick={() => {
                state == 'Sign Up'
                  ? setState('Sign In')
                  : setState('Sign Up')
              }} className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                {state === 'Sign Up' ? 'Sign In' : "Create One"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login