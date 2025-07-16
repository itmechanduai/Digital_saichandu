import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Calendar, 
  MessageSquare, 
  ArrowRight,
  Mail,
  FileText,
  Clock
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ThankYou: React.FC = () => {
  const location = useLocation();
  const orderData = location.state?.orderData || {
    orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
    services: ['Digital Marketing Service'],
    total: '₹1,500.00',
    customerName: 'Valued Customer'
  };

  // Simulate tracking pixel for retargeting
  useEffect(() => {
    // This would be replaced with actual tracking pixel code
    console.log('Conversion tracking pixel loaded');
    
    // Send order data to analytics
    const trackConversion = () => {
      console.log('Tracking conversion:', orderData);
      // In a real implementation, this would send data to Google Analytics, Facebook Pixel, etc.
    };
    
    trackConversion();
  }, [orderData]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div 
            className="text-center"
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
            <motion.div 
              className="bg-emerald-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6"
              variants={fadeIn}
            >
              <CheckCircle className="h-12 w-12 text-emerald-600" />
            </motion.div>
            
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              variants={fadeIn}
            >
              Thank You for Your Order!
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-8"
              variants={fadeIn}
            >
              Hi {orderData.customerName}, we've received your order and are excited to work with you!
            </motion.p>
            
            <motion.div 
              className="bg-white rounded-xl p-8 custom-shadow mb-8"
              variants={fadeIn}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                <div className="text-left">
                  <p className="text-sm text-gray-600">Order Number</p>
                  <p className="text-lg font-bold text-gray-900">{orderData.orderNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Order Date</p>
                  <p className="text-lg font-medium text-gray-900">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Services Ordered</h3>
                <div className="space-y-3">
                  {orderData.services.map((service: string, index: number) => (
                    <div key={index} className="flex justify-between items-center">
                      <p className="text-gray-800">{service}</p>
                      <p className="font-medium text-gray-900">
                        {index === 0 ? orderData.total : 'Included'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-gray-900">Total</p>
                  <p className="text-xl font-bold text-blue-600">{orderData.total}</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-blue-50 rounded-xl p-8 mb-8"
              variants={fadeIn}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">What Happens Next?</h2>
              
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">1. Onboarding Email</h3>
                  <p className="text-gray-600 text-sm text-center">
                    You'll receive an onboarding email within 24 hours with all the details.
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">2. Kickoff Call</h3>
                  <p className="text-gray-600 text-sm text-center">
                    Your account manager will schedule a kickoff call to discuss next steps.
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">3. Implementation</h3>
                  <p className="text-gray-600 text-sm text-center">
                    We'll begin implementing your services according to the agreed timeline.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-green-50 rounded-xl p-8 mb-8 border border-green-200"
              variants={fadeIn}
            >
              <div className="flex items-center justify-center space-x-3 mb-4">
                <MessageSquare className="h-8 w-8 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900">Join Our Community</h2>
              </div>
              
              <p className="text-gray-700 mb-6">
                Join our exclusive WhatsApp community for priority support, tips, and early access to new services.
              </p>
              
              <a 
                href="https://chat.whatsapp.com/example-group-link" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center space-x-2"
              >
                <MessageSquare className="h-5 w-5" />
                <span>Join WhatsApp Community</span>
              </a>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeIn}
            >
              <Link
                to="/dashboard"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <Link
                to="/support"
                className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>Contact Support</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ThankYou;