import React, { useState } from 'react';
import { useCart } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus, FaTrash, FaShoppingBag, FaArrowLeft } from "react-icons/fa";

function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;
    
    // Create order object
    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total,
      status: "Preparing", // initial simulated status
      placedAt: new Date().toLocaleString(),
    };
    
    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem("orders", JSON.stringify([newOrder, ...existing]));
    
    // Show confirmation animation
    setOrderPlaced(true);
    
    // Clear cart and redirect after animation
    setTimeout(() => {
      clearCart();
      navigate("/orders");
    }, 2000);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0 }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className={`p-4 max-w-4xl mx-auto ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Order success overlay */}
      <AnimatePresence>
        {orderPlaced && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
            role="alert"
            aria-live="assertive"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-xl shadow-xl max-w-md w-full mx-4 text-center`}
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center text-white"
              >
                <FaShoppingBag size={32} />
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-bold mb-2"
              >
                Order Placed Successfully!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}
              >
                Your order has been received and is being prepared. Redirecting to your orders...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center">
          <motion.button
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/menu')}
            className={`mr-4 p-2 rounded-full ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}
            aria-label="Back to menu"
          >
            <FaArrowLeft className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </motion.button>
          <h1 className="text-3xl font-display font-bold">Your Cart</h1>
        </div>
        <div className="text-sm">
          {cartItems.length > 0 && (
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
            </span>
          )}
        </div>
      </motion.div>
      
      {cartItems.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-sm text-center`}
        >
          <div className="mb-6">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            >
              <FaShoppingBag size={32} className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            </motion.div>
          </div>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-500'} mb-6`}>Your cart is empty.</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/menu')}
            className="bg-cafeteria-light hover:bg-cafeteria-dark text-white px-6 py-3 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-cafeteria-light focus:ring-offset-2 transition-colors"
          >
            Browse Menu
          </motion.button>
        </motion.div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg shadow-sm overflow-hidden`}
        >
          <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className="font-semibold text-lg">Cart Items</h2>
          </div>
          
          <AnimatePresence>
            <div className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {cartItems.map(item => (
                <motion.div 
                  key={item.id} 
                  variants={itemVariants}
                  exit="exit"
                  layout
                  className={`p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between ${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'} transition-colors`}
                >
                  <div className="flex items-center mb-3 sm:mb-0">
                    <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded" />
                    <div className="ml-4">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>₹{item.price} each</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end">
                    <div className={`flex items-center border rounded-lg overflow-hidden ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                      <motion.button 
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                        disabled={item.quantity <= 1} 
                        className={`px-3 py-1 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} disabled:opacity-50 transition-colors`}
                        aria-label="Decrease quantity"
                      >
                        <FaMinus className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`} size={12} />
                      </motion.button>
                      <span className="px-4 py-1">{item.quantity}</span>
                      <motion.button 
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                        className={`px-3 py-1 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                        aria-label="Increase quantity"
                      >
                        <FaPlus className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`} size={12} />
                      </motion.button>
                    </div>
                    
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromCart(item.id)} 
                      className="ml-4 text-red-500 hover:text-red-600 transition-colors"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <FaTrash />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
          
          <motion.div 
            variants={itemVariants}
            className={`p-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
          >
            <div className="flex justify-between font-bold text-xl mb-6">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={clearCart}
                className={`px-4 py-2 border ${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-300 hover:bg-gray-100'} rounded-lg transition-colors focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-gray-500' : 'focus:ring-gray-400'}`}
              >
                Clear Cart
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePlaceOrder}
                className="bg-cafeteria-light hover:bg-cafeteria-dark text-white px-6 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cafeteria-light focus:ring-offset-2"
              >
                Place Order
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default CartPage;
