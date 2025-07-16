import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Award, 
  TrendingUp, 
  Heart,
  Target,
  Lightbulb,
  Shield,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AIAgentPopup from '../components/AIAgentPopup';

const About: React.FC = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const values = [
    {
      icon: Target,
      title: "Results-Driven",
      description: "We focus on delivering measurable results that impact your bottom line"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We stay ahead of industry trends to provide cutting-edge solutions"
    },
    {
      icon: Heart,
      title: "Client-Centric",
      description: "Your success is our success. We're committed to your growth"
    },
    {
      icon: Shield,
      title: "Transparency",
      description: "Clear communication and honest reporting in everything we do"
    }
  ];

  const team = [
    {
      name: "Saichandu",
      role: "Founder & CEO",
      description: "Digital marketing expert with 8+ years of experience",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      expertise: ["Google Ads", "Strategy", "AI Implementation"]
    },
    {
      name: "Sarah Mitchell",
      role: "Lead AI Engineer",
      description: "AI specialist focused on automation and intelligent solutions",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
      expertise: ["Machine Learning", "Automation", "Data Analysis"]
    },
    {
      name: "David Chen",
      role: "Digital Marketing Manager",
      description: "Performance marketing expert with proven track record",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      expertise: ["Meta Ads", "Lead Generation", "Analytics"]
    }
  ];

  const stats = [
    { number: "500+", label: "Happy Clients", icon: Users },
    { number: "98%", label: "Client Retention", icon: Heart },
    { number: "5x", label: "Average ROI", icon: TrendingUp },
    { number: "24/7", label: "Support Available", icon: Award }
  ];

  const achievements = [
    "Google Premier Partner Status",
    "Facebook Marketing Partner",
    "ISO 27001 Certified",
    "Award-winning Customer Service",
    "Industry Recognition for Innovation",
    "Trusted by Fortune 500 Companies"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
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
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-gray-900"
                variants={fadeIn}
              >
                About <span className="gradient-text">Digital Saichandu</span> - <span className="text-2xl">Hyderabad's Premier Digital Marketing Agency</span>
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 leading-relaxed"
                variants={fadeIn}
              >
                Founded in 2020, we're a team of Google-certified digital marketing experts and AI specialists with 8+ years of experience. We've helped 500+ businesses achieve an average 300% ROI improvement through data-driven strategies and cutting-edge AI solutions.
              </motion.p>
              <motion.div
                variants={fadeIn}
              >
                <Link
                  to="/contact"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold inline-flex items-center space-x-2 hover-lift"
                >
                  <span>Work With Us</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative rounded-2xl overflow-hidden custom-shadow">
                <img 
                  src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg"
                  alt="Our Team"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent"></div>
              </div>
            </motion.div>
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

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg"
                alt="Our Story"
                className="w-full h-96 object-cover rounded-2xl custom-shadow"
              />
            </motion.div>
            
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Our Journey to Becoming Hyderabad's Top Digital Marketing Agency
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Founded in 2020, Digital Saichandu began with a simple mission: to help businesses succeed in the digital age. What started as a small digital marketing agency has evolved into Hyderabad's most trusted digital growth partner, with expertise in Google Ads, Meta Ads, and custom AI solutions.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, we combine traditional digital marketing expertise with cutting-edge AI solutions to deliver unprecedented results for our clients. Our team of Google-certified specialists work tirelessly to stay ahead of industry trends and provide innovative solutions that have helped businesses achieve an average of 300% ROI improvement.
              </p>
              
              {/* Achievements */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Achievements</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span className="text-gray-700 text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-gradient-to-r from-blue-500 to-emerald-500 p-4 rounded-lg w-fit mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The experts behind your success
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-8 custom-shadow hover-lift text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 mb-4">
                  {member.description}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {member.expertise.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
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
              Ready to Work Together?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Let's discuss how we can help your business grow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold inline-flex items-center justify-center space-x-2 hover-lift"
              >
                <span>Browse Services</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold inline-flex items-center justify-center space-x-2"
              >
                <span>Get In Touch</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <AIAgentPopup />
    </div>
  );
};

export default About;