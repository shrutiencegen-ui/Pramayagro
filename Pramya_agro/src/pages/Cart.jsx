"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import API from "../services/api";

export default function Cart() {
  const [cart, setCart] = useState([]);

  // Fetch cart from backend
  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await API.get("/cart"); // baseURL mule fkt /cart puresa aahe
      setCart(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Update quantity in backend
  const updateQuantity = async (itemId, quantity) => {
    try {
      await API.put(`/cart/update/${itemId}`, { quantity });
      setCart(prev => prev.map(i => i.id === itemId ? { ...i, quantity } : i));
    } catch (err) {
      toast.error("Failed to update quantity");
    }
  };

  // ✅ 1. Remove Item with Confirmation
  const removeItem = async (item) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${item.name}" from the cart?`);
    
    if (confirmDelete) {
      try {
        await API.delete(`/cart/remove/${item.id}`);
        setCart(prev => prev.filter(i => i.id !== item.id));
        toast.success(`${item.name} removed`);
      } catch (err) {
        toast.error("Failed to remove item");
      }
    }
  };

  const increment = (itemId) => {
    const item = cart.find(i => i.id === itemId);
    const newQty = item.quantity + 1;
    updateQuantity(itemId, newQty);
  };

  // ✅ 2. Decrement logic with Auto-Remove
  const decrement = (itemId) => {
    const item = cart.find(i => i.id === itemId);
    
    if (item.quantity === 1) {
      // Jar quantity 1 asel aani minus dable tar direct remove karel (Confirmation sobat)
      removeItem(item);
    } else {
      const newQty = item.quantity - 1;
      updateQuantity(itemId, newQty);
    }
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-600">Cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-white/[0.05] p-4 rounded-xl">
                <div className="flex items-center gap-4">
                  <img src={item.image || "https://via.placeholder.com/80"} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div>
                    <h3 className="text-white font-bold">{item.name}</h3>
                    <p className="text-gray-400">₹{item.price} per kg</p>

                    <div className="flex items-center gap-2 mt-2">
                      <button className="px-2 py-1 bg-white/[0.05] rounded-full text-white" onClick={() => decrement(item.id)}>-</button>
                      <span className="text-white font-bold">{item.quantity} kg</span>
                      <button className="px-2 py-1 bg-white/[0.05] rounded-full text-white" onClick={() => increment(item.id)}>+</button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <p className="text-white font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                  {/* ✅ Delete Button call with item object */}
                  <button onClick={() => removeItem(item)} className="text-red-500 hover:text-red-600">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center mt-8 p-6 bg-white/[0.05] rounded-xl">
              <h3 className="text-xl font-bold text-white">Total:</h3>
              <p className="text-2xl font-extrabold text-emerald-400">₹{totalPrice.toFixed(2)}</p>
            </div>

            <button className="w-full py-4 mt-6 rounded-2xl bg-emerald-500 text-white font-bold text-lg hover:bg-emerald-600 transition-all" onClick={() => toast.success("Proceeding to checkout...")}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}