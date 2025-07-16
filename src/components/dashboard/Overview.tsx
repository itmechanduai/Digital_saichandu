import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Package, 
  DollarSign, 
  Clock, 
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Calendar,
  Star
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Overview: React.FC = () => {
  const { user } = useAuth();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stats = [
    {
      title: 'Total Orders',
      value: '12',
      change: '+2 this month',
      changeType: 'positive',
      icon: Package,
      color: 'blue'
    },
    {
      title: 'Total Spent',
      value: '$15,420',
      change: '+$2,400 this month',
      changeType: 'positive',
      icon: DollarSign,
      color: 'emerald'
    },
    {
      title: 'Active Services',
      value: '5',
      change: '2 in progress',
      changeType: 'neutral',
      icon: Clock,
      color: 'orange'
    },
    {
      title: 'Completed',
      value: '7',
      change: '100% success rate',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'purple'
    }
  ];

  const recentOrders = [
    {
      id: 'ORD-001',
      service: 'Google Ads Campaign',
      status: 'In Progress',
      date: '2024-02-15',
      amount: '$1,500',
      progress: 75
    },
    {
      id: 'ORD-002',
      service: 'Website Development',
      status: 'Completed',
      date: '2024-02-10',
      amount: '$3,000',
      progress: 100
    },
    {
      id: 'ORD-003',
      service: 'AI Chatbot',
      status: 'In Progress',
      date: '2024-02-08',
      amount: '$2,500',
      progress: 40
    }
  ];

  const quickActions = [
    {
      title: 'Browse Services',
      description: 'Explore our digital marketing and AI solutions',
      icon: Package,
      link: '/products',
      color: 'blue'
    },
    {
      title: 'View Orders',
      description: 'Track your current and past orders',
      icon: Clock,
      link: '/dashboard/orders',
      color: 'emerald'
    },
    {
      title: 'Download Invoices',
      description: 'Access your billing documents',
      icon: DollarSign,
      link: '/dashboard/invoices',
      color: 'purple'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-100 text-emerald-700';
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
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
      {/* Welcome Section */}
      <motion.div variants={fadeIn}>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600 mt-1">Here's an overview of your account and recent activity.</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            className="bg-white rounded-xl p-6 custom-shadow hover-lift"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 ${
                  stat.changeType === 'positive' ? 'text-emerald-600' : 
                  stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stat.change}
                </p>
              </div>
              <div className={`bg-${stat.color}-100 p-3 rounded-lg`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <motion.div 
          variants={fadeIn}
          className="bg-white rounded-xl p-6 custom-shadow"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <Link
              to="/dashboard/orders"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{order.service}</h4>
                    <p className="text-sm text-gray-600">Order #{order.id}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <p className="text-sm text-gray-600 mt-1">{order.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">{order.amount}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${order.progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">{order.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          variants={fadeIn}
          className="bg-white rounded-xl p-6 custom-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          
          <div className="space-y-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className={`block p-4 bg-${action.color}-50 hover:bg-${action.color}-100 rounded-lg transition-colors`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`bg-${action.color}-100 p-2 rounded-lg`}>
                    <action.icon className={`h-6 w-6 text-${action.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{action.title}</h4>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Performance Insights */}
      <motion.div 
        variants={fadeIn}
        className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-6"
      >
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">Your Growth Summary</h3>
            <p className="text-gray-600">
              Your digital marketing campaigns have generated a 300% increase in leads this quarter. 
              Keep up the great work!
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-emerald-600">+300%</div>
            <div className="text-sm text-gray-600">Lead Growth</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Overview;