"use client";

import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import hydroponicImg from "../assets/hydroponic1.png";
import organicImg from "../assets/organic.png";
import verticalImg from "../assets/vertical.png";
import iotImg from "../assets/iot.png";

// Use local images stored in public/assets/blogs
const blogs = [
  {
    id: 1,
    title: "Sustainable Hydroponics Practices",
    desc: "Learn eco-friendly hydroponic methods to grow more with less water and zero soil.",
    category: "Hydroponics",
    img: hydroponicImg,
    
  },
  {
    id: 2,
    title: "Organic Farming Tips for Beginners",
    desc: "Start your organic journey with simple, effective, and chemical-free farming techniques.",
    category: "Organic",
    img: organicImg,
    
  },
  {
    id: 3,
    title: "Maximizing Growth in Vertical Farms",
    desc: "Use vertical farming to boost yield in limited space with smart hydroponic systems.",
    category: "Vertical Farming",
    img: verticalImg,
  
  },
  {
    id: 4,
    title: "Smart IoT Sensors for Farms",
    desc: "Monitor crops in real-time using smart sensors and AI-driven farming insights.",
    category: "Smart Farming",
    img: iotImg,
    
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
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-700/80 to-green-400/60 blur-2xl"></div>

        <div className="relative max-w-5xl mx-auto text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-xl">
            Organic Insights 🌿
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90">
            Smart hydroponics, organic farming & sustainable agriculture knowledge hub.
          </p>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid sm:grid-cols-2 md:grid-cols-3 gap-10">
        {blogs.map((blog, i) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            viewport={{ once: true }}
            className="group relative rounded-3xl overflow-hidden"
          >
            {/* CARD */}
            <div
              className={`h-full border transition-all duration-500 rounded-3xl shadow-lg
              ${theme === "dark"
                ? "bg-gradient-to-br from-white/5 via-white/3 to-white/5 border-white/10 hover:border-emerald-400/50"
                : "bg-white border-gray-200 hover:border-green-400"
              } hover:shadow-2xl`}
            >
              {/* IMAGE */}
              <div className="relative h-64 overflow-hidden rounded-t-3xl">
                <img
                  src={blog.img}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
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
                  to={blog.link}
                  className="mt-auto inline-flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-emerald-500 hover:text-emerald-400 transition-colors"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-6">
        <div
          className={`max-w-4xl mx-auto p-12 rounded-3xl backdrop-blur-xl border shadow-lg
          ${theme === "dark"
            ? "bg-white/5 border-white/10"
            : "bg-white border-gray-200"
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Grow Smarter with Us 🌱
          </h2>
          <p className="mb-8 text-lg">
            Stay updated with modern farming trends, organic techniques, and hydroponic innovations.
          </p>
          <Link to="/signup">
            <button className="px-12 py-4 bg-emerald-500 text-black font-bold rounded-full hover:bg-emerald-400 shadow-lg hover:shadow-emerald-500/50 transition-all">
              Subscribe Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}