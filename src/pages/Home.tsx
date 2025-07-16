import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { 
  Star, 
  Users, 
  Award, 
  TrendingUp,
  ShoppingCart,
  Zap,
  Target,
  Brain,
  Globe,
  ArrowRight,
  Sparkles,
  MessageSquare,
  Bot,
  Cpu
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import AIAgentPopup from '../components/AIAgentPopup';
import { useProducts } from '../contexts/ProductContext';

const Home: React.FC = () => {
  const { products } = useProducts();
  const featuredProducts = products.filter(p => p.popular || p.new).slice(0, 6);
  
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [aiSectionRef, aiSectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const services = [
    {
      icon: Target,
      title: "Digital Marketing",
      description: "Google Ads, Meta Ads, and comprehensive lead generation strategies",
      count: "15+ Services",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: Brain,
      title: "AI Solutions",
      description: "Custom AI agents, automation workflows, and intelligent tools",
      count: "10+ AI Tools",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Globe,
      title: "Web Development",
      description: "Modern, responsive websites that convert visitors to customers",
      count: "50+ Websites",
      color: "from-emerald-500 to-teal-600"
    }
  ];

  const stats = [
    { number: "500+", label: "Happy Clients", icon: Users },
    { number: "1000+", label: "Projects Completed", icon: Award },
    { number: "98%", label: "Success Rate", icon: TrendingUp },
    { number: "24/7", label: "Support Available", icon: Zap }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      text: "Digital Saichandu transformed our online presence. Our leads increased by 300% in just 3 months!",
      rating: 5,
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
    },
    {
      name: "Michael Chen",
      company: "Growth Co.",
      text: "The AI automation solutions saved us 20 hours per week. Incredible ROI!",
      rating: 5,
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
    },
    {
      name: "Emily Rodriguez",
      company: "Local Business",
      text: "Professional service, amazing results. Our website conversions doubled!",
      rating: 5,
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* 3D Animated Hero Slider */}
      <HeroSlider />

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              variants={fadeIn}
            >
              Expert Digital Marketing & AI Services
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              variants={fadeIn}
            >
              Data-driven strategies that deliver measurable results for your business
            </motion.p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-8 custom-shadow hover-lift text-center relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-5 from-transparent to-blue-200" />
                
                <div className={`bg-gradient-to-r ${service.color} p-4 rounded-lg w-fit mx-auto mb-6 shadow-lg`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <span className="text-blue-600 font-semibold">{service.count}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grad1)" />
          </svg>
          
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-blue-500 opacity-5"
              style={{
                width: Math.random() * 300 + 100,
                height: Math.random() * 300 + 100,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 180, 270, 360],
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              variants={fadeIn}
            >
              Top-Rated Digital Marketing Services
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
              variants={fadeIn}
            >
              Proven strategies that have helped businesses achieve 300% growth in leads
            </motion.p>
            <motion.div variants={fadeIn}>
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold"
              >
                <span>View All Services</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-white" ref={aiSectionRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            animate={aiSectionInView ? "animate" : "initial"}
            variants={staggerChildren}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              variants={fadeIn}
            >
              Cutting-Edge <span className="gradient-text">AI Solutions</span> for Your Business
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              variants={fadeIn}
            >
              Harness the power of artificial intelligence to automate tasks, gain insights, and enhance customer experiences
            </motion.p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Chatbots & Virtual Assistants",
                description: "24/7 customer support with intelligent chatbots that understand natural language and learn from interactions",
                icon: Bot,
                features: ["Natural Language Processing", "Multi-platform Integration", "Continuous Learning", "Custom Training"],
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Workflow Automation",
                description: "Streamline your business processes with AI-powered automation that saves time and reduces errors",
                icon: Zap,
                features: ["Process Mapping", "Task Automation", "Integration Setup", "Performance Monitoring"],
                color: "from-blue-500 to-indigo-500"
              },
              {
                title: "Predictive Analytics",
                description: "Make data-driven decisions with AI that analyzes patterns and predicts future trends and outcomes",
                icon: Brain,
                features: ["Data Processing", "Pattern Recognition", "Trend Forecasting", "Actionable Insights"],
                color: "from-emerald-500 to-teal-500"
              }
            ].map((solution, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-8 custom-shadow hover-lift relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={aiSectionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 rounded-bl-full from-transparent to-purple-300" />
                
                <div className={`bg-gradient-to-r ${solution.color} p-4 rounded-lg w-fit mb-6 shadow-lg`}>
                  <solution.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {solution.title}
                </h3>
                
                <p className="text-gray-600 mb-6">
                  {solution.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {solution.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <Sparkles className="h-4 w-4 text-purple-500" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/products?category=AI%20Services" className="text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-1">
                  <span>Learn more</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-gradient-to-r from-blue-500 to-emerald-500 p-3 rounded-lg w-fit mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              variants={fadeIn}
            >
              Success Stories from Our Clients
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              variants={fadeIn}
            >
              Real results from businesses that transformed their digital presence with our services
            </motion.p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-8 custom-shadow hover-lift"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center space-x-3">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-10"
              style={{
                width: Math.random() * 300 + 200,
                height: Math.random() * 300 + 200,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(50px)'
              }}
              animate={{
                x: [0, 30, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Ready to Increase Your ROI by <span className="text-blue-600">300%</span>?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join 500+ businesses that have achieved remarkable growth with our AI-powered digital marketing expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/products"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:shadow-lg transition-all font-semibold inline-flex items-center justify-center space-x-2 hover-lift"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Browse AI Services</span>
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold inline-flex items-center justify-center space-x-2"
                >
                  <span>Get Consultation</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <AIAgentPopup />
    </div>
  );
};

export default Home;