import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft,
  CreditCard,
  Shield,
  Truck
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartContext';
import { useDiscount } from '../contexts/DiscountContext';
import DiscountCodeInput from '../components/DiscountCodeInput';
import DiscountBanner from '../components/DiscountBanner';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();
  const { calculateDiscount, getDiscountedTotal, appliedDiscount } = useDiscount();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  if (items.length === 0) {
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
              <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any services to your cart yet.
              </p>
              <Link
                to="/products"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold inline-flex items-center space-x-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Continue Shopping</span>
              </Link>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <DiscountBanner />
      
      <div className="pt-20">
        {/* Header */}
        <div className="bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="flex items-center justify-between"
              initial="initial"
              animate="animate"
              variants={fadeIn}
            >
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                <p className="text-gray-600 mt-1">
                  {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''} in your cart
                </p>
              </div>
              <Link
                to="/products"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Continue Shopping</span>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div 
                className="bg-white rounded-xl custom-shadow"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Cart Items</h2>
                  
                  <div className="space-y-6">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.category}</p>
                          <p className="text-lg font-bold text-blue-600 mt-1">
                            ${item.price.toLocaleString()}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ${(item.price * item.quantity).toLocaleString()}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors mt-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div 
                className="bg-white rounded-xl custom-shadow sticky top-24"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">₹{getTotalPrice().toLocaleString()}</span>
                    </div>
                    {appliedDiscount && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Discount ({appliedDiscount.code})</span>
                        <span>-₹{calculateDiscount(getTotalPrice()).toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">₹{(getDiscountedTotal(getTotalPrice()) * 0.1).toLocaleString()}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold text-gray-900">Total</span>
                        <span className="text-lg font-semibold text-gray-900">
                          ₹{(getDiscountedTotal(getTotalPrice()) * 1.1).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <DiscountCodeInput subtotal={getTotalPrice()} />

                  <Link
                    to="/checkout" 
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2 mt-4 mb-4"
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Proceed to Checkout</span>
                  </Link>

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
                      <CreditCard className="h-4 w-4 text-purple-500" />
                      <span>Multiple Payment Options</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;