import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Minimize2,
  Bot,
  User,
  Sparkles,
  Brain,
  Zap
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

const AIAgentPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! 👋 I'm your AI assistant. How can I help you grow your business today?",
      sender: 'agent',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showInitialPopup, setShowInitialPopup] = useState(false);

  // Show initial popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialPopup(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Auto-hide initial popup after 10 seconds
  useEffect(() => {
    if (showInitialPopup) {
      const timer = setTimeout(() => {
        setShowInitialPopup(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [showInitialPopup]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's a great question! Let me help you with that. Our digital marketing services can definitely help you achieve your goals.",
        "I'd be happy to assist you! Based on what you're looking for, I recommend checking out our Google Ads management or lead generation services.",
        "Excellent! Our AI solutions can automate many of your business processes. Would you like to know more about our chatbot services?",
        "Perfect! Our team specializes in helping businesses like yours grow. Let me connect you with the right service for your needs.",
        "Great inquiry! Our website development and SEO services could be exactly what you need. Would you like to schedule a consultation?",
        "That sounds like a perfect fit for our services! Our Meta Ads campaigns have helped many businesses increase their reach significantly."
      ];

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'agent',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Initial Popup Notification */}
      <AnimatePresence>
        {showInitialPopup && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8, rotateZ: -5 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateZ: 0 }}
            exit={{ opacity: 0, y: 100, scale: 0.8, rotateZ: 5 }}
            className="fixed bottom-24 right-6 z-50 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 max-w-sm overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-purple-100 rounded-full opacity-50"></div>
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-blue-100 rounded-full opacity-50"></div>
            
            <div className="flex items-start space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-pink-400 rounded-full"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  AI Assistant <span className="text-xs text-purple-500">Powered by GPT-4</span>
                </p>
                <p className="text-sm text-gray-600">
                  Hi there! I'm your AI assistant powered by advanced machine learning. Need help with digital marketing or AI solutions? Let's chat! ✨
                </p>
                <button
                  onClick={() => {
                    setIsOpen(true);
                    setShowInitialPopup(false);
                  }}
                  className="mt-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-lg text-xs hover:opacity-90 transition-colors shadow-md"
                >
                  Chat Now
                </button>
              </div>
              <button
                onClick={() => setShowInitialPopup(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 60 : 520 
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 bg-white rounded-xl shadow-2xl border border-gray-200 w-96 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Bot className="h-5 w-5" />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-1 -right-1 w-3 h-3 bg-pink-300 rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Digital Saichandu AI</p>
                    <p className="text-xs opacity-90">Online • Powered by GPT-4</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1 hover:bg-white/20 rounded transition-colors"
                  >
                    <Minimize2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-white/20 rounded transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            {!isMinimized && (
              <>
                <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-xs ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.sender === 'user' ? 'bg-blue-100' : 'bg-gradient-to-r from-purple-500 to-indigo-500'
                        }`}>
                          {message.sender === 'user' ? (
                            <User className="h-4 w-4 text-blue-600" />
                          ) : (
                            <Bot className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <div className={`px-3 py-2 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-white text-gray-800 shadow-sm border border-gray-100'
                        }`}>
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-2 max-w-xs">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100">
                          <div className="flex space-x-1">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                            />
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                            />
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="border-t p-4 bg-white">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-2 rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Powered by Digital Saichandu Advanced AI
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            boxShadow: [
              "0 4px 20px rgba(124, 58, 237, 0.3)",
              "0 4px 20px rgba(79, 70, 229, 0.3)",
              "0 4px 20px rgba(124, 58, 237, 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Brain className="h-8 w-8 text-white" />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center"
          >
            <Zap className="h-3 w-3 text-white" />
          </motion.div>
        </motion.button>
      )}
    </>
  );
};

export default AIAgentPopup;