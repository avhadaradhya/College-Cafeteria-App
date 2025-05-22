import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("orders") || "[]");
    
    // Simulate some orders having different statuses based on time
    const updatedOrders = saved.map(order => {
      const orderTime = new Date(order.placedAt).getTime();
      const currentTime = new Date().getTime();
      const minutesPassed = (currentTime - orderTime) / (1000 * 60);
      
      // If order is older than 5 minutes, mark as ready
      if (minutesPassed > 5 && order.status === "Preparing") {
        return { ...order, status: "Ready for Pickup" };
      }
      return order;
    });
    
    setOrders(updatedOrders);
    
    // Save the updated orders back to localStorage
    if (JSON.stringify(updatedOrders) !== JSON.stringify(saved)) {
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
    }
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <p className="text-gray-500 mb-4">No orders placed yet.</p>
          <Link 
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded inline-block focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-500">Order ID: {order.id}</span>
                  <p className="text-sm text-gray-600">Placed at: {order.placedAt}</p>
                </div>
                <span 
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "Ready for Pickup" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              
              <div className="p-4">
                <h3 className="font-medium mb-2">Order Items</h3>
                <ul className="divide-y">
                  {order.items.map(item => (
                    <li key={item.id} className="py-2 flex justify-between">
                      <div className="flex items-center">
                        <img src={item.image} alt={item.name} className="h-10 w-10 object-cover rounded mr-3" />
                        <span>{item.name} × {item.quantity}</span>
                      </div>
                      <span className="text-gray-700">₹{item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-4 bg-gray-50 flex justify-between items-center">
                <span className="font-medium">Total Items: {order.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                <span className="font-bold text-lg">Total: ₹{order.total}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
