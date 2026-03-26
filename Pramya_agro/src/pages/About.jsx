"use client";

import { useTheme } from "../context/ThemeContext";
import { Leaf, Globe, Target } from "lucide-react";

export default function AboutUs() {
  const { theme } = useTheme();

  const team = [
    { name: "Pramod Patil", role: "Head of Farming", image: "" },
    { name: "Sneha Kulkarni", role: "Marketing Lead", image: "" },
    { name: "Rohit Deshmukh", role: "Sustainability Officer", image: "" },
  ];

  const lightGlow =
    "shadow-[0_0_15px_3px_rgba(16,185,129,0.35)] border-emerald-400";

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${
        theme === "dark"
          ? "bg-[#0b0f0d] text-gray-100"
          : "bg-emerald-50 text-gray-900"
      }`}
    >
      {/* HERO */}
      <section className="relative h-[80vh] flex items-center justify-center text-center px-6">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
            className="w-full h-full object-cover"
            alt=""
          />
          <div
            className={`absolute inset-0 backdrop-blur-sm ${
              theme === "dark" ? "bg-black/70" : "bg-white/40"
            }`}
          ></div>
        </div>

        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-emerald-500 via-green-400 to-teal-400 bg-clip-text text-transparent">
              Pramay Agro
            </span>
          </h1>

          <p
            className={`mt-6 text-lg md:text-xl ${
              theme === "dark" ? "text-gray-300" : "text-gray-800"
            }`}
          >
            Growing purity. Empowering farmers. Building a greener tomorrow.
          </p>

          <div className="mt-10">
            <a
              href="/products"
              className={`px-8 py-4 bg-gradient-to-r from-emerald-400 to-teal-400 text-black font-semibold rounded-full shadow-lg hover:scale-105 transition ${
                theme === "light" ? lightGlow : ""
              }`}
            >
              Explore Products
            </a>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section
        className={`max-w-6xl mx-auto px-6 py-24 text-center rounded-3xl transition-all duration-500 ${
          theme === "light" ? " " : ""
        }`}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Who We Are
        </h2>

        <p className="max-w-3xl mx-auto text-lg leading-relaxed">
          Pramay Agro is more than just an agriculture company — we are a movement
          towards sustainable living. We bridge the gap between farmers and consumers
          by delivering pure organic produce while protecting nature.
        </p>
      </section>

      {/* MISSION / VISION / VALUES */}
      <section
        className={`max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-3 gap-10 transition-all duration-500 ${
          theme === "light" ? " " : ""
        }`}
      >
        {[
          {
            title: "Mission",
            icon: <Leaf size={36} />,
            desc: "Deliver high-quality organic produce while supporting farmers.",
          },
          {
            title: "Vision",
            icon: <Target size={36} />,
            desc: "Build a greener, healthier future through eco farming.",
          },
          {
            title: "Values",
            icon: <Globe size={36} />,
            desc: "Integrity, sustainability, innovation & community.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`group rounded-3xl p-[1px] bg-gradient-to-br from-emerald-400/40 to-teal-400/20 transition-all duration-500 ${
              theme === "light" ? lightGlow : ""
            }`}
          >
            <div
              className={`rounded-3xl p-8 h-full backdrop-blur-xl border shadow-md group-hover:-translate-y-2 transition-all duration-500 ${
                theme === "dark"
                  ? "bg-[#111314] border-white/10"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="text-emerald-500 mb-4">{item.icon}</div>

              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>

              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* TEAM */}
      <section className={`py-32 transition-all duration-500 ${theme === "light" ? lightGlow : ""}`}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-20">
            Meet the Team
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-16">
            {team.map((member, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl bg-emerald-400/20 transition"></div>

                <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-gray-200 to-transparent dark:from-white/10">
                  <div
                    className={`backdrop-blur-xl rounded-3xl p-8 text-center border shadow-sm group-hover:-translate-y-2 transition-all duration-500 ${
                      theme === "dark"
                        ? "bg-[#111314] border-white/10"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200 dark:bg-white/10 flex items-center justify-center text-gray-400 text-xs">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        "No Image"
                      )}
                    </div>

                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-sm mt-1">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className={`relative py-24 text-center transition-all duration-500  bg-gradient-to-r from-emerald-400 to-emerald-600" ${
          theme === "light" ? lightGlow : ""
        }`}
      >
        <div
          className={`absolute inset-0 blur-2xl ${
            theme === "dark" ? "bg-emerald-900/20" : "bg-emerald-100/40"
          }`}
        ></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 ">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 ">
            Join Our Journey
          </h2>

          <p className="mb-10">
            Be part of a sustainable future. Support farmers. Choose organic.
          </p>

          <a
            href="/products"
            className="px-10 py-4 bg-gradient-to-r from-emerald-400 to-teal-400 text-black font-semibold rounded-full shadow-lg hover:scale-110 transition"
          >
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
}