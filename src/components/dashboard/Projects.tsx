import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Plus, 
  Calendar, 
  Clock,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  MoreVertical,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const projects = [
    {
      id: 1,
      name: 'Google Ads Campaign',
      type: 'Digital Marketing',
      status: 'active',
      progress: 85,
      startDate: '2024-01-15',
      budget: '$5,000',
      spent: '$4,250',
      manager: 'Sarah Johnson',
      description: 'PPC campaign targeting enterprise software keywords',
      metrics: {
        clicks: 2150,
        impressions: 45000,
        ctr: '4.78%',
        conversions: 23
      }
    },
    {
      id: 2,
      name: 'Website Redesign',
      type: 'Web Development',
      status: 'active',
      progress: 60,
      startDate: '2024-02-01',
      budget: '$12,000',
      spent: '$7,200',
      manager: 'David Chen',
      description: 'Complete website overhaul with modern design',
      metrics: {
        pages: 12,
        completed: 7,
        remaining: 5,
        dueDate: '2024-03-30'
      }
    },
    {
      id: 3,
      name: 'AI Chatbot Implementation',
      type: 'AI Solutions',
      status: 'active',
      progress: 40,
      startDate: '2024-02-15',
      budget: '$8,000',
      spent: '$3,200',
      manager: 'Sarah Mitchell',
      description: 'Customer support automation with NLP capabilities',
      metrics: {
        training: '65%',
        integration: '20%',
        testing: '0%',
        deployment: '0%'
      }
    },
    {
      id: 4,
      name: 'Meta Ads Campaign',
      type: 'Digital Marketing',
      status: 'completed',
      progress: 100,
      startDate: '2024-01-01',
      budget: '$3,000',
      spent: '$2,850',
      manager: 'David Chen',
      description: 'Social media advertising for product launch',
      metrics: {
        reach: 125000,
        engagement: '6.2%',
        leads: 145,
        cost_per_lead: '$19.66'
      }
    },
    {
      id: 5,
      name: 'Lead Generation System',
      type: 'Digital Marketing',
      status: 'paused',
      progress: 25,
      startDate: '2024-02-20',
      budget: '$4,500',
      spent: '$1,125',
      manager: 'Sarah Johnson',
      description: 'Automated lead capture and nurturing workflow',
      metrics: {
        forms: 3,
        sequences: 2,
        integration: 'pending',
        testing: 'scheduled'
      }
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'paused': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return PlayCircle;
      case 'completed': return CheckCircle;
      case 'paused': return AlertCircle;
      default: return Clock;
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
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600 mt-1">Manage and track your active projects</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>New Project</span>
          </button>
        </div>
      </motion.div>

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
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="paused">Paused</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid gap-6">
        {filteredProjects.map((project, index) => {
          const StatusIcon = getStatusIcon(project.status);
          
          return (
            <motion.div
              key={project.id}
              variants={fadeIn}
              className="bg-white rounded-xl p-6 custom-shadow hover-lift"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{project.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Started {project.startDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>Manager: {project.manager}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                    <Eye className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-500">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
              
              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Budget & Spend</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Budget:</span>
                      <span className="text-sm font-medium">{project.budget}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Spent:</span>
                      <span className="text-sm font-medium">{project.spent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Remaining:</span>
                      <span className="text-sm font-medium text-emerald-600">
                        ${parseInt(project.budget.replace('$', '').replace(',', '')) - parseInt(project.spent.replace('$', '').replace(',', ''))}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Key Metrics</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="text-center p-2 bg-gray-50 rounded-lg">
                        <div className="text-sm font-medium text-gray-900">{value}</div>
                        <div className="text-xs text-gray-500 capitalize">{key.replace('_', ' ')}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <motion.div 
          variants={fadeIn}
          className="text-center py-12"
        >
          <div className="text-gray-500">
            <Search className="h-16 w-16 mx-auto mb-4" />
            <p className="text-lg">No projects found</p>
            <p className="text-sm">Try adjusting your search or filter criteria</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Projects;