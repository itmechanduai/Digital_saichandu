import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Play, 
  Pause, 
  Settings, 
  Plus,
  Zap,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Code,
  MessageSquare,
  Mail,
  Database,
  Globe
} from 'lucide-react';

const AIWorkflows: React.FC = () => {
  const [activeTab, setActiveTab] = useState('workflows');

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const workflows = [
    {
      id: 1,
      name: 'Customer Support Bot',
      description: 'Automated customer service responses and ticket routing',
      status: 'active',
      type: 'chatbot',
      lastRun: '2024-02-20T10:30:00',
      executions: 1247,
      successRate: 94.5,
      avgResponseTime: '1.2s',
      triggers: ['Website Chat', 'Email', 'Slack'],
      actions: ['Respond to Query', 'Create Ticket', 'Escalate to Human']
    },
    {
      id: 2,
      name: 'Lead Qualification',
      description: 'Automatically qualify and score incoming leads',
      status: 'active',
      type: 'automation',
      lastRun: '2024-02-20T14:15:00',
      executions: 523,
      successRate: 98.2,
      avgResponseTime: '0.8s',
      triggers: ['Form Submission', 'Email Signup', 'Demo Request'],
      actions: ['Score Lead', 'Send to CRM', 'Notify Sales Team']
    },
    {
      id: 3,
      name: 'Content Generator',
      description: 'AI-powered content creation for social media and blogs',
      status: 'paused',
      type: 'content',
      lastRun: '2024-02-19T09:00:00',
      executions: 234,
      successRate: 87.3,
      avgResponseTime: '15.2s',
      triggers: ['Schedule', 'Content Request', 'Trend Alert'],
      actions: ['Generate Content', 'Review & Approve', 'Publish']
    },
    {
      id: 4,
      name: 'Email Automation',
      description: 'Personalized email sequences based on user behavior',
      status: 'active',
      type: 'email',
      lastRun: '2024-02-20T16:45:00',
      executions: 892,
      successRate: 91.7,
      avgResponseTime: '2.1s',
      triggers: ['User Action', 'Time-based', 'Behavioral'],
      actions: ['Send Email', 'Update Tags', 'Track Engagement']
    }
  ];

  const workflowTemplates = [
    {
      id: 1,
      name: 'Customer Onboarding',
      description: 'Automated welcome sequence for new customers',
      icon: MessageSquare,
      category: 'Customer Success',
      complexity: 'Medium',
      estimatedTime: '30 min'
    },
    {
      id: 2,
      name: 'Data Sync Automation',
      description: 'Sync data between multiple platforms automatically',
      icon: Database,
      category: 'Integration',
      complexity: 'High',
      estimatedTime: '45 min'
    },
    {
      id: 3,
      name: 'Social Media Scheduler',
      description: 'Automated posting across social media platforms',
      icon: Globe,
      category: 'Marketing',
      complexity: 'Low',
      estimatedTime: '15 min'
    },
    {
      id: 4,
      name: 'Invoice Processing',
      description: 'Automated invoice generation and payment tracking',
      icon: BarChart3,
      category: 'Finance',
      complexity: 'Medium',
      estimatedTime: '25 min'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-700';
      case 'paused': return 'bg-yellow-100 text-yellow-700';
      case 'error': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'paused': return Pause;
      case 'error': return AlertCircle;
      default: return Clock;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'chatbot': return Bot;
      case 'automation': return Zap;
      case 'content': return Code;
      case 'email': return Mail;
      default: return Bot;
    }
  };

  const tabs = [
    { id: 'workflows', label: 'Active Workflows' },
    { id: 'templates', label: 'Templates' },
    { id: 'analytics', label: 'Analytics' }
  ];

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
            <h1 className="text-3xl font-bold text-gray-900">AI Workflows</h1>
            <p className="text-gray-600 mt-1">Automate your business processes with AI</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Create Workflow</span>
          </button>
        </div>
      </motion.div>

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
          {activeTab === 'workflows' && (
            <div className="space-y-6">
              {workflows.map((workflow) => {
                const StatusIcon = getStatusIcon(workflow.status);
                const TypeIcon = getTypeIcon(workflow.type);
                
                return (
                  <div key={workflow.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-to-r from-blue-500 to-emerald-500 p-3 rounded-lg">
                          <TypeIcon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{workflow.name}</h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(workflow.status)}`}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-3">{workflow.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Last run: {new Date(workflow.lastRun).toLocaleString()}</span>
                            <span>•</span>
                            <span>{workflow.executions} executions</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                          {workflow.status === 'active' ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                          <Settings className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Performance Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-emerald-50 rounded-lg p-3">
                        <div className="text-sm text-emerald-600">Success Rate</div>
                        <div className="text-lg font-semibold text-emerald-900">{workflow.successRate}%</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-sm text-blue-600">Avg Response Time</div>
                        <div className="text-lg font-semibold text-blue-900">{workflow.avgResponseTime}</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="text-sm text-purple-600">Total Executions</div>
                        <div className="text-lg font-semibold text-purple-900">{workflow.executions}</div>
                      </div>
                    </div>
                    
                    {/* Triggers and Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Triggers</h4>
                        <div className="space-y-1">
                          {workflow.triggers.map((trigger, index) => (
                            <span key={index} className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm mr-2">
                              {trigger}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Actions</h4>
                        <div className="space-y-1">
                          {workflow.actions.map((action, index) => (
                            <span key={index} className="inline-block bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-sm mr-2">
                              {action}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workflowTemplates.map((template) => (
                <div key={template.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-blue-500 to-emerald-500 p-3 rounded-lg">
                      <template.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                          {template.category}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{template.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Complexity: {template.complexity}</span>
                          <span>•</span>
                          <span>Setup: {template.estimatedTime}</span>
                        </div>
                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                          Use Template
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600">Total Workflows</p>
                      <p className="text-2xl font-bold text-blue-900">{workflows.length}</p>
                    </div>
                    <Bot className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                
                <div className="bg-emerald-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-emerald-600">Active Workflows</p>
                      <p className="text-2xl font-bold text-emerald-900">
                        {workflows.filter(w => w.status === 'active').length}
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-emerald-600" />
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-600">Total Executions</p>
                      <p className="text-2xl font-bold text-purple-900">
                        {workflows.reduce((sum, w) => sum + w.executions, 0)}
                      </p>
                    </div>
                    <Zap className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-orange-600">Avg Success Rate</p>
                      <p className="text-2xl font-bold text-orange-900">
                        {(workflows.reduce((sum, w) => sum + w.successRate, 0) / workflows.length).toFixed(1)}%
                      </p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
                <p className="text-gray-600">
                  Your AI workflows are performing well with an average success rate of{' '}
                  {(workflows.reduce((sum, w) => sum + w.successRate, 0) / workflows.length).toFixed(1)}%.
                  Total executions this month: {workflows.reduce((sum, w) => sum + w.executions, 0)}.
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AIWorkflows;