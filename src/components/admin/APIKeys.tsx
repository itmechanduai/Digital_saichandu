import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Key, 
  Plus, 
  Copy, 
  Trash2, 
  RefreshCw,
  Eye,
  EyeOff,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Save
} from 'lucide-react';

interface APIKey {
  id: string;
  name: string;
  key: string;
  type: 'read' | 'write' | 'admin';
  status: 'active' | 'revoked';
  createdAt: string;
  expiresAt: string | null;
  lastUsed: string | null;
  permissions: string[];
}

const APIKeys: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: '1',
      name: 'Website Integration',
      key: 'sk_live_51KjH2JDGj8Nk3XcE5gH7Jk9L0pQ1Rs2Tt3Uu4Vv5Ww6Xx7Yy8Zz',
      type: 'read',
      status: 'active',
      createdAt: '2024-02-15',
      expiresAt: '2025-02-15',
      lastUsed: '2024-02-20',
      permissions: ['products:read', 'orders:read']
    },
    {
      id: '2',
      name: 'Mobile App',
      key: 'sk_live_51LkI3KEHk4Ol5YdF6gI8Kl0MqR2St3Uu4Vv5Ww6Xx7Yy8Zz9Aa',
      type: 'write',
      status: 'active',
      createdAt: '2024-02-10',
      expiresAt: null,
      lastUsed: '2024-02-19',
      permissions: ['products:read', 'orders:read', 'orders:write']
    },
    {
      id: '3',
      name: 'Admin Dashboard',
      key: 'sk_live_51MlJ4LFIl5Pm6ZeG7hJ9Lm1NrS3Tt4Uu5Vv6Ww7Xx8Yy9Zz0Bb',
      type: 'admin',
      status: 'active',
      createdAt: '2024-02-05',
      expiresAt: null,
      lastUsed: '2024-02-20',
      permissions: ['products:read', 'products:write', 'orders:read', 'orders:write', 'users:read', 'users:write']
    },
    {
      id: '4',
      name: 'Old Integration',
      key: 'sk_live_51NmK5MGJm6Qn7AfH8iK0Mn2OsT4Uu5Vv6Ww7Xx8Yy9Zz0Aa1Bb',
      type: 'read',
      status: 'revoked',
      createdAt: '2023-10-15',
      expiresAt: '2024-01-15',
      lastUsed: '2024-01-10',
      permissions: ['products:read']
    }
  ]);

  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKey, setNewKey] = useState<Partial<APIKey>>({
    name: '',
    type: 'read',
    permissions: []
  });
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const toggleShowKey = (id: string) => {
    setShowKeys(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success('API key copied to clipboard');
  };

  const handleRevokeKey = (id: string) => {
    setApiKeys(prev => prev.map(key => 
      key.id === id ? { ...key, status: 'revoked' } : key
    ));
  };

  const handleDeleteKey = (id: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== id));
  };

  const handleCreateKey = () => {
    // Generate a mock API key
    const mockKey = 'sk_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    const newApiKey: APIKey = {
      id: Date.now().toString(),
      name: newKey.name || 'Unnamed Key',
      key: mockKey,
      type: newKey.type || 'read',
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      expiresAt: null,
      lastUsed: null,
      permissions: newKey.permissions || []
    };

    setApiKeys(prev => [...prev, newApiKey]);
    setGeneratedKey(mockKey);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'read': return 'bg-blue-100 text-blue-700';
      case 'write': return 'bg-purple-100 text-purple-700';
      case 'admin': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-700';
      case 'revoked': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const availablePermissions = [
    { value: 'products:read', label: 'Read Products' },
    { value: 'products:write', label: 'Write Products' },
    { value: 'orders:read', label: 'Read Orders' },
    { value: 'orders:write', label: 'Write Orders' },
    { value: 'users:read', label: 'Read Users' },
    { value: 'users:write', label: 'Write Users' },
    { value: 'invoices:read', label: 'Read Invoices' },
    { value: 'invoices:write', label: 'Write Invoices' },
    { value: 'payments:read', label: 'Read Payments' },
    { value: 'payments:write', label: 'Write Payments' }
  ];

  // Mock toast function
  const toast = {
    success: (message: string) => console.log(message)
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">API Keys</h1>
            <p className="text-gray-600 mt-1">Manage API keys for external integrations</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Create API Key</span>
          </button>
        </div>
      </motion.div>

      {/* API Keys List */}
      <motion.div 
        variants={fadeIn}
        className="bg-white rounded-xl custom-shadow"
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Your API Keys</h3>
          
          {apiKeys.length === 0 ? (
            <div className="text-center py-12">
              <Key className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No API Keys</h3>
              <p className="text-gray-600 mb-6">Create your first API key to integrate with external services</p>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create API Key
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {apiKeys.map((apiKey) => (
                <div 
                  key={apiKey.id} 
                  className={`border rounded-xl p-6 ${
                    apiKey.status === 'revoked' ? 'border-gray-200 bg-gray-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{apiKey.name}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(apiKey.type)}`}>
                          {apiKey.type.charAt(0).toUpperCase() + apiKey.type.slice(1)}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(apiKey.status)}`}>
                          {apiKey.status.charAt(0).toUpperCase() + apiKey.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="flex-1 font-mono text-sm bg-gray-100 px-3 py-2 rounded-lg">
                          {showKeys[apiKey.id] ? apiKey.key : apiKey.key.substring(0, 12) + '••••••••••••••••••••••••••••'}
                        </div>
                        <button 
                          onClick={() => toggleShowKey(apiKey.id)}
                          className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          {showKeys[apiKey.id] ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                        <button 
                          onClick={() => handleCopyKey(apiKey.key)}
                          className="p-2 text-blue-600 hover:text-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <Copy className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">Created: {apiKey.createdAt}</span>
                        </div>
                        {apiKey.expiresAt && (
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">Expires: {apiKey.expiresAt}</span>
                          </div>
                        )}
                        {apiKey.lastUsed && (
                          <div className="flex items-center space-x-2">
                            <RefreshCw className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">Last used: {apiKey.lastUsed}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {apiKey.status === 'active' && (
                        <button 
                          onClick={() => handleRevokeKey(apiKey.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Revoke Key"
                        >
                          <AlertTriangle className="h-5 w-5" />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDeleteKey(apiKey.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Key"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Permissions</h5>
                    <div className="flex flex-wrap gap-2">
                      {apiKey.permissions.map((permission, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Create API Key Modal */}
      {showCreateModal && !generatedKey && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Create API Key</h2>
              <p className="text-gray-600 mt-1">Generate a new API key for external integrations</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Key Name</label>
                <input
                  type="text"
                  value={newKey.name}
                  onChange={(e) => setNewKey(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Website Integration, Mobile App"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Key Type</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="keyType"
                      value="read"
                      checked={newKey.type === 'read'}
                      onChange={() => setNewKey(prev => ({ ...prev, type: 'read' }))}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">Read-only (safest)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="keyType"
                      value="write"
                      checked={newKey.type === 'write'}
                      onChange={() => setNewKey(prev => ({ ...prev, type: 'write' }))}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">Read & Write</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="keyType"
                      value="admin"
                      checked={newKey.type === 'admin'}
                      onChange={() => setNewKey(prev => ({ ...prev, type: 'admin' }))}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">Admin (full access)</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border border-gray-200 rounded-lg p-4 max-h-48 overflow-y-auto">
                  {availablePermissions.map((permission) => (
                    <label key={permission.value} className="flex items-center">
                      <input
                        type="checkbox"
                        value={permission.value}
                        checked={newKey.permissions?.includes(permission.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewKey(prev => ({
                              ...prev,
                              permissions: [...(prev.permissions || []), permission.value]
                            }));
                          } else {
                            setNewKey(prev => ({
                              ...prev,
                              permissions: prev.permissions?.filter(p => p !== permission.value) || []
                            }));
                          }
                        }}
                        className="text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{permission.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateKey}
                disabled={!newKey.name}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate Key
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Generated Key Modal */}
      {generatedKey && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="bg-emerald-100 p-2 rounded-full">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">API Key Created</h2>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-yellow-800 mb-1">Important Security Notice</h3>
                    <p className="text-yellow-700 text-sm">
                      This is the only time your API key will be displayed. Please copy it now and store it securely.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your API Key</label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 font-mono text-sm bg-gray-100 px-3 py-2 rounded-lg overflow-x-auto">
                    {generatedKey}
                  </div>
                  <button 
                    onClick={() => handleCopyKey(generatedKey)}
                    className="p-2 text-blue-600 hover:text-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Next Steps</h3>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-start space-x-2">
                    <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                    <span>Store this API key securely in your application's environment variables.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                    <span>Never commit API keys to version control or share them publicly.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                    <span>Use the key in your API requests with the Authorization header.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setGeneratedKey(null);
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default APIKeys;