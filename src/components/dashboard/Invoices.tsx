import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  Filter,
  Search,
  Mail
} from 'lucide-react';

const Invoices: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const invoices = [
    {
      id: 'INV-2024-001',
      orderNumber: 'ORD-001',
      service: 'Google Ads Campaign Management',
      date: '2024-02-15',
      dueDate: '2024-03-01',
      amount: '₹1,500.00',
      tax: '₹150.00',
      total: '₹1,650.00',
      status: 'Paid',
      paymentDate: '2024-02-20'
    },
    {
      id: 'INV-2024-002',
      orderNumber: 'ORD-002',
      service: 'Professional Website Development',
      date: '2024-02-10',
      dueDate: '2024-02-25',
      amount: '₹3,000.00',
      tax: '₹300.00',
      total: '₹3,300.00',
      status: 'Paid',
      paymentDate: '2024-02-15'
    },
    {
      id: 'INV-2024-003',
      orderNumber: 'ORD-003',
      service: 'AI Chatbot Development',
      date: '2024-02-08',
      dueDate: '2024-02-23',
      amount: '₹2,500.00',
      tax: '₹250.00',
      total: '₹2,750.00',
      status: 'Pending',
      paymentDate: null
    },
    {
      id: 'INV-2024-004',
      orderNumber: 'ORD-004',
      service: 'Meta Ads Campaign',
      date: '2024-01-25',
      dueDate: '2024-02-10',
      amount: '₹1,200.00',
      tax: '₹120.00',
      total: '₹1,320.00',
      status: 'Paid',
      paymentDate: '2024-02-05'
    },
    {
      id: 'INV-2024-005',
      orderNumber: 'ORD-005',
      service: 'Lead Generation System',
      date: '2024-02-20',
      dueDate: '2024-03-05',
      amount: '₹2,000.00',
      tax: '₹200.00',
      total: '₹2,200.00',
      status: 'Overdue',
      paymentDate: null
    }
  ];

  const filteredInvoices = invoices.filter(invoice => {
    const matchesStatus = filterStatus === 'all' || invoice.status.toLowerCase() === filterStatus;
    const matchesSearch = invoice.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-emerald-100 text-emerald-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid': return CheckCircle;
      case 'Pending': return Clock;
      case 'Overdue': return AlertCircle;
      default: return FileText;
    }
  };

  const totalAmount = filteredInvoices.reduce((sum, invoice) => {
    return sum + parseFloat(invoice.total.replace('$', '').replace(',', ''));
  }, 0);

  const paidAmount = filteredInvoices
    .filter(invoice => invoice.status === 'Paid')
    .reduce((sum, invoice) => {
      return sum + parseFloat(invoice.total.replace('$', '').replace(',', ''));
    }, 0);

  const pendingAmount = filteredInvoices
    .filter(invoice => invoice.status !== 'Paid')
    .reduce((sum, invoice) => {
      return sum + parseFloat(invoice.total.replace('$', '').replace(',', ''));
    }, 0);

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
        <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
        <p className="text-gray-600 mt-1">View and download your billing documents</p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          variants={fadeIn}
          className="bg-white rounded-xl p-6 custom-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Invoiced</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalAmount.toLocaleString()}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="bg-white rounded-xl p-6 custom-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Paid Amount</p>
              <p className="text-2xl font-bold text-emerald-600">₹{paidAmount.toLocaleString()}</p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="bg-white rounded-xl p-6 custom-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Outstanding</p>
              <p className="text-2xl font-bold text-red-600">₹{pendingAmount.toLocaleString()}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div 
        variants={fadeIn}
        className="bg-white rounded-xl p-6 custom-shadow"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Invoices List */}
      <div className="space-y-4">
        {filteredInvoices.map((invoice, index) => {
          const StatusIcon = getStatusIcon(invoice.status);
          
          return (
            <motion.div
              key={invoice.id}
              variants={fadeIn}
              className="bg-white rounded-xl p-6 custom-shadow hover-lift"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{invoice.id}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {invoice.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{invoice.service}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <FileText className="h-4 w-4" />
                      <span>Order #{invoice.orderNumber}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Issued: {invoice.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Due: {invoice.dueDate}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                    <Eye className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              {/* Invoice Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Amount Details</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">{invoice.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax:</span>
                      <span className="font-medium">{invoice.tax}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-1">
                      <span className="text-gray-900 font-semibold">Total:</span>
                      <span className="font-semibold text-blue-600">{invoice.total}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Payment Info</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`font-medium ${
                        invoice.status === 'Paid' ? 'text-emerald-600' : 
                        invoice.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {invoice.status}
                      </span>
                    </div>
                    {invoice.paymentDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Paid on:</span>
                        <span className="font-medium">{invoice.paymentDate}</span>
                        <button className="text-purple-600 hover:text-purple-900">
                          <Mail className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Actions</h4>
                  <div className="space-y-2">
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center space-x-2">
                      <Download className="h-4 w-4" />
                      <span>Download PDF</span>
                    </button>
                    {invoice.status !== 'Paid' && (
                      <button className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium flex items-center justify-center space-x-2">
                        <DollarSign className="h-4 w-4" />
                        <span>Pay Now</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredInvoices.length === 0 && (
        <motion.div 
          variants={fadeIn}
          className="text-center py-12"
        >
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Invoices;