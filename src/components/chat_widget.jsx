import React, { useState } from 'react';
import { X, Home, Mail, HelpCircle, Search } from 'lucide-react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [userName] = useState('Sykat');

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputValue,
        isBot: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setInputValue('');

      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: "Thanks for your message! Our team will get back to you soon.",
          isBot: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const quickLinks = [
    { title: 'Reset Your Password', icon: '🔑' },
    { title: 'Connecting to an Atlas Cluster', icon: '🔗' },
    { title: 'Getting Started Guide', icon: '📚' },
    { title: 'Contact Support', icon: '💬' }
  ];

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-50">

      {/* ✅ Chat Widget Window - Rendered only when open */}
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-24px)] sm:w-[400px] h-[calc(100vh-100px)] sm:h-[500px] 
                        max-h-[calc(100vh-100px)] sm:max-h-[85vh] 
                        bg-gradient-to-br from-emerald-50 via-white to-blue-50 rounded-2xl 
                        shadow-2xl flex flex-col overflow-hidden border-2 border-emerald-200
                        animate-fadeInUp">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-4 sm:p-5 flex justify-between items-center border-b border-emerald-800 shadow-lg">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                <img src="Asset/logo.svg" alt="Logo" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold">Bloomie AI</h3>
                <p className="text-xs text-emerald-100">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-emerald-800 rounded-full p-2 transition"
            >
              <X size={20} className="sm:w-[22px] sm:h-[22px]" />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto bg-white">
            {activeTab === 'home' && (
              <div className="p-4 sm:p-6">
                {/* Greeting */}
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                    Hello {userName}!
                  </h2>
                  <p className="text-base sm:text-lg text-gray-700">How can we help?</p>
                </div>

                {/* Status Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 shadow-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-sm sm:text-base text-gray-900">Status: All Systems Operational</p>
                      <p className="text-xs sm:text-sm text-gray-500">Updated Nov 8, 15:26 UTC</p>
                    </div>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative mb-4 sm:mb-6">
                  <input
                    type="text"
                    placeholder="Search for help"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-700 placeholder-emerald-600"
                  />
                  <Search className="absolute right-3 top-2 sm:top-3.5 text-emerald-600" size={18} />
                </div>

                {/* Quick Links */}
                <div className="space-y-2">
                  {quickLinks.map((link, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center justify-between p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition text-left group"
                    >
                      <span className="flex items-center space-x-2 sm:space-x-3">
                        <span className="text-lg sm:text-xl">{link.icon}</span>
                        <span className="text-sm sm:text-base text-gray-700 group-hover:text-gray-900">{link.title}</span>
                      </span>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="h-full flex flex-col bg-gradient-to-b from-white to-emerald-50">
                <div className="flex-1 p-3 sm:p-4 overflow-y-auto">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-8">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </div>
                      <p className="font-semibold text-sm sm:text-base text-gray-700">No messages yet</p>
                      <p className="text-xs sm:text-sm">Start a conversation with Bloomie AI</p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`mb-3 sm:mb-4 ${message.isBot ? '' : 'flex justify-end'}`}
                      >
                        <div
                          className={`max-w-[85%] sm:max-w-[80%] p-2.5 sm:p-3 rounded-lg ${
                            message.isBot
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-emerald-600 text-white'
                          }`}
                        >
                          <p className="text-xs sm:text-sm">{message.text}</p>
                          <p className={`text-[10px] sm:text-xs mt-1 ${message.isBot ? 'text-gray-500' : 'text-emerald-100'}`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-3 sm:p-4 bg-white border-t border-gray-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      onClick={handleSend}
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 sm:px-5 py-2 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition shadow-md"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'help' && (
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Help Center</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-1 sm:mb-2">📖 Documentation</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Browse our comprehensive guides and tutorials</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-1 sm:mb-2">💡 FAQ</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Find answers to commonly asked questions</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-1 sm:mb-2">📞 Contact Support</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Get in touch with our support team</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Navigation */}
          <div className="bg-white border-t border-gray-200 flex justify-around py-2 sm:py-3">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center space-y-1 px-4 sm:px-6 py-2 transition ${
                activeTab === 'home' ? 'text-emerald-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Home size={20} className="sm:w-6 sm:h-6" />
              <span className="text-[10px] sm:text-xs font-medium">Home</span>
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`flex flex-col items-center space-y-1 px-4 sm:px-6 py-2 transition ${
                activeTab === 'messages' ? 'text-emerald-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Mail size={20} className="sm:w-6 sm:h-6" />
              <span className="text-[10px] sm:text-xs font-medium">Messages</span>
            </button>
            <button
              onClick={() => setActiveTab('help')}
              className={`flex flex-col items-center space-y-1 px-4 sm:px-6 py-2 transition ${
                activeTab === 'help' ? 'text-emerald-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <HelpCircle size={20} className="sm:w-6 sm:h-6" />
              <span className="text-[10px] sm:text-xs font-medium">Help</span>
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative group transition-all duration-500 ease-in-out ${
            isOpen 
              ? 'bg-white text-emerald-600 w-12 h-12 sm:w-14 sm:h-14 shadow-xl' 
              : 'bg-gradient-to-br from-emerald-500 to-emerald-700 text-white w-12 h-12 sm:w-16 sm:h-16 shadow-2xl hover:shadow-emerald-500/50'
          } rounded-full hover:scale-110 flex items-center justify-center border-2 sm:border-4 border-white`}
        >
          {isOpen ? (
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          ) : (
            <div className="relative">
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;
