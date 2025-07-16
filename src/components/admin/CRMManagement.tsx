// src/components/admin/CRMManagement.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  Plus,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Star,
  MessageCircle,
  UserPlus,
  Download,
  Upload,
  CheckSquare,
  Square,
  AlertTriangle
} from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  signupDate: string;
  status: string;
  phone?: string;
  company?: string;
  leadSource?: string;
  totalSpent?: string;
  lastContact?: string;
  nextFollowUp?: string;
  orders?: number;
  rating?: number;
  tags?: string[];
  notes?: string;
}

// Initial seed data
const initialCustomers: Customer[] = [
  { 
    id: '1', 
    name: 'John Smith', 
    email: 'john@example.com', 
    signupDate: '2025-07-15', 
    status: 'Active',
    phone: '+1 (555) 123-4567',
    company: 'Tech Solutions Inc.',
    leadSource: 'Website',
    totalSpent: '$4,500',
    lastContact: '2024-02-20',
    nextFollowUp: '2024-02-25',
    orders: 3,
    rating: 5,
    tags: ['Premium', 'Google Ads'],
    notes: 'Interested in expanding digital marketing services'
  },
  { 
    id: '2', 
    name: 'Mary Jones', 
    email: 'mary@example.com', 
    signupDate: '2025-07-10', 
    status: 'Pending',
    phone: '+1 (555) 234-5678',
    company: 'Growth Marketing Co.',
    leadSource: 'Referral',
    totalSpent: '$0',
    lastContact: '2024-02-18',
    nextFollowUp: '2024-02-22',
    orders: 0,
    rating: 4,
    tags: ['Lead', 'AI Services'],
    notes: 'Requested demo for AI chatbot solution'
  },
  {
    id: '3',
    name: 'Mike Wilson',
    email: 'mike@example.com',
    signupDate: '2025-07-08',
    status: 'Active',
    phone: '+1 (555) 345-6789',
    company: 'Local Business LLC',
    leadSource: 'Google Ads',
    totalSpent: '$2,800',
    lastContact: '2024-02-19',
    nextFollowUp: '2024-02-26',
    orders: 2,
    rating: 5,
    tags: ['Recurring', 'Website'],
    notes: 'Regular website maintenance client'
  },
  {
    id: '4',
    name: 'Sarah Davis',
    email: 'sarah@example.com',
    signupDate: '2025-07-05',
    status: 'Active',
    phone: '+1 (555) 456-7890',
    company: 'E-commerce Store',
    leadSource: 'Social Media',
    totalSpent: '$1,200',
    lastContact: '2024-02-17',
    nextFollowUp: '2024-02-24',
    orders: 1,
    rating: 4,
    tags: ['E-commerce', 'Meta Ads'],
    notes: 'Looking to expand social media presence'
  },
  {
    id: '5',
    name: 'David Chen',
    email: 'david@example.com',
    signupDate: '2025-07-03',
    status: 'Inactive',
    phone: '+1 (555) 567-8901',
    company: 'Startup Inc.',
    leadSource: 'Referral',
    totalSpent: '$800',
    lastContact: '2024-01-15',
    nextFollowUp: '2024-03-01',
    orders: 1,
    rating: 3,
    tags: ['Startup', 'Budget'],
    notes: 'Small budget, potential for growth'
  }
];

