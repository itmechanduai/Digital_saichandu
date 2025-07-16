import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => Promise<void>;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { user, isAuthenticated } = useAuth();
  const [abandonedCartId, setAbandonedCartId] = useState<string | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // Track cart abandonment
  useEffect(() => {
    const trackCart = async () => {
      if (items.length > 0) {
        // Create or update abandoned cart record
        const cartData = {
          user_id: isAuthenticated ? user?.id : null,
          email: isAuthenticated ? user?.email : null,
          items: items,
          total_value: getTotalPrice(),
          item_count: getTotalItems(),
          last_activity: new Date().toISOString(),
          is_converted: false,
          user_agent: navigator.userAgent,
          referrer: document.referrer || null
        };

        try {
          if (abandonedCartId) {
            // Update existing cart
            const { error } = await supabase
              .from('abandoned_carts')
              .update(cartData)
              .eq('id', abandonedCartId);
              
            if (error && error.code !== '42P01') throw error;
          } else {
            // Create new cart
            const { data, error } = await supabase
              .from('abandoned_carts')
              .insert([cartData])
              .select();
              
            if (error && error.code !== '42P01') throw error;
            if (data && data[0]) {
              setAbandonedCartId(data[0].id);
            }
          }
        } catch (err) {
          // Only log error if it's not a missing table error
          if (err.code !== '42P01') {
            console.error('Error tracking abandoned cart:', err);
          }
        }
      }
    };

    // Only track if there are items in cart
    if (items.length > 0) {
      trackCart();
    }
  }, [items, isAuthenticated, user, abandonedCartId]);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        toast.success('Quantity updated in cart');
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success('Added to cart');
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    toast.success('Removed from cart');
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = async () => {
    setItems([]);
    localStorage.removeItem('cart');
    try {
      if (abandonedCartId) {
        const { error } = await supabase
          .from('abandoned_carts')
          .update({ is_converted: true })
          .eq('id', abandonedCartId);
          
        if (error && error.code !== '42P01') throw error;
        setAbandonedCartId(null);
      }
    } catch (err) {
      // Only log error if it's not a missing table error
      if (err && err.code !== '42P01') {
        console.error('Error updating abandoned cart status:', err);
      }
    }
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};