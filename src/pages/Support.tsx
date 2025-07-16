import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
  MessageSquare, 
  Send, 
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  FileText,
  Mail,
  Phone,
  User,
  Clock
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  inquiryType: yup.string().required('Please select an inquiry type'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required'),
  orderNumber: yup.string().optional(),
});

type FormData = yup.InferType<typeof schema>;

const Support: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    }
  });

  // Set user data when it becomes available
  React.useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
      if (user.phone) setValue('phone', user.phone);
    }
  }, [user, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a random ticket number
      const randomTicket = 'TKT-' + Math.floor(100000 + Math.random() * 900000);
      setTicketNumber(randomTicket);
      
      console.log('Support request submitted:', data);
      setIsSubmitted(true);
      toast.success('Support request submitted successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to submit support request. Please try again.');
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'billing', label: 'Billing Issue' },
    { value: 'product', label: 'Product Related' },
    { value: 'complaint', label: 'Complaint' },
    { value: 'feature', label: 'Feature Request' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
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
            <motion.div 
              className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6"
              variants={fadeIn}
            >
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              variants={fadeIn}
            >
              Customer <span className="gradient-text">Support</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 leading-relaxed"
              variants={fadeIn}
            >
              We're here to help! Submit your inquiry and our team will get back to you within 5-7 business days.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Support Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 custom-shadow text-center"
            >
              <div className="bg-emerald-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Support Request Submitted!
              </h2>
              <p className="text-gray-600 mb-6">
                Your ticket number is: <span className="font-bold text-blue-600">{ticketNumber}</span>
              </p>
              <p className="text-gray-600 mb-8">
                We've received your inquiry and will get back to you within 5-7 business days. 
                Please keep this ticket number for reference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Submit Another Request
                </button>
                <button
                  onClick={() => window.location.href = '/dashboard'}
                  className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                >
                  Go to Dashboard
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white rounded-2xl p-8 custom-shadow">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Submit a Support Request
                </h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          {...register('name')}
                          type="text"
                          className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            errors.name ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Your name"
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          {...register('email')}
                          type="email"
                          className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            errors.email ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="your@email.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          {...register('phone')}
                          type="tel"
                          className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            errors.phone ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Inquiry Type *
                      </label>
                      <select
                        {...register('inquiryType')}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.inquiryType ? 'border-red-300' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select Inquiry Type</option>
                        {inquiryTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      {errors.inquiryType && (
                        <p className="mt-1 text-sm text-red-600">{errors.inquiryType.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order Number (if applicable)
                    </label>
                    <input
                      {...register('orderNumber')}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="e.g., ORD-12345"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      {...register('subject')}
                      type="text"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.subject ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Brief description of your inquiry"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      {...register('message')}
                      rows={5}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                        errors.message ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Please provide details about your inquiry..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                      I agree to the processing of my personal data in accordance with the{' '}
                      <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover-lift"
                  >
                    {isSubmitting ? (
                      <div className="loading-spinner" />
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Submit Support Request</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Support Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common support inquiries
            </p>
          </motion.div>
          
          <div className="space-y-6">
            {[
              {
                question: "How long does it take to get a response?",
                answer: "We aim to respond to all support inquiries within 5-7 business days. For urgent matters, please call our support line directly."
              },
              {
                question: "Can I check the status of my support ticket?",
                answer: "Yes, you can check the status of your support ticket by logging into your account and visiting the 'My Support Tickets' section in your dashboard."
              },
              {
                question: "What information should I include in my support request?",
                answer: "Please include your order number (if applicable), a detailed description of the issue, any error messages you've received, and steps to reproduce the problem if it's technical in nature."
              },
              {
                question: "How do I update my support ticket with new information?",
                answer: "You can update your existing support ticket by replying to the email notification you received or by logging into your account and adding a comment to the ticket."
              },
              {
                question: "What if my issue is urgent?",
                answer: "For urgent issues that require immediate attention, please call our support line at +91 9390437608 during business hours (10AM-7PM IST, Monday-Saturday)."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 custom-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full mt-1">
                    <HelpCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="bg-blue-50 rounded-xl p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">
                For non-urgent inquiries, email us directly
              </p>
              <a 
                href="mailto:info@digitalsaichandu.com"
                className="text-blue-600 font-medium"
              >
                info@digitalsaichandu.com
              </a>
            </motion.div>
            
            <motion.div
              className="bg-emerald-50 rounded-xl p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4">
                For urgent matters, call our support line
              </p>
              <a 
                href="tel:+919390437608"
                className="text-emerald-600 font-medium"
              >
                +91 9390437608
              </a>
            </motion.div>
            
            <motion.div
              className="bg-purple-50 rounded-xl p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Support Hours</h3>
              <p className="text-gray-600 mb-4">
                Our team is available during business hours
              </p>
              <p className="text-purple-600 font-medium">
                Monday-Saturday, 10AM-7PM IST
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Support;