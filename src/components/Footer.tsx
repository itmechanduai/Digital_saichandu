import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  MessageCircle
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/ds.logo.png" 
                alt="Digital Saichandu" 
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-600 text-sm">
              Empowering businesses with innovative digital marketing and AI solutions.
              Transforming ideas into digital success stories.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/saichandu" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/saichandu" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/in/saichandu" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/saichandu" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/products?category=Digital Marketing Services" className="text-gray-600 hover:text-blue-600 transition-colors">Google Ads</Link></li>
              <li><Link to="/products?category=Digital Marketing Services" className="text-gray-600 hover:text-blue-600 transition-colors">Meta Ads</Link></li>
              <li><Link to="/products?category=Digital Marketing Services" className="text-gray-600 hover:text-blue-600 transition-colors">Lead Generation</Link></li>
              <li><Link to="/products?category=Digital Marketing Services" className="text-gray-600 hover:text-blue-600 transition-colors">Website Development</Link></li>
              <li><Link to="/products?category=AI Services" className="text-gray-600 hover:text-blue-600 transition-colors">AI Solutions</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</Link></li>
              <li><Link to="/support" className="text-gray-600 hover:text-blue-600 transition-colors">Support</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-blue-600 transition-colors">FAQ</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-600" />
                <span className="text-gray-600 text-sm">info@digitalsaichandu.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-600" />
                <span className="text-gray-600 text-sm">+91 9390437608</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span className="text-gray-600 text-sm">Hyderabad, Telangana, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4 text-green-600" />
                <a 
                  href="https://wa.me/919390437608" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-green-600 transition-colors text-sm"
                >
                  WhatsApp Support
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2024 Digital Saichandu. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-600 text-sm">Secure payments powered by</span>
              <div className="flex items-center space-x-2">
                <span className="text-blue-600 font-semibold text-sm">Stripe</span>
                <span className="text-gray-600">•</span>
                <span className="text-purple-600 font-semibold text-sm">Razorpay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;