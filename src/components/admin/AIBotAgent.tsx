import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Settings, 
  Play, 
  Pause, 
  Edit, 
  Save,
  Plus,
  Trash2,
  MessageCircle,
  Users,
  ShoppingBag,
  BarChart3,
  Target,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  AlertCircle,
  Zap,
  Brain,
  Sparkles
} from 'lucide-react';

interface BotAgent {
  id: string;
  name: string;
  description: string;
  prompt: string;
  tasks: string[];
  status: 'active' | 'inactive';
  responses: number;
  successRate: number;
  lastActive: string;
  category: string;
  icon: string;
}

interface BotTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  prompt: string;
  tasks: string[];
  icon: string;
}

const AIBotAgent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('agents');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAgent, setEditingAgent] = useState<BotAgent | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<BotTemplate | null>(null);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Bot Templates
  const botTemplates: BotTemplate[] = [
    {
      id: 'lead-collector',
      name: 'Lead Collector Bot',
      description: 'Collects and qualifies leads from website visitors',
      category: 'Lead Generation',
      prompt: 'You are a professional lead generation assistant. Your goal is to collect visitor information and qualify leads for our digital marketing services. Ask relevant questions about their business needs, budget, and timeline. Be friendly but professional.',
      tasks: ['Collect contact information', 'Qualify lead budget', 'Identify service needs', 'Schedule consultation', 'Send follow-up emails'],
      icon: 'Target'
    },
    {
      id: 'product-advisor',
      name: 'Product Advisor Bot',
      description: 'Helps customers choose the right services',
      category: 'Sales Support',
      prompt: 'You are a knowledgeable product advisor for Digital Saichandu. Help customers understand our services including Google Ads, Meta Ads, Website Development, and AI Solutions. Recommend the best services based on their business needs and goals.',
      tasks: ['Explain service features', 'Compare service packages', 'Provide pricing information', 'Recommend best fit', 'Generate quotes'],
      icon: 'ShoppingBag'
    },
    {
      id: 'support-agent',
      name: 'Customer Support Bot',
      description: '24/7 customer support and issue resolution',
      category: 'Customer Support',
      prompt: 'You are a helpful customer support agent. Assist customers with their questions about orders, services, billing, and technical issues. Always be polite, helpful, and try to resolve issues quickly. Escalate complex issues to human agents when needed.',
      tasks: ['Answer FAQs', 'Check order status', 'Handle billing inquiries', 'Troubleshoot issues', 'Escalate to human agents'],
      icon: 'MessageCircle'
    },
    {
      id: 'analytics-bot',
      name: 'Analytics Reporter Bot',
      description: 'Provides performance reports and insights',
      category: 'Analytics',
      prompt: 'You are an analytics expert. Help users understand their campaign performance, website metrics, and ROI. Provide clear explanations of data and actionable insights for improvement.',
      tasks: ['Generate reports', 'Explain metrics', 'Identify trends', 'Suggest optimizations', 'Schedule reports'],
      icon: 'BarChart3'
    },
    {
      id: 'appointment-bot',
      name: 'Appointment Scheduler Bot',
      description: 'Schedules consultations and meetings',
      category: 'Scheduling',
      prompt: 'You are a professional appointment scheduler. Help visitors book consultations, demos, and meetings with our team. Check availability, confirm details, and send calendar invites.',
      tasks: ['Check availability', 'Book appointments', 'Send confirmations', 'Handle rescheduling', 'Send reminders'],
      icon: 'Calendar'
    }
  ];

  // Mock existing agents
  const [botAgents, setBotAgents] = useState<BotAgent[]>([]);

  const [newAgent, setNewAgent] = useState({
    name: '',
    description: '',
    prompt: '',
    tasks: [''],
    category: 'Lead Generation',
    icon: 'Bot'
  });

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Target, ShoppingBag, MessageCircle, BarChart3, Calendar, Bot, Users, Mail, Phone, Zap, Brain
    };
    return icons[iconName] || Bot;
  };

  const handleCreateAgent = () => {
    if (selectedTemplate) {
      setNewAgent({
        name: selectedTemplate.name,
        description: selectedTemplate.description,
        prompt: selectedTemplate.prompt,
        tasks: [...selectedTemplate.tasks],
        category: selectedTemplate.category,
        icon: selectedTemplate.icon
      });
    }
    setShowCreateModal(true);
  };

  const handleSaveAgent = () => {
    const agent: BotAgent = {
      id: Date.now().toString(),
      name: newAgent.name,
      description: newAgent.description,
      prompt: newAgent.prompt,
      tasks: newAgent.tasks.filter(task => task.trim() !== ''),
      status: 'inactive',
      responses: 0,
      successRate: 0,
      lastActive: new Date().toISOString(),
      category: newAgent.category,
      icon: newAgent.icon
    };

    setBotAgents(prev => [...prev, agent]);
    setShowCreateModal(false);
    setSelectedTemplate(null);
    setNewAgent({
      name: '',
      description: '',
      prompt: '',
      tasks: [''],
      category: 'Lead Generation',
      icon: 'Bot'
    });
  };

  const toggleAgentStatus = (agentId: string) => {
    setBotAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, status: agent.status === 'active' ? 'inactive' : 'active' }
        : agent
    ));
  };

  const addTask = () => {
    setNewAgent(prev => ({
      ...prev,
      tasks: [...prev.tasks, '']
    }));
  };

  const updateTask = (index: number, value: string) => {
    setNewAgent(prev => ({
      ...prev,
      tasks: prev.tasks.map((task, i) => i === index ? value : task)
    }));
  };

  const removeTask = (index: number) => {
    setNewAgent(prev => ({
      ...prev,
      tasks: prev.tasks.filter((_, i) => i !== index)
    }));
  };

  const tabs = [
    { id: 'agents', label: 'Active Agents' },
    { id: 'templates', label: 'Bot Templates' },
    { id: 'analytics', label: 'Performance' }
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
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <span>AI Bot Agents</span>
            </h1>
            <p className="text-gray-600 mt-1">Create and manage customizable AI agents for your business</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <Plus className="h-5 w-5" />
            <span>Create New Agent</span>
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div variants={fadeIn} className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Active Agents</p>
              <p className="text-3xl font-bold">{botAgents.filter(a => a.status === 'active').length}</p>
            </div>
            <Bot className="h-8 w-8 text-blue-200" />
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100">Total Responses</p>
              <p className="text-3xl font-bold">{botAgents.reduce((sum, a) => sum + a.responses, 0)}</p>
            </div>
            <MessageCircle className="h-8 w-8 text-emerald-200" />
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Avg Success Rate</p>
              <p className="text-3xl font-bold">
                {botAgents.length > 0 ? (botAgents.reduce((sum, a) => sum + a.successRate, 0) / botAgents.length).toFixed(1) : 0}%
              </p>
            </div>
            <Sparkles className="h-8 w-8 text-purple-200" />
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Templates Available</p>
              <p className="text-3xl font-bold">{botTemplates.length}</p>
            </div>
            <Settings className="h-8 w-8 text-orange-200" />
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <motion.div variants={fadeIn} className="bg-white rounded-xl custom-shadow">
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
          {activeTab === 'agents' && (
            <div className="space-y-6">
              {botAgents.length === 0 && activeTab === 'agents' && (
                <div className="text-center text-gray-500 py-8">No AI agents found.</div>
              )}
              {botAgents.length === 0 ? (
                <div className="text-center py-12">
                  <Bot className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No AI Agents Created</h3>
                  <p className="text-gray-600 mb-6">Create your first AI agent to start automating customer interactions</p>
                  <button 
                    onClick={() => setShowCreateModal(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Your First Agent
                  </button>
                </div>
              ) : (
                <div className="grid gap-6">
                  {botAgents.map((agent) => {
                    const IconComponent = getIconComponent(agent.icon);
                    return (
                      <div key={agent.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-4">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-lg">
                              <IconComponent className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-xl font-semibold text-gray-900">{agent.name}</h3>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  agent.status === 'active' 
                                    ? 'bg-emerald-100 text-emerald-700' 
                                    : 'bg-gray-100 text-gray-700'
                                }`}>
                                  {agent.status === 'active' ? 'Active' : 'Inactive'}
                                </span>
                              </div>
                              <p className="text-gray-600 mb-3">{agent.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>{agent.responses} responses</span>
                                <span>•</span>
                                <span>{agent.successRate}% success rate</span>
                                <span>•</span>
                                <span>Last active: {new Date(agent.lastActive).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => toggleAgentStatus(agent.id)}
                              className={`p-2 rounded-lg transition-colors ${
                                agent.status === 'active'
                                  ? 'text-red-600 hover:bg-red-50'
                                  : 'text-emerald-600 hover:bg-emerald-50'
                              }`}
                            >
                              {agent.status === 'active' ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                            </button>
                            <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                              <Edit className="h-5 w-5" />
                            </button>
                            <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                              <Settings className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Tasks</h4>
                            <div className="space-y-1">
                              {agent.tasks.map((task, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                                  <span className="text-sm text-gray-700">{task}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Performance</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Success Rate</span>
                                <span className="font-medium">{agent.successRate}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${agent.successRate}%` }}
                                />
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

          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {botTemplates.map((template) => {
                  const IconComponent = getIconComponent(template.icon);
                  return (
                    <div key={template.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-lg">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{template.name}</h3>
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                            {template.category}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{template.description}</p>
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Capabilities</h4>
                        <div className="space-y-1">
                          {template.tasks.slice(0, 3).map((task, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <CheckCircle className="h-3 w-3 text-emerald-500" />
                              <span className="text-sm text-gray-600">{task}</span>
                            </div>
                          ))}
                          {template.tasks.length > 3 && (
                            <span className="text-sm text-gray-500">+{template.tasks.length - 3} more</span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedTemplate(template);
                          handleCreateAgent();
                        }}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                      >
                        Use This Template
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Performance</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{botAgents.reduce((sum, a) => sum + a.responses, 0)}</div>
                    <div className="text-sm text-gray-600">Total Interactions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">
                      {botAgents.length > 0 ? (botAgents.reduce((sum, a) => sum + a.successRate, 0) / botAgents.length).toFixed(1) : 0}%
                    </div>
                    <div className="text-sm text-gray-600">Avg Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{botAgents.filter(a => a.status === 'active').length}</div>
                    <div className="text-sm text-gray-600">Active Agents</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">24/7</div>
                    <div className="text-sm text-gray-600">Availability</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Create Agent Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Create New AI Agent</h2>
              <p className="text-gray-600 mt-1">Configure your custom AI agent with specific tasks and prompts</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Agent Name</label>
                  <input
                    type="text"
                    value={newAgent.name}
                    onChange={(e) => setNewAgent(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Lead Collector Pro"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newAgent.category}
                    onChange={(e) => setNewAgent(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Lead Generation">Lead Generation</option>
                    <option value="Sales Support">Sales Support</option>
                    <option value="Customer Support">Customer Support</option>
                    <option value="Analytics">Analytics</option>
                    <option value="Scheduling">Scheduling</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  value={newAgent.description}
                  onChange={(e) => setNewAgent(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of what this agent does"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">AI Prompt</label>
                <textarea
                  value={newAgent.prompt}
                  onChange={(e) => setNewAgent(prev => ({ ...prev, prompt: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Define the AI agent's personality, role, and behavior..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tasks & Capabilities</label>
                <div className="space-y-2">
                  {newAgent.tasks.map((task, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={task}
                        onChange={(e) => updateTask(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Collect contact information"
                      />
                      {newAgent.tasks.length > 1 && (
                        <button
                          onClick={() => removeTask(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addTask}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Task</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setSelectedTemplate(null);
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAgent}
                disabled={!newAgent.name || !newAgent.prompt}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Create Agent</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default AIBotAgent;