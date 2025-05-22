import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import FoodScene from './3D/FoodScene';
import { useTheme } from '../contexts/ThemeContext';
import { FaUtensils, FaShoppingCart, FaHistory, FaMoon, FaSun } from 'react-icons/fa';

const MotionLink = motion(Link);

export default function LandingPage() {
  const { darkMode, toggleTheme } = useTheme();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Use intersection observer for scroll animations
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [ctaRef, ctaInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full ${darkMode ? 'bg-secondary-900/20' : 'bg-primary-100'}`}></div>
          <div className={`absolute top-1/2 -left-24 w-64 h-64 rounded-full ${darkMode ? 'bg-cafeteria-dark/20' : 'bg-cafeteria-light/20'}`}></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <motion.div 
              variants={itemVariants} 
              className="flex-1"
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-2 inline-block px-3 py-1 rounded-full bg-cafeteria-light/10 text-cafeteria-light dark:bg-cafeteria-dark/20 dark:text-cafeteria-light"
              >
                <span className="text-sm font-medium">Delicious Food Awaits</span>
              </motion.div>
              
              <motion.h1 
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
              >
                College Cafeteria
                <span className="text-cafeteria-light dark:text-cafeteria-light"> Ordering App</span>
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-lg mb-8 text-gray-600 dark:text-gray-300 max-w-lg"
              >
                Order your favorite meals from the college cafeteria with ease. 
                Browse the menu, add items to your cart, and track your orders - all in one place.
              </motion.p>
              
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-4"
              >
                <MotionLink
                  to="/menu"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-cafeteria-light text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <FaUtensils />
                  <span>Explore Menu</span>
                </MotionLink>
                
                <motion.button
                  onClick={toggleTheme}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-lg shadow-md ${darkMode ? 'bg-yellow-500 text-gray-900' : 'bg-gray-800 text-white'}`}
                  aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                </motion.button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="flex-1"
            >
              <div className={`rounded-2xl overflow-hidden shadow-xl ${darkMode ? 'shadow-secondary-500/10' : 'shadow-primary-500/10'}`}>
                <FoodScene />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Features Section */}
      <motion.section
        ref={featuresRef}
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        variants={containerVariants}
        className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our cafeteria app makes ordering food simple and convenient
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaUtensils className="w-8 h-8 text-cafeteria-light" />,
                title: "Browse Menu",
                description: "Explore our diverse menu with categories for snacks, main courses, and beverages."
              },
              {
                icon: <FaShoppingCart className="w-8 h-8 text-cafeteria-light" />,
                title: "Add to Cart",
                description: "Select your favorite items, customize quantities, and add them to your cart."
              },
              {
                icon: <FaHistory className="w-8 h-8 text-cafeteria-light" />,
                title: "Track Orders",
                description: "Place your order and track its status from preparation to ready for pickup."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-colors duration-300 transform hover:-translate-y-2`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* CTA Section */}
      <motion.section
        ref={ctaRef}
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={itemVariants}
            className={`rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-primary-50'} p-10 md:p-16 text-center max-w-4xl mx-auto`}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Ready to Order?</h2>
            <p className="text-lg mb-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our menu and satisfy your cravings with just a few clicks.
            </p>
            
            <MotionLink
              to="/menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-cafeteria-light text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Order Now
            </MotionLink>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
