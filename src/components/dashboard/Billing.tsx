import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Download, 
  Calendar, 
  DollarSign,
  FileText,
  AlertCircle,
  CheckCircle,
  Eye
} from 'lucide-react';

const Billing: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const billingOverview = {
    currentBalance: '₹2,450.00',
    nextPayment: '₹3,200.00',
    paymentDate: '2024-03-15',
    totalSpent: '₹28,750.00',
    activeServices: 5
  };

  const invoices = [
    {
      id: 'INV-2024-001',
      date: '2024-02-15',
      amount: '₹3,200.00',
      status: 'paid',
      services: ['Google Ads Management', 'Website Maintenance'],
      dueDate: '2024-03-01'
    },
    {
      id: 'INV-2024-002',
      date: '2024-01-15',
      amount: '₹2,800.00',
      status: 'paid',
      services: ['Meta Ads Campaign', 'AI Chatbot Development'],
      dueDate: '2024-02-01'
    },
    {
      id: 'INV-2024-003',
      date: '2024-01-01',
      amount: '₹4,500.00',
      status: 'paid',
      services: ['Website Redesign', 'SEO Optimization'],
      dueDate: '2024-01-15'
    },
    {
      id: 'INV-2024-004',
      date: '2024-03-01',
      amount: '₹2,900.00',
      status: 'pending',
      services: ['Lead Generation System', 'Analytics Setup'],
      dueDate: '2024-03-15'
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: 'credit',
      brand: 'Visa',
      last4: '4242',
      expires: '12/25',
      isDefault: true
    },
    {
      id: 2,
      type: 'credit',
      brand: 'Mastercard',
      last4: '8888',
      expires: '06/26',
      isDefault: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-emerald-100 text-emerald-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return CheckCircle;
      case 'pending': return AlertCircle;
      case 'overdue': return AlertCircle;
      default: return FileText;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'invoices', label: 'Invoices' },
    { id: 'payments', label: 'Payment Methods' }
  ];

  return (
    <motion.div 
      className="space-y-6"
      initial="initial"
      animate="animate"
      variants={{
        animate: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {/* Header */}
      <motion.div variants={fadeIn}>
        <h1 className="text-3xl font-bold text-gray-900">Billing & Invoices</h1>
        <p className="text-gray-600 mt-1">Manage your payments and billing information</p>
      </motion.div>

      {/* Tabs */}
      <motion.div 
        variants={fadeIn}
        className="bg-white rounded-xl custom-shadow"
      >
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Billing Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600">Current Balance</p>
                      <p className="text-2xl font-bold text-blue-900">{billingOverview.currentBalance}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                
                <div className="bg-emerald-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-emerald-600">Next Payment</p>
                      <p className="text-2xl font-bold text-emerald-900">{billingOverview.nextPayment}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-emerald-600" />
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-600">Total Spent</p>
                      <p className="text-2xl font-bold text-purple-900">{billingOverview.totalSpent}</p>
                    </div>
                    <FileText className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-orange-600">Active Services</p>
                      <p className="text-2xl font-bold text-orange-900">{billingOverview.activeServices}</p>
                    </div>
                    <CreditCard className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
              </div>

              {/* Next Payment */}
              <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Payment Due</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{billingOverview.nextPayment}</p>
                    <p className="text-gray-600">Due on {billingOverview.paymentDate}</p>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'invoices' && (
            <div className="space-y-4">
              {invoices.map((invoice) => {
                const StatusIcon = getStatusIcon(invoice.status);
                
                return (
                  <div key={invoice.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{invoice.id}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Amount</p>
                            <p className="font-medium">{invoice.amount}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Invoice Date</p>
                            <p className="font-medium">{invoice.date}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Due Date</p>
                            <p className="font-medium">{invoice.dueDate}</p>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <p className="text-gray-600 text-sm mb-1">Services:</p>
                          <div className="flex flex-wrap gap-2">
                            {invoice.services.map((service, index) => (
                              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                          <Eye className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                          <Download className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Add Payment Method
                </button>
              </div>
              
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <CreditCard className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-gray-900">
                              {method.brand} •••• {method.last4}
                            </p>
                            {method.isDefault && (
                              <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-medium">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">Expires {method.expires}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Billing;