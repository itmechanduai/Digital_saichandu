import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShoppingCart, Zap, Brain, Target, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSlider: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: "Grow Your Business with Digital Marketing & AI Solutions",
      description: "Professional digital marketing services and AI automation tools that deliver 300% ROI improvement. Trusted by 500+ businesses in Hyderabad and across India.",
      icon: Target,
      color: "from-blue-500 to-emerald-500",
      buttonText: "Shop Services",
      buttonLink: "/products"
    },
    {
      title: "E-Commerce Business Setup & Automation",
      description: "Scale your e-commerce business with our end-to-end setup and automation solutions. From website development to payment integration and AI-powered customer service.",
      icon: Globe,
      color: "from-emerald-500 to-blue-500",
      buttonText: "Get Started",
      buttonLink: "/services"
    },
    {
      title: "AI Workflow Automation Solutions",
      description: "Leverage the power of AI to automate your business workflows. Our custom AI solutions save 20+ hours per week and improve customer experience.",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      buttonText: "Explore AI Solutions",
      buttonLink: "/products?category=AI%20Services"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="pt-20 pb-16 gradient-bg overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative min-h-[60vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  <span className="sr-only">Digital Saichandu - </span>
                  <span className="gradient-text">{slides[activeSlide].title}</span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  {slides[activeSlide].description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  {(() => {
                    const CurrentIcon = slides[activeSlide].icon;
                    return (
                      <Link
                        to={slides[activeSlide].buttonLink}
                        className={`bg-gradient-to-r ${slides[activeSlide].color} text-white px-8 py-4 rounded-lg hover:shadow-lg transition-all font-semibold flex items-center justify-center space-x-2 hover-lift`}
                      >
                        <CurrentIcon className="h-5 w-5" />
                        <span>{slides[activeSlide].buttonText}</span>
                      </Link>
                    );
                  })()}
                  <Link
                    to="/contact"
                    className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold flex items-center justify-center space-x-2"
                  >
                    <span>Get Consultation</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </motion.div>
              
              <motion.div 
                className="relative h-[400px] flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                {/* Animated Icon Display */}
                {(() => {
                  const CurrentIcon = slides[activeSlide].icon;
                  return (
                    <motion.div
                      className={`w-64 h-64 rounded-full bg-gradient-to-r ${slides[activeSlide].color} flex items-center justify-center shadow-2xl`}
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      }}
                    >
                      <CurrentIcon className="h-32 w-32 text-white" />
                    </motion.div>
                  );
                })()}
                
                {/* Floating Stats */}
                <motion.div 
                  className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg z-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <Zap className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">300%</p>
                      <p className="text-sm text-gray-600">ROI Improvement</p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute top-10 right-10 bg-white/20 backdrop-blur-sm rounded-full p-3"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ShoppingCart className="h-6 w-6 text-white" />
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-gray-800" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-gray-800" />
          </button>
        </div>
        
        {/* Pagination Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                activeSlide === index 
                  ? 'bg-blue-600 w-6' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;