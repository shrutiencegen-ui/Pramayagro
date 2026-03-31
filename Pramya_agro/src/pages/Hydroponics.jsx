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

import hydro1 from "../assets/hydroponic1.png";
import hydro2 from "../assets/nft.png";
import hydro3 from "../assets/hydro3.png";

export default function HydroponicsPage() {
  const { theme } = useTheme();
  const hydroImages = [hydro1, hydro2, hydro3];

  const systems = [
    {
      name: "NFT (Nutrient Film Technique)",
      desc: "Thin nutrient solution flows continuously over roots for constant feeding.",
      icon: <Sprout size={20} className="animate-bounce text-emerald-400" />,
      colorLight: "from-emerald-300 via-emerald-400 to-emerald-500",
      colorDark: "from-emerald-700 via-emerald-600 to-emerald-500",
    },
    {
      name: "DWC (Deep Water Culture)",
      desc: "Roots submerged in oxygenated nutrient solution for rapid growth.",
      icon: <Sprout size={20} className="animate-pulse text-blue-400" />,
      colorLight: "from-blue-300 via-blue-400 to-blue-500",
      colorDark: "from-blue-700 via-blue-600 to-blue-500",
    },
    {
      name: "Aeroponics",
      desc: "Roots are misted with nutrients for maximum oxygen absorption.",
      icon: <Sprout size={20} className="animate-spin-slow text-purple-400" />,
      colorLight: "from-purple-300 via-pink-300 to-purple-400",
      colorDark: "from-purple-700 via-pink-500 to-purple-600",
    },
    {
      name: "Ebb & Flow",
      desc: "Floods roots periodically to mimic natural cycles.",
      icon: <Sprout size={20} className="animate-bounce-slow text-pink-400" />,
      colorLight: "from-pink-300 via-red-300 to-pink-400",
      colorDark: "from-pink-700 via-red-500 to-pink-600",
    },
  ];

  const [activeSystem, setActiveSystem] = useState(systems[0]);

  const benefits = [
    { title: "Water Efficient", desc: "Uses up to 90% less water than traditional farming.", icon: <Zap size={24} /> },
    { title: "Space Saving", desc: "Vertical and compact setups maximize growing area.", icon: <Globe size={24} /> },
    { title: "Faster Growth", desc: "Nutrients directly feed plants for rapid growth.", icon: <User size={24} /> },
    { title: "Pest Reduction", desc: "No soil means fewer pests and diseases.", icon: <Sprout size={24} /> },
  ];

  return (
    <div className={`relative overflow-x-hidden transition-colors duration-700 selection:bg-green-400 selection:text-white
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
          {hydroImages.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full overflow-hidden">
                <img src={img} alt="Hydroponics Setup" className="w-full h-full object-cover" />
                <div className={`absolute inset-0 transition-colors duration-500
                  ${theme === "dark" ? "bg-[#020403]/60" : "bg-green-100/30"}`} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
          <div className="max-w-3xl text-center space-y-6">
            <div className={`bg-white/10 backdrop-blur-md px-6 py-6 rounded-2xl border shadow-lg transition-colors duration-700
              ${theme === "dark" ? "border-white/10" : "border-emerald-200/40"}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border text-emerald-400 text-xs font-bold uppercase">
                <Sprout size={14} /> Smart Hydroponics
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mt-4">
                <span className={theme === "dark" ? "text-white" : "text-black/90"}>HYDROPONIC</span>
                <span className="block bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-700 bg-clip-text text-transparent">
                  SMART GROWTH
                </span>
              </h1>

              <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} mt-4`}>
                Soil-less farming that saves water, space, and time while maximizing yield.
              </p>

              <Link to="/contact">
               <div className="flex justify-center">
  <button
    className={`mt-6 px-6 py-3 md:px-8 md:py-4 font-bold text-sm rounded-full uppercase tracking-widest shadow-lg transition-all flex items-center gap-2
    ${
      theme === "dark"
        ? "bg-emerald-600 text-white hover:bg-emerald-500 hover:shadow-emerald-500/50"
        : "bg-emerald-500 text-black hover:bg-emerald-400 hover:shadow-emerald-500/50"
    }`}
  >
    Get Started <ArrowRight size={16} />
  </button>
</div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS HYDROPONICS */}
      <motion.section
        className={`py-20 md:py-28 px-4 text-center max-w-4xl mx-auto rounded-2xl shadow-lg transition-colors duration-700
          ${theme === "dark" ? "bg-[#111] border-none" : "bg-white/10 border border-emerald-200"}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6">What is Hydroponics?</h2>
        <p className={theme === "dark" ? "text-gray-300" : "text-gray-800"}>
          Hydroponics is a method of growing plants without soil, using nutrient-rich water solutions. 
          It allows faster growth, efficient use of water, and the ability to grow crops year-round.
        </p>
      </motion.section>

      {/* HYDROPONIC SYSTEMS */}
      <motion.section
        className="py-20 md:py-28 px-4 max-w-7xl mx-auto text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-12">Hydroponic Systems</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {systems.map((sys, idx) => (
            <motion.div
              key={idx}
              onMouseEnter={() => setActiveSystem(sys)}
              whileHover={{ scale: 1.05 }}
              className={`relative rounded-2xl p-6 border shadow-lg cursor-pointer transition-all
                ${theme === "dark"
                  ? "border-white/10 bg-gradient-to-br " + sys.colorDark
                  : "border-emerald-200 bg-gradient-to-br " + sys.colorLight}`}
            >
              <div className="flex flex-col items-center justify-center space-y-4 text-white">
                <div className="w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full border shadow-md">
                  {sys.icon}
                </div>
                <h3 className="font-bold text-lg">{sys.name}</h3>
                <p className="text-sm">{sys.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ACTIVE SYSTEM DETAIL */}
        <motion.div
          className={`mt-12 p-6 md:p-10 rounded-2xl border shadow-lg transition-colors duration-700
            ${theme === "dark" ? "bg-[#111] border-emerald-400/20 text-gray-300" : "bg-white/10 border-emerald-200 text-gray-800"}`}
        >
          <h3 className="text-2xl font-bold text-emerald-400">{activeSystem.name}</h3>
          <p className="mt-2">{activeSystem.desc}</p>
        </motion.div>
      </motion.section>

      {/* BENEFITS */}
      <motion.section
        className={`py-20 md:py-28 px-4 rounded-2xl shadow-lg my-12 transition-colors duration-700
          ${theme === "dark" ? "bg-[#111]" : "bg-white/10 border border-emerald-100"}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto text-center space-y-12 md:space-y-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Benefits of Hydroponics
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
      {/* VIDEO */} 
      <motion.section className="py-20 md:py-28 px-4 text-center" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} > <h2 className="text-3xl md:text-5xl font-bold mb-6">
        See Hydroponics in Action</h2>
         <div className="max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-lg"> 
         <iframe className="w-full h-full" src="https://www.youtube.com/embed/O-RgZ4z1jos" title="Hydroponics Tutorial" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div> 
          </motion.section>
          {/* CTA */} <motion.section className="py-20 md:py-28 text-center px-4" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} > <h2 className="text-3xl md:text-5xl font-bold mb-4">Start Your Hydroponic Journey</h2> <p className="text-gray-400 mb-8 md:mb-10 text-base md:text-lg"> Join thousands adopting smart, sustainable farming techniques today. </p> <Link to="/contact"> <button className="px-8 py-3 md:px-10 md:py-4 bg-emerald-500 text-black rounded-full font-bold hover:bg-emerald-400 shadow-lg hover:shadow-emerald-500/50 transition-all"> Contact Us </button> </Link> </motion.section>

    </div>
  );
}