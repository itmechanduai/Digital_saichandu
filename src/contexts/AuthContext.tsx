import React, { createContext, useContext, useState, ReactNode } from 'react';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
  avatar?: string;
  isPhoneVerified?: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithOTP: (phone: string) => Promise<string>;
  verifyOTP: (phone: string, otp: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser && savedUser !== 'undefined' && savedUser !== 'null') {
      const parsedUser = JSON.parse(savedUser);
      const sessionExpiry = localStorage.getItem('sessionExpiry');
      if (!sessionExpiry || new Date(sessionExpiry) < new Date()) {
        localStorage.removeItem('user');
        localStorage.removeItem('sessionExpiry');
        return null;
      }
      return parsedUser;
    }
    return null;
  });

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication logic
    if (email === 'admin@digitalsaichandu.com' && password === 'admin123') {
      const adminUser: User = {
        id: 'admin-1',
        name: 'Admin User',
        email: email,
        role: 'admin',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
        createdAt: new Date().toISOString()
      };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      
      // Set session expiry to 24 hours
      const expiryTime = new Date();
      expiryTime.setHours(expiryTime.getHours() + 24);
      localStorage.setItem('sessionExpiry', expiryTime.toISOString()); 
      
      toast.success('Welcome back, Admin!');
    } else if (email === 'user@example.com' && password === 'user123') {
      const regularUser: User = {
        id: 'user-1',
        name: 'John Doe',
        email: email,
        role: 'user',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
        createdAt: new Date().toISOString()
      };
      setUser(regularUser);
      localStorage.setItem('user', JSON.stringify(regularUser));
      
      // Set session expiry to 24 hours
      const expiryTime = new Date();
      expiryTime.setHours(expiryTime.getHours() + 24);
      localStorage.setItem('sessionExpiry', expiryTime.toISOString());
      
      toast.success('Welcome back!');
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const loginWithOTP = async (phone: string): Promise<string> => {
    try {
      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, this would call your backend API to send an OTP
      // const response = await axios.post('/api/auth/send-otp', { phone });
      
      // For demo purposes, we'll use a fixed OTP
      const mockOTP = '123456';
      
      // In production, the OTP would be sent to the user's phone
      // and not returned here
      toast.success(`OTP sent to ${phone}`);
      
      return mockOTP; // In production, this would return a request ID or success message
    } catch (error) {
      toast.error('Failed to send OTP');
      throw error;
    }
  };

  const verifyOTP = async (phone: string, otp: string): Promise<void> => {
    try {
      // Simulate API call to verify OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, this would call your backend API to verify the OTP
      // const response = await axios.post('/api/auth/verify-otp', { phone, otp });
      
      // For demo purposes, we'll accept any 6-digit OTP
      if (otp.length !== 6) {
        throw new Error('Invalid OTP');
      }
      
      // Mock user data based on phone number
      const mockUser: User = {
        id: `user-${Date.now()}`,
        name: 'Phone User',
        email: `user${phone.slice(-4)}@example.com`,
        phone,
        role: 'user',
        isPhoneVerified: true,
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
        createdAt: new Date().toISOString()
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Set session expiry to 24 hours
      const expiryTime = new Date();
      expiryTime.setHours(expiryTime.getHours() + 24);
      localStorage.setItem('sessionExpiry', expiryTime.toISOString());
      
      toast.success('OTP verified successfully!');
    } catch (error) {
      toast.error('Invalid OTP. Please try again.');
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, phone?: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      phone,
      role: 'user',
      isPhoneVerified: false,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      createdAt: new Date().toISOString()
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    // Set session expiry to 24 hours
    const expiryTime = new Date();
    expiryTime.setHours(expiryTime.getHours() + 24);
    localStorage.setItem('sessionExpiry', expiryTime.toISOString());
    
    toast.success('Account created successfully!');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('sessionExpiry');
    toast.success('Logged out successfully');
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully');
    }
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{
      user,
      login,
      loginWithOTP,
      verifyOTP,
      register,
      logout,
      updateProfile,
      isAuthenticated,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};