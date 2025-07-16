import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Menu, 
  X, 
  Home, 
  Package, 
  FileText, 
  User,
  LogOut,
  Bell,
  Zap,
  Settings,
  ShoppingBag,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: Home },
    { name: 'My Orders', href: '/dashboard/orders', icon: Package },
    { name: 'Invoices', href: '/dashboard/invoices', icon: FileText },
    { name: 'Support', href: '/support', icon: MessageSquare },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          className="relative flex flex-col max-w-xs w-full bg-white h-full shadow-xl"
        >
          <div className="flex items-center justify-between px-4 py-6 border-b">
            <Link to="/">
              <img
                src="/ds.logo.png"
                alt="Digital Saichandu"
                className="h-10 w-auto"
              />
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          <div className="border-t px-4 py-4 space-y-2">
            <Link
              to="/products"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center space-x-3 w-full px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="font-medium">Shop Services</span>
            </Link>
            
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center space-x-3 w-full px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Settings className="h-5 w-5" />
                <span className="font-medium">Admin Panel</span>
              </Link>
            )}
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r shadow-sm">
          <div className="flex items-center px-6 py-6 border-b">
            <Link to="/">
              <img 
                src="/ds.logo.png" 
                alt="Digital Saichandu" 
                className="h-10 w-auto"
              />
            </Link>
          </div>
          
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          <div className="border-t px-4 py-4 space-y-2">
            <Link
              to="/products"
              className="flex items-center space-x-3 w-full px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="font-medium">Shop Services</span>
            </Link>
            
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center space-x-3 w-full px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Settings className="h-5 w-5" />
                <span className="font-medium">Admin Panel</span>
              </Link>
            )}
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center space-x-3">
                <img 
                  src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'}
                  alt={user?.name}
                 className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;