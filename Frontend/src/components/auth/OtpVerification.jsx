import React, { useState, useRef, useEffect } from 'react';
import { Mail, X } from 'lucide-react';

export default function OTPVerificationModal() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/\d/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    
    setOtp(newOtp);
    
    // Focus next empty input or last input
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = () => {
    const otpString = otp.join('');
    console.log('OTP:', otpString);
    // Handle verification logic here
  };

  const handleResendOTP = () => {
    console.log('Resending OTP...');
    // Handle resend logic here
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        {/* Close button */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Mail icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-blue-500 rounded-full p-4">
            <Mail size={32} className="text-white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Enter OTP
        </h2>

        {/* Description */}
        <p className="text-center text-gray-600 mb-2">
          We've sent a 6-digit code to
        </p>
        <p className="text-center font-semibold text-gray-800 mb-4">
          nana@gmail.com
        </p>

        {/* Demo text */}
        <p className="text-center text-blue-500 text-sm mb-8">
          Demo: Use 123456
        </p>

        {/* OTP Input boxes */}
        <div className="flex justify-center gap-3 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength="1"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            />
          ))}
        </div>

        {/* Verify button */}
        <button
          onClick={handleVerify}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 mb-4"
        >
          Verify OTP
        </button>

        {/* Resend OTP */}
        <button
          onClick={handleResendOTP}
          className="w-full text-blue-500 hover:text-blue-600 font-medium transition-colors"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
}