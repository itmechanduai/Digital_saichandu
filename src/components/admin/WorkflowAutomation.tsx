import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Plus, 
  Play, 
  Pause, 
  Settings, 
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  Database,
  Mail,
  MessageSquare,
  FileText,
  Users,
  Calendar,
  BarChart,
  RefreshCw,
  Save
} from 'lucide-react';

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'draft';
  type: string;
  steps: WorkflowStep[];
  triggers: string[];
  lastRun: string | null;
  executions: number;
  successRate: number;
  createdAt: string;
}

interface WorkflowStep {
  id: string;
  name: string;
  type: string;
  config: Record<string, any>;
  position: number;
}

const WorkflowAutomation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('workflows');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [showWorkflowBuilder, setShowWorkflowBuilder] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Mock data for workflows
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: '1',
      name: 'Lead Nurturing Sequence',
      description: 'Automated email sequence for new leads',
      status: 'active',
      type: 'email',
      steps: [
        { id: 's1', name: 'Welcome Email', type: 'email', config: { template: 'welcome' }, position: 1 },
        { id: 's2', name: 'Wait 2 Days', type: 'delay', config: { days: 2 }, position: 2 },
        { id: 's3', name: 'Follow-up Email', type: 'email', config: { template: 'follow-up' }, position: 3 },
        { id: 's4', name: 'Check Engagement', type: 'condition', config: { condition: 'opened' }, position: 4 },
        { id: 's5', name: 'Send Offer', type: 'email', config: { template: 'offer' }, position: 5 }
      ],
      triggers: ['New Lead Created', 'Form Submission'],
      lastRun: '2024-07-20T10:30:00',
      executions: 245,
      successRate: 92.5,
      createdAt: '2024-06-15T09:00:00'
    },
    {
      id: '2',
      name: 'Order Confirmation Workflow',
      description: 'Sends confirmation emails and updates CRM when new orders are placed',
      status: 'active',
      type: 'integration',
      steps: [
        { id: 's1', name: 'Send Confirmation', type: 'email', config: { template: 'order-confirmation' }, position: 1 },
        { id: 's2', name: 'Update CRM', type: 'crm', config: { action: 'update-status' }, position: 2 },
        { id: 's3', name: 'Notify Team', type: 'notification', config: { channel: 'slack' }, position: 3 }
      ],
      triggers: ['New Order Created'],
      lastRun: '2024-07-20T15:45:00',
      executions: 156,
      successRate: 98.7,
      createdAt: '2024-06-20T14:00:00'
    },
    {
      id: '3',
      name: 'Customer Feedback Collection',
      description: 'Automatically collects feedback after service delivery',
      status: 'paused',
      type: 'survey',
      steps: [
        { id: 's1', name: 'Wait 7 Days', type: 'delay', config: { days: 7 }, position: 1 },
        { id: 's2', name: 'Send Survey', type: 'email', config: { template: 'feedback-survey' }, position: 2 },
        { id: 's3', name: 'Check Response', type: 'condition', config: { condition: 'responded' }, position: 3 },
        { id: 's4', name: 'Thank You Email', type: 'email', config: { template: 'thank-you' }, position: 4 }
      ],
      triggers: ['Service Marked Complete'],
      lastRun: '2024-07-15T09:30:00',
      executions: 89,
      successRate: 76.4,
      createdAt: '2024-06-25T11:30:00'
    }
  ]);

  const workflowTemplates = [
    {
      id: 'template-1',
      name: 'Lead Nurturing Sequence',
      description: 'Automated email sequence for new leads',
      category: 'Marketing',
      steps: 5,
      triggers: ['New Lead Created', 'Form Submission'],
      icon: Mail
    },
    {
      id: 'template-2',
      name: 'Order Confirmation Flow',
      description: 'Confirmation emails and CRM updates for new orders',
      category: 'Sales',
      steps: 3,
      triggers: ['New Order Created'],
      icon: FileText
    },
    {
      id: 'template-3',
      name: 'Customer Onboarding',
      description: 'Guided onboarding process for new customers',
      category: 'Customer Success',
      steps: 7,
      triggers: ['New Customer Created'],
      icon: Users
    },
    {
      id: 'template-4',
      name: 'Appointment Reminder',
      description: 'Send reminders before scheduled appointments',
      category: 'Service',
      steps: 4,
      triggers: ['Appointment Scheduled'],
      icon: Calendar
    },
    {
      id: 'template-5',
      name: 'Data Sync Automation',
      description: 'Sync data between multiple platforms automatically',
      category: 'Integration',
      steps: 3,
      triggers: ['Data Updated', 'Scheduled'],
      icon: Database
    },
    {
      id: 'template-6',
      name: 'Performance Report Generator',
      description: 'Automatically generate and send performance reports',
      category: 'Analytics',
      steps: 5,
      triggers: ['Scheduled', 'Manual Trigger'],
      icon: BarChart
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-700';
      case 'paused': return 'bg-yellow-100 text-yellow-700';
      case 'draft': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'paused': return Pause;
      case 'draft': return Edit;
      default: return Clock;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'integration': return Database;
      case 'survey': return MessageSquare;
      default: return Zap;
    }
  };

  const toggleWorkflowStatus = (id: string) => {
    setWorkflows(prev => prev.map(workflow => 
      workflow.id === id 
        ? { ...workflow, status: workflow.status === 'active' ? 'paused' : 'active' }
        : workflow
    ));
  };

  const deleteWorkflow = (id: string) => {
    setWorkflows(prev => prev.filter(workflow => workflow.id !== id));
  };

  const handleCreateWorkflow = () => {
    setShowCreateModal(true);
  };

  const handleEditWorkflow = (workflow: Workflow) => {
    setSelectedWorkflow(workflow);
    setShowWorkflowBuilder(true);
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
            <h1 className="text-3xl font-bold text-gray-900">Workflow Automation</h1>
            <p className="text-gray-600 mt-1">Create and manage automated workflows for your business processes</p>
          </div>
          <button 
            onClick={handleCreateWorkflow}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <Plus className="h-5 w-5" />
            <span>Create Workflow</span>
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div variants={fadeIn} className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Active Workflows</p>
              <p className="text-3xl font-bold">{workflows.filter(w => w.status === 'active').length}</p>
            </div>
            <Zap className="h-8 w-8 text-blue-200" />
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100">Total Executions</p>
              <p className="text-3xl font-bold">{workflows.reduce((sum, w) => sum + w.executions, 0)}</p>
            </div>
            <Play className="h-8 w-8 text-emerald-200" />
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Avg Success Rate</p>
              <p className="text-3xl font-bold">
                {(workflows.reduce((sum, w) => sum + w.successRate, 0) / workflows.length).toFixed(1)}%
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-purple-200" />
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Last Execution</p>
              <p className="text-3xl font-bold">
                {workflows.some(w => w.lastRun) ? 
                  new Date(Math.max(...workflows.filter(w => w.lastRun).map(w => new Date(w.lastRun!).getTime()))).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 
                  'N/A'}
              </p>
            </div>
            <Clock className="h-8 w-8 text-orange-200" />
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <motion.div variants={fadeIn} className="bg-white rounded-xl custom-shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('workflows')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'workflows'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Active Workflows
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'templates'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Templates
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Execution History
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'workflows' && (
            <div className="space-y-6">
              {workflows.length === 0 ? (
                <div className="text-center py-12">
                  <Zap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Workflows Created</h3>
                  <p className="text-gray-600 mb-6">Create your first workflow to start automating your business processes</p>
                  <button 
                    onClick={handleCreateWorkflow}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Your First Workflow
                  </button>
                </div>
              ) : (
                <div className="grid gap-6">
                  {workflows.map((workflow) => {
                    const StatusIcon = getStatusIcon(workflow.status);
                    const TypeIcon = getTypeIcon(workflow.type);
                    
                    return (
                      <div key={workflow.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-4">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-lg">
                              <TypeIcon className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-xl font-semibold text-gray-900">{workflow.name}</h3>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(workflow.status)}`}>
                                  {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
                                </span>
                              </div>
                              <p className="text-gray-600 mb-3">{workflow.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>{workflow.executions} executions</span>
                                <span>•</span>
                                <span>{workflow.successRate}% success rate</span>
                                <span>•</span>
                                <span>Last run: {workflow.lastRun ? new Date(workflow.lastRun).toLocaleString() : 'Never'}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => toggleWorkflowStatus(workflow.id)}
                              className={`p-2 rounded-lg transition-colors ${
                                workflow.status === 'active'
                                  ? 'text-yellow-600 hover:bg-yellow-50'
                                  : 'text-emerald-600 hover:bg-emerald-50'
                              }`}
                              title={workflow.status === 'active' ? 'Pause Workflow' : 'Activate Workflow'}
                            >
                              {workflow.status === 'active' ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                            </button>
                            <button 
                              onClick={() => handleEditWorkflow(workflow)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit Workflow"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <button 
                              onClick={() => deleteWorkflow(workflow.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Workflow"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Workflow Steps Visualization */}
                        <div className="mt-4 mb-6">
                          <div className="flex items-center space-x-2 overflow-x-auto pb-4">
                            {workflow.steps.map((step, index) => (
                              <React.Fragment key={step.id}>
                                <div className={`px-4 py-2 rounded-lg ${
                                  step.type === 'email' ? 'bg-blue-100 text-blue-700' :
                                  step.type === 'delay' ? 'bg-purple-100 text-purple-700' :
                                  step.type === 'condition' ? 'bg-yellow-100 text-yellow-700' :
                                  step.type === 'crm' ? 'bg-emerald-100 text-emerald-700' :
                                  step.type === 'notification' ? 'bg-orange-100 text-orange-700' :
                                  'bg-gray-100 text-gray-700'
                                } text-sm font-medium flex items-center space-x-1`}>
                                  <span>{step.name}</span>
                                </div>
                                {index < workflow.steps.length - 1 && (
                                  <ArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                        
                        {/* Triggers */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Triggers</h4>
                          <div className="flex flex-wrap gap-2">
                            {workflow.triggers.map((trigger, index) => (
                              <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                {trigger}
                              </span>
                            ))}
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workflowTemplates.map((template) => (
                <div 
                  key={template.id} 
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    // In a real implementation, this would pre-fill the workflow creation form
                    setShowCreateModal(true);
                  }}
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-lg">
                      <template.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                          {template.category}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{template.steps} steps</span>
                        <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
                          <span>Use Template</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Executions</h3>
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                  <RefreshCw className="h-4 w-4" />
                  <span className="text-sm font-medium">Refresh</span>
                </button>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workflow</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Execution Time</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trigger</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[...Array(10)].map((_, index) => {
                      const workflow = workflows[index % workflows.length];
                      const isSuccess = Math.random() > 0.2;
                      const executionDate = new Date();
                      executionDate.setHours(executionDate.getHours() - index);
                      
                      return (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${isSuccess ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                              <span className="font-medium text-gray-900">{workflow.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {executionDate.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              isSuccess ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {isSuccess ? 'Success' : 'Failed'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {Math.floor(Math.random() * 5000)}ms
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {workflow.triggers[0]}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900">View Details</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Workflow Builder Modal */}
      {showWorkflowBuilder && selectedWorkflow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-bold text-gray-900">Workflow Builder</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedWorkflow.status)}`}>
                  {selectedWorkflow.status.charAt(0).toUpperCase() + selectedWorkflow.status.slice(1)}
                </span>
              </div>
              <button
                onClick={() => setShowWorkflowBuilder(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedWorkflow.name}</h3>
                  <p className="text-gray-600">{selectedWorkflow.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Test Workflow
                  </button>
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
              
              {/* Workflow Canvas */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 min-h-[400px]">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium">
                    Triggers: {selectedWorkflow.triggers.join(', ')}
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
                
                <div className="flex items-start space-x-4">
                  {selectedWorkflow.steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                      <div className={`p-4 rounded-lg ${
                        step.type === 'email' ? 'bg-blue-100 border border-blue-200' :
                        step.type === 'delay' ? 'bg-purple-100 border border-purple-200' :
                        step.type === 'condition' ? 'bg-yellow-100 border border-yellow-200' :
                        step.type === 'crm' ? 'bg-emerald-100 border border-emerald-200' :
                        step.type === 'notification' ? 'bg-orange-100 border border-orange-200' :
                        'bg-gray-100 border border-gray-200'
                      } min-w-[200px]`}>
                        <div className="font-medium mb-2">{step.name}</div>
                        <div className="text-sm text-gray-600">Type: {step.type}</div>
                        {step.type === 'delay' && (
                          <div className="text-sm text-gray-600">Wait: {step.config.days} days</div>
                        )}
                        {step.type === 'email' && (
                          <div className="text-sm text-gray-600">Template: {step.config.template}</div>
                        )}
                        {step.type === 'condition' && (
                          <div className="text-sm text-gray-600">If: {step.config.condition}</div>
                        )}
                        <div className="flex justify-end mt-2">
                          <button className="text-gray-500 hover:text-gray-700">
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      {index < selectedWorkflow.steps.length - 1 && (
                        <ArrowRight className="h-5 w-5 text-gray-400 mt-8" />
                      )}
                    </React.Fragment>
                  ))}
                  
                  <button className="p-4 border border-dashed border-gray-300 rounded-lg min-w-[200px] flex items-center justify-center text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors">
                    <Plus className="h-5 w-5 mr-2" />
                    Add Step
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowWorkflowBuilder(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Save className="h-5 w-5" />
                <span>Save Workflow</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Create Workflow Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Create New Workflow</h2>
              <p className="text-gray-600 mt-1">Set up an automated workflow for your business process</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Workflow Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Lead Nurturing Sequence"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe what this workflow does"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Workflow Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="email">Email Sequence</option>
                  <option value="integration">System Integration</option>
                  <option value="survey">Feedback Collection</option>
                  <option value="notification">Notification</option>
                  <option value="custom">Custom Workflow</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trigger Events</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="trigger-lead"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="trigger-lead" className="ml-2 text-gray-700">New Lead Created</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="trigger-form"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="trigger-form" className="ml-2 text-gray-700">Form Submission</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="trigger-order"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="trigger-order" className="ml-2 text-gray-700">New Order Created</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="trigger-schedule"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="trigger-schedule" className="ml-2 text-gray-700">Scheduled (Time-based)</label>
                  </div>
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
                onClick={() => {
                  setShowCreateModal(false);
                  setShowWorkflowBuilder(true);
                  setSelectedWorkflow(workflows[0]); // Just for demo
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue to Builder
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default WorkflowAutomation;