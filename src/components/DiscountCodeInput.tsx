import React, { useState } from 'react';
import { Tag, Check, X } from 'lucide-react';
import { useDiscount } from '../contexts/DiscountContext';

interface DiscountCodeInputProps {
  subtotal: number;
}

const DiscountCodeInput: React.FC<DiscountCodeInputProps> = ({ subtotal }) => {
  const [code, setCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const { applyDiscount, removeDiscount, appliedDiscount, calculateDiscount } = useDiscount();

  const handleApply = () => {
    if (!code.trim()) return;
    
    setIsApplying(true);
    setTimeout(() => {
      applyDiscount(code);
      setIsApplying(false);
    }, 500);
  };

  const handleRemove = () => {
    removeDiscount();
    setCode('');
  };

  const discountAmount = appliedDiscount ? calculateDiscount(subtotal) : 0;

  return (
    <div className="mt-4 mb-6">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Discount Code</h4>
      
      {appliedDiscount ? (
        <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <Tag className="h-4 w-4 text-blue-600 mr-2" />
            <div>
              <div className="flex items-center">
                <span className="font-medium text-blue-700">{appliedDiscount.code}</span>
                <Check className="h-4 w-4 text-emerald-500 ml-2" />
              </div>
              <p className="text-xs text-blue-600">
                {discountAmount > 0 
                  ? `$${discountAmount.toFixed(2)} discount applied` 
                  : 'Applied to eligible items'}
              </p>
            </div>
          </div>
          <button 
            onClick={handleRemove}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="flex space-x-2">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Enter discount code"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleApply}
            disabled={!code.trim() || isApplying}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isApplying ? (
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Apply'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default DiscountCodeInput;