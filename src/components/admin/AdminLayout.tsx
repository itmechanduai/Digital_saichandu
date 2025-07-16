import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Menu, 
  X, 
  Home, 
  ShoppingBag, 
  Package, 
  Search, 
  Users, 
  Share2, 
  Settings, 
  LogOut, 
  Bell, 
  Brain, 
  FileText, 
  Bot, 
  CreditCard, 
  Key, 
  MessageSquare, 
  Shield, 
  ShoppingCart, 
  BarChart, 
  Briefcase, 
  HelpCircle, 
  Zap, 
  Tag, 
  Image as ImageIcon
} from 'lucide-react';

import { useAuth } from '../../contexts/AuthContext';
interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { 
      category: 'Dashboard',
      items: [
        { name: 'Overview', href: '/admin', icon: Home }
      ]
    },
    {
      category: 'Sales & Products',
      items: [
        { name: 'Products', href: '/admin/products', icon: Package },
        { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
        { name: 'Invoices', href: '/admin/invoices', icon: FileText },
        { name: 'Invoice Generator', href: '/admin/invoice-generator', icon: FileText },
        { name: 'Discounts', href: '/admin/discounts', icon: Tag },
        { name: 'Abandoned Carts', href: '/admin/abandoned-carts', icon: ShoppingCart }
      ]
    },
    {
      category: 'Customer Management',
      items: [
        { name: 'CRM Pipeline', href: '/admin/crm-pipeline', icon: Briefcase },
        { name: 'CRM', href: '/admin/crm', icon: Users },
        { name: 'Support Tickets', href: '/admin/support-tickets', icon: MessageSquare }
      ]
    },
    {
      category: 'Marketing',
      items: [
        { name: 'SEO Analytics', href: '/admin/seo', icon: Search },
        { name: 'Social Media', href: '/admin/social', icon: Share2 }
      ]
    },
    {
      category: 'Media',
      items: [
        { name: 'Media Library', href: '/admin/media', icon: ImageIcon }
      ]
    },
    {
      category: 'AI & Automation',
      items: [
        { name: 'AI Bot Agent', href: '/admin/ai-bot', icon: Brain },
        { name: 'Workflow Automation', href: '/admin/automation', icon: Zap }
      ]
    },
    {
      category: 'System',
      items: [
        { name: 'Users', href: '/admin/users', icon: Users },
        { name: 'Payment Gateways', href: '/admin/payment-gateways', icon: CreditCard },
        { name: 'API Keys', href: '/admin/api-keys', icon: Key },
        { name: 'Settings', href: '/admin/settings', icon: Settings }
      ]
    }
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
                src="/DS_logo.jpeg" 
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
          
          <nav className="flex-1 px-4 py-6 overflow-y-auto max-h-[calc(100vh-8rem)]">
            <ul className="space-y-4">
              {navigation.map((category, categoryIndex) => (
                <li key={`category-${categoryIndex}`}>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3">
                    {category.category}
                  </div>
                  <ul className="space-y-1">
                    {category.items.map((item) => {
                      const isActive = location.pathname === item.href;
                      return (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
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
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="border-t px-4 py-4 mt-auto">
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
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:h-screen">
        <div className="flex flex-col h-full bg-white border-r shadow-sm">
          <div className="flex items-center justify-start px-6 py-6 border-b">
            <Link to="/" className="flex items-center">
              <img 
                src="/ds.logo.png" 
                alt="Digital Saichandu" 
                className="h-10 w-auto"
              />
            </Link>
          </div>
          
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <ul className="space-y-4">
              {navigation.map((category, categoryIndex) => (
                <li key={`category-${categoryIndex}`}>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3">
                    {category.category}
                  </div>
                  <ul className="space-y-1">
                    {category.items.map((item) => {
                      const isActive = location.pathname === item.href;
                      return (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
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
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="border-t px-4 py-4 mt-auto">
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
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)} 
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-2"
            >
              <Menu className="h-6 w-6" />
              <span className="font-medium text-gray-900">Admin Panel</span>
            </button>
            
            <div className="flex items-center space-x-4 ml-auto">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative" title="Notifications">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border border-white"></span>
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Help">
                <HelpCircle className="h-5 w-5 text-gray-500" />
              </button>
              
              <div className="flex items-center space-x-3">
                <img 
                  src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-200 hover:border-blue-500 transition-colors"
                />
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-blue-600">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="px-6 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;