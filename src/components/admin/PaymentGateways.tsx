import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle,
  AlertCircle,
  Settings,
  Key,
  Lock,
  Globe,
  DollarSign,
  BarChart3,
  RefreshCw,
  Save
} from 'lucide-react';

interface PaymentGateway {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'test';
  apiKey?: string;
  secretKey?: string;
  merchantId?: string;
  webhookUrl?: string;
  transactionFee: string;
  supportedCurrencies: string[];
  lastUpdated: string;
  testMode: boolean;
}

const PaymentGateways: React.FC = () => {
  const [gateways, setGateways] = useState<PaymentGateway[]>([
    {
      id: '1',
      name: 'Stripe',
      type: 'credit_card',
      status: 'active',
      apiKey: 'pk_test_51H...Frd',
      secretKey: 'sk_test_51H...Qjs',
      webhookUrl: 'https://digitalsaichandu.com/api/webhooks/stripe',
      transactionFee: '2.9% + $0.30',
      supportedCurrencies: ['USD', 'EUR', 'GBP', 'INR'],
      lastUpdated: '2024-02-15',
      testMode: false
    },
    {
      id: '2',
      name: 'Razorpay',
      type: 'credit_card',
      status: 'active',
      apiKey: 'rzp_test_6X...Ypd',
      secretKey: 'rzp_test_sec...Kls',
      webhookUrl: 'https://digitalsaichandu.com/api/webhooks/razorpay',
      transactionFee: '2% + ₹2',
      supportedCurrencies: ['INR'],
      lastUpdated: '2024-02-10',
      testMode: false
    },
    {
      id: '3',
      name: 'PayPal',
      type: 'digital_wallet',
      status: 'inactive',
      merchantId: 'merchant.id.12345',
      webhookUrl: 'https://digitalsaichandu.com/api/webhooks/paypal',
      transactionFee: '3.9% + $0.30',
      supportedCurrencies: ['USD', 'EUR', 'GBP'],
      lastUpdated: '2024-01-20',
      testMode: true
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingGateway, setEditingGateway] = useState<PaymentGateway | null>(null);
  const [activeTab, setActiveTab] = useState('gateways');

  const [newGateway, setNewGateway] = useState<Partial<PaymentGateway>>({
    name: '',
    type: 'credit_card',
    status: 'inactive',
    apiKey: '',
    secretKey: '',
    merchantId: '',
    webhookUrl: '',
    transactionFee: '',
    supportedCurrencies: [],
    testMode: true
  });

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const handleAddGateway = () => {
    const gateway: PaymentGateway = {
      id: Date.now().toString(),
      name: newGateway.name || '',
      type: newGateway.type || 'credit_card',
      status: newGateway.status || 'inactive',
      apiKey: newGateway.apiKey,
      secretKey: newGateway.secretKey,
      merchantId: newGateway.merchantId,
      webhookUrl: newGateway.webhookUrl,
      transactionFee: newGateway.transactionFee || '0%',
      supportedCurrencies: newGateway.supportedCurrencies || ['USD'],
      lastUpdated: new Date().toISOString().split('T')[0],
      testMode: newGateway.testMode || true
    };

    setGateways(prev => [...prev, gateway]);
    setShowAddModal(false);
    setNewGateway({
      name: '',
      type: 'credit_card',
      status: 'inactive',
      apiKey: '',
      secretKey: '',
      merchantId: '',
      webhookUrl: '',
      transactionFee: '',
      supportedCurrencies: [],
      testMode: true
    });
  };

  const handleUpdateGateway = () => {
    if (!editingGateway) return;

    setGateways(prev => prev.map(gateway => 
      gateway.id === editingGateway.id ? editingGateway : gateway
    ));
    setEditingGateway(null);
  };

  const handleDeleteGateway = (id: string) => {
    setGateways(prev => prev.filter(gateway => gateway.id !== id));
  };

  const toggleGatewayStatus = (id: string) => {
    setGateways(prev => prev.map(gateway => 
      gateway.id === id 
        ? { ...gateway, status: gateway.status === 'active' ? 'inactive' : 'active' }
        : gateway
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'test': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'credit_card': return CreditCard;
      case 'digital_wallet': return Globe;
      case 'upi': return DollarSign;
      default: return CreditCard;
    }
  };

  const tabs = [
    { id: 'gateways', label: 'Payment Gateways' },
    { id: 'settings', label: 'Global Settings' },
    { id: 'transactions', label: 'Transactions' }
  ];

  const gatewayTypes = [
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'digital_wallet', label: 'Digital Wallet' },
    { value: 'upi', label: 'UPI' },
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'crypto', label: 'Cryptocurrency' }
  ];

  const currencies = ['USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD', 'SGD', 'JPY'];

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
            <h1 className="text-3xl font-bold text-gray-900">Payment Gateways</h1>
            <p className="text-gray-600 mt-1">Manage payment providers and transaction settings</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Gateway</span>
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          variants={fadeIn}
          className="bg-white rounded-xl p-6 custom-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Gateways</p>
              <p className="text-2xl font-bold text-gray-900">{gateways.filter(g => g.status === 'active').length}</p>
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
              <p className="text-sm text-gray-600">Total Gateways</p>
              <p className="text-2xl font-bold text-gray-900">{gateways.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="bg-white rounded-xl p-6 custom-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Test Mode Gateways</p>
              <p className="text-2xl font-bold text-gray-900">{gateways.filter(g => g.testMode).length}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>
      </div>

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
          {activeTab === 'gateways' && (
            <div className="space-y-6">
              {gateways.length === 0 ? (
                <div className="text-center py-12">
                  <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Payment Gateways</h3>
                  <p className="text-gray-600 mb-6">Add your first payment gateway to start accepting payments</p>
                  <button 
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Payment Gateway
                  </button>
                </div>
              ) : (
                <div className="grid gap-6">
                  {gateways.map((gateway) => {
                    const TypeIcon = getTypeIcon(gateway.type);
                    return (
                      <div key={gateway.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-4">
                            <div className={`p-3 rounded-lg ${
                              gateway.name === 'Stripe' ? 'bg-purple-100' : 
                              gateway.name === 'Razorpay' ? 'bg-blue-100' : 
                              gateway.name === 'PayPal' ? 'bg-blue-100' : 
                              gateway.name === 'PhonePe' ? 'bg-indigo-100' : 
                              'bg-gray-100'
                            }`}>
                              <TypeIcon className={`h-6 w-6 ${
                                gateway.name === 'Stripe' ? 'text-purple-600' : 
                                gateway.name === 'Razorpay' ? 'text-blue-600' : 
                                gateway.name === 'PayPal' ? 'text-blue-600' : 
                                gateway.name === 'PhonePe' ? 'text-indigo-600' : 
                                'text-gray-600'
                              }`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">{gateway.name}</h3>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(gateway.status)}`}>
                                  {gateway.status.charAt(0).toUpperCase() + gateway.status.slice(1)}
                                </span>
                                {gateway.testMode && (
                                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                                    Test Mode
                                  </span>
                                )}
                              </div>
                              <div className="grid grid-cols-2 gap-4 mb-3">
                                <div>
                                  <p className="text-sm text-gray-500">Gateway Type</p>
                                  <p className="text-sm font-medium text-gray-900">
                                    {gateway.type === 'credit_card' ? 'Credit Card' : 
                                     gateway.type === 'digital_wallet' ? 'Digital Wallet' : 
                                     gateway.type === 'upi' ? 'UPI' : gateway.type}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Transaction Fee</p>
                                  <p className="text-sm font-medium text-gray-900">{gateway.transactionFee}</p>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Supported Currencies</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {gateway.supportedCurrencies.map((currency, idx) => (
                                    <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                      {currency}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => toggleGatewayStatus(gateway.id)}
                              className={`p-2 rounded-lg transition-colors ${
                                gateway.status === 'active'
                                  ? 'text-red-600 hover:bg-red-50'
                                  : 'text-emerald-600 hover:bg-emerald-50'
                              }`}
                            >
                              {gateway.status === 'active' ? <AlertCircle className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
                            </button>
                            <button 
                              onClick={() => setEditingGateway(gateway)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <button 
                              onClick={() => handleDeleteGateway(gateway.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">API Credentials</h4>
                            <div className="space-y-2">
                              {gateway.apiKey && (
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-gray-600">API Key</span>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                                      {gateway.apiKey.substring(0, 8)}...
                                    </span>
                                    <button className="text-blue-600 hover:text-blue-700">
                                      <Key className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              )}
                              {gateway.secretKey && (
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-gray-600">Secret Key</span>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                                      ••••••••••••
                                    </span>
                                    <button className="text-blue-600 hover:text-blue-700">
                                      <Lock className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              )}
                              {gateway.merchantId && (
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-gray-600">Merchant ID</span>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                                      {gateway.merchantId.substring(0, 10)}...
                                    </span>
                                    <button className="text-blue-600 hover:text-blue-700">
                                      <Key className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Integration</h4>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Webhook URL</span>
                                <span className="text-sm text-gray-900 truncate max-w-[200px]">
                                  {gateway.webhookUrl}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Last Updated</span>
                                <span className="text-sm text-gray-900">{gateway.lastUpdated}</span>
                              </div>
                              <div className="flex justify-end mt-2">
                                <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                                  <RefreshCw className="h-3 w-3" />
                                  <span>Test Connection</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Global Payment Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Default Currency</h4>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="INR">INR - Indian Rupee</option>
                  </select>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Payment Mode</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="mode" className="text-blue-600 focus:ring-blue-500" defaultChecked />
                      <span className="ml-2 text-gray-700">Live Mode</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="mode" className="text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-gray-700">Test Mode</span>
                    </label>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Invoice Settings</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Auto-generate Invoices</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Send Receipt Emails</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Payment Methods</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="text-blue-600 focus:ring-blue-500" defaultChecked />
                      <span className="ml-2 text-gray-700">Credit/Debit Cards</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="text-blue-600 focus:ring-blue-500" defaultChecked />
                      <span className="ml-2 text-gray-700">Digital Wallets</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="text-blue-600 focus:ring-blue-500" defaultChecked />
                      <span className="ml-2 text-gray-700">UPI</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-gray-700">Bank Transfer</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Save className="h-5 w-5" />
                  <span>Save Settings</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Transaction Analytics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600">Total Transactions</p>
                      <p className="text-2xl font-bold text-blue-900">1,245</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                
                <div className="bg-emerald-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-emerald-600">Success Rate</p>
                      <p className="text-2xl font-bold text-emerald-900">98.5%</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-emerald-600" />
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-purple-900">$45,230</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Transaction History</h4>
                <p className="text-gray-600 text-center py-8">
                  Transaction data visualization would appear here, showing payment volumes, success rates, and revenue by gateway.
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Add Gateway Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Add Payment Gateway</h2>
              <p className="text-gray-600 mt-1">Configure a new payment provider for your platform</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gateway Name</label>
                  <input
                    type="text"
                    value={newGateway.name}
                    onChange={(e) => setNewGateway(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Stripe, PayPal, Razorpay"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gateway Type</label>
                  <select
                    value={newGateway.type}
                    onChange={(e) => setNewGateway(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {gatewayTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                  <input
                    type="text"
                    value={newGateway.apiKey}
                    onChange={(e) => setNewGateway(prev => ({ ...prev, apiKey: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="pk_test_..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Secret Key</label>
                  <input
                    type="password"
                    value={newGateway.secretKey}
                    onChange={(e) => setNewGateway(prev => ({ ...prev, secretKey: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="sk_test_..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
                <input
                  type="text"
                  value={newGateway.webhookUrl}
                  onChange={(e) => setNewGateway(prev => ({ ...prev, webhookUrl: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://yourdomain.com/api/webhooks/gateway"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Fee</label>
                  <input
                    type="text"
                    value={newGateway.transactionFee}
                    onChange={(e) => setNewGateway(prev => ({ ...prev, transactionFee: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 2.9% + $0.30"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Supported Currencies</label>
                  <select
                    multiple
                    value={newGateway.supportedCurrencies}
                    onChange={(e) => {
                      const values = Array.from(e.target.selectedOptions, option => option.value);
                      setNewGateway(prev => ({ ...prev, supportedCurrencies: values }));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                  >
                    {currencies.map(currency => (
                      <option key={currency} value={currency}>{currency}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="testMode"
                  checked={newGateway.testMode}
                  onChange={(e) => setNewGateway(prev => ({ ...prev, testMode: e.target.checked }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="testMode" className="text-sm text-gray-700">
                  Enable Test Mode
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddGateway}
                disabled={!newGateway.name}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Gateway
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Edit Gateway Modal */}
      {editingGateway && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Edit Payment Gateway</h2>
              <p className="text-gray-600 mt-1">Update configuration for {editingGateway.name}</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gateway Name</label>
                  <input
                    type="text"
                    value={editingGateway.name}
                    onChange={(e) => setEditingGateway(prev => prev ? { ...prev, name: e.target.value } : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gateway Type</label>
                  <select
                    value={editingGateway.type}
                    onChange={(e) => setEditingGateway(prev => prev ? { ...prev, type: e.target.value } : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {gatewayTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                  <input
                    type="text"
                    value={editingGateway.apiKey || ''}
                    onChange={(e) => setEditingGateway(prev => prev ? { ...prev, apiKey: e.target.value } : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Secret Key</label>
                  <input
                    type="password"
                    value={editingGateway.secretKey || ''}
                    onChange={(e) => setEditingGateway(prev => prev ? { ...prev, secretKey: e.target.value } : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
                <input
                  type="text"
                  value={editingGateway.webhookUrl || ''}
                  onChange={(e) => setEditingGateway(prev => prev ? { ...prev, webhookUrl: e.target.value } : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Fee</label>
                  <input
                    type="text"
                    value={editingGateway.transactionFee}
                    onChange={(e) => setEditingGateway(prev => prev ? { ...prev, transactionFee: e.target.value } : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Supported Currencies</label>
                  <select
                    multiple
                    value={editingGateway.supportedCurrencies}
                    onChange={(e) => {
                      const values = Array.from(e.target.selectedOptions, option => option.value);
                      setEditingGateway(prev => prev ? { ...prev, supportedCurrencies: values } : null);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                  >
                    {currencies.map(currency => (
                      <option key={currency} value={currency}>{currency}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="editTestMode"
                  checked={editingGateway.testMode}
                  onChange={(e) => setEditingGateway(prev => prev ? { ...prev, testMode: e.target.checked } : null)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="editTestMode" className="text-sm text-gray-700">
                  Enable Test Mode
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setEditingGateway(null)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateGateway}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Update Gateway
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default PaymentGateways;