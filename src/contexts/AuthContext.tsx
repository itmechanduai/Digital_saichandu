import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';

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
  updateProfile: (data: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      if (data) {
        setUser(data as User);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.user) {
        await fetchUserProfile(data.user.id);
        toast.success('Welcome back!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithOTP = async (phone: string): Promise<string> => {
    try {
      // For now, we'll use email-based OTP since phone OTP requires additional setup
      // In production, you'd implement proper SMS OTP
      toast.success(`OTP functionality requires SMS service setup`);
      return '123456'; // Mock OTP for demo
    } catch (error) {
      toast.error('Failed to send OTP');
      throw error;
    }
  };

  const verifyOTP = async (phone: string, otp: string): Promise<void> => {
    try {
      // Mock OTP verification for demo
      if (otp !== '123456') {
        throw new Error('Invalid OTP');
      }

      // Create a mock user for OTP login
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
      toast.success('OTP verified successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Invalid OTP');
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, phone?: string) => {
    try {
      setLoading(true);
      
      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        throw new Error(authError.message);
      }

      if (authData.user) {
        // Create user profile in users table
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: authData.user.id,
              email: email,
              name: name,
              phone: phone,
              role: 'user',
              is_phone_verified: false,
              created_at: new Date().toISOString()
            }
          ]);

        if (profileError) {
          console.error('Error creating user profile:', profileError);
          // Still set the user even if profile creation fails
        }

        // Fetch the complete user profile
        await fetchUserProfile(authData.user.id);
        toast.success('Account created successfully!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Error logging out');
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('users')
        .update({
          name: data.name,
          phone: data.phone,
          avatar: data.avatar,
          is_phone_verified: data.isPhoneVerified
        })
        .eq('id', user.id);

      if (error) {
        throw new Error(error.message);
      }

      // Update local user state
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
      throw error;
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
      isAdmin,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};