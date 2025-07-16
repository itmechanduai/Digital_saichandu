import React from 'react';

interface PriceDisplayProps {
  amount: number;
  originalAmount?: number;
  currency?: string;
  size?: 'small' | 'medium' | 'large';
  showDiscount?: boolean;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  amount,
  originalAmount,
  currency = '₹',
  size = 'medium',
  showDiscount = true
}) => {
  const discount = originalAmount ? Math.round(((originalAmount - amount) / originalAmount) * 100) : 0;
  
  const sizeClasses = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-3xl'
  };

  return (
    <div className="flex items-center flex-wrap">
      <span className={`font-bold text-gray-900 ${sizeClasses[size]}`}>
        {currency}{amount.toLocaleString()}
      </span>
      
      {originalAmount && originalAmount > amount && (
        <>
          <span className="text-gray-500 line-through ml-2">
            {currency}{originalAmount.toLocaleString()}
          </span>
          
          {showDiscount && discount > 0 && (
            <span className="ml-2 bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">
              {discount}% OFF
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default PriceDisplay;