"use client";

import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

// Example blog data
const blogs = [
  {
    id: 1,
    title: "Sustainable Hydroponics Practices",
    desc: "Learn how hydroponics can save water and space while boosting crop yield sustainably.",
    img: "https://images.unsplash.com/photo-1602524201225-f4d70bba19b6?auto=format&fit=crop&w=800&q=80",
    link: "/blogs/1",
  },
  {
    id: 2,
    title: "Organic Farming Tips for Beginners",
    desc: "Step-by-step guide to start your organic farm and grow fresh, chemical-free produce.",
    img: "https://images.unsplash.com/photo-1598257007073-1a4f6c7112b0?auto=format&fit=crop&w=800&q=80",
    link: "/blogs/2",
  },
  {
    id: 3,
    title: "Maximizing Growth in Vertical Farms",
    desc: "Techniques to efficiently use vertical space for high-yield hydroponic farming.",
    img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    link: "/blogs/3",
  },
  {
    id: 4,
    title: "Smart IoT Sensors for Farms",
    desc: "Discover how IoT sensors monitor and optimize plant growth automatically.",
    img: "https://images.unsplash.com/photo-1617196038000-8121f7f1f7a1?auto=format&fit=crop&w=800&q=80",
    link: "/blogs/4",
  },
];

export default function Blogs() {
  const { theme } = useTheme();

  return (
    <div
      className={`relative min-h-screen transition-colors duration-700 selection:bg-green-400 selection:text-white
      ${theme === "dark" ? "bg-[#030504] text-white" : "bg-[#FAF6F0] text-gray-900"}`}
    >
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-r from-emerald-500 to-teal-400">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            Our Blogs
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90">
            Insights, tips, and guides on smart hydroponics, organic farming, and sustainable agriculture.
          </p>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className={`rounded-3xl overflow-hidden shadow-xl transition-all hover:scale-105 ${
              theme === "dark"
                ? "bg-zinc-900 border border-white/10"
                : "bg-white border border-gray-200"
            }`}
          >
            <div className="h-48 w-full overflow-hidden">
              <img
                src={blog.img}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            <div className="p-6 flex flex-col justify-between h-full">
              <h3
                className={`text-xl font-bold mb-2 transition-colors ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {blog.title}
              </h3>
              <p className={`text-sm mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                {blog.desc}
              </p>
              <Link
                to={blog.link}
                className={`inline-block mt-auto font-bold text-sm uppercase tracking-wider transition-colors ${
                  theme === "dark"
                    ? "text-emerald-400 hover:text-emerald-200"
                    : "text-green-600 hover:text-green-400"
                }`}
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section
        className={`py-20 px-6 text-center rounded-3xl mx-6 mb-20 shadow-lg transition-colors duration-700 ${
          theme === "dark" ? "bg-green-800 text-white" : "bg-green-100 text-gray-900"
        }`}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Stay Updated with Our Blogs
        </h2>
        <p className="mb-8 text-lg md:text-xl">
          Learn tips, techniques, and insights to make your farming smarter and sustainable.
        </p>
        <Link to="/signup">
          <button className="px-10 py-4 bg-emerald-500 text-black font-bold rounded-full hover:bg-emerald-400 shadow-lg transition-all">
            Subscribe Now
          </button>
        </Link>
      </section>
    </div>
  );
}