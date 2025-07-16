import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Eye, 
  Lock,
  Mail,
  Calendar,
  Database,
  UserCheck,
  Globe
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Privacy: React.FC = () => {
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
              <Shield className="h-8 w-8 text-blue-600" />
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              variants={fadeIn}
            >
              Privacy Policy
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 leading-relaxed"
              variants={fadeIn}
            >
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
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

      {/* Privacy Content */}
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
                <Eye className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Our Commitment to Privacy</h3>
                  <p className="text-blue-800">
                    Digital Saichandu is committed to protecting your privacy and ensuring the security of your personal information. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy Sections */}
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Register for an account on our website</li>
                  <li>Purchase our services or products</li>
                  <li>Subscribe to our newsletter or marketing communications</li>
                  <li>Contact us through our contact forms or support channels</li>
                  <li>Participate in surveys, contests, or promotional activities</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When you visit our website, we may automatically collect certain information about your device and usage patterns:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>IP address and location information</li>
                  <li>Browser type and version</li>
                  <li>Operating system and device information</li>
                  <li>Pages visited and time spent on our website</li>
                  <li>Referring website and search terms used</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Providing and maintaining our services</li>
                  <li>Processing transactions and managing your account</li>
                  <li>Communicating with you about our services and updates</li>
                  <li>Personalizing your experience on our website</li>
                  <li>Improving our website and services</li>
                  <li>Analyzing usage patterns and trends</li>
                  <li>Preventing fraud and ensuring security</li>
                  <li>Complying with legal obligations</li>
                  <li>Marketing our services (with your consent)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing and Disclosure</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Providers</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may share your information with trusted third-party service providers who assist us in operating our website, 
                  conducting our business, or servicing you, including:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Payment processors (Stripe, Razorpay)</li>
                  <li>Email service providers</li>
                  <li>Analytics services (Google Analytics)</li>
                  <li>Cloud hosting providers</li>
                  <li>Customer support platforms</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Legal Requirements</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may disclose your information if required to do so by law or in response to valid requests by public authorities.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure server infrastructure</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication</li>
                  <li>Employee training on data protection</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  However, no method of transmission over the internet or electronic storage is 100% secure. 
                  While we strive to protect your personal information, we cannot guarantee its absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies and Tracking Technologies</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to enhance your experience on our website. 
                  Cookies are small data files stored on your device that help us:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze website traffic and usage patterns</li>
                  <li>Provide personalized content and advertisements</li>
                  <li>Improve website functionality and performance</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  You can control cookie settings through your browser preferences. However, disabling cookies may affect 
                  the functionality of our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights and Choices</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                  <li><strong>Restriction:</strong> Request restriction of processing</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this 
                  Privacy Policy, unless a longer retention period is required or permitted by law. Factors we consider when 
                  determining retention periods include:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>The nature and sensitivity of the information</li>
                  <li>Legal and regulatory requirements</li>
                  <li>Business and operational needs</li>
                  <li>Your relationship with our services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. International Data Transfers</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Your information may be transferred to and processed in countries other than your own. 
                  We ensure that such transfers are conducted in accordance with applicable data protection laws 
                  and implement appropriate safeguards to protect your information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our services are not intended for children under the age of 13. We do not knowingly collect 
                  personal information from children under 13. If we become aware that we have collected personal 
                  information from a child under 13, we will take steps to delete such information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Third-Party Links</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our website may contain links to third-party websites or services. We are not responsible for 
                  the privacy practices or content of these third-party sites. We encourage you to review the 
                  privacy policies of any third-party sites you visit.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or 
                  applicable laws. We will notify you of any material changes by posting the updated policy on 
                  our website and updating the "Last updated" date.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Your continued use of our services after any changes indicates your acceptance of the updated Privacy Policy.
                </p>
              </section>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-xl p-6 mt-12">
              <div className="flex items-start space-x-3">
                <Mail className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Us About Privacy</h3>
                  <p className="text-gray-700 mb-4">
                    If you have any questions about this Privacy Policy or our privacy practices, please contact us:
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

            {/* Data Protection Icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Lock className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Secure</h4>
                <p className="text-sm text-gray-600">SSL encrypted data transmission</p>
              </div>
              <div className="text-center">
                <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <UserCheck className="h-8 w-8 text-emerald-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Compliant</h4>
                <p className="text-sm text-gray-600">GDPR and CCPA compliant</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Database className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Protected</h4>
                <p className="text-sm text-gray-600">Secure data storage</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Globe className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Transparent</h4>
                <p className="text-sm text-gray-600">Clear privacy practices</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;