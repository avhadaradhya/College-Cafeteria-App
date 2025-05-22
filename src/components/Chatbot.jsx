import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaComments, FaTimes } from "react-icons/fa";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  // Focus input when chat opens
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const botReply = (msg) => {
    // Simple keyword-based logic
    const text = msg.toLowerCase();
    
    if (text.includes("hi") || text.includes("hello") || text.includes("hey")) {
      return "Hello! How can I help you with your cafeteria order today?";
    } else if (text.includes("order") && text.includes("how")) {
      return "To place an order, browse the Menu and click 'Add to Cart' on items you want. Then go to Cart and click 'Place Order'.";
    } else if (text.includes("cart") || text.includes("my cart")) {
      return "Your cart is accessible via the cart icon in the top-right. I can take you there now.";
    } else if (text.includes("menu")) {
      return "I'll show you our menu with all available items.";
    } else if (text.includes("orders") || text.includes("my orders")) {
      return "I'll take you to your order history page.";
    } else if (text.includes("veg") || text.includes("vegetarian")) {
      return "You can filter vegetarian items on our menu page using the 'Veg Only' button.";
    } else if (text.includes("payment") || text.includes("pay")) {
      return "Currently we only support cash payment on delivery. You can place your order and pay when you pick it up.";
    } else if (text.includes("time") || text.includes("how long")) {
      return "Orders typically take 10-15 minutes to prepare. You can check the status on your Orders page.";
    } else if (text.includes("thank")) {
      return "You're welcome! Anything else I can help you with?";
    } else if (text.includes("bye") || text.includes("goodbye")) {
      return "Thank you for chatting! Feel free to ask if you need anything else.";
    }
    
    return "I'm not sure I understand. You can ask about how to order, check your cart, view the menu, or see your orders.";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { from: "user", text: userMsg }]);
    setInput("");
    
    // Process user message and determine action
    const text = userMsg.toLowerCase();
    let botResponse = botReply(userMsg);
    
    // Handle navigation based on user message
    setTimeout(() => {
      setMessages(prev => [...prev, { from: "bot", text: botResponse }]);
      
      // Navigate based on keywords after showing response
      if (text.includes("menu")) {
        setTimeout(() => navigate("/"), 1000);
      } else if (text.includes("cart")) {
        setTimeout(() => navigate("/cart"), 1000);
      } else if (text.includes("orders") || text.includes("my orders")) {
        setTimeout(() => navigate("/orders"), 1000);
      }
    }, 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 z-50"
        aria-label={open ? "Close chat" : "Open chat assistant"}
      >
        <FaComments className="w-6 h-6" />
      </button>

      {/* Chat window */}
      {open && (
        <div 
          className="fixed bottom-20 right-4 w-80 md:w-96 bg-white rounded-lg shadow-xl flex flex-col z-40 max-h-[70vh]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chatbot-title"
        >
          <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h2 id="chatbot-title" className="font-medium">Cafeteria Assistant</h2>
            <button 
              onClick={() => setOpen(false)}
              className="text-white hover:text-gray-200 focus:outline-none"
              aria-label="Close chat"
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="flex-1 p-3 overflow-y-auto" style={{ maxHeight: "50vh" }}>
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                className={`my-2 flex ${m.from === "bot" ? "justify-start" : "justify-end"}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    m.from === "bot" 
                      ? "bg-gray-100 text-gray-800 rounded-bl-none" 
                      : "bg-blue-500 text-white rounded-br-none"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-3 border-t">
            <div className="flex">
              <input 
                type="text"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-grow border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Type a message..."
                aria-label="Type your message"
              />
              <button 
                onClick={handleSend}
                className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Send message"
              >
                Send
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Try asking: "How do I order?" or "Show me the menu"
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
