import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import PriceDisplay from '../components/PriceDisplay';
import { supabase } from '../lib/supabase';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
  CreditCard, 
  Lock, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  ArrowLeft,
  CheckCircle,
  Shield,
  Truck
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartContext';
import { useDiscount } from '../contexts/DiscountContext';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import DiscountCodeInput from '../components/DiscountCodeInput';
import DiscountBanner from '../components/DiscountBanner';

const checkoutSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  zipCode: yup.string().required('ZIP code is required'),
  country: yup.string().required('Country is required'),
  cardNumber: yup.string().required('Card number is required'),
  expiryDate: yup.string().required('Expiry date is required'),
  cvv: yup.string().required('CVV is required'),
  cardName: yup.string().required('Cardholder name is required'),
});

type CheckoutFormData = yup.InferType<typeof checkoutSchema>;

const Checkout: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { calculateDiscount, getDiscountedTotal, appliedDiscount } = useDiscount();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CheckoutFormData>({
    resolver: yupResolver(checkoutSchema),
    defaultValues: {
      firstName: user?.name?.split(' ')[0] || '',
      lastName: user?.name?.split(' ')[1] || '',
      email: user?.email || '',
      phone: user?.phone || '',
    }
  });

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true);
    try {
      // Capture checkout information for non-authenticated users
      if (!user && items.length > 0) {
        try {
          const { error } = await supabase.from('abandoned_carts').insert([{
            email: data.email,
            phone: data.phone,
            first_name: data.firstName,
            last_name: data.lastName,
            items: items,
            total_value: getTotalPrice(),
            item_count: getTotalItems(),
            last_activity: new Date().toISOString(),
            is_converted: false,
            checkout_started: true,
            user_agent: navigator.userAgent,
            referrer: document.referrer || null
          }]);
          
          // Ignore error if table doesn't exist
          if (error && error.code !== '42P01') {
            throw error;
          }
        } catch (error) {
          // Only log error if it's not a missing table error
          if (error.code !== '42P01') {
            console.error('Error saving checkout data:', error);
          }
        }
      }
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Clear cart and show success
      clearCart();
      setOrderComplete(true);
      toast.success('Order placed successfully!');
      
      // Redirect to thank you page with order data
      navigate('/thank-you', { 
        state: { 
          orderData: {
            orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
            services: items.map(item => item.name),
            total: `$${total.toFixed(2)}`,
            customerName: `${data.firstName} ${data.lastName}`
          }
        }
      });
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <DiscountBanner />
        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div 
              className="text-center"
              initial="initial"
              animate="animate"
              variants={fadeIn}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
              <p className="text-gray-600 mb-8">
                Add some services to your cart before proceeding to checkout.
              </p>
              <button
                onClick={() => navigate('/products')}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold inline-flex items-center space-x-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Continue Shopping</span>
              </button>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-emerald-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-12 w-12 text-emerald-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
              <p className="text-gray-600 mb-8">
                Thank you for your purchase. We'll start working on your services right away.
              </p>
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <p className="text-sm text-gray-600 mb-2">Order Number</p>
                <p className="text-xl font-bold text-gray-900">#ORD-{Date.now()}</p>
              </div>
              <p className="text-gray-600">
                Redirecting to your dashboard...
              </p>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const discountAmount = calculateDiscount(subtotal);
  const discountedSubtotal = getDiscountedTotal(subtotal);
  const tax = discountedSubtotal * 0.1;
  const total = discountedSubtotal + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <DiscountBanner />
      
      <div className="pt-20">
        {/* Header */}
        <div className="bg-white py-8 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="flex items-center justify-between"
              initial="initial"
              animate="animate"
              variants={fadeIn}
            >
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                <p className="text-gray-600 mt-1">Complete your purchase</p>
              </div>
              <button
                onClick={() => navigate('/cart')}
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Cart</span>
              </button>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Contact Information */}
                <motion.div 
                  className="bg-white rounded-xl p-6 custom-shadow"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          {...register('firstName')}
                          type="text"
                          className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.firstName ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="John"
                        />
                      </div>
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        {...register('lastName')}
                        type="text"
                        className={`block w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.lastName ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          {...register('email')}
                          type="email"
                          className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.email ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="john@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          {...register('phone')}
                          type="tel"
                          className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.phone ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Billing Address */}
                <motion.div 
                  className="bg-white rounded-xl p-6 custom-shadow"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Billing Address</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          {...register('address')}
                          type="text"
                          className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.address ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="123 Main Street"
                        />
                      </div>
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          {...register('city')}
                          type="text"
                          className={`block w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.city ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="New York"
                        />
                        {errors.city && (
                          <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP Code *
                        </label>
                        <input
                          {...register('zipCode')}
                          type="text"
                          className={`block w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.zipCode ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="10001"
                        />
                        {errors.zipCode && (
                          <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country *
                        </label>
                        <select
                          {...register('country')}
                          className={`block w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.country ? 'border-red-300' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select Country</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="AU">Australia</option>
                        </select>
                        {errors.country && (
                          <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Payment Information */}
                <motion.div 
                  className="bg-white rounded-xl p-6 custom-shadow"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Information</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <CreditCard className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          {...register('cardNumber')}
                          type="text"
                          className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.cardNumber ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      {errors.cardNumber && (
                        <p className="mt-1 text-sm text-red-600">{errors.cardNumber.message}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          {...register('expiryDate')}
                          type="text"
                          className={`block w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.expiryDate ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="MM/YY"
                        />
                        {errors.expiryDate && (
                          <p className="mt-1 text-sm text-red-600">{errors.expiryDate.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            {...register('cvv')}
                            type="text"
                            className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.cvv ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="123"
                          />
                        </div>
                        {errors.cvv && (
                          <p className="mt-1 text-sm text-red-600">{errors.cvv.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder Name *
                        </label>
                        <input
                          {...register('cardName')}
                          type="text"
                          className={`block w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.cardName ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="John Doe"
                        />
                        {errors.cardName && (
                          <p className="mt-1 text-sm text-red-600">{errors.cardName.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div 
                  className="bg-white rounded-xl p-6 custom-shadow sticky top-24"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                  
                  {/* Order Items */}
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-medium text-gray-900">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Pricing */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                    </div>
                    {appliedDiscount && discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Discount ({appliedDiscount.code}):</span>
                        <span>-₹{discountAmount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">₹{tax.toFixed(0)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold text-gray-900">Total</span>
                        <span className="text-lg font-semibold text-gray-900">
                          ₹{total.toFixed(2)}
                  
                  <DiscountCodeInput subtotal={subtotal} />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Place Order Button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                  >
                    {isProcessing ? (
                      <div className="loading-spinner" />
                    ) : (
                      <>
                        <Lock className="h-5 w-5" />
                        <span>Place Order</span>
                      </>
                    )}
                  </button>

                  {/* Trust Badges */}
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>Secure SSL Encryption</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Truck className="h-4 w-4 text-blue-500" />
                      <span>Fast Service Delivery</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span>Money Back Guarantee</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;