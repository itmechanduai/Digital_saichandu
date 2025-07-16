import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import OtpInput from 'react-otp-input';
import { 
  Phone, 
  ArrowRight,
  Loader,
  Lock,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const OTPLogin: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [isVerified, setIsVerified] = useState(false);
  
  const { loginWithOTP, verifyOTP } = useAuth();
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    try {
      await loginWithOTP(phoneNumber);
      setStep('otp');
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid OTP');
      return;
    }

    setIsLoading(true);
    try {
      await verifyOTP(phoneNumber, otp);
      setIsVerified(true);
      
      // Redirect after showing success message
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      toast.error('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  if (isVerified) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 custom-shadow text-center"
          >
            <div className="bg-emerald-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Login Successful!
            </h2>
            <p className="text-gray-600 mb-6">
              You have been successfully logged in with your phone number.
            </p>
            <p className="text-gray-600">
              Redirecting to dashboard...
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {/* Logo */}
          <motion.div 
            className="text-center"
            variants={fadeIn}
          >
            <Link to="/" className="inline-block mb-4 mx-auto">
              <img 
                src="/ds.logo.png" 
                alt="Digital Saichandu" 
                className="h-16 w-auto"
              />
            </Link>
            <h2 className="text-3xl font-bold text-gray-900">
              {step === 'phone' ? 'Login with Phone' : 'Verify OTP'}
            </h2>
            <p className="text-gray-600 mt-2">
              {step === 'phone' 
                ? 'Enter your phone number to receive a verification code' 
                : 'Enter the 6-digit code sent to your phone'}
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            className="bg-white rounded-2xl p-8 custom-shadow mt-6"
            variants={fadeIn}
          >
            {step === 'phone' ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors border-gray-300"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSendOTP}
                  disabled={isLoading || !phoneNumber}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover-lift"
                >
                  {isLoading ? (
                    <Loader className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <span>Send OTP</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Verification Code
                  </label>
                  <div className="flex justify-center mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Lock className="h-4 w-4 text-blue-500" />
                      <span>Sent to {phoneNumber}</span>
                    </div>
                  </div>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => <input {...props} />}
                    containerStyle="flex justify-between gap-2"
                    inputStyle={{
                      width: '100%',
                      height: '50px',
                      fontSize: '24px',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      textAlign: 'center'
                    }}
                    focusStyle={{
                      border: '2px solid #3B82F6',
                      outline: 'none'
                    }}
                  />
                </div>

                <div className="flex flex-col space-y-3">
                  <button
                    onClick={handleVerifyOTP}
                    disabled={isLoading || otp.length !== 6}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover-lift"
                  >
                    {isLoading ? (
                      <Loader className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        <span>Verify OTP</span>
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => setStep('phone')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Change Phone Number
                  </button>
                  
                  <button
                    onClick={handleSendOTP}
                    disabled={isLoading}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Want to login with email instead?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
                  Login with Email
                </Link>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default OTPLogin;