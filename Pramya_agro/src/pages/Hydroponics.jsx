"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Sprout, Zap, Globe, User, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import { useTheme } from "../context/ThemeContext";


import pestImg from "../assets/pesticides.png";
import soilImg from "../assets/soil.png";
import cropImg from "../assets/hydroponic1.png";

export default function AgroProductsPage() {
  const { theme } = useTheme();
  const productImages = [pestImg, soilImg, cropImg];

  const products = [
    {
      name: "Organic Fertilizers",
      desc: "Boost soil fertility naturally and sustainably.",
      icon: <Sprout size={20} className="animate-bounce text-emerald-400" />,
      colorLight: "from-emerald-300 via-emerald-400 to-emerald-500",
      colorDark: "from-emerald-700 via-emerald-600 to-emerald-500",
    },
    {
      name: "Eco-Friendly Pesticides",
      desc: "Protect crops using safe, chemical-free solutions.",
      icon: <Sprout size={20} className="animate-pulse text-yellow-400" />,
      colorLight: "from-yellow-300 via-yellow-400 to-yellow-500",
      colorDark: "from-yellow-700 via-yellow-600 to-yellow-500",
    },
    {
      name: "Soil Enhancers",
      desc: "Improve soil structure and nutrient retention naturally.",
      icon: <Sprout size={20} className="animate-spin-slow text-purple-400" />,
      colorLight: "from-purple-300 via-pink-300 to-purple-400",
      colorDark: "from-purple-700 via-pink-500 to-purple-600",
    },
    {
      name: "Crop Growth Boosters",
      desc: "Maximize crop yield with balanced nutrient solutions.",
      icon: <Sprout size={20} className="animate-bounce-slow text-pink-400" />,
      colorLight: "from-pink-300 via-red-300 to-pink-400",
      colorDark: "from-pink-700 via-red-500 to-pink-600",
    },
  ];

  const [activeProduct, setActiveProduct] = useState(products[0]);

  const benefits = [
    { title: "Sustainable", desc: "Eco-conscious solutions for long-term productivity.", icon: <Zap size={24} /> },
    { title: "Efficient", desc: "Optimized nutrient delivery for faster growth.", icon: <Globe size={24} /> },
    { title: "Safe", desc: "Chemical-free for farmers and consumers.", icon: <User size={24} /> },
    { title: "High Yield", desc: "Improved crop output with balanced solutions.", icon: <Sprout size={24} /> },
  ];

  return (
    <div className={`relative overflow-x-hidden transition-colors duration-700
      ${theme === "dark" ? "bg-[#020403] text-white" : "bg-[#FAF6F0] text-gray-900"}`}>

      {/* HERO */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          loop
          className="absolute inset-0 w-full h-full"
        >
          {productImages.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full overflow-hidden">
                <img src={img} alt="Agro Product" className="w-full h-full object-cover scale-105" />
                <div className={`absolute inset-0 transition-colors duration-500
                  ${theme === "dark" ? "bg-[#020403]/60" : "bg-green-100/30"}`} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

       <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4">
  <div className="max-w-3xl text-center space-y-6">
    <motion.div 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.7 }}
      className={`bg-white/10 backdrop-blur-md px-6 py-6 rounded-2xl border shadow-lg transition-colors duration-700
        ${theme === "dark" ? "border-white/10" : "border-emerald-200/40"}`}
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border text-emerald-400 text-xs font-bold uppercase">
        <Sprout size={14} /> Smart Agro Products
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mt-4">
        <span className={theme === "dark" ? "text-white" : "text-black/90"}>BOOST YOUR</span>
        <span className="block bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-700 bg-clip-text text-transparent">
          FARM YIELD
        </span>
      </h1>

      <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} mt-4`}>
        Organic fertilizers, eco-friendly pesticides, and soil enhancers for modern sustainable agriculture.
      </p>

      {/* CENTERED BUTTON */}
      <Link to="/contact" className="flex justify-center mt-6">
        <button className={`px-6 py-3 md:px-8 md:py-4 font-bold text-sm rounded-full uppercase tracking-widest shadow-lg transition-all flex items-center gap-2
          ${theme === "dark" ? "bg-emerald-600 text-white hover:bg-emerald-500 hover:shadow-emerald-500/50" : "bg-emerald-500 text-black hover:bg-emerald-400 hover:shadow-emerald-500/50"}`}
        >
          Get Started <ArrowRight size={16} />
        </button>
      </Link>
    </motion.div>
  </div>
</div>
      </section>

      {/* PRODUCT TYPES */}
      <motion.section className="py-20 md:py-28 px-4 max-w-7xl mx-auto text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <h2 className="text-3xl md:text-5xl font-bold mb-12">Our Products</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((prod, idx) => (
            <motion.div
              key={idx}
              onMouseEnter={() => setActiveProduct(prod)}
              whileHover={{ scale: 1.05 }}
              className={`relative rounded-2xl p-6 border shadow-lg cursor-pointer transition-all
                ${theme === "dark" ? "border-white/10 bg-gradient-to-br " + prod.colorDark : "border-emerald-200 bg-gradient-to-br " + prod.colorLight}`}
            >
              <div className="flex flex-col items-center justify-center space-y-4 text-white">
                <div className="w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full border shadow-md">
                  {prod.icon}
                </div>
                <h3 className="font-bold text-lg">{prod.name}</h3>
                <p className="text-sm">{prod.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className={`mt-12 p-6 md:p-10 rounded-2xl border shadow-lg transition-colors duration-700
            ${theme === "dark" ? "bg-[#111] border-emerald-400/20 text-gray-300" : "bg-white/10 border-emerald-200 text-gray-800"}`}>
          <h3 className="text-2xl font-bold text-emerald-400">{activeProduct.name}</h3>
          <p className="mt-2">{activeProduct.desc}</p>
        </motion.div>
      </motion.section>

      {/* BENEFITS */}
      <motion.section className={`py-20 md:py-28 px-4 rounded-2xl shadow-lg my-12 transition-colors duration-700
          ${theme === "dark" ? "bg-[#111]" : "bg-white/10 border border-emerald-100"}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto text-center space-y-12 md:space-y-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Why Choose Our Products
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                className={`relative group p-6 rounded-2xl border shadow-md hover:-translate-y-2 transition-all duration-500
                  ${theme === "dark" ? "bg-[#222] border-emerald-400/20" : "bg-white/20 border-emerald-200"}`}
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl bg-emerald-400/10 transition"></div>
                <div className="relative z-10">
                  <div className="mb-4 w-12 h-12 mx-auto flex items-center justify-center text-emerald-500">
                    {b.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">{b.title}</h3>
                  <p className="text-sm">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA */}
    <motion.section
  className="py-20 md:py-28 text-center px-4"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
  <div
    className={`max-w-4xl mx-auto rounded-[3rem] py-20 relative overflow-hidden shadow-lg
      ${
        theme === "dark"
          ? "bg-gradient-to-r from-emerald-700 via-green-600 to-emerald-500 text-white"
          : "bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 text-black"
      }`}
  >
    {/* Optional decorative blur circle */}
    <div className="absolute top-0 right-0 w-72 h-72 bg-green-400/10 blur-[80px] rounded-full" />

    <h2 className="text-3xl md:text-5xl font-bold mb-4">
      Get Started with Our Products
    </h2>
    <p className="text-gray-100 md:text-gray-200 mb-8 md:mb-10 text-base md:text-lg">
      Join thousands of farmers improving yield sustainably.
    </p>
    <Link to="/contact" className="inline-block">
      <button className="px-10 py-4 md:px-12 md:py-5 bg-white/90 text-black rounded-full font-bold hover:bg-white/100 shadow-lg hover:shadow-emerald-500/50 transition-all">
        Contact Us
      </button>
    </Link>
  </div>
</motion.section>
    </div>
  );
}