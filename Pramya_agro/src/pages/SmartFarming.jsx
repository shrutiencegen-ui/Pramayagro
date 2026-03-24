"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Cpu, Droplets, BarChart3, Leaf, ArrowRight } from "lucide-react";

export default function SmartFarming() {
  return (
    <div className="bg-[#050707] text-white min-h-screen overflow-x-hidden relative">

      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[90vh] flex items-center">

        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-600/10 blur-[160px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl space-y-8">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-bold tracking-widest uppercase">
              <Leaf size={14} /> Innovation Driven Agriculture
            </div>

            <h1 className="text-6xl md:text-8xl font-extrabold leading-[0.9] tracking-tight">
              <span className="block text-white/90">SMART</span>
              <span className="block bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-700 bg-clip-text text-transparent">
                FARMING.
              </span>
            </h1>

            <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
              Technology-powered precision agriculture designed for higher
              efficiency, better yield and sustainable growth.
            </p>

            <button className="px-10 py-4 bg-white text-black font-bold text-xs rounded-full hover:bg-emerald-500 transition-all uppercase tracking-widest shadow-xl hover:scale-105 duration-300">
              Explore Technology
            </button>
          </div>
        </div>
      </section>

      {/* ================= TECHNOLOGY GRID ================= */}
      <section className="py-28 border-t border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Technology We Use
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Placeholder description explaining core smart farming systems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

            {[
              {
                title: "IoT Monitoring",
                desc: "Real-time soil & crop monitoring placeholder.",
                icon: <Cpu size={28} />
              },
              {
                title: "Water Optimization",
                desc: "Smart irrigation management placeholder.",
                icon: <Droplets size={28} />
              },
              {
                title: "Data Analytics",
                desc: "AI-driven yield prediction placeholder.",
                icon: <BarChart3 size={28} />
              },
              {
                title: "Organic Intelligence",
                desc: "Sustainable crop planning placeholder.",
                icon: <Leaf size={28} />
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl hover:scale-105 transition duration-300 group"
              >
                <div className="text-emerald-400 mb-6 group-hover:scale-110 transition">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BENEFITS SECTION ================= */}
      <section className="py-28 relative">

        <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-[700px] h-[700px] bg-emerald-700/10 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Why Smart Farming?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 text-center">

            {[
              "Higher Yield Efficiency",
              "Reduced Water Consumption",
              "Lower Operational Cost"
            ].map((benefit, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-xl hover:scale-105 transition duration-300"
              >
                <h3 className="text-xl font-bold mb-4">{benefit}</h3>
                <p className="text-gray-400 text-sm">
                  Placeholder explanation about this benefit.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-24 border-t border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto text-center px-6 space-y-8">

          <h2 className="text-4xl md:text-5xl font-bold">
            Partner With Our Smart Agriculture Mission
          </h2>

          <p className="text-gray-400">
            Placeholder call-to-action encouraging collaboration or inquiries.
          </p>

          <button className="inline-flex items-center gap-3 px-10 py-4 bg-white text-black font-bold text-xs rounded-full hover:bg-emerald-500 transition-all uppercase tracking-widest shadow-xl hover:scale-105 duration-300">
            Contact Experts <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}