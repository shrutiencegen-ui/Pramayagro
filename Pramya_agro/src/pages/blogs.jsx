"use client";

import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import fertilizerImg from "../assets/fertilizers.png";
import pesticideImg from "../assets/pesticides.png";
import soilImg from "../assets/soil.png";
import growthImg from "../assets/growth.jpg";

const blogs = [
  {
    id: 1,
    title: "Eco-Friendly Fertilizer Tips",
    desc: "Maximize yield and maintain soil health using sustainable fertilizer practices.",
    category: "Fertilizers",
    img: fertilizerImg,
  },
  {
    id: 2,
    title: "Effective Pest Control Solutions",
    desc: "Protect crops with safe, eco-conscious pesticides for chemical-free farming.",
    category: "Pesticides",
    img: pesticideImg,
  },
  {
    id: 3,
    title: "Soil Health & Regeneration",
    desc: "Boost soil fertility naturally to achieve consistent, healthy crops.",
    category: "Soil Care",
    img: soilImg,
  },
  {
    id: 4,
    title: "Maximizing Crop Growth",
    desc: "Use data-driven methods and organic techniques to improve yield.",
    category: "Crop Growth",
    img: growthImg,
  },
];

export default function Blogs() {
  const { theme } = useTheme();

  return (
    <div
      className={`relative min-h-screen transition-colors duration-700
      ${theme === "dark" ? "bg-[#030504] text-white" : "bg-[#FAF6F0] text-gray-900"}`}
    >
      {/* HERO */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-700/80 to-green-400/60 blur-3xl animate-blob-slow"></div>

        <div className="relative max-w-5xl mx-auto text-center px-6 z-10">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-2xl"
          >
            Agro Knowledge Hub 🌿
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-lg md:text-xl text-white/90"
          >
            Fertilizers, pest management, soil care & crop growth insights for modern farmers.
          </motion.p>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid sm:grid-cols-2 md:grid-cols-3 gap-10">
        {blogs.map((blog, i) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.15, type: "spring", stiffness: 120 }}
            viewport={{ once: true }}
            className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-emerald-400/40 transition-all duration-500"
          >
            {/* CARD */}
            <div
              className={`h-full border rounded-3xl overflow-hidden relative transition-all duration-500
              ${theme === "dark"
                ? "bg-gradient-to-br from-white/5 via-white/3 to-white/5 border-white/10 hover:border-emerald-400/50"
                : "bg-white border-gray-200 hover:border-green-400"
              }`}
            >
              {/* IMAGE */}
              <div className="relative h-64 overflow-hidden rounded-t-3xl">
                <img
                  src={blog.img}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                {/* CATEGORY TAG */}
                <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold bg-emerald-500 text-black rounded-full shadow-md">
                  {blog.category}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-6 flex flex-col justify-between h-full">
                <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-400 transition-colors">
                  {blog.title}
                </h3>
                <p className={`text-sm mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  {blog.desc}
                </p>
                <Link
                  to={`/blogs/${blog.id}`}
                  className="mt-auto inline-flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-emerald-500 hover:text-emerald-400 transition-colors"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* PREMIUM CTA */}
      <section className="py-24 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className={`max-w-4xl mx-auto p-12 rounded-3xl backdrop-blur-xl border shadow-2xl
          ${theme === "dark"
            ? "bg-white/5 border-white/10"
            : "bg-white border-gray-200"
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Level Up Your Farming 🌱
          </h2>
          <p className="mb-8 text-lg">
            Subscribe for premium guides, expert tips on fertilizers, pest control, and sustainable agriculture.
          </p>
          <Link to="/register">
            <button className="px-12 py-4 bg-emerald-500 text-black font-bold rounded-full hover:bg-emerald-400 shadow-lg hover:shadow-emerald-500/50 transition-all transform hover:-translate-y-1">
              Subscribe Now
            </button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}