import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Eye,
  Download,
  Filter,
  Search,
  Calendar
} from 'lucide-react';

const Orders: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const orders = [
    {
      id: 'ORD-001',
      service: 'Google Ads Campaign Management',
      category: 'Digital Marketing',
      status: 'In Progress',
      orderDate: '2024-02-15',
      deliveryDate: '2024-02-25',
      amount: '₹1,500',
      progress: 75,
      description: 'Complete Google Ads campaign setup and management',
      manager: 'Sarah Johnson'
    },
    {
      id: 'ORD-002',
      service: 'Professional Website Development',
      category: 'Web Development',
      status: 'Completed',
      orderDate: '2024-02-10',
      deliveryDate: '2024-02-20',
      amount: '₹3,000',
      progress: 100,
      description: 'Modern, responsive website with SEO optimization',
      manager: 'David Chen'
    },
    {
      id: 'ORD-003',
      service: 'AI Chatbot Development',
      category: 'AI Services',
      status: 'In Progress',
      orderDate: '2024-02-08',
      deliveryDate: '2024-02-28',
      amount: '₹2,500',
      progress: 40,
      description: '24/7 customer support with intelligent AI chatbot',
      manager: 'Sarah Mitchell'
    },
    {
      id: 'ORD-004',
      service: 'Meta Ads Campaign',
      category: 'Digital Marketing',
      status: 'Completed',
      orderDate: '2024-01-25',
      deliveryDate: '2024-02-05',
      amount: '₹1,200',
      progress: 100,
      description: 'Facebook & Instagram advertising campaigns',
      manager: 'David Chen'
    },
    {
      id: 'ORD-005',
      service: 'Lead Generation System',
      category: 'Digital Marketing',
      status: 'Pending',
      orderDate: '2024-02-20',
      deliveryDate: '2024-03-05',
      amount: '₹2,000',
      progress: 10,
      description: 'Automated lead generation with CRM integration',
      manager: 'Sarah Johnson'
    }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status.toLowerCase() === filterStatus;
    const matchesSearch = order.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-100 text-emerald-700';
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return CheckCircle;
      case 'In Progress': return Clock;
      case 'Pending': return AlertCircle;
      default: return Package;
    }
  };

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
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        <p className="text-gray-600 mt-1">Track and manage your service orders</p>
      </motion.div>

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
              placeholder="Search orders..."
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
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order, index) => {
          const StatusIcon = getStatusIcon(order.status);
          
          return (
            <motion.div
              key={order.id}
              variants={fadeIn}
              className="bg-white rounded-xl p-6 custom-shadow hover-lift"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{order.service}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {order.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{order.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Package className="h-4 w-4" />
                      <span>Order #{order.id}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Ordered: {order.orderDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Delivery: {order.deliveryDate}</span>
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
              
              {/* Progress Bar */}
              {order.status !== 'Completed' && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-500">{order.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${order.progress}%` }}
                    />
                  </div>
                </div>
              )}
              
              {/* Order Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Order Details</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{order.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-medium text-emerald-600">{order.amount}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Project Manager</h4>
                  <div className="flex items-center space-x-2">
                    <img 
                      src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                      alt={order.manager}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium">{order.manager}</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Timeline</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Start:</span>
                      <span className="font-medium">{order.orderDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery:</span>
                      <span className="font-medium">{order.deliveryDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <motion.div 
          variants={fadeIn}
          className="text-center py-12"
        >
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Orders;