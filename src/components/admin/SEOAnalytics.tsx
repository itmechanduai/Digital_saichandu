import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Search, 
  Globe, 
  ArrowUp,
  ArrowDown,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Download,
  Filter
} from 'lucide-react';

// Mock data for SEO metrics
const mockSEOData = {
  overallScore: 78,
  lastUpdated: '2024-07-20',
  metrics: {
    performance: { score: 82, change: 3, status: 'improved' },
    accessibility: { score: 91, change: 0, status: 'stable' },
    bestPractices: { score: 85, change: -2, status: 'declined' },
    seo: { score: 76, change: 5, status: 'improved' },
    mobileOptimization: { score: 68, change: -4, status: 'declined' },
    pageSpeed: { score: 72, change: 2, status: 'improved' }
  },
  keywordRankings: [
    { keyword: 'digital marketing agency hyderabad', position: 4, change: 2, volume: 1200 },
    { keyword: 'google ads management services', position: 7, change: 3, volume: 880 },
    { keyword: 'meta ads agency hyderabad', position: 3, change: 5, volume: 720 },
    { keyword: 'ai chatbot development india', position: 5, change: -1, volume: 650 },
    { keyword: 'lead generation services hyderabad', position: 8, change: 0, volume: 590 },
    { keyword: 'digital marketing roi improvement', position: 12, change: 4, volume: 450 },
    { keyword: 'ai workflow automation', position: 9, change: 2, volume: 380 },
    { keyword: 'best seo agency hyderabad', position: 15, change: -3, volume: 920 }
  ],
  issues: [
    { severity: 'high', description: 'Mobile page load time exceeds 3 seconds', pages: ['/services', '/products'], impact: 'Affects 35% of traffic' },
    { severity: 'medium', description: 'Missing alt text on 12 images', pages: ['/about', '/blog'], impact: 'Reduces accessibility score' },
    { severity: 'medium', description: 'Duplicate meta descriptions on blog category pages', pages: ['/blog/category/digital-marketing', '/blog/category/ai'], impact: 'Dilutes SEO value' },
    { severity: 'low', description: 'Non-descriptive link text ("click here", "read more")', pages: ['Multiple pages'], impact: 'Minor accessibility issue' }
  ],
  recommendations: [
    { priority: 'high', description: 'Optimize images on service pages to improve mobile load time', effort: 'Medium', impact: 'High' },
    { priority: 'high', description: 'Add more location-specific content for Hyderabad and surrounding areas', effort: 'Medium', impact: 'High' },
    { priority: 'medium', description: 'Create dedicated landing pages for each service with targeted keywords', effort: 'High', impact: 'High' },
    { priority: 'medium', description: 'Implement schema markup for services and pricing', effort: 'Low', impact: 'Medium' },
    { priority: 'medium', description: 'Fix duplicate meta descriptions on blog category pages', effort: 'Low', impact: 'Medium' },
    { priority: 'low', description: 'Add more internal links between related content', effort: 'Medium', impact: 'Medium' }
  ],
  competitors: [
    { name: 'Competitor A', overallScore: 82, topKeywords: ['digital marketing agency', 'google ads management'] },
    { name: 'Competitor B', overallScore: 75, topKeywords: ['seo services hyderabad', 'ppc management'] },
    { name: 'Competitor C', overallScore: 80, topKeywords: ['social media marketing', 'facebook ads agency'] }
  ],
  trafficSources: [
    { source: 'Organic Search', percentage: 42, change: 5 },
    { source: 'Direct', percentage: 28, change: -2 },
    { source: 'Referral', percentage: 15, change: 3 },
    { source: 'Social', percentage: 10, change: 1 },
    { source: 'Paid Search', percentage: 5, change: 0 }
  ]
};

const SEOAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call to refresh data
    setTimeout(() => {
      setIsRefreshing(false);
      // In a real implementation, this would fetch fresh data
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-100';
    if (score >= 70) return 'bg-blue-100';
    if (score >= 50) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <ArrowUp className="h-3 w-3 text-emerald-600" />;
    if (change < 0) return <ArrowDown className="h-3 w-3 text-red-600" />;
    return null;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-emerald-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-blue-100 text-blue-700';
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
      {/* Header */}
      <motion.div variants={fadeIn}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">SEO Analytics</h1>
            <p className="text-gray-600 mt-1">Monitor your website's search performance and get actionable insights</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Last updated: {mockSEOData.lastUpdated}</span>
              <button 
                onClick={handleRefresh}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="6m">Last 6 months</option>
              <option value="1y">Last year</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Download className="h-5 w-5" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Overall Score */}
      <motion.div 
        variants={fadeIn}
        className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className={`${getScoreBgColor(mockSEOData.overallScore)} p-4 rounded-full`}>
              <span className={`text-3xl font-bold ${getScoreColor(mockSEOData.overallScore)}`}>
                {mockSEOData.overallScore}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Overall SEO Score</h2>
              <p className="text-gray-600">Your website is performing well but has room for improvement</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1">
              <ArrowUp className="h-4 w-4 text-emerald-600" />
              <span className="text-emerald-600 font-medium">+3 points</span>
            </div>
            <p className="text-sm text-gray-500">since last month</p>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(mockSEOData.metrics).map(([key, metric], index) => (
          <motion.div
            key={key}
            variants={fadeIn}
            className="bg-white rounded-xl p-6 custom-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
              <div className={`flex items-center space-x-1 ${getChangeColor(metric.change)}`}>
                {getChangeIcon(metric.change)}
                <span className="text-sm font-medium">{Math.abs(metric.change)}%</span>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div className={`text-2xl font-bold ${getScoreColor(metric.score)}`}>
                {metric.score}/100
              </div>
              <div className="text-xs text-gray-500 capitalize">
                {metric.status}
              </div>
            </div>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  metric.score >= 90 ? 'bg-emerald-500' : 
                  metric.score >= 70 ? 'bg-blue-500' : 
                  metric.score >= 50 ? 'bg-yellow-500' : 
                  'bg-red-500'
                }`}
                style={{ width: `${metric.score}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Keyword Rankings */}
      <motion.div 
        variants={fadeIn}
        className="bg-white rounded-xl custom-shadow"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Keyword Rankings</h2>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="position">Sort by Position</option>
                <option value="change">Sort by Change</option>
                <option value="volume">Sort by Volume</option>
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Keyword
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Search Volume
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockSEOData.keywordRankings.map((keyword, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {keyword.keyword}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {keyword.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center space-x-1 ${getChangeColor(keyword.change)}`}>
                      {getChangeIcon(keyword.change)}
                      <span className="text-sm font-medium">{Math.abs(keyword.change)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {keyword.volume.toLocaleString()}/mo
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      keyword.position <= 3 ? 'bg-emerald-100 text-emerald-700' : 
                      keyword.position <= 10 ? 'bg-blue-100 text-blue-700' : 
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {keyword.position <= 3 ? 'Top 3' : 
                       keyword.position <= 10 ? 'First Page' : 
                       'Second Page'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Traffic Sources */}
      <motion.div 
        variants={fadeIn}
        className="bg-white rounded-xl p-6 custom-shadow"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Traffic Sources</h2>
        <div className="grid md:grid-cols-5 gap-4">
          {mockSEOData.trafficSources.map((source, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-2">
                <svg className="w-full" height="8" viewBox="0 0 100 8">
                  <rect width="100" height="8" fill="#E5E7EB" rx="4" />
                  <rect width={source.percentage} height="8" fill={
                    source.source === 'Organic Search' ? '#3B82F6' :
                    source.source === 'Direct' ? '#10B981' :
                    source.source === 'Referral' ? '#8B5CF6' :
                    source.source === 'Social' ? '#EC4899' :
                    '#F59E0B'
                  } rx="4" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-gray-900">{source.percentage}%</p>
              <p className="text-sm text-gray-600">{source.source}</p>
              <div className={`flex items-center justify-center space-x-1 text-xs ${getChangeColor(source.change)}`}>
                {getChangeIcon(source.change)}
                <span>{Math.abs(source.change)}%</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Issues and Recommendations */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Issues */}
        <motion.div 
          variants={fadeIn}
          className="bg-white rounded-xl custom-shadow"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Issues to Fix</h2>
          </div>
          <div className="p-6 space-y-4">
            {mockSEOData.issues.map((issue, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${
                    issue.severity === 'high' ? 'bg-red-100' : 
                    issue.severity === 'medium' ? 'bg-yellow-100' : 
                    'bg-blue-100'
                  }`}>
                    <AlertTriangle className={`h-5 w-5 ${
                      issue.severity === 'high' ? 'text-red-600' : 
                      issue.severity === 'medium' ? 'text-yellow-600' : 
                      'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(issue.severity)}`}>
                        {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                      </span>
                    </div>
                    <p className="font-medium text-gray-900 mb-1">{issue.description}</p>
                    <div className="text-sm text-gray-600">
                      <p><span className="font-medium">Pages:</span> {issue.pages.join(', ')}</p>
                      <p><span className="font-medium">Impact:</span> {issue.impact}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div 
          variants={fadeIn}
          className="bg-white rounded-xl custom-shadow"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recommendations</h2>
          </div>
          <div className="p-6 space-y-4">
            {mockSEOData.recommendations.map((recommendation, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${
                    recommendation.priority === 'high' ? 'bg-red-100' : 
                    recommendation.priority === 'medium' ? 'bg-yellow-100' : 
                    'bg-blue-100'
                  }`}>
                    <CheckCircle className={`h-5 w-5 ${
                      recommendation.priority === 'high' ? 'text-red-600' : 
                      recommendation.priority === 'medium' ? 'text-yellow-600' : 
                      'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(recommendation.priority)}`}>
                        {recommendation.priority.charAt(0).toUpperCase() + recommendation.priority.slice(1)} Priority
                      </span>
                    </div>
                    <p className="font-medium text-gray-900 mb-1">{recommendation.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <p><span className="font-medium">Effort:</span> {recommendation.effort}</p>
                      <p><span className="font-medium">Impact:</span> {recommendation.impact}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Competitor Analysis */}
      <motion.div 
        variants={fadeIn}
        className="bg-white rounded-xl p-6 custom-shadow"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Competitor Analysis</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {mockSEOData.competitors.map((competitor, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{competitor.name}</h3>
                <div className={`${getScoreBgColor(competitor.overallScore)} px-2 py-1 rounded-full`}>
                  <span className={`text-sm font-medium ${getScoreColor(competitor.overallScore)}`}>
                    Score: {competitor.overallScore}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Top Keywords:</p>
                <div className="flex flex-wrap gap-2">
                  {competitor.topKeywords.map((keyword, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                  <span>View Full Analysis</span>
                  <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Action Plan */}
      <motion.div 
        variants={fadeIn}
        className="bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Your SEO Action Plan</h2>
            <p className="opacity-90 mb-4">
              Based on our analysis, here are the top 3 actions to improve your SEO performance:
            </p>
            <ol className="space-y-2 list-decimal list-inside">
              <li>Optimize images on service pages to improve mobile load time</li>
              <li>Add more location-specific content for Hyderabad and surrounding areas</li>
              <li>Create dedicated landing pages for each service with targeted keywords</li>
            </ol>
          </div>
          <div className="hidden md:block">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
              Generate Full Report
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SEOAnalytics;