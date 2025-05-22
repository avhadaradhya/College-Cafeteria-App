import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCartPlus, FaCheck } from 'react-icons/fa';

function ItemCard({ item, onAdd, darkMode }) {
  const [isAdded, setIsAdded] = useState(false);
  
  const handleAddToCart = () => {
    setIsAdded(true);
    onAdd();
    
    // Reset the added state after animation
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg overflow-hidden flex flex-col h-full shadow-sm hover:shadow-lg transition-all duration-300`}
    >
      <div className="relative overflow-hidden group">
        <motion.img 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src={item.image} 
          alt={item.name} 
          className="h-48 w-full object-cover transition-transform duration-300" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full">
            <p className="text-white text-sm truncate">{item.description}</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.name}</h3>
          {item.veg ? (
            <span className="inline-flex items-center text-xs text-green-600">
              <span className="h-4 w-4 inline-block mr-1 border border-green-600 bg-green-600 rounded-sm"></span>
            </span>
          ) : (
            <span className="inline-flex items-center text-xs text-red-600">
              <span className="h-4 w-4 inline-block mr-1 border border-red-600 bg-red-600 rounded-sm"></span>
            </span>
          )}
        </div>
        
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} flex-grow mb-4`}>{item.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>₹{item.price}</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={isAdded}
            aria-label={`Add ${item.name} to cart`}
            className={`${isAdded ? 'bg-green-600' : 'bg-cafeteria-light hover:bg-cafeteria-dark'} text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${darkMode ? 'focus:ring-offset-gray-800' : ''} focus:ring-cafeteria-light`}
          >
            {isAdded ? (
              <>
                <FaCheck />
                <span>Added</span>
              </>
            ) : (
              <>
                <FaCartPlus />
                <span>Add</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default ItemCard;
