"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import API from "../services/api";
import { useTheme } from "../context/ThemeContext";
import {useNavigate} from "react-router-dom";
export default function Cart() {
  const [cart, setCart] = useState([]);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await API.get("/cart");
      setCart(res.data);
    } catch {
      toast.error("Failed to load cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (itemId, quantity) => {
    try {
      await API.put(`/cart/update/${itemId}`, { quantity });
      setCart(prev => prev.map(i => i.id === itemId ? { ...i, quantity } : i));
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  const removeItem = async (item) => {
    const confirmDelete = window.confirm(`Remove "${item.name}"?`);
    if (confirmDelete) {
      try {
        await API.delete(`/cart/remove/${item.id}`);
        setCart(prev => prev.filter(i => i.id !== item.id));
        toast.success(`${item.name} removed`);
      } catch {
        toast.error("Failed to remove item");
      }
    }
  };

  const increment = (id) => {
    const item = cart.find(i => i.id === id);
    updateQuantity(id, item.quantity + 1);
  };

  const decrement = (id) => {
    const item = cart.find(i => i.id === id);
    if (item.quantity === 1) removeItem(item);
    else updateQuantity(id, item.quantity - 1);
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />

      <div className={`min-h-screen pt-28 px-6 transition-colors duration-500
        ${theme === "dark" ? "bg-[#030504]" : "bg-[#f8fafc]"}`}>

        <div className="max-w-7xl mx-auto">

          <h2 className={`text-3xl font-bold mb-8
            ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Your Cart 🛒
          </h2>

          {cart.length === 0 ? (
            <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Cart is empty.
            </p>
          ) : (
            <div className="space-y-6">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-5 rounded-2xl transition-all
                  ${theme === "dark"
                      ? "bg-white/5 border border-white/10 backdrop-blur-md"
                      : "bg-white border border-gray-200 shadow-sm"
                  }`}
                >

                  {/* LEFT */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image || "https://via.placeholder.com/80"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div>
                      <h3 className={`font-bold
                        ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        {item.name}
                      </h3>

                      <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                        ₹{item.price} per kg
                      </p>

                      {/* QUANTITY */}
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => decrement(item.id)}
                          className={`px-3 py-1 rounded-full transition
                          ${theme === "dark"
                              ? "bg-white/10 text-white hover:bg-white/20"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                          }`}
                        >
                          -
                        </button>

                        <span className={`font-bold
                          ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          {item.quantity} kg
                        </span>

                        <button
                          onClick={() => increment(item.id)}
                          className={`px-3 py-1 rounded-full transition
                          ${theme === "dark"
                              ? "bg-white/10 text-white hover:bg-white/20"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                          }`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex flex-col items-end gap-3">
                    <p className={`font-bold text-lg
                      ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>

                    <button
                      onClick={() => removeItem(item)}
                      className="text-red-500 hover:text-red-600 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}

              {/* TOTAL */}
              <div className={`flex justify-between items-center mt-10 p-6 rounded-2xl
                ${theme === "dark"
                    ? "bg-white/5 border border-white/10"
                    : "bg-white border border-gray-200 shadow-sm"
                }`}>
                <h3 className={`text-xl font-bold
                  ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Total:
                </h3>

                <p className="text-2xl font-extrabold text-emerald-500">
                  ₹{totalPrice.toFixed(2)}
                </p>
              </div>

              {/* BUTTON */}
              <button
  onClick={() => {
  if (cart.length === 0) {
    toast.error("Cart is empty!");
  } else {
    navigate("/checkout");
  }
}}
  className="w-full py-4 mt-6 rounded-2xl bg-emerald-500 text-white font-bold text-lg hover:bg-emerald-600 transition-all"
>
  Proceed to Checkout 🚀
</button>

            </div>
          )}
        </div>
      </div>
    </>
  );
}