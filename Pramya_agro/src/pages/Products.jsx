"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import API from "../services/api";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";

export default function Products() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const categories = ["All", "Grains", "Pulses", "Spices", "Fruits", "Vegetables"];
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);

        const qty = {};
        res.data.forEach(p => { qty[p.id] = 1; });
        setQuantities(qty);

        const token = localStorage.getItem("token");
        if (token) {
          const cartRes = await API.get("/cart");
          setCart(cartRes.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const filtered = selectedCategory === "All"
    ? products
    : products.filter(p => (p.category || "Other") === selectedCategory);

  const sorted = [...filtered].sort((a, b) => {
    if (sortOption === "low") return a.price - b.price;
    if (sortOption === "high") return b.price - a.price;
    return 0;
  });

  const increment = (id) => setQuantities(prev => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  const decrement = (id) => setQuantities(prev => ({ ...prev, [id]: Math.max(1, prev[id] - 1) }));

  const addToCart = async (product) => {
    const qty = quantities[product.id] || 1;
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please login to add items");

    try {
      const res = await API.post("/cart/add", { productId: product.id, quantity: qty });
      toast.success(res.data.msg || `${qty} kg ${product.name} added!`);
      const cartRes = await API.get("/cart");
      setCart(cartRes.data);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to add to cart");
    }
  };

  const buyNow = async (product) => {
    await addToCart(product);
    navigate("/checkout");
  };

  const isInCart = (id) => cart.some(item => item.productId === id);

  return (
    <div className={`min-h-screen relative ${theme === "dark" ? "bg-[#0b0f0d] text-gray-100" : "bg-emerald-50 text-gray-900"}`}>
      <Toaster position="top-right" />
      <Navbar />

      {/* Hero */}
      <section className={`py-28 md:py-32 text-center ${theme === "dark" ? "bg-gradient-to-r from-[#08110c] via-[#0b0f0d] to-[#0c1110]" : "bg-gradient-to-r from-emerald-100 via-emerald-200 to-emerald-50"} backdrop-blur-md`}>
        <h1 className={`text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          Premium Organic Collection
        </h1>
        <p className={`max-w-2xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-gray-700"} text-base sm:text-lg md:text-xl`}>
          Sustainably grown, ethically sourced, powered by smart farming.
        </p>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-4 gap-12">

        {/* Sidebar */}
        <div className="md:col-span-1 space-y-10">

          {/* Categories */}
          <div>
            <h3 className={`text-xs uppercase tracking-[0.2em] mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Categories</h3>
            <div className="space-y-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-5 py-3 rounded-xl font-medium transition-all duration-300 
                    ${selectedCategory === cat
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-300/40"
                      : theme === "dark"
                        ? "bg-[#111314] text-gray-200 hover:bg-[#1a1c1b] shadow-sm"
                        : "bg-white text-gray-900 hover:bg-emerald-100 shadow-sm"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <h3 className={`text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Sort By
            </h3>
            <select
              onChange={e => setSortOption(e.target.value)}
              className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-400 transition
                ${theme === "dark" ? "bg-[#111314] border-gray-700 text-gray-200" : "bg-white border-gray-200 text-gray-900"}`}
            >
              <option value="default">Default</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Products Grid */}
        <div className="md:col-span-3">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sorted.map(product => {
              const qty = quantities[product.id] || 1;
              const inCart = isInCart(product.id);

              return (
                <div
                  key={product.id}
                  className={`group rounded-3xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl
                    ${theme === "dark" ? "bg-[#111314]" : "bg-white"}`}
                >
                  <div className="flex flex-col h-full">

                    {/* Image */}
                    <div className="h-64 overflow-hidden relative rounded-t-3xl">
                      <img
                        src={product.image || "https://via.placeholder.com/300"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    {/* Details */}
                    <div className={`p-6 flex flex-col justify-between flex-1 rounded-b-3xl ${theme === "dark" ? "bg-[#111314]" : "bg-white"}`}>
                      <div>
                        <h3 className={`text-lg sm:text-xl font-bold tracking-wide ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          {product.name}
                        </h3>
                        <p className={`text-xl sm:text-2xl font-extrabold mt-1 ${theme === "dark" ? "text-emerald-400" : "text-emerald-600"}`}>
                          ₹{product.price}
                        </p>

                        {/* Quantity */}
                        {!inCart && (
                          <div className="flex items-center gap-2 mt-4">
                            <button
                              onClick={() => decrement(product.id)}
                              className={`p-2 rounded-full transition ${theme === "dark" ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-300 hover:bg-gray-400"}`}
                            >
                              <Minus size={14} className={`${theme === "dark" ? "text-white" : "text-gray-900"}`} />
                            </button>
                            <span className={`w-12 text-center font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{qty} kg</span>
                            <button
                              onClick={() => increment(product.id)}
                              className={`p-2 rounded-full transition ${theme === "dark" ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-300 hover:bg-gray-400"}`}
                            >
                              <Plus size={14} className={`${theme === "dark" ? "text-white" : "text-gray-900"}`} />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 mt-6">
                        {inCart ? (
                          <button
                            onClick={() => navigate("/cart")}
                            className="flex-1 py-3 rounded-2xl bg-emerald-500/20 text-emerald-600 font-bold uppercase flex items-center justify-center gap-2 hover:bg-emerald-500/30 transition"
                          >
                            <ShoppingCart size={16} /> Already In Cart
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => addToCart(product)}
                              className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-600 text-white font-semibold uppercase flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
                            >
                              <ShoppingCart size={14} /> Add to Cart
                            </button>
                            <button
                              onClick={() => buyNow(product)}
                              className={`py-2.5 px-4 rounded-xl font-semibold uppercase border transition
                                ${theme === "dark"
                                  ? "bg-[#111314] border-gray-700 text-gray-300 hover:bg-gray-800"
                                  : "bg-gray-100 border-gray-200 text-gray-900 hover:bg-gray-200"
                                }`}
                            >
                              Buy Now
                            </button>
                          </>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}