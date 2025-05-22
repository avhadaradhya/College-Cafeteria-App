import React, { useState } from 'react';
import { menuItems } from "../data/menuItems";
import { useCart } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";
import ItemCard from "./ItemCard";
import { motion } from "framer-motion";
import { FaSearch, FaFilter } from "react-icons/fa";

function MenuPage() {
  const categories = ["Snacks", "Main Course", "Beverages"];
  const { addToCart } = useCart();
  const { darkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [vegFilter, setVegFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Filter items based on search term and veg filter
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVegFilter = vegFilter === 'all' || 
                            (vegFilter === 'veg' && item.veg) || 
                            (vegFilter === 'nonveg' && !item.veg);
    return matchesSearch && matchesVegFilter;
  });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className={`p-4 max-w-7xl mx-auto ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm`}
      >
        <h1 className="text-3xl font-display font-bold mb-6">Our Menu</h1>
        
        {/* Search */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-cafeteria-light`}
              aria-label="Search menu items"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`md:ml-2 px-4 py-3 rounded-lg flex items-center gap-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
          >
            <FaFilter className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
            <span>Filters</span>
          </motion.button>
        </div>
        
        {/* Filters */}
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-wrap gap-3">
              <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Dietary Preference:</span>
              <div className="flex flex-wrap gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setVegFilter('all')}
                  className={`px-4 py-2 rounded-full ${vegFilter === 'all' ? 'bg-cafeteria-light text-white' : `${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}`}
                >
                  All Items
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setVegFilter('veg')}
                  className={`px-4 py-2 rounded-full ${vegFilter === 'veg' ? 'bg-cafeteria-accent text-white' : `${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}`}
                >
                  Vegetarian Only
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setVegFilter('nonveg')}
                  className={`px-4 py-2 rounded-full ${vegFilter === 'nonveg' ? 'bg-red-600 text-white' : `${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}`}
                >
                  Non-Vegetarian
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Display items by category */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {categories.map(cat => {
          const categoryItems = filteredItems.filter(item => item.category === cat);
          if (categoryItems.length === 0) return null;
          
          return (
            <motion.section key={cat} className="mb-12" variants={itemVariants}>
              <h2 className={`text-2xl font-display font-semibold mb-6 pl-3 border-l-4 ${cat === 'Snacks' ? 'border-yellow-500' : cat === 'Main Course' ? 'border-red-500' : 'border-blue-500'}`}>{cat}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {categoryItems.map(item => (
                  <motion.div key={item.id} variants={itemVariants}>
                    <ItemCard item={item} onAdd={() => addToCart(item)} darkMode={darkMode} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          );
        })}
      </motion.div>

      {filteredItems.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>No items match your search criteria.</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setVegFilter('all');
            }}
            className="mt-4 px-4 py-2 bg-cafeteria-light text-white rounded-lg hover:bg-cafeteria-dark transition-colors"
          >
            Clear Filters
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default MenuPage;
