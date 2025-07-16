import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Shield, 
  AlertCircle,
  Mail,
  Calendar
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Terms: React.FC = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
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
              <FileText className="h-8 w-8 text-blue-600" />
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              variants={fadeIn}
            >
              Terms & Conditions
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 leading-relaxed"
              variants={fadeIn}
            >
              Please read these terms and conditions carefully before using our services
            </motion.p>
            <motion.div 
              className="flex items-center justify-center space-x-2 mt-4 text-sm text-gray-500"
              variants={fadeIn}
            >
              <Calendar className="h-4 w-4" />
              <span>Last updated: February 20, 2024</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="prose prose-lg max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Introduction */}
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Important Notice</h3>
                  <p className="text-blue-800">
                    By accessing and using Digital Saichandu's services, you agree to be bound by these Terms and Conditions. 
                    If you do not agree with any part of these terms, please do not use our services.
                  </p>
                </div>
              </div>
            </div>

            {/* Terms Sections */}
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These Terms and Conditions ("Terms") govern your use of Digital Saichandu's website and services. 
                  By accessing our website or purchasing our services, you acknowledge that you have read, understood, 
                  and agree to be bound by these Terms.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to modify these Terms at any time. Changes will be effective immediately upon 
                  posting on our website. Your continued use of our services after any changes constitutes acceptance 
                  of the new Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services Description</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Digital Saichandu provides digital marketing and AI services including but not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Google Ads campaign management and optimization</li>
                  <li>Meta Ads (Facebook and Instagram) advertising services</li>
                  <li>Lead generation systems and automation</li>
                  <li>Website development and optimization</li>
                  <li>AI chatbot development and implementation</li>
                  <li>Workflow automation and AI tools</li>
                  <li>Digital marketing consultation and training</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Service specifications, deliverables, and timelines will be outlined in individual service agreements 
                  or project proposals.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Payment Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Payment terms vary by service type and will be specified in your service agreement. Generally:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>One-time services require full payment before project commencement</li>
                  <li>Monthly services are billed in advance on a recurring basis</li>
                  <li>Custom projects may require milestone-based payments</li>
                  <li>All payments are processed securely through our payment partners</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Late payments may result in service suspension. Refund policies are outlined in our separate 
                  Refund Policy document.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Client Responsibilities</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To ensure successful service delivery, clients agree to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Provide accurate and complete information required for service delivery</li>
                  <li>Grant necessary access to accounts, platforms, and systems as required</li>
                  <li>Respond to requests for feedback and approvals in a timely manner</li>
                  <li>Comply with all applicable laws and platform policies</li>
                  <li>Maintain confidentiality of login credentials and account information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Digital Saichandu retains ownership of all proprietary methodologies, tools, and processes used 
                  in service delivery. Upon full payment, clients receive:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Full ownership of custom-developed websites and applications</li>
                  <li>Usage rights to advertising creatives and content developed specifically for their brand</li>
                  <li>Access to campaign data and performance reports</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Clients retain ownership of their brand assets, content, and data provided to us for service delivery.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Confidentiality</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We maintain strict confidentiality regarding all client information, business data, and proprietary 
                  information. Our team members sign confidentiality agreements, and we implement appropriate security 
                  measures to protect client data.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Clients agree to maintain confidentiality regarding our proprietary methods, tools, and business processes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Digital Saichandu's liability is limited to the amount paid for the specific service in question. 
                  We are not liable for:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Indirect, incidental, or consequential damages</li>
                  <li>Loss of profits, revenue, or business opportunities</li>
                  <li>Platform policy changes affecting campaign performance</li>
                  <li>Third-party service interruptions or failures</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Service Level Agreements</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We strive to deliver high-quality services within agreed timelines. However, performance may be 
                  affected by factors beyond our control, including:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Platform algorithm changes and policy updates</li>
                  <li>Market conditions and competitive landscape</li>
                  <li>Client response times and approval delays</li>
                  <li>Technical issues with third-party platforms</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Termination</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Either party may terminate services with appropriate notice as specified in the service agreement. 
                  Upon termination:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>All outstanding payments become immediately due</li>
                  <li>Access to our systems and tools will be revoked</li>
                  <li>Client data will be returned or securely destroyed as requested</li>
                  <li>Ongoing campaigns will be transferred or paused as appropriate</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
                <p className="text-gray-700 leading-relaxed">
                  These Terms are governed by the laws of the jurisdiction in which Digital Saichandu operates. 
                  Any disputes will be resolved through binding arbitration or in the courts of competent jurisdiction.
                </p>
              </section>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-xl p-6 mt-12">
              <div className="flex items-start space-x-3">
                <Mail className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Questions About These Terms?</h3>
                  <p className="text-gray-700 mb-4">
                    If you have any questions about these Terms and Conditions, please contact us:
                  </p>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Email:</strong> info@digitalsaichandu.com</p>
                    <p><strong>Phone:</strong> +91 9390437608</p>
                    <p><strong>Address:</strong> Hyderabad, Telangana, India</p>
                  </div>
                  <Link
                    to="/contact"
                    className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;