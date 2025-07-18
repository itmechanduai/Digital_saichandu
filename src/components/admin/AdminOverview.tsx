import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  DollarSign,
  TrendingUp,
  Calendar,
  Eye,
  ArrowRight,
  Clock,
  Filter,
  Download,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const AdminOverview: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stats = [
    {
      title: 'Total Products',
      value: '24',
      change: '+3 this month',
      changeType: 'positive',
      icon: Package,
      color: 'blue'
    },
    {
      title: 'Total Orders',
      value: '156',
      change: '+12% from last month',
      changeType: 'positive',
      icon: ShoppingBag,
      color: 'emerald'
    },
    {
      title: 'Total Users',
      value: '89',
      change: '+8 new users',
      changeType: 'positive',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Revenue',
      value: '₹45,230',
      change: '+18% from last month',
      changeType: 'positive',
      icon: DollarSign,
      color: 'orange'
    }
  ];

  const recentOrders: any[] = [];

  const quickActions = [
    {
      title: 'Add New Product',
      description: 'Create a new service offering',
      icon: Package,
      link: '/admin/products',
      color: 'blue'
    },
    {
      title: 'View Orders',
      description: 'Manage customer orders',
      icon: ShoppingBag,
      link: '/admin/orders',
      color: 'emerald'
    },
    {
      title: 'Manage Users',
      description: 'View and manage users',
      icon: Users,
      link: '/admin/users',
      color: 'purple'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-100 text-emerald-700';
      case 'Processing': return 'bg-blue-100 text-blue-700';
      case 'In Progress': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Traffic by hour data
  const hourlyTrafficData: any[] = [];

  // Daily revenue data
  const dailyRevenueData: any[] = [];

  // Service category distribution
  const serviceCategoryData: any[] = [];

  // Traffic source data
  const trafficSourceData: any[] = [];

  // User acquisition data
  const userAcquisitionData: any[] = [];

  // Colors for charts
  const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899'];

  // Filter data based on time range
  const filterDataByTimeRange = (data: any[]) => {
    // In a real implementation, this would filter based on the selected time range
    return data;
  };

  const filteredHourlyData = filterDataByTimeRange(hourlyTrafficData);
  const filteredRevenueData = filterDataByTimeRange(dailyRevenueData);
  const filteredUserData = filterDataByTimeRange(userAcquisitionData);

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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your business.</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="1d">Today</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
              <option value="all">All time</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Download className="h-5 w-5" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Dashboard Tabs */}
      <motion.div variants={fadeIn} className="bg-white rounded-xl custom-shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('traffic')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'traffic'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Traffic Analytics
            </button>
            <button
              onClick={() => setActiveTab('sales')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'sales'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Sales & Revenue
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              User Analytics
            </button>
          </nav>
        </div>
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
                  stat.changeType === 'positive' ? 'text-emerald-600' : 'text-red-600'
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

      {activeTab === 'overview' && (
        <>
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
                  to="/admin/orders"
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
                        <h4 className="font-medium text-gray-900">{order.customer}</h4>
                        <p className="text-sm text-gray-600">{order.service}</p>
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
                      <span className="text-sm text-gray-600">#{order.id}</span>
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

          {/* Hourly Traffic Chart */}
          <motion.div 
            variants={fadeIn}
            className="bg-white rounded-xl p-6 custom-shadow"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Hourly Traffic & Orders</h3>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">24-hour view</span>
              </div>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredHourlyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
                  <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="visitors" name="Visitors" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="orders" name="Orders" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Service Distribution & Traffic Sources */}
          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div 
              variants={fadeIn}
              className="bg-white rounded-xl p-6 custom-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Service Category Distribution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={serviceCategoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {serviceCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeIn}
              className="bg-white rounded-xl p-6 custom-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Traffic Sources</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={trafficSourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {trafficSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </>
      )}

      {activeTab === 'traffic' && (
        <>
          {/* Hourly Traffic Detailed View */}
          <motion.div 
            variants={fadeIn}
            className="bg-white rounded-xl p-6 custom-shadow"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Detailed Hourly Traffic Analysis</h3>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Visitors</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Conversion Rate</span>
                </div>
              </div>
            </div>
            
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={filteredHourlyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
                  <YAxis yAxisId="right" orientation="right" stroke="#10B981" domain={[0, 20]} />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="visitors" name="Visitors" stroke="#3B82F6" activeDot={{ r: 8 }} />
                  <Line yAxisId="right" type="monotone" dataKey="orders" name="Orders" stroke="#10B981" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Peak Traffic Hour</h4>
                <p className="text-xl font-bold text-blue-700">18:00</p>
                <p className="text-sm text-gray-600">120 visitors</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Best Conversion Hour</h4>
                <p className="text-xl font-bold text-emerald-700">17:00</p>
                <p className="text-sm text-gray-600">10.5% conversion rate</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Avg. Daily Visitors</h4>
                <p className="text-xl font-bold text-purple-700">1,245</p>
                <p className="text-sm text-gray-600">+15% from last month</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Avg. Session Duration</h4>
                <p className="text-xl font-bold text-orange-700">4:32</p>
                <p className="text-sm text-gray-600">minutes:seconds</p>
              </div>
            </div>
          </motion.div>

          {/* Traffic Sources Detailed */}
          <motion.div 
            variants={fadeIn}
            className="bg-white rounded-xl p-6 custom-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Traffic Sources Breakdown</h3>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={trafficSourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {trafficSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Top Referral Sources</h4>
                <div className="space-y-3">
                  {[
                    { source: 'Google', visits: 1245, conversion: 3.2 },
                    { source: 'Facebook', visits: 845, conversion: 2.8 },
                    { source: 'Instagram', visits: 645, conversion: 3.5 },
                    { source: 'LinkedIn', visits: 425, conversion: 4.2 },
                    { source: 'Twitter', visits: 325, conversion: 1.8 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{item.source}</p>
                        <p className="text-sm text-gray-600">{item.visits} visits</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-emerald-600">{item.conversion}%</p>
                        <p className="text-xs text-gray-600">conversion rate</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {activeTab === 'sales' && (
        <>
          {/* Revenue Chart */}
          <motion.div 
            variants={fadeIn}
            className="bg-white rounded-xl p-6 custom-shadow"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Daily Revenue</h3>
              <div className="flex items-center space-x-3">
                <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm font-medium">
                  Export Data
                </button>
              </div>
            </div>
            
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={filteredRevenueData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip formatter={(value) => `₹${value}`} />
                  <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Total Revenue</h4>
                <p className="text-xl font-bold text-blue-700">₹45,230</p>
                <p className="text-sm text-gray-600">This month</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Average Order Value</h4>
                <p className="text-xl font-bold text-emerald-700">₹1,850</p>
                <p className="text-sm text-gray-600">+12% from last month</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Conversion Rate</h4>
                <p className="text-xl font-bold text-purple-700">3.2%</p>
                <p className="text-sm text-gray-600">+0.5% from last month</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Projected Revenue</h4>
                <p className="text-xl font-bold text-orange-700">₹52,000</p>
                <p className="text-sm text-gray-600">Next month</p>
              </div>
            </div>
          </motion.div>

          {/* Service Category Distribution */}
          <motion.div 
            variants={fadeIn}
            className="bg-white rounded-xl p-6 custom-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Sales by Service Category</h3>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { category: 'Digital Marketing', revenue: 20500 },
                      { category: 'AI Services', revenue: 15200 },
                      { category: 'Web Development', revenue: 7800 },
                      { category: 'Consulting', revenue: 4500 }
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₹${value}`} />
                    <Legend />
                    <Bar dataKey="revenue" name="Revenue" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Top Selling Services</h4>
                <div className="space-y-3">
                  {[
                    { service: 'Google Ads Campaign Management', revenue: 12500, growth: 15 },
                    { service: 'AI Chatbot Development', revenue: 8200, growth: 22 },
                    { service: 'Website Development', revenue: 7800, growth: 10 },
                    { service: 'Meta Ads Campaign', revenue: 6800, growth: 8 },
                    { service: 'Lead Generation System', revenue: 5200, growth: 18 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{item.service}</p>
                        <p className="text-sm text-gray-600">₹{item.revenue.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-emerald-600">+{item.growth}%</p>
                        <p className="text-xs text-gray-600">growth</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {activeTab === 'users' && (
        <>
          {/* User Acquisition Chart */}
          <motion.div 
            variants={fadeIn}
            className="bg-white rounded-xl p-6 custom-shadow"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">User Acquisition</h3>
              <div className="flex items-center space-x-3">
                <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm font-medium">
                  Export Data
                </button>
              </div>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={filteredUserData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" name="New Users" stroke="#8B5CF6" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Total Users</h4>
                <p className="text-xl font-bold text-blue-700">1,245</p>
                <p className="text-sm text-gray-600">All time</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Active Users</h4>
                <p className="text-xl font-bold text-emerald-700">845</p>
                <p className="text-sm text-gray-600">Last 30 days</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-1">New Users</h4>
                <p className="text-xl font-bold text-purple-700">125</p>
                <p className="text-sm text-gray-600">This month</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Churn Rate</h4>
                <p className="text-xl font-bold text-orange-700">2.3%</p>
                <p className="text-sm text-gray-600">This month</p>
              </div>
            </div>
          </motion.div>

          {/* User Demographics */}
          <motion.div 
            variants={fadeIn}
            className="bg-white rounded-xl p-6 custom-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">User Demographics</h3>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: '18-24', value: 15 },
                        { name: '25-34', value: 35 },
                        { name: '35-44', value: 25 },
                        { name: '45-54', value: 15 },
                        { name: '55+', value: 10 }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {trafficSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Male', value: 55 },
                        { name: 'Female', value: 42 },
                        { name: 'Other', value: 3 }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {trafficSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* Performance Chart */}
      <motion.div 
        variants={fadeIn}
        className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-6"
      >
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">Business Performance</h3>
            <p className="text-gray-600">
              Your business is growing! Revenue is up 18% this month with 156 total orders processed.
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-emerald-600">+18%</div>
            <div className="text-sm text-gray-600">This Month</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminOverview;