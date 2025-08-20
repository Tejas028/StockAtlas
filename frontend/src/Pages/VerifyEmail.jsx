import React, { useState, useEffect, useContext } from "react";
import { Mail, RefreshCw } from "lucide-react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../Context/authContext";

const VerifyEmail = () => {
  // Demo email for preview
  const location = useLocation();
  const email = location.state?.email || "your email";
  
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [canResend, setCanResend] = useState(false);

  const {resendVerificationEmail}=useContext(AuthContext)

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleResend = async () => {
    if (!canResend || resending) return;
    
    setResending(true);
    setMessage("");
    
    try {
      // Simulate API call
      await resendVerificationEmail(email);
      
      setMessage("Code sent successfully!");
      setTimeLeft(120); // Reset timer
      setCanResend(false);
    } catch (error) {
      setMessage("Failed to send code. Please try again.");
    } finally {
      setResending(false);
    }
  };

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

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Main Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 text-center">
            
            {/* Logo */}
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-4">
                <span className="text-white font-bold text-xl">SA</span>
              </div>
              <h1 className="text-2xl font-bold text-white mb-1">
                Stock<span className="text-blue-400">Atlas</span>
              </h1>
            </div>

            {/* Mail Icon */}
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
              <Mail className="w-8 h-8 text-blue-400" />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-white mb-2">
              Check your email
            </h2>

            {/* Description */}
            <p className="text-gray-300 mb-8 leading-relaxed">
              We sent a verification code to <br />
              <span className="font-medium text-white">{email}</span>
            </p>

            {/* Success/Error Message */}
            {message && (
              <div className={`mb-6 p-3 rounded-lg text-sm ${
                message.includes('successfully') 
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}>
                {message}
              </div>
            )}

            {/* Resend Section */}
            <div className="text-center">
              <p className="text-gray-300 mb-4">Didn't receive a code?</p>
              
              <button
                onClick={handleResend}
                disabled={!canResend || resending}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  canResend && !resending
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transform hover:scale-[1.02]'
                    : 'bg-white/10 text-gray-400 cursor-not-allowed border border-white/20'
                }`}
              >
                {resending ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : canResend ? (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    Resend
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    Resend ({formatTime(timeLeft)})
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;