import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  Search,
  MessageCircle,
  Mail,
  Phone
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const faqs = [
    {
      id: 1,
      category: "General",
      question: "What services does Digital Saichandu offer?",
      answer: "We offer comprehensive digital marketing and AI services including Google Ads management, Meta Ads campaigns, lead generation systems, website development, AI chatbot development, workflow automation, and digital marketing consultation."
    },
    {
      id: 2,
      category: "Pricing",
      question: "How much do your services cost?",
      answer: "Our pricing varies based on the service and scope of work. Google Ads management starts at $1,500/month, website development from $3,000, and AI chatbots from $2,500. Contact us for a custom quote based on your specific needs."
    },
    {
      id: 3,
      category: "Getting Started",
      question: "How do I get started with your services?",
      answer: "Simply browse our services, add them to your cart, and complete the checkout process. Alternatively, you can contact us for a free consultation to discuss your specific needs and get a custom proposal."
    },
    {
      id: 4,
      category: "Timeline",
      question: "How long does it take to see results?",
      answer: "Results vary by service type. Google Ads campaigns typically show initial results within 2-4 weeks, website development takes 2-4 weeks, and AI chatbot implementation takes 1-2 weeks. We provide detailed timelines for each project."
    },
    {
      id: 5,
      category: "Payment",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, and digital payment methods through our secure payment gateways (Stripe and Razorpay). We also offer flexible payment plans for larger projects."
    },
    {
      id: 6,
      category: "Support",
      question: "Do you provide ongoing support?",
      answer: "Yes, we provide comprehensive ongoing support for all our services. This includes regular performance monitoring, optimization, technical support, and strategic guidance to ensure continued success."
    },
    {
      id: 7,
      category: "AI Services",
      question: "What makes your AI solutions different?",
      answer: "Our AI solutions are custom-built for your specific business needs, not generic templates. We focus on practical automation that saves time and increases efficiency, with ongoing optimization and support."
    },
    {
      id: 8,
      category: "Digital Marketing",
      question: "Do you work with businesses of all sizes?",
      answer: "Yes! We work with startups, small businesses, and enterprise companies. Our solutions are scalable and customized to fit your budget, goals, and business size."
    },
    {
      id: 9,
      category: "Results",
      question: "Can you guarantee specific results?",
      answer: "While we can't guarantee specific numbers due to market variables, we have a proven track record with 98% client satisfaction and average ROI improvements of 300%. We provide transparent reporting and work towards agreed KPIs."
    },
    {
      id: 10,
      category: "Refunds",
      question: "What is your refund policy?",
      answer: "We offer a satisfaction guarantee. If you're not satisfied with our work within the first 30 days, we'll work to make it right or provide a refund. Specific terms vary by service type."
    },
    {
      id: 11,
      category: "Technical",
      question: "Do I need technical knowledge to work with you?",
      answer: "Not at all! We handle all the technical aspects and provide clear, non-technical explanations of our work. We'll guide you through everything and provide training where needed."
    },
    {
      id: 12,
      category: "Communication",
      question: "How do you communicate project progress?",
      answer: "We provide regular updates through your client dashboard, weekly/monthly reports, and scheduled check-in calls. You'll always know the status of your projects and can reach us anytime."
    }
  ];

  const categories = [...new Set(faqs.map(faq => faq.category))];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
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
              <HelpCircle className="h-8 w-8 text-blue-600" />
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              variants={fadeIn}
            >
              Digital Marketing & AI Services FAQ
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 leading-relaxed"
              variants={fadeIn}
            >
              Find answers to common questions about our Google Ads, Meta Ads, and AI services in Hyderabad
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="relative max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {categories.map((category, index) => (
              <span 
                key={index}
                className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 border border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-colors cursor-pointer"
              >
                {category}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.length > 0 ? (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  className="bg-white border border-gray-200 rounded-xl custom-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors rounded-xl"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                          {faq.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="ml-4">
                      {openFAQ === faq.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </button>
                  
                  {openFAQ === faq.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-4"
                    >
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No FAQs found</h3>
              <p className="text-gray-600">Try adjusting your search terms</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Our team is here to help you with any questions or concerns
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 custom-shadow">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">Chat with our support team in real-time</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Start Chat
                </button>
              </div>
              
              <div className="bg-white rounded-xl p-6 custom-shadow">
                <div className="bg-emerald-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600 mb-4">Get detailed answers via email</p>
                <a 
                  href="mailto:support@digitalsaichandu.com"
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors inline-block"
                >
                  Send Email
                </a>
              </div>
              
              <div className="bg-white rounded-xl p-6 custom-shadow">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
                <p className="text-gray-600 mb-4">Speak directly with our experts</p>
                <a 
                  href="tel:+15551234567"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors inline-block"
                >
                  Call Now
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;