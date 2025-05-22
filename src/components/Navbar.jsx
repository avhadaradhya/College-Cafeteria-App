import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaHome, FaUtensils, FaHistory, FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const { cartItems } = useCart();
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Check if the current route is the landing page
  const isLandingPage = location.pathname === "/";
  const isMenuPage = location.pathname === "/menu";
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Navigation items
  const navItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Menu", path: "/menu", icon: <FaUtensils /> },
    { name: "Orders", path: "/orders", icon: <FaHistory /> },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} 
                 ${isScrolled ? 'shadow-lg' : ''} 
                 sticky top-0 z-50 transition-all duration-300`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              whileHover={{ rotate: 10 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-cafeteria-dark' : 'bg-cafeteria-light'} text-white`}
            >
              <FaUtensils className="w-5 h-5" />
            </motion.div>
            <span className="text-xl font-display font-bold">
              <span className={darkMode ? 'text-white' : 'text-gray-900'}>College</span>
              <span className="text-cafeteria-light"> Cafeteria</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-colors ${location.pathname === item.path ? 
                  (darkMode ? 'text-cafeteria-light font-medium' : 'text-cafeteria-light font-medium') : 
                  (darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-cafeteria-light')}`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
          
          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Cart icon */}
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative"
            >
              <Link 
                to="/cart" 
                aria-label="Shopping Cart" 
                className={`block p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
              >
                <FaShoppingCart className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
                <AnimatePresence>
                  {totalCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center" 
                      aria-label={`${totalCount} items in cart`}
                    >
                      {totalCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
            
            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? 
                <FaSun className="w-5 h-5 text-yellow-300" /> : 
                <FaMoon className="w-5 h-5 text-gray-700" />}
            </motion.button>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? 
                  <FaTimes className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-700'}`} /> : 
                  <FaBars className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-700'}`} />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
          >
            <div className="container mx-auto px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 p-3 rounded-md ${location.pathname === item.path ? 
                    (darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-cafeteria-light') : 
                    ''} ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
