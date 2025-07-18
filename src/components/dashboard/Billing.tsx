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

  // No demo billing data
  const billingOverview = {
    currentBalance: '₹0.00',
    nextPayment: '₹0.00',
    paymentDate: '',
    totalSpent: '₹0.00',
    activeServices: 0
  };
  const invoices: any[] = [];
  const paymentMethods: any[] = [];

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
        <h1 className="text-3xl font-bold text-gray-900">Billing</h1>
        <p className="text-gray-600 mt-1">Manage your billing and payment information</p>
      </motion.div>

      {/* Overview */}
      <motion.div 
        variants={fadeIn}
        className="bg-white rounded-xl p-6 custom-shadow"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            <CreditCard className="h-8 w-8 text-blue-600 mb-2" />
            <p className="text-sm text-gray-600">Current Balance</p>
            <p className="text-2xl font-bold text-gray-900">{billingOverview.currentBalance}</p>
          </div>
          <div className="flex flex-col items-center">
            <Calendar className="h-8 w-8 text-emerald-600 mb-2" />
            <p className="text-sm text-gray-600">Next Payment</p>
            <p className="text-2xl font-bold text-emerald-600">{billingOverview.nextPayment}</p>
          </div>
          <div className="flex flex-col items-center">
            <DollarSign className="h-8 w-8 text-purple-600 mb-2" />
            <p className="text-sm text-gray-600">Total Spent</p>
            <p className="text-2xl font-bold text-purple-600">{billingOverview.totalSpent}</p>
          </div>
        </div>
      </motion.div>

      {/* Invoices */}
      <motion.div 
        variants={fadeIn}
        className="bg-white rounded-xl p-6 custom-shadow"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Invoices</h2>
        <div className="space-y-4">
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
            <p className="text-gray-600">You have not received any invoices yet.</p>
          </div>
        </div>
      </motion.div>

      {/* Payment Methods */}
      <motion.div 
        variants={fadeIn}
        className="bg-white rounded-xl p-6 custom-shadow"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Methods</h2>
        <div className="space-y-4">
          <div className="text-center py-12">
            <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No payment methods found</h3>
            <p className="text-gray-600">You have not added any payment methods yet.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Billing;