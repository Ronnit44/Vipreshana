import React, { useEffect, useState } from 'react';
import { useTheme } from './context/ThemeContext';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import PageMeta from './components/Pagemeta';
import FAQSection from './components/FAQs';

const HowItWorks = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const steps = [
    {
      icon: '📱',
      title: 'Book Your Ride',
      description: 'Choose your pickup and drop-off locations, select your preferred vehicle type, and get an instant price estimate.'
    },
    {
      icon: '🚗',
      title: 'Driver Assignment',
      description: 'Our system automatically assigns the nearest available driver to your location for quick pickup.'
    },
    {
      icon: '📍',
      title: 'Real-time Tracking',
      description: 'Track your delivery in real-time through our interactive map interface. Get live updates on driver location.'
    },
    {
      icon: '📦',
      title: 'Safe Delivery',
      description: 'Our verified drivers ensure your goods are transported safely and delivered to your destination.'
    },
    {
      icon: '⭐',
      title: 'Rate & Review',
      description: 'After delivery, rate your experience and provide feedback to help us improve our services.'
    }
  ];

  return (
    <>
    <PageMeta /> 
      <Navbar />
      <div className={`min-h-screen transition-all duration-300 ${
        isDark ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 text-gray-900'
      }`}>
        {/* Header Section */}
        <div className="container mx-auto px-4 py-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`text-4xl md:text-5xl font-bold text-center mb-4 py-3 ${
              isDark ? 'text-blue-400' : 'text-gray-900'
            }`}
          >
            How It Works
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-lg text-center max-w-2xl mx-auto mb-12 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Experience seamless logistics with our simple and efficient process. 
            From booking to delivery, we've got you covered every step of the way.
          </motion.p>

          {/* Timeline Section */}
          <div className="relative max-w-4xl mx-auto px-2 sm:px-4">
            {/* Timeline Line */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 h-full w-1 z-0 ${
              isDark ? 'bg-blue-500' : 'bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500'
            }`}></div>

            {/* Timeline Steps */}
            <div className="space-y-16">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative z-10 flex items-center \
                    flex-col sm:flex-row ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'} \
                    text-center sm:text-left`}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-1/2 top-0 transform -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-2xl shadow-lg ${
                    isDark ? 'bg-blue-500' : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'
                  }`}>
                    {step.icon}
                  </div>

                  {/* Content Card */}
                  <div className={`w-11/12 sm:w-5/12 mt-12 sm:mt-0 ${
                    index % 2 === 0 ? 'sm:mr-auto sm:pr-12' : 'sm:ml-auto sm:pl-12'
                  }`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`p-4 sm:p-6 rounded-xl shadow-lg ${
                        isDark ? 'bg-gray-800' : 'bg-white'
                      }`}
                    >
                      <h3 className={`text-lg sm:text-xl font-semibold mb-2 ${
                        isDark ? 'text-blue-400' : 'text-gray-900'
                      }`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm sm:text-base ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {step.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/register'}
              className={`px-8 py-3 rounded-full font-semibold text-white shadow-lg transition-all duration-300 ${
                isDark 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-blue-500'
              }`}
            >
              Get Started Now
            </motion.button>
          </motion.div>
        </div>
      </div>
      <FAQSection isDark={isDark} />
      {/* Scroll to Top Button */}
          {showScrollTop && (
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ${
          isDark
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-blue-500'
        }`}
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </motion.button>
      
    )}
    <div
      className={`container mx-auto px-4 py-16 transition-all duration-300 ${
        isDark ? "bg-gray-900 text-white" : "bg-white"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`max-w-2xl mx-auto rounded-2xl shadow-xl p-8 ${
          isDark ? "bg-gray-800" : "bg-gray-50"
        }`}
      >
        <h2
          className={`text-3xl font-bold mb-6 text-center ${
            isDark
              ? "text-blue-400"
              : "bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent"
          }`}
        >
          Still Questions?
        </h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Your Name"
            className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-gray-700 border-gray-600 focus:ring-blue-400"
                : "bg-white border border-gray-300 focus:ring-pink-400"
            }`}
          />
          <input
            type="email"
            placeholder="Email Address"
            className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-gray-700 border-gray-600 focus:ring-blue-400"
                : "bg-white border border-gray-300 focus:ring-pink-400"
            }`}
          />
          <textarea
            placeholder="Type your Message"
            className={`w-full p-3 rounded-lg h-32 focus:outline-none focus:ring-2 resize-none ${
              isDark
                ? "bg-gray-700 border-gray-600 focus:ring-blue-400"
                : "bg-white border border-gray-300 focus:ring-pink-400"
            }`}
          />
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg transition ${
              isDark
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90"
            }`}
          >
            Send ✈️
          </button>
        </form>
      </motion.div>
    </div>
    </>
  );
};

export default HowItWorks;