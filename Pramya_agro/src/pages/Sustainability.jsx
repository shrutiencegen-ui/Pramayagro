"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Leaf,
  Droplets,
  Globe,
  Users,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function Sustainability() {
  return (
    <div className="bg-[#050707] text-white min-h-screen overflow-x-hidden relative">
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[85vh] flex items-center">

        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-600/10 blur-[160px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl space-y-8">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-bold tracking-widest uppercase">
              <Globe size={14} /> Responsible Growth
            </div>

            <h1 className="text-6xl md:text-8xl font-extrabold leading-[0.9] tracking-tight">
              <span className="block text-white/90">FARMING WITH</span>
              <span className="block bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-700 bg-clip-text text-transparent">
                RESPONSIBILITY.
              </span>
            </h1>

            <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
              Our sustainability practices focus on soil preservation, water
              conservation and empowering farming communities.
            </p>

            <button className="px-10 py-4 bg-white text-black font-bold text-xs rounded-full hover:bg-emerald-500 transition-all uppercase tracking-widest shadow-xl hover:scale-105 duration-300">
              View Our Impact
            </button>
          </div>
        </div>
      </section>

      {/* ================= SUSTAINABILITY PILLARS ================= */}
      <section className="py-28 border-t border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Our Sustainability Pillars
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Core focus areas driving our long-term environmental commitment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

            {[
              {
                title: "Soil Health",
                desc: "Organic composting and crop rotation placeholder.",
                icon: <Leaf size={28} />
              },
              {
                title: "Water Conservation",
                desc: "Smart irrigation & efficient water usage placeholder.",
                icon: <Droplets size={28} />
              },
              {
                title: "Carbon Reduction",
                desc: "Lower emissions & sustainable logistics placeholder.",
                icon: <Globe size={28} />
              },
              {
                title: "Farmer Empowerment",
                desc: "Community development & training placeholder.",
                icon: <Users size={28} />
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl hover:scale-105 transition duration-300 group"
              >
                <div className="text-emerald-400 mb-6 group-hover:scale-110 transition">
                  {pillar.icon}
                </div>

                <h3 className="text-xl font-bold mb-4">{pillar.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= IMPACT STATS ================= */}
      <section className="py-28 relative">
        <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-[700px] h-[700px] bg-emerald-700/10 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Our Impact
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">

            {[
              { value: "40%", label: "Water Saved" },
              { value: "25%", label: "Carbon Reduced" },
              { value: "10K+", label: "Acres Organic" },
              { value: "15K+", label: "Farmers Supported" },
            ].map((stat, i) => (
              <div key={i}>
                <h3 className="text-4xl font-extrabold mb-3 text-emerald-400">
                  {stat.value}
                </h3>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-[3px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CERTIFICATIONS ================= */}
      <section className="py-24 border-t border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-12">

          <h2 className="text-4xl md:text-5xl font-bold">
            Certifications & Compliance
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {["Organic Certified", "Global GAP", "ISO Standard", "Eco Verified"].map((cert, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 p-6 rounded-2xl text-sm font-semibold text-gray-300"
              >
                <ShieldCheck className="mx-auto mb-4 text-emerald-400" size={24} />
                {cert}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto text-center px-6 space-y-8">

          <h2 className="text-4xl md:text-5xl font-bold">
            Grow With Us. Sustainably.
          </h2>

          <p className="text-gray-400">
            Partner with us in building a smarter and greener agricultural future.
          </p>

          <button className="inline-flex items-center gap-3 px-10 py-4 bg-white text-black font-bold text-xs rounded-full hover:bg-emerald-500 transition-all uppercase tracking-widest shadow-xl hover:scale-105 duration-300">
            Contact Our Team <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}