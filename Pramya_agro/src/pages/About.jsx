"use client";

import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

export default function AboutUs() {
  const { theme } = useTheme();

  const team = [
    { name: "Pramod Patil", role: "Head of AgroChem Research", image: "/images/pramod.jpg" },
    { name: "Sneha Kulkarni", role: "Sales & Marketing Lead", image: "/images/sneha.jpg" },
    { name: "Rohit Deshmukh", role: "Sustainability Officer", image: "/images/rohit.jpg" },
  ];

  const sectionBg = theme === "dark" ? "bg-[#0b0f0d] text-white" : "bg-gradient-to-br from-green-50 via-green-100 to-green-50 text-gray-900";

  return (
    <div className={`transition-colors duration-500 ${sectionBg}`}>

      {/* HERO */}
      <section className="relative h-[85vh] flex items-center">
        <img
          src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold leading-tight"
          >
            Pramay Agro
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-lg md:text-xl text-gray-200 dark:text-gray-300 max-w-xl"
          >
            Delivering advanced fertilizers and crop protection solutions
            to empower modern agriculture.
          </motion.p>
        </div>
      </section>

      {/* STORY + STATS */}
      <section className={`max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center
        ${theme !== "dark" ? "bg-gradient-to-br from-green-50 via-green-100 to-green-50" : ""}`}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-4xl font-bold mb-6">Who We Are</h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-500">
            Pramay Agro is a leading provider of fertilizers and pesticides,
            focused on increasing crop productivity while maintaining soil health.
            Our science-driven approach ensures sustainable and efficient farming.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex justify-between text-center"
        >
          {[
            { value: "500+", label: "Farmers" },
            { value: "100+", label: "Products" },
            { value: "10+", label: "Years" },
          ].map((item, i) => (
            <div key={i}>
              <h3 className="text-3xl font-bold text-emerald-500">{item.value}</h3>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-500">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* MISSION / VISION TIMELINE */}
      <section className={`max-w-6xl mx-auto px-6 py-24
        ${theme !== "dark" ? "bg-gradient-to-br from-green-50 via-green-100 to-green-50" : ""}`}>
        <h2 className="text-4xl font-bold mb-16 text-center">Our Foundation</h2>

        <div className="relative border-l-2 border-emerald-400 pl-10 space-y-16">
          {[
            { title: "Mission", desc: "Deliver high-quality fertilizers and pest solutions to improve crop yield." },
            { title: "Vision", desc: "Become a leader in sustainable and innovative agriculture solutions." },
            { title: "Values", desc: "Integrity, innovation, farmer-first approach, and sustainability." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="relative"
            >
              <div className="absolute -left-[22px] top-2 w-4 h-4 bg-emerald-400 rounded-full"></div>
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className={`py-24 ${theme !== "dark" ? "bg-gradient-to-br from-green-50 via-green-100 to-green-50" : "bg-[#111314]"}`}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 text-center">Leadership Team</h2>

          <div className="space-y-12">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex items-center gap-6 group"
              >
                <img src={member.image} className="w-20 h-20 rounded-full object-cover" />
                <div className="flex-1 border-b pb-4 group-hover:border-emerald-400 transition">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-gray-700 dark:text-gray-400">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-24 text-center text-white
        ${theme !== "dark" ? "bg-gradient-to-r from-emerald-500 to-teal-400" : "bg-emerald-600"}`}>
        <h2 className="text-4xl font-bold mb-6">Partner With Us</h2>
        <p className="mb-8 text-gray-100 dark:text-gray-200">Explore our range of fertilizers and crop protection solutions.</p>
        <a
          href="/products"
          className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition"
        >
          Explore Products
        </a>
      </section>

    </div>
  );
}