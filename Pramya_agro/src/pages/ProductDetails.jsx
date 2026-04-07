"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import API from "../services/api";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";

export default function ProductDetail() {
  const { theme } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);

        const token = localStorage.getItem("token");
        if (token) {
          const cartRes = await API.get("/cart");
          setCart(cartRes.data);
        }

        // Related products
        if (res.data.category) {
          const relRes = await API.get(`/products?category=${res.data.category}`);
          setRelated(relRes.data.filter(p => p.id !== res.data.id));
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load product");
      }
    };
    fetchProduct();
  }, [id]);

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => Math.max(1, q - 1));

  const addToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please login first");

    try {
      await API.post("/cart/add", { productId: product.id, quantity });
      toast.success(`${product.name} added!`);
      const cartRes = await API.get("/cart");
      setCart(cartRes.data);
    } catch {
      toast.error("Error adding to cart");
    }
  };

  const isInCart = () => cart.some(item => String(item.productId) === String(id));

  if (!product) return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-[#050706]" : "bg-gray-50"}`}>
      <Navbar />
      <div className="flex justify-center items-center h-[70vh] text-gray-500">Loading...</div>
    </div>
  );

  const sections = Array.isArray(product.description_sections) ? product.description_sections : [];

  return (
    <div className={`min-h-screen transition-colors duration-700 ${theme === "dark" ? "bg-[#050706] text-white" : "bg-gray-50 text-gray-900"}`}>
      <Toaster position="bottom-right" />
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-12 items-start">

        {/* Left: Product Image */}
        <div className="md:w-1/2 flex justify-center md:justify-start">
          <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-emerald-500/10 to-transparent transition-all hover:scale-[1.02]">
            <img
              src={product.image || "https://via.placeholder.com/600"}
              alt={product.name}
              className="w-full h-[450px] object-contain p-8 bg-white/5"
            />
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="md:w-1/2 flex flex-col gap-4">
          {/* Product Name & Category */}
          <h1 className="text-4xl font-extrabold">{product.name}</h1>
          <p className="text-sm font-semibold text-emerald-500 uppercase tracking-wider">{product.category}</p>

          {/* Normal Description */}
          {product.description && (
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">{product.description}</p>
          )}

          {/* Description Sections */}
          {sections.length > 0 && (
            <div className="mt-4 flex flex-col gap-3">
              {sections.map((sec, idx) => (
                <div key={idx} className="p-3 border rounded-lg bg-white/5">
                  <h3 className="font-semibold">{sec.title}</h3>
                  <p className="text-sm text-gray-300 mt-1">{sec.content}</p>
                </div>
              ))}
            </div>
          )}

          {/* Price */}
          <p className="text-3xl font-extrabold text-emerald-500 mt-4">₹{product.price}</p>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button onClick={decrement} className="px-3 py-2 hover:bg-emerald-500 hover:text-white transition">-</button>
              <span className="px-4 py-2">{quantity}</span>
              <button onClick={increment} className="px-3 py-2 hover:bg-emerald-500 hover:text-white transition">+</button>
            </div>
            <button
              onClick={!isInCart() ? addToCart : () => navigate("/cart")}
              className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-green-400 text-white font-bold rounded-lg shadow hover:scale-[1.02] transition flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} /> {!isInCart() ? "Add to Cart" : "In Your Cart"}
            </button>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h3 className="text-2xl font-extrabold mb-8">Related Products</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {related.map((prod) => (
              <div
                key={prod.id}
                onClick={() => navigate(`/products/${prod.id}`)}
                className="group relative flex flex-col h-full rounded-2xl overflow-hidden shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden relative bg-gradient-to-br from-emerald-500/10 to-transparent">
                  <img src={prod.image || "https://via.placeholder.com/600"} alt={prod.name} className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-[9px] font-bold uppercase tracking-widest text-emerald-400">{prod.category}</div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold line-clamp-2">{prod.name}</h3>
                  <p className="mt-2 text-[10px] opacity-70 line-clamp-3">{prod.description}</p>
                  <p className="mt-auto text-2xl font-extrabold text-emerald-500 mt-4">₹{prod.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}