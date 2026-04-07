"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Plus, Minus, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import API from "../services/api";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";

export default function Products() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);

  const categories = ["All", ...new Set(products.map((p) => p.category).filter(Boolean))];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await API.get("/products");
        setProducts(res.data);

        const qty = {};
        res.data.forEach((p) => { qty[p.id] = 1; });
        setQuantities(qty);

        const token = localStorage.getItem("token");
        if (token) {
          const cartRes = await API.get("/cart");
          setCart(cartRes.data);
        }
      } catch (err) {
        console.error(err);
        toast.error("Catalog load failed");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = selectedCategory === "All"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  const increment = (id) => setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  const decrement = (id) => setQuantities((prev) => ({ ...prev, [id]: Math.max(1, prev[id] - 1) }));

  const addToCart = async (product) => {
    const qty = quantities[product.id] || 1;
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please login first");

    try {
      await API.post("/cart/add", { productId: product.id, quantity: qty });
      toast.success(`${product.name} added!`, { icon: '🧪' });
      const cartRes = await API.get("/cart");
      setCart(cartRes.data);
    } catch (err) {
      toast.error("Error adding to cart");
    }
  };

  const isInCart = (id) => cart.some((item) => String(item.productId) === String(id));

  return (
    <div className={`min-h-screen transition-colors duration-700 ${theme === "dark" ? "bg-[#050706] text-white" : "bg-gray-50 text-gray-900"}`}>
      <Toaster position="bottom-right" />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 text-center">
        <div className="relative z-10 px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-500">Pramay Agro Certified</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            Agro <span className="text-emerald-500">Essentials</span>
          </h1>
          <p className="mt-4 text-sm opacity-60 max-w-xl mx-auto">
            Premium crop solutions designed for higher yield and healthier growth.
          </p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 pb-32 grid lg:grid-cols-12 gap-10">

        {/* Sidebar */}
        <aside className="lg:col-span-3">
          <div className="sticky top-24 space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-4">Collections</h3>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center px-4 py-2 rounded-2xl transition-all duration-300 font-bold text-sm ${
                    selectedCategory === cat ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "text-gray-500 hover:text-emerald-500 hover:bg-emerald-500/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="lg:col-span-9">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3,4].map(i => <div key={i} className="h-[320px] rounded-2xl animate-pulse bg-white/5"></div>)}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((product) => {
                const qty = quantities[product.id] || 1;
                const inCart = isInCart(product.id);

                return (
                  <div key={product.id} className="group relative flex flex-col h-full rounded-2xl overflow-hidden shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                    
                    {/* Image */}
                    <div className="aspect-[4/3] overflow-hidden relative bg-gradient-to-br from-emerald-500/10 to-transparent">
                      <img
                        src={product.image || "https://via.placeholder.com/600"}
                        alt={product.name}
                        className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-110 cursor-pointer"
                        onClick={() => navigate(`/products/${product.id}`)}
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-[9px] font-bold uppercase tracking-widest text-emerald-400">
                        {product.category}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-6 flex flex-col flex-grow cursor-pointer" onClick={() => navigate(`/products/${product.id}`)}>
                      <h3 className="text-lg font-semibold line-clamp-2">{product.name}</h3>
                      <p className="mt-2 text-[10px] opacity-70 line-clamp-3">{product.description}</p>

                      <div className="mt-auto flex justify-between items-center pt-4">
                        <div>
                          <p className="text-2xl font-extrabold text-emerald-500">₹{product.price}</p>
                          <p className="text-[9px] uppercase opacity-40">per unit</p>
                        </div>

                        {!inCart ? (
                          <div className="flex items-center gap-2">
                            <button onClick={(e) => { e.stopPropagation(); decrement(product.id); }} className="w-8 h-8 flex items-center justify-center hover:bg-emerald-500 hover:text-white rounded-md">
                              <Minus size={16} />
                            </button>
                            <span className="font-bold">{qty}</span>
                            <button onClick={(e) => { e.stopPropagation(); increment(product.id); }} className="w-8 h-8 flex items-center justify-center hover:bg-emerald-500 hover:text-white rounded-md">
                              <Plus size={16} />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                              className="ml-2 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-400 text-white font-bold text-xs uppercase tracking-wider transition-all hover:scale-[1.02] shadow-md"
                            >
                              Add
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => { e.stopPropagation(); navigate("/cart"); }}
                            className="px-4 py-2 rounded-xl bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md"
                          >
                            In Cart
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => navigate(`/products/${product.id}`)}
                        className="mt-3 text-[10px] font-black uppercase opacity-40 hover:opacity-100 transition-opacity"
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}