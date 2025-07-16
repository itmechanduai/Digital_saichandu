import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Share2, 
  Facebook as FacebookIcon, 
  Twitter as TwitterIcon, 
  Linkedin as LinkedinIcon, 
  Instagram as InstagramIcon,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  BarChart3,
  Users,
  Heart,
  MessageCircle,
  TrendingUp,
  Settings,
  Link as LinkIcon,
  RefreshCw,
  Youtube,
  Rss,
  AtSign
} from 'lucide-react';

interface SocialMediaAccount {
  id: string;
  platform: string;
  handle: string;
  followers_count: number;
  engagement_rate: number;
  posts_count: number;
  status: 'connected' | 'disconnected' | 'error';
  last_sync: string;
}

interface SocialMediaPost {
  id: string;
  platform: string;
  content: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  engagement_stats?: {
    likes: number;
    comments: number;
    shares: number;
  };
  created_at: string;
}

// Mock data to prevent fetch errors
const mockAccounts: SocialMediaAccount[] = [
  {
    id: '1',
    platform: 'Facebook',
    handle: '@digitalsaichandu',
    followers_count: 12500,
    engagement_rate: 4.2,
    posts_count: 156,
    status: 'connected',
    last_sync: '2024-02-20T10:30:00Z'
  },
  {
    id: '2',
    platform: 'Instagram',
    handle: '@digitalsaichandu',
    followers_count: 8300,
    engagement_rate: 6.8,
    posts_count: 234,
    status: 'connected',
    last_sync: '2024-02-20T10:30:00Z'
  },
  {
    id: '3',
    platform: 'Twitter',
    handle: '@digitalsaichandu',
    followers_count: 5700,
    engagement_rate: 3.1,
    posts_count: 89,
    status: 'connected',
    last_sync: '2024-02-20T10:30:00Z'
  },
  {
    id: '4',
    platform: 'LinkedIn',
    handle: 'Digital Saichandu',
    followers_count: 3200,
    engagement_rate: 5.4,
    posts_count: 67,
    status: 'connected',
    last_sync: '2024-02-20T10:30:00Z'
  },
  {
    id: '5',
    platform: 'YouTube',
    handle: 'Digital Saichandu',
    followers_count: 2800,
    engagement_rate: 4.7,
    posts_count: 42,
    status: 'connected',
    last_sync: '2024-02-20T10:30:00Z'
  },
  {
    id: '6',
    platform: 'Pinterest',
    handle: '@digitalsaichandu',
    followers_count: 1500,
    engagement_rate: 3.8,
    posts_count: 120,
    status: 'disconnected',
    last_sync: '2024-02-15T10:30:00Z'
  }
];

const mockPosts: SocialMediaPost[] = [
  {
    id: '1',
    platform: 'Facebook',
    content: '🚀 Exciting news! We just launched our new AI-powered lead generation system. See how it can transform your business growth!',
    status: 'published',
    engagement_stats: { likes: 45, comments: 12, shares: 8 },
    created_at: '2024-02-20T09:00:00Z'
  },
  {
    id: '2',
    platform: 'Instagram',
    content: '✨ Behind the scenes at Digital Saichandu! Our team working on cutting-edge digital marketing solutions. #DigitalMarketing #AI',
    status: 'published',
    engagement_stats: { likes: 89, comments: 23, shares: 15 },
    created_at: '2024-02-19T14:30:00Z'
  },
  {
    id: '3',
    platform: 'Twitter',
    content: 'Pro tip: Your Google Ads performance can improve by 300% with the right optimization strategy. Want to learn how? 🧵',
    status: 'published',
    engagement_stats: { likes: 67, comments: 34, shares: 28 },
    created_at: '2024-02-18T11:15:00Z'
  },
  {
    id: '4',
    platform: 'LinkedIn',
    content: 'The future of business automation is here. Our latest AI workflow solutions are helping companies save 20+ hours per week.',
    status: 'scheduled',
    engagement_stats: { likes: 0, comments: 0, shares: 0 },
    created_at: '2024-02-21T16:00:00Z'
  },
  {
    id: '5',
    platform: 'YouTube',
    content: 'New video: How to set up your first Google Ads campaign in 10 minutes. Perfect for beginners!',
    status: 'published',
    engagement_stats: { likes: 45, comments: 12, shares: 8 },
    created_at: '2024-02-17T10:00:00Z'
  },
  {
    id: '6',
    platform: 'Pinterest',
    content: 'Digital Marketing Checklist: 10 things every business should do before launching a campaign. #DigitalMarketing #MarketingTips',
    status: 'scheduled',
    engagement_stats: { likes: 0, comments: 0, shares: 0 },
    created_at: '2024-02-22T09:00:00Z'
  }
];

