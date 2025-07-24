import React, { useContext, useState, useCallback } from 'react'
import { X, Upload, Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/authContext'

const Login = () => {
  const navigate = useNavigate();

  // Form states
  const [photo, setPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  // Error states
  const [errors, setErrors] = useState({})
  const [showPassConditions, setShowPassConditions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { register, state, setState, login } = useContext(AuthContext)

  // Form validation
  const validateForm = () => {
    const newErrors = {}

    if (state === 'Sign Up') {
      if (!userName.trim()) newErrors.userName = 'First name is required'
      if (!email.trim()) newErrors.email = 'Email is required'
      else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid'
      if (!password) newErrors.password = 'Password is required'
      else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters'
      if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password'
      else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    } else {
      if (!email.trim()) newErrors.email = 'Email is required'
      else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid'
      if (!password) newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle photo upload
  const handlePhotoChange = useCallback((e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, photo: 'Photo must be less than 5MB' }))
        return
      }

      setPhoto(file)
      setErrors(prev => ({ ...prev, photo: null }))

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => setPhotoPreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }, [])

  const removePhoto = useCallback(() => {
    setPhoto(null)
    setPhotoPreview(null)
    setErrors(prev => ({ ...prev, photo: null }))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (!validateForm()) {
      setIsLoading(false)
      return
    }

    try {
      if (state === 'Sign Up') {
        const formData = new FormData()
        if (photo) formData.append('avatar', photo)
        formData.append('username', userName)
        formData.append('email', email)
        formData.append('password', password)

        const result = await register(formData)
        if (result) {
          setState('Sign In')
          // Reset form
          setUserName('')
          setEmail('')
          setPassword('')
          setConfirmPassword('')
          setPhoto(null)
          setPhotoPreview(null)
          navigate('/login')
        } else {
          setShowPassConditions(true)
        }
      } else {
        const result = await login({ email, password })
        if (result) {
          navigate('/')
        }
      }
    } catch (error) {
      console.error('Authentication error:', error)
      setErrors({ general: 'An error occurred. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    // Add Google OAuth logic here
    console.log('Google login clicked')
  }

  const toggleState = useCallback(() => {
    setState(state === 'Sign Up' ? 'Sign In' : 'Sign Up')
    setErrors({})
    setShowPassConditions(false)
    // Reset form when switching
    setUserName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setPhoto(null)
    setPhotoPreview(null)
  }, [state, setState])

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Financial data background"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70"></div>
      </div>

      {/* Login Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className={`w-full ${state === 'Sign Up' ? 'max-w-lg' : 'max-w-md'}`}>
          {/* Login Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
              </h1>
              <p className="text-gray-200">
                {state === 'Sign Up' ? 'Join StockAtlas today' : 'Sign in to your account'}
              </p>
            </div>

            {/* Error Message */}
            {errors.general && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                <p className="text-red-300 text-sm">{errors.general}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {state === 'Sign Up' && (
                <>
                  {/* Photo Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Profile Photo <span className="text-gray-400">(Optional)</span>
                    </label>
                    <div className="flex items-center gap-4">
                      {photoPreview ? (
                        <div className="relative">
                          <img
                            src={photoPreview}
                            alt="Preview"
                            className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                          />
                          <button
                            type="button"
                            onClick={removePhoto}
                            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 rounded-full p-1 transition-colors"
                          >
                            <X size={12} color="white" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center">
                          <Upload size={20} color="white" />
                        </div>
                      )}
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="hidden"
                          id="photo-upload"
                        />
                        <label
                          htmlFor="photo-upload"
                          className="cursor-pointer bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-2 text-sm text-white transition-colors"
                        >
                          Choose Photo
                        </label>
                      </div>
                    </div>
                    {errors.photo && <p className="text-red-400 text-xs mt-1">{errors.photo}</p>}
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Username *
                      </label>
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className={`w-full px-4 py-3 bg-white/10 border ${errors.userName ? 'border-red-500' : 'border-white/20'} rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-colors`}
                        placeholder="John"
                      />
                      {errors.userName && <p className="text-red-400 text-xs mt-1">{errors.userName}</p>}
                    </div>

                  </div>
                </>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 bg-white/10 border ${errors.email ? 'border-red-500' : 'border-white/20'} rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-colors`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full px-4 py-3 pr-12 bg-white/10 border ${errors.password ? 'border-red-500' : 'border-white/20'} rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-colors`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                {showPassConditions && (
                  <p className="text-red-400 text-xs mt-1">
                    Password should contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 symbol
                  </p>
                )}
              </div>

              {/* Confirm Password Field (Sign Up only) */}
              {state === 'Sign Up' && (
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full px-4 py-3 pr-12 bg-white/10 border ${errors.confirmPassword ? 'border-red-500' : 'border-white/20'} rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-colors`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
              )}

              {/* Remember Me & Forgot Password (Sign In only) */}
              {state === 'Sign In' && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-gray-200">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? 'Loading...' : (state === 'Sign Up' ? 'Create Account' : 'Sign In')}
              </button>

              {/* Google Login Button */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-gray-300">or</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>
            </form>

            {/* Toggle State */}
            <p className="mt-6 text-center text-gray-300">
              {state === 'Sign Up' ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={toggleState}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                {state === 'Sign Up' ? 'Sign In' : 'Create Account'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login