export default function CRMManagement() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (customer.company || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Bulk Selection Functions
  const handleSelectAll = () => {
    if (selectedCustomers.length === filteredCustomers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(filteredCustomers.map(c => c.id));
    }
  };

  const handleSelectCustomer = (customerId: string) => {
    setSelectedCustomers(prev => 
      prev.includes(customerId) 
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };

  const isAllSelected = selectedCustomers.length === filteredCustomers.length && filteredCustomers.length > 0;
  const isPartiallySelected = selectedCustomers.length > 0 && selectedCustomers.length < filteredCustomers.length;

  // Bulk Operations
  const handleBulkDelete = () => {
    setCustomers(prev => prev.filter(customer => !selectedCustomers.includes(customer.id)));
    setSelectedCustomers([]);
    setShowDeleteConfirm(false);
  };

  const handleBulkExport = () => {
    const selectedCustomersData = customers.filter(c => selectedCustomers.includes(c.id));
    const csvContent = [
      ['ID', 'Name', 'Email', 'Company', 'Status', 'Total Spent'],
      ...selectedCustomersData.map(c => [
        c.id,
        c.name,
        c.email,
        c.company || '',
        c.status,
        c.totalSpent || '$0'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'selected-customers.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleBulkUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xlsx,.xls';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('File selected for bulk upload:', file.name);
        alert(`File "${file.name}" selected for bulk upload. This would process the file and add customers.`);
      }
    };
    input.click();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-emerald-100 text-emerald-700';
      case 'pending': return 'bg-blue-100 text-blue-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'churned': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status.toLowerCase() === 'active').length;
  const prospects = customers.filter(c => c.status.toLowerCase() === 'pending').length;
  const totalRevenue = customers.reduce((sum, customer) => {
    const spent = parseFloat((customer.totalSpent || '$0').replace('$', '').replace(',', ''));
    return sum + spent;
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">CRM: Customer List</h1>
            <p className="text-gray-600 mt-1">Manage customer relationships and track interactions</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2">
              <Download className="h-5 w-5" />
              <span>Export</span>
            </button>
            <button 
              onClick={handleBulkUpload}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
            >
              <Upload className="h-5 w-5" />
              <span>Bulk Upload</span>
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <UserPlus className="h-5 w-5" />
              <span>Add Customer</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          variants={fadeIn}
          className="bg-white rounded-xl p-6 custom-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
              {selectedCustomers.length > 0 && (
                <p className="text-sm text-blue-600">{selectedCustomers.length} selected</p>
              )}
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="bg-white rounded-xl p-6 custom-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Customers</p>
              <p className="text-2xl font-bold text-gray-900">{activeCustomers}</p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-lg">
              <UserPlus className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="bg-white rounded-xl p-6 custom-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Prospects</p>
              <p className="text-2xl font-bold text-gray-900">{prospects}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Star className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="bg-white rounded-xl p-6 custom-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedCustomers.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-blue-700 font-medium">
                {selectedCustomers.length} customer{selectedCustomers.length !== 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleBulkExport}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Export Selected</span>
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete Selected</span>
              </button>
              <button
                onClick={() => setSelectedCustomers([])}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </motion.div>
      )}

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
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
              <option value="churned">Churned</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Customers Table */}
      <motion.div 
        variants={fadeIn}
        className="bg-white rounded-xl custom-shadow overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={handleSelectAll}
                    className="flex items-center space-x-2 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                  >
                    {isAllSelected ? (
                      <CheckSquare className="h-4 w-4 text-blue-600" />
                    ) : isPartiallySelected ? (
                      <div className="h-4 w-4 bg-blue-600 rounded border-2 border-blue-600 flex items-center justify-center">
                        <div className="h-1 w-2 bg-white"></div>
                      </div>
                    ) : (
                      <Square className="h-4 w-4" />
                    )}
                    <span>Select</span>
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S.No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Signup Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer, index) => (
                <tr 
                  key={customer.id} 
                  className={`hover:bg-gray-50 ${selectedCustomers.includes(customer.id) ? 'bg-blue-50' : ''}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleSelectCustomer(customer.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {selectedCustomers.includes(customer.id) ? (
                        <CheckSquare className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Square className="h-4 w-4" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img 
                        src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                        alt={customer.name}
                        className="w-10 h-10 rounded-full object-cover mr-4"
                      />
                      <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.signupDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(customer.status)}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.company || 'No company'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {customer.totalSpent || '$0'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-emerald-600 hover:text-emerald-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900">
                        <MessageCircle className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-red-100 p-2 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Confirm Bulk Delete</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {selectedCustomers.length} selected customer{selectedCustomers.length !== 1 ? 's' : ''}? 
              This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkDelete}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete All
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {filteredCustomers.length === 0 && (
        <motion.div 
          variants={fadeIn}
          className="text-center py-12"
        >
          <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </motion.div>
  );
}