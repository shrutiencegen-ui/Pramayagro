"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ContactUs() {
  const { theme } = useTheme();

  const contactCards = [
    { icon: <Phone size={24} />, title: "Call Us", info: "+91 7404042121" },
    { icon: <Mail size={24} />, title: "Email", info: "pramayagro@gmail.com" },
    { icon: <MapPin size={24} />, title: "Location", info: "Talawade, Pune - 411062" },
  ];

  return (
    <div className={`relative min-h-screen overflow-hidden transition-colors duration-700
      ${theme === "dark" ? "bg-[#030504] text-white" : "bg-[#FAF6F0] text-gray-900"}`}>

      {/* Hero Section */}
     <div className={`relative py-32 transition-colors duration-700
        ${theme === "dark"
          ? "bg-gradient-to-r from-emerald-600/20 via-emerald-900/10 to-black/50"
          : "bg-gradient-to-r from-emerald-100 via-emerald-200 to-green-50"}`}>
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text 
            bg-gradient-to-r from-emerald-400 to-emerald-600">
            Get in Touch
          </h1>
          <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} max-w-2xl mx-auto text-lg md:text-xl`}>
            We’re here to answer your questions and help your farm thrive.  
            Reach out to us anytime, and we’ll get back to you promptly.
          </p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 -mt-16 relative z-10">
        {contactCards.map((card, i) => (
          <div
            key={i}
            className={`flex flex-col items-center text-center p-8 rounded-3xl backdrop-blur-xl transition-all duration-300 hover:scale-105
              ${theme === "dark" 
                ? "bg-white/5 border border-white/10 text-white"
                : "bg-white/30 border border-emerald-200 text-gray-900"}`}
          >
            <div className={`w-16 h-16 flex items-center justify-center rounded-full mb-4
              ${theme === "dark" ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100/40 text-emerald-600"}`}>
              {card.icon}
            </div>
            <h3 className="font-bold text-xl mb-2">{card.title}</h3>
            <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-700"}`}>{card.info}</p>
          </div>
        ))}
      </div>

      {/* Contact Form */}
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className={`rounded-3xl p-10 md:p-16 transition-colors duration-700 backdrop-blur-xl border shadow-lg
          ${theme === "dark"
            ? "bg-white/5 border border-white/10 text-white"
            : "bg-white/50 border border-emerald-200 text-gray-900"}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-emerald-400">
            Send Us a Message
          </h2>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 transition-colors duration-300
                  ${theme === "dark"
                    ? "bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:ring-emerald-400"
                    : "bg-white/50 border border-emerald-200 text-gray-900 placeholder-gray-600 focus:ring-emerald-400"}`}
              />
              <input
                type="email"
                placeholder="Email Address"
                className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 transition-colors duration-300
                  ${theme === "dark"
                    ? "bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:ring-emerald-400"
                    : "bg-white/50 border border-emerald-200 text-gray-900 placeholder-gray-600 focus:ring-emerald-400"}`}
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 transition-colors duration-300
                ${theme === "dark"
                  ? "bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:ring-emerald-400"
                  : "bg-white/50 border border-emerald-200 text-gray-900 placeholder-gray-600 focus:ring-emerald-400"}`}
            />

            <textarea
              rows="6"
              placeholder="Your Message"
              className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 transition-colors duration-300
                ${theme === "dark"
                  ? "bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:ring-emerald-400"
                  : "bg-white/50 border border-emerald-200 text-gray-900 placeholder-gray-600 focus:ring-emerald-400"}`}
            />

            <button
              type="submit"
              className={`w-full py-4 font-bold text-lg rounded-full transition-all shadow-md hover:shadow-lg
                ${theme === "dark"
                  ? "bg-emerald-500 text-black hover:bg-emerald-400 hover:shadow-[0_0_40px_rgba(16,185,129,0.7)]"
                  : "bg-emerald-400 text-black hover:bg-emerald-300 hover:shadow-[0_0_30px_rgba(72,187,120,0.5)]"}`}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
{/* Map Section */}

  <div className="max-w-7xl mx-auto px-6 pb-24">
  <a
    href="https://www.google.com/maps?q=Gate+No.+188+Jyotiba+Nagar+Near+Pandurang+Krupa+Hotel+Talawade+Pune+411062"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="rounded-3xl overflow-hidden border shadow-lg cursor-pointer">
      <iframe
        src="https://www.google.com/maps?q=Gate+No.+188+Jyotiba+Nagar+Near+Pandurang+Krupa+Hotel+Talawade+Pune+411062&z=17&output=embed"
        className="w-full h-[450px] pointer-events-none"
      ></iframe>
    </div>
  </a>
</div>
</div>

  
  );
}