const SocialMediaManagement: React.FC = () => {
  const [accounts] = useState<SocialMediaAccount[]>(mockAccounts);
  const [posts] = useState<SocialMediaPost[]>(mockPosts);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const analytics = {
    totalFollowers: accounts.reduce((sum, acc) => sum + acc.followers_count, 0),
    totalEngagement: accounts.length > 0 ? 
      (accounts.reduce((sum, acc) => sum + acc.engagement_rate, 0) / accounts.length).toFixed(1) + '%' : '0%',
    monthlyGrowth: '+12.3%',
    totalPosts: accounts.reduce((sum, acc) => sum + acc.posts_count, 0)
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading-spinner" />
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'accounts', label: 'Accounts' },
    { id: 'posts', label: 'Posts' },
    { id: 'analytics', label: 'Analytics' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-emerald-100 text-emerald-700';
      case 'disconnected': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Facebook': return 'text-[#1877F2]';
      case 'Instagram': return 'text-[#E4405F]';
      case 'Twitter': return 'text-[#1DA1F2]';
      case 'LinkedIn': return 'text-[#0A66C2]';
      default: return 'text-gray-600';
    }
  };

  const syncAccountStats = (accountId: string) => {
    // Mock sync functionality
    console.log('Syncing account:', accountId);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Facebook': return FacebookIcon;
      case 'Instagram': return InstagramIcon;
      case 'Twitter': return TwitterIcon;
      case 'LinkedIn': return LinkedinIcon;
      case 'YouTube': return Youtube;
      case 'Pinterest': return Rss;
      default: return Share2;
    }
  };

  const getPlatformBgColor = (platform: string) => {
    switch (platform) {
      case 'Facebook': return 'bg-[#1877F2]/10';
      case 'Instagram': return 'bg-gradient-to-br from-[#FCAF45]/10 via-[#E4405F]/10 to-[#8A3AB9]/10';
      case 'Twitter': return 'bg-[#1DA1F2]/10';
      case 'LinkedIn': return 'bg-[#0A66C2]/10';
      case 'YouTube': return 'bg-[#FF0000]/10';
      case 'Pinterest': return 'bg-[#E60023]/10';
      default: return 'bg-gray-100';
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Social Media Management</h1>
            <p className="text-gray-600 mt-1">Manage your social media presence and engagement</p>
          </div>
          <button onClick={() => setShowConnectModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Create Post</span>
          </button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          variants={fadeIn}
          className="bg-white rounded-xl p-6 custom-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Followers</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalFollowers.toLocaleString()}</p>
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
              <p className="text-sm text-gray-600">Avg. Engagement</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalEngagement}</p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-lg">
              <Heart className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="bg-white rounded-xl p-6 custom-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monthly Growth</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.monthlyGrowth}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="bg-white rounded-xl p-6 custom-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Posts</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalPosts}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Share2 className="h-6 w-6 text-orange-600" />
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
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Platform Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {accounts.map((account) => {
                  const IconComponent = getPlatformIcon(account.platform);
                  const bgColorClass = getPlatformBgColor(account.platform);
                  return (
                    <div key={account.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`p-3 rounded-lg ${bgColorClass}`}>
                            <IconComponent className={`h-6 w-6 ${getPlatformColor(account.platform)}`} />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{account.platform}</h4>
                            <p className="text-sm text-gray-500">{account.handle}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(account.status)}`}>
                          {account.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-gray-50 p-2 rounded-lg">
                          <p className="text-lg font-semibold text-gray-900">{account.followers_count.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Followers</p>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-900">{account.engagement_rate.toFixed(1)}%</p>
                          <p className="text-xs text-gray-500">Engagement</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-lg">
                          <p className="text-lg font-semibold text-gray-900">{account.posts_count}</p>
                          <p className="text-xs text-gray-500">Posts</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'accounts' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Connected Accounts</h3>
                <button onClick={() => setShowConnectModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Connect Account
                </button>
              </div>
              <div className="space-y-4">
                {accounts.map((account) => {
                  const IconComponent = getPlatformIcon(account.platform);
                  return (
                    <div key={account.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 rounded-lg bg-blue-100">
                            <IconComponent className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{account.platform}</h4>
                            <p className="text-sm text-gray-500">{account.handle}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => syncAccountStats(account.id)}
                            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <Settings className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                            <BarChart3 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Posts</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Schedule Post
                </button>
              </div>
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${getPlatformColor(post.platform)}`}>
                          {post.platform}
                        </span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          post.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 
                          post.status === 'scheduled' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {post.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{post.content}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{post.engagement_stats?.likes || 0}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.engagement_stats?.comments || 0}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Share2 className="h-4 w-4" />
                        <span>{post.engagement_stats?.shares || 0}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Social Media Analytics</h3>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{analytics.totalFollowers.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Total Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">{analytics.totalEngagement}</div>
                    <div className="text-sm text-gray-600">Avg Engagement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{analytics.monthlyGrowth}</div>
                    <div className="text-sm text-gray-600">Monthly Growth</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{analytics.totalPosts}</div>
                    <div className="text-sm text-gray-600">Total Posts</div>
                  </div>
                </div>
              </div>
              
              {/* Growth Chart */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Follower Growth</h4>
                <div className="h-64 bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                  <p className="text-gray-500">Follower growth chart visualization would appear here</p>
                </div>
              </div>
              
              {/* Platform Comparison */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Platform Performance Comparison</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Followers</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posts</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {accounts.map((account) => {
                        const IconComponent = getPlatformIcon(account.platform);
                        return (
                          <tr key={account.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <IconComponent className={`h-5 w-5 ${getPlatformColor(account.platform)}`} />
                                <span className="font-medium">{account.platform}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {account.followers_count.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {account.engagement_rate.toFixed(1)}%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-emerald-600">
                              +{Math.floor(Math.random() * 5) + 1}%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {account.posts_count}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
      
      {/* Connect Social Media Account Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-md w-full"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Connect Social Media Account</h2>
              <p className="text-gray-600 mt-1">Choose a platform to connect</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors">
                  <FacebookIcon className="h-8 w-8 text-[#1877F2] mb-2" />
                  <span className="text-sm font-medium">Facebook</span>
                </button>
                
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-pink-50 hover:border-pink-300 transition-colors">
                  <InstagramIcon className="h-8 w-8 text-[#E4405F] mb-2" />
                  <span className="text-sm font-medium">Instagram</span>
                </button>
                
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors">
                  <TwitterIcon className="h-8 w-8 text-[#1DA1F2] mb-2" />
                  <span className="text-sm font-medium">Twitter</span>
                </button>
                
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors">
                  <LinkedinIcon className="h-8 w-8 text-[#0A66C2] mb-2" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </button>
                
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors">
                  <Youtube className="h-8 w-8 text-[#FF0000] mb-2" />
                  <span className="text-sm font-medium">YouTube</span>
                </button>
                
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors">
                  <Rss className="h-8 w-8 text-[#E60023] mb-2" />
                  <span className="text-sm font-medium">Pinterest</span>
                </button>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  Connect Custom Platform
                </button>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowConnectModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default SocialMediaManagement;