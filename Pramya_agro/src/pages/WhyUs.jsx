"use client";

import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import home2 from "../assets/home2.png";
import farm from "../assets/farm.jpg";
import farm3 from "../assets/farm3.png";
import hydrop from "../assets/hydrop.png";

export default function WhyUs() {
  const { theme } = useTheme();

  const slides = [
    { img: home2, title: "Smart Farming", desc: "AI-powered hydroponics for precision growth." },
    { img: farm, title: "Organic Quality", desc: "100% chemical-free fresh produce." },
    { img: farm3, title: "Sustainable Future", desc: "Saving water and protecting nature." }
  ];

  const benefits = [
    "Chemical-Free Produce",
    "90% Less Water Usage",
    "Year-Round Farming",
    "High Yield Output",
  ];

  const testimonials = [
    { name: "Rahul Patil", text: "Best organic products. Super fresh!" },
    { name: "Sneha Joshi", text: "Hydroponics is the future. Loved it!" },
    { name: "Amit Kulkarni", text: "Amazing quality and taste." },
  ];

  const sectionBg = theme === "dark" ? "bg-[#030504] text-white" : "bg-gradient-to-br from-green-50 via-green-100 to-green-50 text-gray-900";

  return (
    <div className={`relative overflow-x-hidden transition-colors duration-500 ${sectionBg}`}>

      {/* 🌿 LIGHT MODE GREEN GLOW */}
      {theme !== "dark" && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-300/30 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-100px] right-[10%] w-[400px] h-[400px] bg-emerald-200/40 blur-[100px] rounded-full"></div>
        </div>
      )}

      {/* DARK MODE GLOW */}
      {theme === "dark" && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/20 blur-[200px] rounded-full"></div>
          <div className="absolute bottom-[-150px] right-[10%] w-[500px] h-[500px] bg-green-400/10 blur-[160px] rounded-full"></div>
        </div>
      )}

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className={`py-24 text-center relative z-10 ${theme !== "dark" ? "bg-gradient-to-br from-green-50 via-green-100 to-green-50" : ""}`}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold">
          Why Choose <span className="text-emerald-500">Pramay Agro</span>?
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-gray-400 dark:text-gray-400">
          Smart farming meets sustainability for a better future.
        </p>
      </motion.section>

      {/* SLIDER */}
      <section className={`max-w-6xl mx-auto px-4 pb-24 relative z-10 ${theme !== "dark" ? "bg-gradient-to-br from-green-50 via-green-100 to-green-50" : ""}`}>
        <Swiper modules={[Autoplay, Pagination]} autoplay pagination={{ clickable: true }} loop>
          {slides.map((s, i) => (
            <SwiperSlide key={i}>
              <motion.div whileHover={{ scale: 1.02 }} className="relative rounded-3xl overflow-hidden shadow-xl">
                <img src={s.img} className="w-full h-[400px] object-cover" />
                <div className={`absolute inset-0 flex justify-center items-center
                  ${theme === "dark" ? "bg-black/50" : "bg-gradient-to-t from-black/50 via-black/10 to-transparent"}`}>
                  <motion.div
                    whileHover={{ rotateY: 8, rotateX: 6, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 120 }}
                    className={`p-8 rounded-2xl text-center max-w-sm backdrop-blur-xl border shadow-2xl
                      ${theme === "dark" ? "bg-white/30 border-white/20" : "bg-white/70 border-green-100"}`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <h2 className="text-2xl font-bold text-emerald-500 drop-shadow-lg">{s.title}</h2>
                    <p className="mt-3 text-gray-400 dark:text-gray-700">{s.desc}</p>
                  </motion.div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* VALUE PROPS (LINEAR FLOATING CARDS) */}
      <section className={`py-24 text-center relative z-10 overflow-hidden ${theme !== "dark" ? "bg-gradient-to-br from-green-50 via-green-100 to-green-50" : ""}`}>
        <h2 className="text-3xl md:text-5xl font-bold mb-16">Value Proposition</h2>
        <div className="flex justify-center items-center flex-wrap gap-8 max-w-6xl mx-auto">
          {[
            { title: "Innovation", desc: "Advanced hydroponic systems." },
            { title: "Purity", desc: "Zero chemicals, 100% natural." },
            { title: "Sustainability", desc: "Eco-friendly farming methods." },
            { title: "Efficiency", desc: "High yield with minimal waste." },
            { title: "Technology", desc: "AI + IoT powered farming." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
              whileHover={{ scale: 1.1 }}
              className={`w-40 md:w-44 h-40 md:h-44 rounded-full p-6 flex flex-col justify-center items-center text-center
                border shadow-xl backdrop-blur-xl transition-all
                ${theme === "dark"
                  ? "bg-white/10 border-white/20 hover:border-emerald-400"
                  : "bg-white/90 border-green-100 hover:shadow-2xl"
                }`}
            >
              <h3 className="text-sm md:text-base font-bold text-emerald-500">{item.title}</h3>
              <p className="text-[10px] md:text-xs mt-1 text-gray-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section className={`py-24 text-center relative z-10 ${theme !== "dark" ? "bg-gradient-to-br from-green-50 via-green-100 to-green-50" : ""}`}>
        <h2 className="text-3xl md:text-5xl font-bold mb-16">Why It Matters</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.07 }}
              className={`p-6 rounded-2xl border backdrop-blur-xl transition-all
                ${theme === "dark"
                  ? "bg-white/5 border-white/10 hover:border-emerald-500/40"
                  : "bg-white border-gray-200 shadow-md hover:shadow-xl"
                }`}
            >
              <div className="text-emerald-500 text-2xl mb-3">🌱</div>
              <p className="font-semibold">{b}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FACILITIES & EXPERTISE */}
      <section className={`py-24 px-4 max-w-7xl mx-auto relative z-10 ${theme !== "dark" ? "bg-gradient-to-br from-green-50 via-green-100 to-green-50" : ""}`}>
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          Facilities & <span className="text-emerald-500">Expertise</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="relative">
            <img src={hydrop} alt="Hydroponic Facility" className="rounded-3xl w-full h-[400px] object-cover shadow-2xl" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/30 blur-3xl rounded-full"></div>
          </motion.div>
          <div className="space-y-6">
            {[
              { title: "Advanced Hydroponic Setup", desc: "State-of-the-art controlled environments for optimal growth." },
              { title: "Expert Agronomists", desc: "Team of experienced professionals ensuring quality and yield." },
              { title: "Smart Monitoring", desc: "Real-time nutrient and climate tracking using IoT systems." },
              { title: "Quality Assurance", desc: "Strict quality checks from seed to harvest." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-2xl border backdrop-blur-md transition-all
                  ${theme === "dark"
                    ? "bg-white/5 border-white/10 hover:border-emerald-500/40"
                    : "bg-white border-gray-200 shadow-md hover:shadow-lg"
                  }`}
              >
                <h3 className="text-lg font-bold text-emerald-500">{item.title}</h3>
                <p className="text-sm mt-2 text-gray-400 dark:text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FARM TO TABLE TIMELINE */}
      <section className={`py-24 px-4 max-w-6xl mx-auto relative z-10 ${theme !== "dark" ? "bg-gradient-to-br from-green-50 via-green-100 to-green-50" : ""}`}>
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-20">Farm to Table 🌱</h2>
        <div className="relative">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-full bg-emerald-500/30"></div>
          {["Seed Selection", "Smart Growth", "AI Monitoring", "Fresh Harvest", "Direct Delivery"].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`mb-16 flex items-center ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
            >
              <div className="w-[45%]"></div>
              <div className="relative z-10 w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-black shadow-lg">{i + 1}</div>
              <div className={`w-[45%] p-6 rounded-2xl backdrop-blur-md border transition-all
                ${theme === "dark" ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-md"}`}>
                <p className="font-semibold text-lg">{step}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className={`py-24 text-center relative z-10 ${theme !== "dark" ? "bg-gradient-to-br from-green-50 via-green-100 to-green-50" : ""}`}>
        <h2 className="text-3xl md:text-5xl font-bold mb-12">Testimonials</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 px-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-2xl border backdrop-blur-xl transition-all
                ${theme === "dark" ? "bg-white/5 border-white/10 hover:border-emerald-500/40" : "bg-white border-gray-200 shadow-md hover:shadow-xl"}`}
            >
              <p className="italic">“{t.text}”</p>
              <h4 className="mt-4 text-emerald-500 font-bold">{t.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={`py-24 text-center relative z-10 ${theme !== "dark" ? "bg-gradient-to-br from-green-50 via-green-100 to-green-50" : ""}`}>
        <h2 className="text-4xl font-bold mb-4">Experience Smart Farming</h2>
        <p className="mb-8 text-gray-500 dark:text-gray-400">Join Pramay Agro and embrace the future.</p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className={`px-10 py-4 rounded-full font-bold transition-all shadow-lg
            ${theme === "dark" ? "bg-emerald-500 text-black hover:bg-emerald-400" : "bg-green-600 text-white hover:bg-green-500"}`}
        >
          Get Started
        </motion.button>
      </section>

    </div>
  );
}