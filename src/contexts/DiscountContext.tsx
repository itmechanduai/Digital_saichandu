import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { useProducts } from './ProductContext';

export type DiscountType = 'percentage' | 'fixed' | 'bogo';

export interface Discount {
  id: string;
  code: string;
  type: DiscountType;
  value: number; // Percentage or fixed amount
  minPurchase?: number;
  maxDiscount?: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  usageLimit?: number;
  usageCount: number;
  applicableCategories?: string[]; // If empty, applies to all
  applicableProducts?: string[]; // If empty, applies to all
  description: string;
  createdAt: string;
}

interface DiscountContextType {
  discounts: Discount[];
  activeDiscounts: Discount[];
  applyDiscount: (code: string) => boolean;
  removeDiscount: () => void;
  appliedDiscount: Discount | null;
  calculateDiscount: (subtotal: number, categoryId?: string, productId?: string) => number;
  getDiscountedTotal: (subtotal: number) => number;
  fetchDiscounts: () => Promise<void>;
  addDiscount: (discount: Omit<Discount, 'id' | 'usageCount' | 'createdAt'>) => Promise<void>;
  updateDiscount: (id: string, updates: Partial<Discount>) => Promise<void>;
  deleteDiscount: (id: string) => Promise<void>;
}

const DiscountContext = createContext<DiscountContextType | undefined>(undefined);

export const useDiscount = () => {
  const context = useContext(DiscountContext);
  if (context === undefined) {
    throw new Error('useDiscount must be used within a DiscountProvider');
  }
  return context;
};

export const DiscountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [appliedDiscount, setAppliedDiscount] = useState<Discount | null>(null);
  const { products } = useProducts();

  // Sample discounts for demo
  const sampleDiscounts: Discount[] = [];

  useEffect(() => {
    // Initialize with sample discounts
    setDiscounts(sampleDiscounts);
    
    // In a real app, you would fetch from Supabase
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    try {
      const { data, error } = await supabase
        .from('discounts')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error && error.code !== '42P01') {
        throw error;
      }
      
      if (data && data.length > 0) {
        setDiscounts(data);
      }
    } catch (err) {
      // Only log error if it's not a missing table error
      if ((err as any)?.code !== '42P01') {
        console.error('Error fetching discounts:', err);
      }
    }
  };

  const addDiscount = async (discount: Omit<Discount, 'id' | 'usageCount' | 'createdAt'>) => {
    try {
      const newDiscount = {
        ...discount,
        usageCount: 0,
        createdAt: new Date().toISOString()
      };
      
      const { data, error } = await supabase
        .from('discounts')
        .insert([newDiscount])
        .select();
        
      if (error && error.code !== '42P01') {
        throw error;
      }
      
      if (data) {
        setDiscounts(prev => [...prev, data[0]]);
        toast.success('Discount added successfully');
      } else {
        // For demo, add to local state if table doesn't exist
        const mockId = Date.now().toString();
        setDiscounts(prev => [...prev, { ...newDiscount, id: mockId, usageCount: 0, createdAt: new Date().toISOString() }]);
        toast.success('Discount added successfully');
      }
    } catch (err) {
      console.error('Error adding discount:', err);
      toast.error('Failed to add discount');
    }
  };

  const updateDiscount = async (id: string, updates: Partial<Discount>) => {
    try {
      const { data, error } = await supabase
        .from('discounts')
        .update(updates)
        .eq('id', id)
        .select();
        
      if (error && error.code !== '42P01') {
        throw error;
      }
      
      if (data) {
        setDiscounts(prev => prev.map(discount => 
          discount.id === id ? { ...discount, ...updates } : discount
        ));
        toast.success('Discount updated successfully');
      } else {
        // For demo, update local state if table doesn't exist
        setDiscounts(prev => prev.map(discount => 
          discount.id === id ? { ...discount, ...updates } : discount
        ));
        toast.success('Discount updated successfully');
      }
    } catch (err) {
      console.error('Error updating discount:', err);
      toast.error('Failed to update discount');
    }
  };

  const deleteDiscount = async (id: string) => {
    try {
      const { error } = await supabase
        .from('discounts')
        .delete()
        .eq('id', id);
        
      if (error && error.code !== '42P01') {
        throw error;
      }
      
      setDiscounts(prev => prev.filter(discount => discount.id !== id));
      toast.success('Discount deleted successfully');
    } catch (err) {
      console.error('Error deleting discount:', err);
      toast.error('Failed to delete discount');
    }
  };

  const isDiscountValid = (discount: Discount): boolean => {
    const now = new Date();
    const startDate = new Date(discount.startDate);
    const endDate = new Date(discount.endDate);
    
    // Check if discount is active and within date range
    if (!discount.isActive || now < startDate || now > endDate) {
      return false;
    }
    
    // Check if usage limit is reached
    if (discount.usageLimit && discount.usageCount >= discount.usageLimit) {
      return false;
    }
    
    return true;
  };

  const applyDiscount = (code: string): boolean => {
    const discount = discounts.find(d => d.code.toLowerCase() === code.toLowerCase());
    
    if (!discount) {
      toast.error('Invalid discount code');
      return false;
    }
    
    if (!isDiscountValid(discount)) {
      toast.error('This discount code has expired or is no longer valid');
      return false;
    }
    
    setAppliedDiscount(discount);
    toast.success(`Discount code ${discount.code} applied successfully!`);
    return true;
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
  };

  const calculateDiscount = (subtotal: number, categoryId?: string, productId?: string): number => {
    if (!appliedDiscount) return 0;
    
    // Check minimum purchase requirement
    if (appliedDiscount.minPurchase && subtotal < appliedDiscount.minPurchase) {
      return 0;
    }
    
    // Check if discount applies to specific categories or products
    if (categoryId && appliedDiscount.applicableCategories?.length) {
      if (!appliedDiscount.applicableCategories.includes(categoryId)) {
        return 0;
      }
    }
    
    if (productId && appliedDiscount.applicableProducts?.length) {
      if (!appliedDiscount.applicableProducts.includes(productId)) {
        return 0;
      }
    }
    
    // Calculate discount amount
    let discountAmount = 0;
    if (appliedDiscount.type === 'percentage') {
      discountAmount = subtotal * (appliedDiscount.value / 100);
    } else if (appliedDiscount.type === 'fixed') {
      discountAmount = appliedDiscount.value;
    }
    
    // Apply maximum discount cap if specified
    if (appliedDiscount.maxDiscount && discountAmount > appliedDiscount.maxDiscount) {
      discountAmount = appliedDiscount.maxDiscount;
    }
    
    return discountAmount;
  };

  const getDiscountedTotal = (subtotal: number): number => {
    const discountAmount = calculateDiscount(subtotal);
    return Math.max(0, subtotal - discountAmount);
  };

  // Get only active discounts
  const activeDiscounts = discounts.filter(isDiscountValid);

  return (
    <DiscountContext.Provider value={{
      discounts,
      activeDiscounts,
      applyDiscount,
      removeDiscount,
      appliedDiscount,
      calculateDiscount,
      getDiscountedTotal,
      fetchDiscounts,
      addDiscount,
      updateDiscount,
      deleteDiscount
    }}>
      {children}
    </DiscountContext.Provider>
  );
};