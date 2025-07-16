import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Eye, 
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  MessageCircle,
  Download,
  MoreVertical,
  User,
  Tag,
  FileText,
  X,
  Send
} from 'lucide-react';

interface SupportTicket {
  id: string;
  ticketNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  subject: string;
  message: string;
  inquiryType: string;
  status: 'new' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  orderNumber?: string;
  responses: {
    id: string;
    message: string;
    createdAt: string;
    isAdmin: boolean;
  }[];
}

const SupportTickets: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [showTicketDetails, setShowTicketDetails] = useState(false);
  const [replyText, setReplyText] = useState('');

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Mock data for support tickets
  const tickets: SupportTicket[] = [
    {
      id: '1',
      ticketNumber: 'TKT-123456',
      customerName: 'John Smith',
      customerEmail: 'john@example.com',
      customerPhone: '+1 (555) 123-4567',
      subject: 'Issue with Google Ads Campaign',
      message: 'I\'m having trouble with my Google Ads campaign. The ads are not showing up even though the campaign is active. Can you please help me troubleshoot this issue?',
      inquiryType: 'technical',
      status: 'new',
      priority: 'high',
      createdAt: '2024-02-20T10:30:00',
      updatedAt: '2024-02-20T10:30:00',
      assignedTo: undefined,
      orderNumber: 'ORD-001',
      responses: []
    },
    {
      id: '2',
      ticketNumber: 'TKT-123457',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah@example.com',
      customerPhone: '+1 (555) 234-5678',
      subject: 'Billing Question',
      message: 'I was charged twice for my last invoice. Can you please check this and process a refund for the duplicate charge?',
      inquiryType: 'billing',
      status: 'in_progress',
      priority: 'urgent',
      createdAt: '2024-02-19T14:15:00',
      updatedAt: '2024-02-20T09:45:00',
      assignedTo: 'David Chen',
      orderNumber: 'ORD-002',
      responses: [
        {
          id: 'resp-1',
          message: 'Thank you for bringing this to our attention. I\'m looking into this issue now and will get back to you shortly with more information.',
          createdAt: '2024-02-20T09:45:00',
          isAdmin: true
        }
      ]
    },
    {
      id: '3',
      ticketNumber: 'TKT-123458',
      customerName: 'Mike Wilson',
      customerEmail: 'mike@example.com',
      customerPhone: '+1 (555) 345-6789',
      subject: 'Feature Request',
      message: 'I would like to request a new feature for the AI chatbot. It would be great if it could integrate with our CRM system.',
      inquiryType: 'feature',
      status: 'resolved',
      priority: 'medium',
      createdAt: '2024-02-18T11:20:00',
      updatedAt: '2024-02-20T15:30:00',
      assignedTo: 'Sarah Mitchell',
      responses: [
        {
          id: 'resp-2',
          message: 'Thank you for your feature request. We\'ve added this to our product roadmap and will consider it for a future update.',
          createdAt: '2024-02-19T10:15:00',
          isAdmin: true
        },
        {
          id: 'resp-3',
          message: 'Thanks for the update. Looking forward to this feature!',
          createdAt: '2024-02-19T14:30:00',
          isAdmin: false
        },
        {
          id: 'resp-4',
          message: 'We\'re happy to let you know that we\'ve prioritized this feature and it will be included in our next release. Thank you for your patience!',
          createdAt: '2024-02-20T15:30:00',
          isAdmin: true
        }
      ]
    },
    {
      id: '4',
      ticketNumber: 'TKT-123459',
      customerName: 'Emily Davis',
      customerEmail: 'emily@example.com',
      customerPhone: '+1 (555) 456-7890',
      subject: 'Website Development Question',
      message: 'I\'m interested in your website development services. Can you provide more information about your process and timeline?',
      inquiryType: 'general',
      status: 'closed',
      priority: 'low',
      createdAt: '2024-02-17T09:00:00',
      updatedAt: '2024-02-19T16:45:00',
      assignedTo: 'David Chen',
      responses: [
        {
          id: 'resp-5',
          message: 'Thank you for your interest in our website development services. I\'d be happy to provide more information. Our typical process includes discovery, design, development, testing, and launch phases. The timeline depends on the complexity of the project, but usually ranges from 4-8 weeks.',
          createdAt: '2024-02-18T10:30:00',
          isAdmin: true
        },
        {
          id: 'resp-6',
          message: 'Thank you for the information. I\'d like to schedule a consultation to discuss my project in more detail.',
          createdAt: '2024-02-18T14:15:00',
          isAdmin: false
        },
        {
          id: 'resp-7',
          message: 'Great! I\'ve sent you a calendar invite for a consultation call tomorrow at 2 PM. Looking forward to discussing your project!',
          createdAt: '2024-02-18T15:00:00',
          isAdmin: true
        },
        {
          id: 'resp-8',
          message: 'Is there anything else you need assistance with?',
          createdAt: '2024-02-19T16:45:00',
          isAdmin: true
        }
      ]
    }
  ];

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'in_progress': return 'bg-yellow-100 text-yellow-700';
      case 'resolved': return 'bg-emerald-100 text-emerald-700';
      case 'closed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return MessageSquare;
      case 'in_progress': return Clock;
      case 'resolved': return CheckCircle;
      case 'closed': return CheckCircle;
      default: return MessageSquare;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-700';
      case 'medium': return 'bg-blue-100 text-blue-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'urgent': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getInquiryTypeLabel = (type: string) => {
    switch (type) {
      case 'general': return 'General Inquiry';
      case 'technical': return 'Technical Support';
      case 'billing': return 'Billing Issue';
      case 'product': return 'Product Related';
      case 'complaint': return 'Complaint';
      case 'feature': return 'Feature Request';
      default: return type;
    }
  };

  const handleViewTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setShowTicketDetails(true);
  };

  const handleSendReply = () => {
    if (!selectedTicket || !replyText.trim()) return;
    
    // In a real app, this would send the reply to the backend
    console.log('Sending reply to ticket', selectedTicket.ticketNumber, replyText);
    
    // For demo purposes, we'll just show a success message
    toast.success('Reply sent successfully!');
    setReplyText('');
    
    // Close the ticket details modal
    setShowTicketDetails(false);
  };

  // Mock toast function
  const toast = {
    success: (message: string) => console.log(message)
  };

  const totalNew = tickets.filter(t => t.status === 'new').length;
  const totalInProgress = tickets.filter(t => t.status === 'in_progress').length;
  const totalResolved = tickets.filter(t => t.status === 'resolved').length;
  const totalUrgent = tickets.filter(t => t.priority === 'urgent').length;

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
            <h1 className="text-3xl font-bold text-gray-900">Support Tickets</h1>
            <p className="text-gray-600 mt-1">Manage and respond to customer support inquiries</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          variants={fadeIn}
          className="bg-white rounded-xl p-6 custom-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">New Tickets</p>
              <p className="text-2xl font-bold text-gray-900">{totalNew}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="bg-white rounded-xl p-6 custom-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">{totalInProgress}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="bg-white rounded-xl p-6 custom-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-gray-900">{totalResolved}</p>
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
              <p className="text-sm text-gray-600">Urgent</p>
              <p className="text-2xl font-bold text-gray-900">{totalUrgent}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </motion.div>
      </div>

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
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Tickets List */}
      <motion.div 
        variants={fadeIn}
        className="bg-white rounded-xl custom-shadow overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ticket
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.map((ticket) => {
                const StatusIcon = getStatusIcon(ticket.status);
                
                return (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {ticket.ticketNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{ticket.customerName}</div>
                        <div className="text-sm text-gray-500">{ticket.customerEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="max-w-xs overflow-hidden text-ellipsis">
                        {ticket.subject}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {getInquiryTypeLabel(ticket.inquiryType)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {ticket.status === 'in_progress' ? 'In Progress' : 
                         ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleViewTicket(ticket)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-emerald-600 hover:text-emerald-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {filteredTickets.length === 0 && (
        <motion.div 
          variants={fadeIn}
          className="text-center py-12"
        >
          <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}

      {/* Ticket Details Modal */}
      {showTicketDetails && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-bold text-gray-900">{selectedTicket.ticketNumber}</h2>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedTicket.status)}`}>
                  {selectedTicket.status === 'in_progress' ? 'In Progress' : 
                   selectedTicket.status.charAt(0).toUpperCase() + selectedTicket.status.slice(1)}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(selectedTicket.priority)}`}>
                  {selectedTicket.priority.charAt(0).toUpperCase() + selectedTicket.priority.slice(1)}
                </span>
              </div>
              <button
                onClick={() => setShowTicketDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Ticket Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Customer Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium text-gray-900">{selectedTicket.customerName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium text-gray-900">{selectedTicket.customerEmail}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium text-gray-900">{selectedTicket.customerPhone}</span>
                    </div>
                    {selectedTicket.orderNumber && (
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Order:</span>
                        <span className="font-medium text-gray-900">{selectedTicket.orderNumber}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Ticket Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Tag className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium text-gray-900">{getInquiryTypeLabel(selectedTicket.inquiryType)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Created:</span>
                      <span className="font-medium text-gray-900">{new Date(selectedTicket.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Updated:</span>
                      <span className="font-medium text-gray-900">{new Date(selectedTicket.updatedAt).toLocaleString()}</span>
                    </div>
                    {selectedTicket.assignedTo && (
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Assigned To:</span>
                        <span className="font-medium text-gray-900">{selectedTicket.assignedTo}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Ticket Content */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Subject</h3>
                <p className="text-gray-900 font-medium mb-4">{selectedTicket.subject}</p>
                
                <h3 className="font-semibold text-gray-900 mb-4">Message</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <p className="text-gray-700 whitespace-pre-line">{selectedTicket.message}</p>
                </div>
              </div>

              {/* Conversation */}
              {selectedTicket.responses.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Conversation History</h3>
                  <div className="space-y-4">
                    {selectedTicket.responses.map((response) => (
                      <div 
                        key={response.id} 
                        className={`flex ${response.isAdmin ? 'justify-start' : 'justify-end'}`}
                      >
                        <div className={`max-w-lg rounded-lg p-4 ${
                          response.isAdmin 
                            ? 'bg-blue-50 text-gray-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`text-sm font-medium ${
                              response.isAdmin ? 'text-blue-600' : 'text-gray-600'
                            }`}>
                              {response.isAdmin ? 'Support Agent' : 'Customer'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(response.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-gray-700">{response.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reply Form */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Reply</h3>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Type your reply here..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <div className="flex-1">
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    defaultValue={selectedTicket.status}
                  >
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div className="flex-1">
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    defaultValue={selectedTicket.priority}
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent Priority</option>
                  </select>
                </div>
                <button
                  onClick={handleSendReply}
                  disabled={!replyText.trim()}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Reply</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default SupportTickets;