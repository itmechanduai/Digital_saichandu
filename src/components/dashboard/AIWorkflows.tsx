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

  // No demo workflows or templates
  const workflows: any[] = [];
  const workflowTemplates: any[] = [];

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
        <h1 className="text-3xl font-bold text-gray-900">AI Workflows</h1>
        <p className="text-gray-600 mt-1">Automate your business processes with AI-powered workflows</p>
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
            <motion.div 
              variants={fadeIn}
              className="bg-white rounded-xl p-6 custom-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Workflows</h2>
              <div className="space-y-4">
                <div className="text-center py-12">
                  <Bot className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No workflows found</h3>
                  <p className="text-gray-600">You have not created any AI workflows yet.</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'templates' && (
            <motion.div 
              variants={fadeIn}
              className="bg-white rounded-xl p-6 custom-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Workflow Templates</h2>
              <div className="space-y-4">
                <div className="text-center py-12">
                  <Bot className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
                  <p className="text-gray-600">No workflow templates are available yet.</p>
                </div>
              </div>
            </motion.div>
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