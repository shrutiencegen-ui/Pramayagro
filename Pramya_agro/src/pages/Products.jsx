"use client";

import Navbar from "../components/Navbar";
import { SlidersHorizontal, Plus, Minus, ShoppingCart, Check } from "lucide-react";
import { useEffect, useState } from "react";
import API from "../services/api";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();
  const categories = ["All", "Grains", "Pulses", "Spices", "Fruits", "Vegetables"];

  const [productsData, setProductsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});

  // Fetch products and current cart
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await API.get("/products");
        setProductsData(productRes.data);

        const initialQuantities = {};
        productRes.data.forEach(p => { initialQuantities[p.id] = 1; });
        setQuantities(initialQuantities);

        const token = localStorage.getItem("token");
        if (token) {
          const cartRes = await API.get("/cart");
          setCart(cartRes.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // Filter & Sort
  let filtered = selectedCategory === "All"
    ? productsData
    : productsData.filter((p) => (p.category || "Other") === selectedCategory);

  if (sortOption === "low") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortOption === "high") filtered = [...filtered].sort((a, b) => b.price - a.price);

  const increment = (id) => setQuantities(prev => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  const decrement = (id) => setQuantities(prev => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) - 1) }));

  // Add to cart
  const addToCart = async (product) => {
    const qty = quantities[product.id] || 1;
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please login to add items");

    try {
      const res = await API.post("/cart/add", { productId: product.id, quantity: qty });
      toast.success(res.data.msg || `${qty}kg ${product.name} added!`);
      const updatedCart = await API.get("/cart");
      setCart(updatedCart.data);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to add to cart");
    }
  };

  const buyNow = async (product) => {
    await addToCart(product);
    navigate("/cart");
  };

  const isInCart = (productId) => cart.some(item => item.productId === productId);

  return (
    <div className="bg-[#050707] text-white min-h-screen relative overflow-x-hidden">
      <Toaster position="top-right" />
      <Navbar />

      {/* Hero Section */}
      <section className="py-28 md:py-32 text-center bg-black/40 backdrop-blur-xl border-b border-white/10 relative z-10">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4">Premium Organic Collection</h1>
        <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
          Sustainably grown, ethically sourced, powered by smart farming.
        </p>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-4 gap-12 relative z-10">
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-10">
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4">Categories</h3>
            <div className="space-y-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                      : "bg-white/[0.04] hover:bg-white/[0.08] text-gray-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4 flex items-center gap-2">
              <SlidersHorizontal size={16} /> Sort By
            </h3>
            <select
              onChange={e => setSortOption(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 p-3 rounded-xl text-gray-300 focus:outline-none focus:border-emerald-500/50"
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
            {filtered.map(product => {
              const qty = quantities[product.id] || 1;
              const alreadyAdded = isInCart(product.id);

              return (
                <div key={product.id} className="group bg-gradient-to-b from-white/[0.05] to-transparent rounded-3xl p-[1px] overflow-hidden hover:shadow-xl hover:shadow-emerald-600/30 transition-all duration-300">
                  <div className="bg-[#0b0f0f] rounded-3xl overflow-hidden flex flex-col h-full">
                    {/* Product Image */}
                    <div className="h-64 overflow-hidden relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="p-6 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold tracking-wide">{product.name}</h3>
                        <p className="text-emerald-400 text-xl sm:text-2xl font-extrabold mt-1">₹{product.price}</p>

                        {/* Quantity Selector */}
                        {!alreadyAdded && (
                          <div className="flex items-center gap-2 mt-4">
                            <button onClick={() => decrement(product.id)} className="p-2 bg-white/[0.05] rounded-full hover:bg-white/10 transition">
                              <Minus size={14} />
                            </button>
                            <span className="w-12 text-center font-bold">{qty} kg</span>
                            <button onClick={() => increment(product.id)} className="p-2 bg-white/[0.05] rounded-full hover:bg-white/10 transition">
                              <Plus size={14} />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-6">
                        {alreadyAdded ? (
                          <button
                            onClick={() => navigate("/cart")}
                            className="flex-1 py-3 rounded-2xl bg-emerald-500/20 text-emerald-400 font-bold uppercase tracking-widest border border-emerald-500/30 flex items-center justify-center gap-2 hover:bg-emerald-500/30 transition"
                          >
                            <Check size={16} /> Already In Cart
                          </button>
                        ) : (
                        <button
                        onClick={() => addToCart(product)}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-600 text-black text-sm font-semibold uppercase tracking-wide flex items-center justify-center gap-2 shadow-md hover:shadow-[0_0_10px_rgba(16,185,129,0.4)] hover:scale-105 transition-transform duration-300"
                      >
                        <ShoppingCart size={14} /> Add to Cart
                      </button>
                        )}

                        {!alreadyAdded && (
                        <button onClick={() => buyNow(product)} className="py-2.5 px-4 rounded-xl bg-white/[0.05] border border-white/10 text-gray-300 font-semibold uppercase tracking-wide hover:bg-white/[0.1] transition">
                          Buy Now
                        </button>
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