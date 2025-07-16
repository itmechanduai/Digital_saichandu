import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Brain, 
  Globe, 
  Search, 
  Users, 
  BarChart3,
  Bot,
  Workflow,
  Smartphone,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Services: React.FC = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const digitalMarketingServices = [
    {
      icon: Search,
      title: "Google Ads Management",
      description: "Maximize your ROI with expertly managed Google Ads campaigns",
      features: ["Keyword Research", "Ad Copy Creation", "Bid Management", "Performance Tracking"],
      price: "Starting at ₹1,500/month"
    },
    {
      icon: Users,
      title: "Meta Ads (Facebook & Instagram)",
      description: "Reach your target audience with precision on social platforms",
      features: ["Audience Targeting", "Creative Development", "A/B Testing", "Social Analytics"],
      price: "Starting at ₹1,200/month"
    },
    {
      icon: Target,
      title: "Lead Generation",
      description: "Generate high-quality leads that convert into customers",
      features: ["Landing Page Creation", "Lead Magnets", "Email Sequences", "CRM Integration"],
      price: "Starting at ₹2,000/month"
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Data-driven insights to optimize your marketing performance",
      features: ["Custom Dashboards", "Performance Reports", "ROI Analysis", "Recommendations"],
      price: "Starting at ₹800/month"
    }
  ];

  const aiServices = [
    {
      icon: Bot,
      title: "AI Chatbots & Agents",
      description: "24/7 customer support with intelligent AI agents",
      features: ["Natural Language Processing", "Multi-platform Integration", "Learning Capabilities", "Custom Training"],
      price: "Starting at ₹2,500/month"
    },
    {
      icon: Workflow,
      title: "Workflow Automation",
      description: "Streamline your business processes with AI automation",
      features: ["Process Mapping", "Task Automation", "Integration Setup", "Monitoring & Optimization"],
      price: "Starting at ₹3,000/month"
    },
    {
      icon: Brain,
      title: "Custom AI Tools",
      description: "Tailored AI solutions for your specific business needs",
      features: ["Requirement Analysis", "Custom Development", "Training & Support", "Ongoing Maintenance"],
      price: "Starting at ₹5,000/project"
    },
    {
      icon: BarChart3,
      title: "Data Analysis & Insights",
      description: "Turn your data into actionable business insights",
      features: ["Data Processing", "Predictive Analytics", "Visualization", "Strategic Recommendations"],
      price: "Starting at ₹2,000/month"
    }
  ];

  const webServices = [
    {
      icon: Globe,
      title: "Business Websites",
      description: "Professional websites that convert visitors into customers",
      features: ["Responsive Design", "SEO Optimization", "Speed Optimization", "Content Management"],
      price: "Starting at ₹3,000/project"
    },
    {
      icon: Smartphone,
      title: "E-commerce Solutions",
      description: "Complete online stores with payment processing",
      features: ["Product Catalog", "Payment Integration", "Inventory Management", "Order Tracking"],
      price: "Starting at ₹5,000/project"
    }
  ];

  const ServiceCard = ({ service, index }: { service: any, index: number }) => (
    <motion.div
      className="bg-white rounded-xl p-8 custom-shadow hover-lift"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="bg-gradient-to-r from-blue-500 to-emerald-500 p-3 rounded-lg w-fit mb-6">
        <service.icon className="h-8 w-8 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {service.title}
      </h3>
      <p className="text-gray-600 mb-6">
        {service.description}
      </p>
      <ul className="space-y-2 mb-6">
        {service.features.map((feature: string, idx: number) => (
          <li key={idx} className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-emerald-500" />
            <span className="text-sm text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold text-blue-600">{service.price}</span>
        <Link
          to="/contact"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Get Started
        </Link>
      </div>
    </motion.div>
  );

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
              Digital Marketing & AI <span className="gradient-text">Services</span> in Hyderabad
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 leading-relaxed"
              variants={fadeIn}
            >
              Data-driven digital marketing and AI solutions that have delivered 300% ROI improvement for 500+ businesses in Hyderabad and across India
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Digital Marketing Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Google & Meta Ads Management Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              PPC campaigns that deliver measurable ROI and qualified leads for your business
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {digitalMarketingServices.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Custom AI Solutions for Business Growth
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              AI-powered tools that save 20+ hours per week and improve customer experience
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {aiServices.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Web Development Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              SEO-Optimized Website Development
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Conversion-focused websites that rank higher on Google and turn visitors into customers
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {webServices.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              How we deliver exceptional results for our clients
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", description: "We analyze your business, goals, and target audience" },
              { step: "02", title: "Strategy", description: "Custom strategy development based on your specific needs" },
              { step: "03", title: "Implementation", description: "Expert execution of campaigns and solutions" },
              { step: "04", title: "Optimization", description: "Continuous monitoring and improvement for best results" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Let's discuss which services are right for your business
            </p>
            <Link
              to="/contact"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold inline-flex items-center space-x-2 hover-lift"
            >
              <span>Contact Us Today</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;