import React, { useState } from 'react';
import { X, Home, Mail, HelpCircle, Search } from 'lucide-react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState('home');

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
          text: "Thanks for reaching out! Our plant and pet care experts will assist you shortly.",
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
    { title: 'Pet Care Tips & Guides', icon: '🐾' },
    { title: 'Plant Watering Schedule', icon: '🌱' },
    { title: 'Common Pet Health Issues', icon: '🏥' },
    { title: 'Indoor Plant Care Guide', icon: '🪴' },
    { title: 'Pet Nutrition Advice', icon: '🍖' },
    { title: 'Plant Disease Solutions', icon: '🌿' }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">

      {/* Chat Widget Window */}
      {isOpen && (
        <div className="mb-4 
                        w-[calc(100vw-32px)] max-w-[400px]
                        h-[450px] max-h-[calc(100vh-120px)]
                        bg-gradient-to-br from-emerald-50 via-white to-blue-50 
                        rounded-2xl shadow-2xl 
                        flex flex-col overflow-hidden 
                        border-2 border-emerald-200
                        animate-fadeInUp">
          
          {/* Header - Fixed Height */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-2.5 sm:p-3 md:p-4 flex justify-between items-center border-b border-emerald-800 shadow-lg flex-shrink-0">
            <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-white rounded-full flex items-center justify-center shadow-md overflow-hidden p-1 flex-shrink-0">
                <img src="/Asset/logo.svg" alt="Bloomie Logo" className="w-full h-full object-contain" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm md:text-base font-bold truncate">Bloomie Care Assistant</h3>
                <p className="text-[9px] sm:text-[10px] md:text-xs text-emerald-100 truncate">Pet & Plant Expert Help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-emerald-800 rounded-full p-1 sm:p-1.5 transition flex-shrink-0"
            >
              <X size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" />
            </button>
          </div>

          {/* Content Area - Scrollable */}
          <div className="flex-1 overflow-y-auto bg-white min-h-0">
            {activeTab === 'home' && (
              <div className="p-2.5 sm:p-3 md:p-4">
                {/* Greeting */}
                <div className="mb-2.5 sm:mb-3 md:mb-4">
                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-0.5 sm:mb-1">
                    Welcome! 👋
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base text-gray-700">How can we help with your pets or plants?</p>
                </div>

                {/* Status Card */}
                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-lg p-2 sm:p-2.5 md:p-3 mb-2.5 sm:mb-3 md:mb-4 shadow-sm">
                  <div className="flex items-start space-x-1.5 sm:space-x-2 md:space-x-3">
                    <div className="text-lg sm:text-xl md:text-2xl flex-shrink-0">🌟</div>
                    <div className="min-w-0">
                      <p className="font-semibold text-[10px] sm:text-xs md:text-sm text-gray-900">Expert Care Tips Available 24/7</p>
                      <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">Get instant advice for your furry friends and green companions</p>
                    </div>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative mb-2.5 sm:mb-3 md:mb-4">
                  <input
                    type="text"
                    placeholder="Search pet care or plant tips..."
                    className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 pr-8 sm:pr-9 text-[10px] sm:text-xs md:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700 placeholder-gray-500"
                  />
                  <Search className="absolute right-2 sm:right-2.5 top-1.5 sm:top-2 text-emerald-600" size={14} />
                </div>

                {/* Quick Links */}
                <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                  <p className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-gray-600 mb-1.5 sm:mb-2">Popular Topics</p>
                  {quickLinks.map((link, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center justify-between p-1.5 sm:p-2 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-blue-50 rounded-lg transition text-left group border border-transparent hover:border-emerald-200"
                    >
                      <span className="flex items-center space-x-1.5 sm:space-x-2 min-w-0 flex-1">
                        <span className="text-sm sm:text-base md:text-lg flex-shrink-0">{link.icon}</span>
                        <span className="text-[10px] sm:text-xs md:text-sm text-gray-700 group-hover:text-gray-900 truncate">{link.title}</span>
                      </span>
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-gray-400 group-hover:text-emerald-600 flex-shrink-0 ml-1.5 sm:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="h-full flex flex-col bg-gradient-to-b from-white to-emerald-50">
                <div className="flex-1 p-2 sm:p-2.5 md:p-3 overflow-y-auto min-h-0">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-4 sm:mt-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-1.5 sm:mb-2">
                        <span className="text-lg sm:text-xl md:text-2xl">💬</span>
                      </div>
                      <p className="font-semibold text-[10px] sm:text-xs md:text-sm text-gray-700">No messages yet</p>
                      <p className="text-[9px] sm:text-[10px] md:text-xs">Ask us anything about pet or plant care!</p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`mb-1.5 sm:mb-2 md:mb-3 ${message.isBot ? '' : 'flex justify-end'}`}
                      >
                        <div
                          className={`max-w-[85%] p-1.5 sm:p-2 md:p-2.5 rounded-lg ${
                            message.isBot
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-emerald-600 text-white'
                          }`}
                        >
                          <p className="text-[10px] sm:text-xs md:text-sm break-words">{message.text}</p>
                          <p className={`text-[8px] sm:text-[9px] md:text-[10px] mt-0.5 sm:mt-1 ${message.isBot ? 'text-gray-500' : 'text-emerald-100'}`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-2 sm:p-2.5 md:p-3 bg-white border-t border-gray-200 flex-shrink-0">
                  <div className="flex gap-1 sm:gap-1.5 md:gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about pet or plant care..."
                      className="flex-1 px-2 sm:px-2.5 md:px-3 py-1.5 sm:py-1.5 md:py-2 text-[10px] sm:text-xs md:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 min-w-0"
                    />
                    <button
                      onClick={handleSend}
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-1.5 md:py-2 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition shadow-md flex-shrink-0"
                    >
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'help' && (
              <div className="p-2.5 sm:p-3 md:p-4">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2 md:mb-3">Help Center</h3>
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="p-2 sm:p-2.5 md:p-3 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border border-emerald-200">
                    <h4 className="font-semibold text-[10px] sm:text-xs md:text-sm text-gray-900 mb-0.5 sm:mb-1">🐶 Pet Care Guides</h4>
                    <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">Complete guides for dogs, cats, birds, and more</p>
                  </div>
                  <div className="p-2 sm:p-2.5 md:p-3 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border border-emerald-200">
                    <h4 className="font-semibold text-[10px] sm:text-xs md:text-sm text-gray-900 mb-0.5 sm:mb-1">🌺 Plant Care Library</h4>
                    <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">Indoor and outdoor plant care instructions</p>
                  </div>
                  <div className="p-2 sm:p-2.5 md:p-3 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border border-emerald-200">
                    <h4 className="font-semibold text-[10px] sm:text-xs md:text-sm text-gray-900 mb-0.5 sm:mb-1">💡 Common Questions</h4>
                    <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">Find quick answers to frequently asked questions</p>
                  </div>
                  <div className="p-2 sm:p-2.5 md:p-3 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border border-emerald-200">
                    <h4 className="font-semibold text-[10px] sm:text-xs md:text-sm text-gray-900 mb-0.5 sm:mb-1">📞 Contact Our Experts</h4>
                    <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">Get personalized advice from our care specialists</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Navigation - Fixed Height */}
          <div className="bg-white border-t border-gray-200 flex justify-around py-1.5 sm:py-2 flex-shrink-0">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center space-y-0.5 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 transition ${
                activeTab === 'home' ? 'text-emerald-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Home size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" />
              <span className="text-[8px] sm:text-[9px] md:text-[10px] font-medium">Home</span>
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`flex flex-col items-center space-y-0.5 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 transition ${
                activeTab === 'messages' ? 'text-emerald-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Mail size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" />
              <span className="text-[8px] sm:text-[9px] md:text-[10px] font-medium">Messages</span>
            </button>
            <button
              onClick={() => setActiveTab('help')}
              className={`flex flex-col items-center space-y-0.5 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 transition ${
                activeTab === 'help' ? 'text-emerald-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <HelpCircle size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" />
              <span className="text-[8px] sm:text-[9px] md:text-[10px] font-medium">Help</span>
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
              : 'bg-gradient-to-br from-emerald-500 to-emerald-700 text-white w-12 h-12 sm:w-14 sm:h-14 shadow-2xl hover:shadow-emerald-500/50'
          } rounded-full hover:scale-110 flex items-center justify-center border-2 sm:border-3 border-white`}
        >
          {isOpen ? (
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          ) : (
            <div className="relative">
              <svg className="w-5 h-5 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;