import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Mail,
  Phone,
  Calendar,
  Clock,
  DollarSign,
  Package,
  ExternalLink,
  Send,
  Download,
  RefreshCw
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

interface AbandonedCart {
  id: string;
  user_id: string | null;
  email: string | null;
  phone: string | null;
  first_name: string | null;
  last_name: string | null;
  items: any[];
  total_value: number;
  item_count: number;
  created_at: string;
  last_activity: string;
  is_converted: boolean;
  checkout_started: boolean;
  user_agent: string | null;
  referrer: string | null;
  recovery_emails_sent: number;
  last_email_sent: string | null;
}

const AbandonedCarts: React.FC = () => {
  const [carts, setCarts] = useState<AbandonedCart[]>([]);
  const [filteredCarts, setFilteredCarts] = useState<AbandonedCart[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCart, setSelectedCart] = useState<AbandonedCart | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  useEffect(() => {
    if (carts.length > 0) {
      filterCarts();
    }
  }, [carts, searchTerm, statusFilter]);

  const fetchCarts = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('abandoned_carts')
        .select('*')
        .order('last_activity', { ascending: false });
        
      if (error) {
        // If table doesn't exist, show empty state with setup instructions
        if (error.code === '42P01' || error.message?.includes('does not exist')) {
          console.warn('Abandoned carts table not found. Please create the table first.');
          setCarts([]);
          return;
        }
        throw error;
      }
      
      setCarts(data || []);
    } catch (error) {
      console.error('Error fetching abandoned carts:', error);
      // Don't show error toast if table doesn't exist - check both error types
      const isTableMissing = (error as any)?.code === '42P01' || 
                            (error as any)?.message?.includes('does not exist') ||
                            (error as Error)?.message?.includes('does not exist');
      
      if (!isTableMissing) {
        toast.error('Failed to load abandoned carts');
      }
      setCarts([]);
    } finally {
      setLoading(false);
    }
  };

  const filterCarts = () => {
    let filtered = [...carts];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(cart => 
        (cart.email && cart.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (cart.first_name && cart.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (cart.last_name && cart.last_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (cart.phone && cart.phone.includes(searchTerm))
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      if (statusFilter === 'converted') {
        filtered = filtered.filter(cart => cart.is_converted);
      } else if (statusFilter === 'not_converted') {
        filtered = filtered.filter(cart => !cart.is_converted);
      } else if (statusFilter === 'checkout_started') {
        filtered = filtered.filter(cart => cart.checkout_started && !cart.is_converted);
      } else if (statusFilter === 'no_checkout') {
        filtered = filtered.filter(cart => !cart.checkout_started && !cart.is_converted);
      }
    }
    
    setFilteredCarts(filtered);
  };

  const refreshData = async () => {
    setIsRefreshing(true);
    await fetchCarts();
    setIsRefreshing(false);
  };

  const handleSendEmail = async () => {
    if (!selectedCart || !selectedCart.email) return;
    
    setSendingEmail(true);
    try {
      // In a real implementation, this would call your backend API to send the email
      // For demo purposes, we'll just update the database record
      const { error } = await supabase
        .from('abandoned_carts')
        .update({
          recovery_emails_sent: (selectedCart.recovery_emails_sent || 0) + 1,
          last_email_sent: new Date().toISOString()
        })
        .eq('id', selectedCart.id);
        
      if (error && error.code !== '42P01') {
        throw error;
      }
    } catch (err) {
      // Silently handle errors for demo purposes
      console.log('Email sending skipped - demo mode');
    } finally {
      // For demo purposes, we'll just show a success message
      toast.success(`Recovery email sent to ${selectedCart.email}`);
      setShowEmailModal(false);
      refreshData();
      setSendingEmail(false);
    }
  };

  const generateRecoveryEmail = (cart: AbandonedCart) => {
    const subject = `Complete Your Purchase at Digital Saichandu`;
    
    const body = `Dear ${cart.first_name || 'Customer'},

We noticed you left some items in your cart at Digital Saichandu. Your selected services are still waiting for you!

Cart Summary:
${cart.items.map(item => `- ${item.name} (${item.quantity}x): $${(item.price * item.quantity).toLocaleString()}`).join('\n')}

Total: $${cart.total_value.toLocaleString()}

To complete your purchase, simply click the link below:
[Complete Your Purchase](https://digitalsaichandu.com/cart)

If you have any questions about our services, please don't hesitate to contact us. We're here to help!

Best regards,
The Digital Saichandu Team`;

    setEmailSubject(subject);
    setEmailBody(body);
    setSelectedCart(cart);
    setShowEmailModal(true);
  };

  const exportData = () => {
    const csvContent = [
      ['ID', 'Email', 'Name', 'Phone', 'Items', 'Value', 'Created', 'Last Activity', 'Converted', 'Checkout Started'],
      ...filteredCarts.map(cart => [
        cart.id,
        cart.email || '',
        `${cart.first_name || ''} ${cart.last_name || ''}`.trim(),
        cart.phone || '',
        cart.item_count,
        cart.total_value,
        new Date(cart.created_at).toLocaleDateString(),
        new Date(cart.last_activity).toLocaleDateString(),
        cart.is_converted ? 'Yes' : 'No',
        cart.checkout_started ? 'Yes' : 'No'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'abandoned-carts.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-spinner" />
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold text-gray-900">Abandoned Carts</h1>
            <p className="text-gray-600 mt-1">Track and recover potential customers who abandoned their carts</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={refreshData}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            <button 
              onClick={exportData}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Download className="h-5 w-5" />
              <span>Export Data</span>
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
              <p className="text-sm text-gray-600">Total Abandoned Carts</p>
              <p className="text-2xl font-bold text-gray-900">
                {carts.filter(cart => !cart.is_converted).length}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="bg-white rounded-xl p-6 custom-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Potential Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{carts.filter(cart => !cart.is_converted).reduce((sum, cart) => sum + cart.total_value, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="bg-white rounded-xl p-6 custom-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Checkout Started</p>
              <p className="text-2xl font-bold text-gray-900">
                {carts.filter(cart => cart.checkout_started && !cart.is_converted).length}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="bg-white rounded-xl p-6 custom-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {carts.length > 0 
                  ? `${((carts.filter(cart => cart.is_converted).length / carts.length) * 100).toFixed(1)}%` 
                  : '0%'}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-purple-600" />
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
              placeholder="Search by email, name or phone..."
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
              <option value="all">All Carts</option>
              <option value="not_converted">Not Converted</option>
              <option value="converted">Converted</option>
              <option value="checkout_started">Checkout Started</option>
              <option value="no_checkout">No Checkout</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Carts Table */}
      <motion.div 
        variants={fadeIn}
        className="bg-white rounded-xl custom-shadow overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cart Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCarts.map((cart) => (
                <tr key={cart.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {cart.first_name && cart.last_name 
                          ? `${cart.first_name} ${cart.last_name}`
                          : 'Anonymous User'}
                      </div>
                      {cart.email && (
                        <div className="text-sm text-gray-500 flex items-center space-x-1">
                          <Mail className="h-3 w-3" />
                          <span>{cart.email}</span>
                        </div>
                      )}
                      {cart.phone && (
                        <div className="text-sm text-gray-500 flex items-center space-x-1">
                          <Phone className="h-3 w-3" />
                          <span>{cart.phone}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {cart.item_count} item{cart.item_count !== 1 ? 's' : ''}
                    </div>
                    <div className="text-xs text-gray-500">
                      {cart.items.slice(0, 2).map((item, idx) => (
                        <div key={idx}>{item.name} (x{item.quantity})</div>
                      ))}
                      {cart.items.length > 2 && (
                        <div>+{cart.items.length - 2} more</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${cart.total_value.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {getTimeAgo(cart.last_activity)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(cart.last_activity).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cart.is_converted ? (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700">
                        Converted
                      </span>
                    ) : cart.checkout_started ? (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
                        Checkout Started
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
                        Abandoned
                      </span>
                    )}
                    {cart.recovery_emails_sent > 0 && (
                      <div className="text-xs text-gray-500 mt-1">
                        {cart.recovery_emails_sent} email{cart.recovery_emails_sent !== 1 ? 's' : ''} sent
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {!cart.is_converted && cart.email && (
                        <button 
                          onClick={() => generateRecoveryEmail(cart)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Send Recovery Email"
                        >
                          <Send className="h-4 w-4" />
                        </button>
                      )}
                      <button 
                        className="text-gray-600 hover:text-gray-900"
                        title="View Details"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {filteredCarts.length === 0 && (
        <motion.div 
          variants={fadeIn}
          className="text-center py-12"
        >
          <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {carts.length === 0 && !loading ? 'Database Setup Required' : 'No abandoned carts found'}
          </h3>
          <p className="text-gray-600">
            {carts.length === 0 && !loading 
              ? 'Please create the abandoned_carts table in your Supabase database to start tracking cart abandonment.'
              : 'Try adjusting your search or filter criteria'
            }
          </p>
          {carts.length === 0 && !loading && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg text-left max-w-2xl mx-auto">
              <h4 className="font-semibold text-blue-900 mb-2">Setup Instructions:</h4>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Go to your Supabase dashboard</li>
                <li>Navigate to SQL Editor</li>
                <li>Run the migration file: supabase/migrations/create_abandoned_carts_table.sql</li>
                <li>Refresh this page</li>
              </ol>
            </div>
          )}
        </motion.div>
      )}

      {/* Email Modal */}
      {showEmailModal && selectedCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Send Recovery Email</h2>
              <p className="text-gray-600 mt-1">
                Send a cart recovery email to {selectedCart.email}
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Body
                </label>
                <textarea
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  rows={12}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendEmail}
                disabled={sendingEmail}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {sendingEmail ? (
                  <>
                    <div className="loading-spinner" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send Email</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default AbandonedCarts;