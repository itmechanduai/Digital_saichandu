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

  // No demo stats or orders
  const stats: any[] = [];
  const recentOrders: any[] = [];
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
        {stats.length === 0 && (
          <div className="col-span-4 text-center text-gray-500 py-12">
            No stats to display yet.
          </div>
        )}
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
            {recentOrders.length === 0 && (
              <div className="text-center text-gray-500 py-8">No orders found.</div>
            )}
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
      {/* Removed demo growth summary */}
    </motion.div>
  );
};

export default Overview;