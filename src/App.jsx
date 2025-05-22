import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import MenuPage from "./components/MenuPage";
import CartPage from "./components/CartPage";
import OrdersPage from "./components/OrdersPage";
import Chatbot from "./components/Chatbot";
import PlaceholderImages from "./components/PlaceholderImages";

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            {/* Component to generate placeholder images */}
            <PlaceholderImages />
            
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/orders" element={<OrdersPage />} />
              </Routes>
            </main>
            <Chatbot />
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
