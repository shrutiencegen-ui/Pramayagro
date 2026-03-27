"use client";

import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

// Improved blog data
const blogs = [
  {
    id: 1,
    title: "Sustainable Hydroponics Practices",
    desc: "Learn eco-friendly hydroponic methods to grow more with less water and zero soil.",
    category: "Hydroponics",
    img: "https://images.unsplash.com/photo-1602524201225-f4d70bba19b6",
    link: "/blogs/1",
  },
  {
    id: 2,
    title: "Organic Farming Tips for Beginners",
    desc: "Start your organic journey with simple, effective and chemical-free farming techniques.",
    category: "Organic",
    img: "https://images.unsplash.com/photo-1598257007073-1a4f6c7112b0",
    link: "/blogs/2",
  },
  {
    id: 3,
    title: "Maximizing Growth in Vertical Farms",
    desc: "Use vertical farming to boost yield in limited space with smart hydroponic systems.",
    category: "Vertical Farming",
    img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc",
    link: "/blogs/3",
  },
  {
    id: 4,
    title: "Smart IoT Sensors for Farms",
    desc: "Monitor crops in real-time using smart sensors and AI-driven farming insights.",
    category: "Smart Farming",
    img: "https://images.unsplash.com/photo-1617196038000-8121f7f1f7a1",
    link: "/blogs/4",
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
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/80 to-green-400/70 blur-2xl"></div>

        <div className="relative max-w-5xl mx-auto text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
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
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group relative rounded-3xl overflow-hidden"
          >

            {/* CARD */}
            <div className={`h-full backdrop-blur-xl border transition-all duration-500
              ${theme === "dark"
                ? "bg-white/5 border-white/10 hover:border-emerald-500/50"
                : "bg-white border-gray-200 hover:border-green-400"
              }
              hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]`}>

              {/* IMAGE */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={`${blog.img}?auto=format&fit=crop&w=800&q=80`}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                {/* CATEGORY TAG */}
                <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold bg-emerald-500 text-black rounded-full shadow">
                  {blog.category}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-6 flex flex-col justify-between h-full">
                <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition">
                  {blog.title}
                </h3>

                <p className={`text-sm mb-4 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}>
                  {blog.desc}
                </p>

                <Link
                  to={blog.link}
                  className="mt-auto inline-flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition"
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
        <div className={`max-w-4xl mx-auto p-10 rounded-3xl backdrop-blur-xl border
          ${theme === "dark"
            ? "bg-white/5 border-white/10"
            : "bg-white border-gray-200"
          } shadow-lg`}>

          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Grow Smarter with Us 🌱
          </h2>

          <p className="mb-8 text-lg">
            Stay updated with modern farming trends, organic techniques, and hydroponic innovations.
          </p>

          <Link to="/signup">
            <button className="px-10 py-4 bg-emerald-500 text-black font-bold rounded-full hover:bg-emerald-400 shadow-lg hover:shadow-emerald-500/50 transition-all">
              Subscribe Now
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}