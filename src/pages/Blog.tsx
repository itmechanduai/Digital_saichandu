import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowRight,
  Search,
  Filter,
  Tag
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AIAgentPopup from '../components/AIAgentPopup';

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Google Ads Strategies for 2024",
      excerpt: "Discover the latest Google Ads strategies that are driving results for businesses in 2024. From smart bidding to audience targeting.",
      category: "Digital Marketing",
      author: "Saichandu",
      date: "2024-02-15",
      readTime: "5 min read",
      image: "https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg",
      featured: true
    },
    {
      id: 2,
      title: "How AI Chatbots Are Revolutionizing Customer Service",
      excerpt: "Learn how AI-powered chatbots are transforming customer support and increasing business efficiency across industries.",
      category: "AI Technology",
      author: "Sarah Mitchell",
      date: "2024-02-12",
      readTime: "7 min read",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
      featured: false
    },
    {
      id: 3,
      title: "Meta Ads vs Google Ads: Which Platform is Right for You?",
      excerpt: "A comprehensive comparison of Meta Ads and Google Ads to help you choose the best advertising platform for your business.",
      category: "Digital Marketing",
      author: "David Chen",
      date: "2024-02-10",
      readTime: "6 min read",
      image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg",
      featured: false
    },
    {
      id: 4,
      title: "Building Effective Lead Generation Funnels",
      excerpt: "Step-by-step guide to creating high-converting lead generation funnels that turn visitors into qualified prospects.",
      category: "Lead Generation",
      author: "Saichandu",
      date: "2024-02-08",
      readTime: "8 min read",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
      featured: false
    },
    {
      id: 5,
      title: "The Future of Marketing Automation with AI",
      excerpt: "Explore how artificial intelligence is reshaping marketing automation and what it means for businesses of all sizes.",
      category: "AI Technology",
      author: "Sarah Mitchell",
      date: "2024-02-05",
      readTime: "6 min read",
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
      featured: false
    },
    {
      id: 6,
      title: "SEO Best Practices for Service-Based Businesses",
      excerpt: "Essential SEO strategies specifically tailored for service providers to improve online visibility and attract more clients.",
      category: "SEO",
      author: "David Chen",
      date: "2024-02-03",
      readTime: "9 min read",
      image: "https://images.pexels.com/photos/270632/pexels-photo-270632.jpeg",
      featured: false
    }
  ];

  const categories = ['Digital Marketing', 'AI Technology', 'Lead Generation', 'SEO'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

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
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              variants={fadeIn}
            >
              Digital Marketing <span className="gradient-text">Strategies & Tips</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 leading-relaxed"
              variants={fadeIn}
            >
              Expert guides on Google Ads, Meta Ads, Lead Generation, and AI solutions to help your business grow
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col md:flex-row gap-4 items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex-1 relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl overflow-hidden custom-shadow"
            >
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="p-8 lg:p-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <Tag className="h-4 w-4 text-blue-600" />
                    <span className="text-blue-600 font-medium text-sm uppercase tracking-wide">
                      Featured Article
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center space-x-4 mb-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold inline-flex items-center space-x-2">
                    <span>Read Article</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
                <div className="lg:p-8">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 lg:h-80 object-cover rounded-xl"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest Articles
            </h2>
            <p className="text-xl text-gray-600">
              Discover insights and strategies to grow your business
            </p>
          </motion.div>
          
          {regularPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="bg-white rounded-xl overflow-hidden custom-shadow hover-lift"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <span>{post.date}</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center space-x-1">
                      <span>Read More</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.article>
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get the latest digital marketing insights delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <AIAgentPopup />
    </div>
  );
};

export default Blog;