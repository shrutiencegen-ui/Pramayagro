"use client";

import { Link } from "react-router-dom";
import { Leaf, Globe, User, Droplet, Sparkles, ArrowRight, ShoppingBag } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import CountUp from "react-countup";
import API from "../services/api";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

import home1 from "../assets/home1.png";
import home2 from "../assets/home2.png";
import home3 from "../assets/home3.png";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await API.get("/products?featured=true");
        setFeaturedProducts(res.data.slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch featured products", err);
      }
    };
    fetchFeaturedProducts();
  }, []);

  return (
    <div
      className={`relative transition-colors duration-700 selection:bg-green-400 selection:text-white
      ${theme === "dark" ? "bg-[#020403] text-white" : "bg-[#FAF6F0] text-gray-900"}`}
    >
      
       {/* HERO SECTION */}
      <section className="relative h-[100vh] w-full overflow-hidden">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          autoplay={{ delay: 5000 }}
          loop
          className="absolute inset-0 w-full h-full"
        >
          {[home1].map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={img}
                  alt="Organic Farm"
                  className="w-full h-full object-cover scale-110 animate-pulse-slow"
                />
                <div
                  className={`absolute inset-0 transition-colors duration-500
                  ${theme === "dark" ? "bg-[#020403]/90" : "bg-black/30"}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-24">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-400/20 backdrop-blur-xl border border-green-300/30 text-green-600 text-xs font-black uppercase tracking-[3px] animate-bounce-subtle">
              <Sparkles size={14} /> 100% Organic & Fresh
            </div>

            <h1 className="text-6xl md:text-9xl font-black leading-[0.9] tracking-tighter">
              <span className="text-white drop-shadow-2xl">FROM SOIL</span>
              <br />
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                TO SOUL.
              </span>
            </h1>

            <p
              className={`text-lg md:text-2xl max-w-2xl font-medium leading-relaxed
              ${theme === "dark" ? "text-gray-300" : "text-gray-400"}`}
            >
              Pramay Agro brings sustainable, chemical-free farming directly to your table. Healthy food, happy planet.
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <Link to="/products">
                <button className="px-10 py-5 bg-green-500 text-white font-black rounded-full uppercase text-xs tracking-widest hover:bg-green-600 hover:scale-110 transition-all shadow-[0_0_50px_rgba(72,187,120,0.5)] flex items-center gap-3">
                  Start Shopping <ArrowRight size={20} />
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-1 h-12 bg-gradient-to-b from-green-400 to-transparent rounded-full" />
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative z-30 -mt-16 px-4 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Global Reach", value: 24, suffix: "+", icon: <Globe size={24} /> },
            { label: "Farmers Supported", value: 15000, suffix: "+", icon: <User size={24} /> },
            { label: "Water Saved", value: 50000, suffix: "L+", icon: <Droplet size={24} /> },
            { label: "Soil Regenerated", value: 100, suffix: "%", icon: <Leaf size={24} /> },
          ].map((stat, i) => (
            <div
              key={i}
              className={`group relative p-8 rounded-[2.5rem] shadow-2xl border transition-all hover:-translate-y-3
              ${theme === "dark"
                ? "bg-zinc-900/90 border-white/10 hover:shadow-green-500/30"
                : "bg-white/95 border-slate-100 hover:shadow-green-400/30"
              } backdrop-blur-2xl`}
            >
              <div className="w-14 h-14 flex items-center justify-center text-green-500 bg-green-500/10 rounded-2xl mb-6 group-hover:bg-green-500 group-hover:text-white transition-all">
                {stat.icon}
              </div>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter">
                <CountUp end={stat.value} duration={3} suffix={stat.suffix} />
              </h3>
              <p
                className={`text-xs font-bold uppercase tracking-widest mt-2
                ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BENTO GRID / WHY PRAMAYA */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">
                WHY <span className="text-green-500">CHOOSE US?</span>
              </h2>
              <p className={`font-bold uppercase tracking-widest text-sm 
                ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Bringing nature to your table.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {/* Large Card */}
            <div className={`md:col-span-2 p-12 rounded-[3rem] relative overflow-hidden group shadow-2xl transition-all
              ${theme === "dark" ? "bg-gradient-to-tr from-green-700 to-teal-800 text-white" : "bg-gradient-to-tr from-green-400 to-emerald-400 text-white"}`}>
              <Leaf className="absolute -right-10 -bottom-10 text-white/10 scale-[5]" />
              <h3 className="text-4xl font-black mb-6">Sustainable by Nature</h3>
              <p className="text-lg font-bold opacity-90 max-w-md">
                Every product supports regenerative farming and a healthier planet.
              </p>
              <div className="mt-10 w-20 h-2 bg-white rounded-full" />
            </div>

            {/* Small Cards */}
            <div className={`p-10 rounded-[3rem] shadow-xl transition-transform hover:-translate-y-2
              ${theme === "dark" ? "bg-zinc-900 border-white/10 text-gray-300" : "bg-white border-gray-200 text-gray-900"} border`}>
              <h3 className="text-2xl font-black mb-4 text-green-500">Smart Farming</h3>
              <p className="text-sm leading-relaxed font-medium">
                IoT sensors track water usage, growth, and yield to optimize organic farming sustainably.
              </p>
            </div>

            <div className={`p-10 rounded-[3rem] shadow-2xl transition-all relative overflow-hidden
              ${theme === "dark" ? "bg-green-800 text-white" : "bg-green-700 text-white"}`}>
              <div className="absolute inset-0 bg-green-500/10 group-hover:bg-green-500/20 transition-all rounded-[3rem]" />
              <h3 className="text-2xl font-black relative z-10">100% Traceable</h3>
              <p className="text-sm font-medium mt-4 relative z-10">
                Scan any product to see the farm, farmer, and harvest date.
              </p>
              <div className="mt-8 flex gap-2 relative z-10">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest">Live Updates</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className={`py-24 md:py-32 transition-colors duration-500 rounded-[3rem] md:rounded-[5rem] mx-4 md:mx-10 border shadow-inner
        ${theme === "dark" ? "bg-emerald-950/5 border-white/10" : "bg-[#f7f2eb] border-gray-200"}`}>
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="space-y-3">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none z-10 relative">
                FEATURED<br/>
                <span className="text-green-500">PRODUCTS</span>
              </h2>
              <div className="h-1.5 w-24 bg-green-500 rounded-full"></div>
            </div>

            <Link to="/products" className="group flex-shrink-0">
              <button className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl shadow-sm transition-all duration-300
                ${theme === "dark" ? "bg-zinc-900 border border-white/10 text-green-400 hover:shadow-green-500/20" 
                  : "bg-white border border-gray-200 text-green-600 hover:shadow-green-400/30"}`}>
                View All Products
                <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            {featuredProducts.map((product) => (
              <div key={product.id} className={`group relative p-5 rounded-[2.5rem] overflow-hidden border transition-all duration-500 shadow-xl hover:-translate-y-3 hover:shadow-green-500/20
                ${theme === "dark" ? "bg-zinc-950 border-white/10" : "bg-white border-gray-200"}`}>
                <div className="h-60 rounded-[2rem] overflow-hidden relative mb-6">
                  <img
                    src={product.image || "https://via.placeholder.com/300"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                </div>

                <div className="px-3 pb-3">
                  <h3 className={`font-extrabold text-lg md:text-xl mb-2 transition-colors
                    ${theme === "dark" ? "text-white group-hover:text-green-500" : "text-gray-800 group-hover:text-green-500"}`}>
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-end mt-4">
                    <span className={`text-3xl font-black transition-colors
                      ${theme === "dark" ? "text-green-400" : "text-green-600"}`}>
                      ₹{product.price}
                    </span>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-40 relative px-6 text-center">
        <div className={`max-w-5xl mx-auto rounded-[4rem] py-24 relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.4)]
          ${theme === "dark" ? "bg-green-800 text-white" : "bg-green-700 text-white"}`}>
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-400/10 blur-[100px] rounded-full" />
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 px-4">
            JOIN THE <span className="text-green-300">ORGANIC REVOLUTION</span>
          </h2>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
            15,000+ people have already chosen chemical-free, healthy products. What are you waiting for?
          </p>
          <Link to="/signup">
            <button className="px-14 py-6 bg-green-400 text-white font-black rounded-full uppercase tracking-widest text-sm hover:bg-green-500 transition-all shadow-xl">
              Get Access Now
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}