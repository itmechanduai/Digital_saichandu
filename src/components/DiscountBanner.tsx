import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Tag, X, Clock, ArrowRight } from 'lucide-react';
import { useDiscount, Discount } from '../contexts/DiscountContext';

const DiscountBanner: React.FC = () => {
  const { activeDiscounts } = useDiscount();
  const [currentDiscountIndex, setCurrentDiscountIndex] = useState(0);
  const [showBanner, setShowBanner] = useState(true);
  
  // Rotate through active discounts every 5 seconds
  useEffect(() => {
    if (activeDiscounts.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentDiscountIndex(prev => (prev + 1) % activeDiscounts.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeDiscounts.length]);
  
  if (!showBanner || activeDiscounts.length === 0) return null;
  
  const currentDiscount = activeDiscounts[currentDiscountIndex];
  
  const getDiscountMessage = (discount: Discount): string => {
    if (discount.type === 'percentage') {
      return `${discount.value}% OFF ${discount.applicableCategories?.length ? 'on ' + discount.applicableCategories.join(', ') : 'on all services'}`;
    } else if (discount.type === 'fixed') {
      return `$${discount.value} OFF ${discount.applicableCategories?.length ? 'on ' + discount.applicableCategories.join(', ') : 'on all services'}`;
    } else {
      return 'Buy One Get One Free on select services';
    }
  };
  
  const getBackgroundColor = (discount: Discount): string => {
    if (discount.type === 'percentage') {
      return 'bg-blue-600';
    } else if (discount.type === 'fixed') {
      return 'bg-emerald-600';
    } else {
      return 'bg-purple-600';
    }
  };
  
  return (
    <AnimatePresence>
      <motion.div 
        className={`${getBackgroundColor(currentDiscount)} text-white py-2 relative`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Tag className="h-4 w-4 mr-2" />
            <p className="text-sm font-medium">
              {getDiscountMessage(currentDiscount)} • Use code: <span className="font-bold">{currentDiscount.code}</span>
            </p>
            
            {new Date(currentDiscount.endDate) > new Date() && (
              <div className="hidden md:flex items-center ml-4 text-xs">
                <Clock className="h-3 w-3 mr-1" />
                <span>
                  Ends in {Math.ceil((new Date(currentDiscount.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                </span>
              </div>
            )}
            
            <Link 
              to="/products" 
              className="ml-4 text-xs font-medium underline flex items-center hover:text-white/90"
            >
              <span>Shop Now</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </div>
          
          <button 
            onClick={() => setShowBanner(false)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white"
            aria-label="Close banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DiscountBanner;