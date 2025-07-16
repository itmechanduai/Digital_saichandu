import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Users, 
  DollarSign, 
  Plus,
  ArrowRight,
  ArrowLeft,
  MoreHorizontal,
  Edit,
  Trash2,
  User,
  Mail,
  Phone,
  Calendar
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  value: number;
  stage: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  assignedTo?: string;
  lastContact: string;
  nextFollowUp?: string;
  notes?: string;
  tags: string[];
}

const CRMPipeline: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      company: 'Tech Solutions Inc.',
      value: 5000,
      stage: 'lead',
      assignedTo: 'Sarah Johnson',
      lastContact: '2024-02-15',
      nextFollowUp: '2024-02-22',
      notes: 'Interested in Google Ads services',
      tags: ['Google Ads', 'High Priority']
    },
    {
      id: '2',
      name: 'Mary Jones',
      email: 'mary@example.com',
      phone: '+1 (555) 234-5678',
      company: 'Growth Marketing Co.',
      value: 3500,
      stage: 'qualified',
      assignedTo: 'David Chen',
      lastContact: '2024-02-18',
      nextFollowUp: '2024-02-25',
      notes: 'Needs a proposal for Meta Ads campaign',
      tags: ['Meta Ads']
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike@example.com',
      phone: '+1 (555) 345-6789',
      company: 'Local Business LLC',
      value: 8000,
      stage: 'proposal',
      assignedTo: 'Sarah Johnson',
      lastContact: '2024-02-19',
      nextFollowUp: '2024-02-26',
      notes: 'Sent proposal for website development',
      tags: ['Website', 'High Value']
    },
    {
      id: '4',
      name: 'Sarah Davis',
      email: 'sarah@example.com',
      phone: '+1 (555) 456-7890',
      company: 'E-commerce Store',
      value: 12000,
      stage: 'negotiation',
      assignedTo: 'David Chen',
      lastContact: '2024-02-20',
      nextFollowUp: '2024-02-23',
      notes: 'Negotiating contract terms for AI chatbot',
      tags: ['AI Services', 'High Value']
    },
    {
      id: '5',
      name: 'David Chen',
      email: 'david@example.com',
      phone: '+1 (555) 567-8901',
      company: 'Startup Inc.',
      value: 15000,
      stage: 'won',
      assignedTo: 'Sarah Johnson',
      lastContact: '2024-02-17',
      notes: 'Closed deal for comprehensive digital marketing package',
      tags: ['Full Package', 'High Value']
    },
    {
      id: '6',
      name: 'Emily Brown',
      email: 'emily@example.com',
      phone: '+1 (555) 678-9012',
      company: 'Retail Chain',
      value: 7500,
      stage: 'lost',
      assignedTo: 'David Chen',
      lastContact: '2024-02-16',
      notes: 'Went with competitor due to budget constraints',
      tags: ['Price Sensitive']
    }
  ]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stages = [
    { id: 'lead', name: 'Lead', color: 'bg-blue-100 border-blue-300' },
    { id: 'qualified', name: 'Qualified', color: 'bg-purple-100 border-purple-300' },
    { id: 'proposal', name: 'Proposal', color: 'bg-yellow-100 border-yellow-300' },
    { id: 'negotiation', name: 'Negotiation', color: 'bg-orange-100 border-orange-300' },
    { id: 'won', name: 'Won', color: 'bg-emerald-100 border-emerald-300' },
    { id: 'lost', name: 'Lost', color: 'bg-red-100 border-red-300' }
  ];

  const getLeadsByStage = (stage: string) => {
    return leads.filter(lead => lead.stage === stage);
  };

  const getTotalValueByStage = (stage: string) => {
    return getLeadsByStage(stage).reduce((sum, lead) => sum + lead.value, 0);
  };

  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    e.dataTransfer.setData('leadId', leadId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStage: string) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('leadId');
    
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, stage: targetStage as any } : lead
    ));
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
            <h1 className="text-3xl font-bold text-gray-900">CRM Pipeline</h1>
            <p className="text-gray-600 mt-1">Manage your sales pipeline and track leads</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Add Lead</span>
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
              <p className="text-sm text-gray-600">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">{leads.length}</p>
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
              <p className="text-sm text-gray-600">Pipeline Value</p>
              <p className="text-2xl font-bold text-gray-900">
                ${leads.reduce((sum, lead) => sum + lead.value, 0).toLocaleString()}
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
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {leads.length > 0 
                  ? `${Math.round((getLeadsByStage('won').length / leads.length) * 100)}%` 
                  : '0%'}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Briefcase className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Pipeline */}
      <motion.div 
        variants={fadeIn}
        className="bg-white rounded-xl custom-shadow overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Sales Pipeline</h2>
        </div>
        
        <div className="p-6 overflow-x-auto">
          <div className="flex space-x-4 min-w-max">
            {stages.map((stage) => (
              <div 
                key={stage.id}
                className={`w-80 flex-shrink-0 ${stage.color} rounded-lg border p-4`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{stage.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{getLeadsByStage(stage.id).length}</span>
                    <span className="text-sm text-gray-600">
                      ${getTotalValueByStage(stage.id).toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {getLeadsByStage(stage.id).map((lead) => (
                    <div 
                      key={lead.id}
                      className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-move"
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{lead.name}</h4>
                        <div className="flex items-center">
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{lead.company}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-blue-600">${lead.value.toLocaleString()}</span>
                        <div className="flex items-center space-x-1 text-gray-500">
                          <Calendar className="h-3 w-3" />
                          <span>{lead.nextFollowUp || 'No follow-up'}</span>
                        </div>
                      </div>
                      {lead.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {lead.tags.map((tag, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <button className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors text-sm">
                    + Add Lead
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CRMPipeline;