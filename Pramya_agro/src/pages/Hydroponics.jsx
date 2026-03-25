import { useState } from "react";
import { Link } from "react-router-dom";
import { Sprout, Zap, Globe, User, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import hydro1 from "../assets/hydroponic1.png";
import hydro2 from "../assets/nft.png";
import hydro3 from "../assets/hydro3.png";

export default function HydroponicsPage() {
  const hydroImages = [hydro1, hydro2, hydro3];

  const systems = [
    {
      name: "NFT (Nutrient Film Technique)",
      desc: "Thin nutrient solution flows continuously over roots for constant feeding.",
      icon: <Sprout size={20} className="animate-bounce text-emerald-400" />,
      color: "from-emerald-500 via-green-400 to-emerald-600",
    },
    {
      name: "DWC (Deep Water Culture)",
      desc: "Roots submerged in oxygenated nutrient solution for rapid growth.",
      icon: <Sprout size={20} className="animate-pulse text-blue-400" />,
      color: "from-blue-500 via-blue-400 to-cyan-500",
    },
    {
      name: "Aeroponics",
      desc: "Roots are misted with nutrients for maximum oxygen absorption.",
      icon: <Sprout size={20} className="animate-spin-slow text-purple-400" />,
      color: "from-purple-500 via-pink-400 to-purple-600",
    },
    {
      name: "Ebb & Flow",
      desc: "Floods roots periodically to mimic natural cycles.",
      icon: <Sprout size={20} className="animate-bounce-slow text-pink-400" />,
      color: "from-pink-500 via-red-400 to-pink-600",
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
    <div className="relative bg-[#030504] text-white overflow-x-hidden">

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
              <img
                src={img}
                alt="Hydroponics Setup"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
          <div className="max-w-3xl text-center space-y-6">
            <div className="bg-black/30 backdrop-blur-md px-6 py-6 rounded-2xl border border-white/10 animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-emerald-400 text-xs font-bold uppercase">
                <Sprout size={14} /> Smart Hydroponics
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mt-4">
                <span className="block text-white/90">HYDROPONIC</span>
                <span className="block bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-700 bg-clip-text text-transparent">
                  SMART GROWTH
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-gray-200 mt-4">
                Soil-less farming that saves water, space, and time while maximizing yield.
              </p>

              <Link to="/contact">
                <button className="mt-6 px-6 py-3 md:px-8 md:py-4 bg-emerald-500 text-black font-bold text-sm rounded-full uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-lg hover:shadow-emerald-500/50">
                  Get Started <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS HYDROPONICS */}
      <motion.section
        className="py-20 md:py-28 px-4 text-center max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6">What is Hydroponics?</h2>
        <p className="text-gray-400 text-base md:text-lg">
          Hydroponics is a method of growing plants without soil, using nutrient-rich water solutions. 
          It allows faster growth, efficient use of water, and the ability to grow crops year-round.
        </p>
      </motion.section>

      {/* MODERN INTERACTIVE SYSTEMS */}
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
              className={`relative rounded-2xl p-6 border border-white/20 bg-gradient-to-br ${sys.color} shadow-lg hover:shadow-2xl hover:shadow-${sys.color.replace(/ /g, '')} transition-all cursor-pointer`}
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-full">
                  {sys.icon}
                </div>
                <h3 className="font-bold text-lg text-white">{sys.name}</h3>
                <p className="text-sm text-gray-200">{sys.desc}</p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={activeSystem.name === sys.name ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 rounded-2xl text-white p-4 pointer-events-none"
                >
                  <h4 className="font-bold text-lg mb-2">{sys.name}</h4>
                  <p className="text-sm">{sys.desc}</p>
                  <span className="text-xs mt-2 text-emerald-400">Hover for more info</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 p-6 md:p-10 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md text-left"
          animate={{ backgroundColor: activeSystem.color.includes("emerald") ? "#064e3b" : activeSystem.color.includes("blue") ? "#1e3a8a" : activeSystem.color.includes("purple") ? "#6d28d9" : "#be185d" }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-emerald-400">{activeSystem.name}</h3>
          <p className="text-gray-300 mt-2">{activeSystem.desc}</p>
        </motion.div>
      </motion.section>

      {/* BENEFITS */}
      <motion.section
        className="py-20 md:py-28 bg-black/40 backdrop-blur px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto text-center space-y-12 md:space-y-16">
          <h2 className="text-3xl md:text-5xl font-bold">Benefits of Hydroponics</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                className="p-6 md:p-10 bg-white/5 backdrop-blur rounded-2xl border border-white/10 hover:border-emerald-500/40 hover:scale-105 transition-all"
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(16,185,129,0.6)" }}
              >
                <div className="mb-4 w-12 h-12 mx-auto flex items-center justify-center text-emerald-400">{b.icon}</div>
                <h3 className="text-lg md:text-xl font-bold mb-2 text-emerald-400">{b.title}</h3>
                <p className="text-sm text-gray-400">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* VIDEO */}
      <motion.section
        className="py-20 md:py-28 px-4 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6">See Hydroponics in Action</h2>
        <div className="max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-lg">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/O-RgZ4z1jos"
            title="Hydroponics Tutorial"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="py-20 md:py-28 text-center px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Start Your Hydroponic Journey</h2>
        <p className="text-gray-400 mb-8 md:mb-10 text-base md:text-lg">
          Join thousands adopting smart, sustainable farming techniques today.
        </p>
        <Link to="/contact">
          <button className="px-8 py-3 md:px-10 md:py-4 bg-emerald-500 text-black rounded-full font-bold hover:bg-emerald-400 shadow-lg hover:shadow-emerald-500/50 transition-all">
            Contact Us
          </button>
        </Link>
      </motion.section>

    </div>
  );
}