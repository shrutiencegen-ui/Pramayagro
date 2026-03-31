import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Hydroponics", path: "/hydroponics" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="relative overflow-hidden text-gray-300 pt-20 pb-10">

      {/* 🌈 GRADIENT BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020403] via-[#07120c] to-[#020403]" />

      {/* ✨ GLOW EFFECT */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-500/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-14">

        {/* 🔥 BRAND */}
        <div>
          <Link to="/" className="flex items-center gap-3 group">

            {/* ✨ Animated Logo */}
            <img
              src="/logo.png"
              alt="Pramay Agro Logo"
              className="h-10 w-auto object-contain transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
            />

             <h1 className="text-xl font-black tracking-tighter text-gray-900 dark:text-white">
              PRAMAY<span className="text-emerald-500">AGRO</span>
            </h1>
          </Link>

          <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-xs">
            Elevating agriculture through sustainable innovation,
            intelligent farming systems and global-quality organic produce.
          </p>

          {/* 🌐 SOCIAL */}
          <div className="flex gap-4 mt-6">
            {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
              <div
                key={i}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-emerald-500/20 hover:border-emerald-500 transition duration-300 cursor-pointer hover:scale-110"
              >
                <Icon size={18} className="text-gray-400 hover:text-emerald-400 transition" />
              </div>
            ))}
          </div>
        </div>

        {/* 🔗 LINKS */}
        <div>
          <h3 className="font-semibold text-white mb-6 tracking-wide">Explore</h3>
          <ul className="space-y-4 text-sm">
            {quickLinks.map((link, i) => (
              <li key={i}>
                <Link
                  to={link.path}
                  className="relative w-fit text-gray-400 hover:text-emerald-400 transition duration-300 after:block after:h-[1px] after:bg-emerald-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 📞 CONTACT */}
        <div>
          <h3 className="font-semibold text-white mb-6 tracking-wide">Contact</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>📍 Maharashtra, India</li>
            <li>📞 +91 98765 43210</li>
            <li>✉ info@Pramayagro.com</li>
          </ul>
        </div>

        {/* 📩 NEWSLETTER */}
        <div>
          <h3 className="font-semibold text-white mb-6 tracking-wide">
            Stay Updated
          </h3>

          <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-4 bg-transparent text-sm outline-none placeholder:text-gray-500"
            />
            <button className="px-6 py-4 bg-emerald-600 hover:bg-emerald-500 transition text-white text-sm font-semibold">
              Subscribe
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Get farming insights, product launches & organic updates.
          </p>
        </div>

      </div>

      {/* 🔻 BOTTOM */}
  
<div className="mt-16 border-t border-white/20 pt-6 text-sm text-gray-400 bg-black/30 backdrop-blur-md">
  <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">

    {/* LEFT - COPYRIGHT */}
    <p>
      © {new Date().getFullYear()} Pramay Agro. All rights reserved.
    </p>

    {/* CENTER - LINKS */}
    

    {/* RIGHT - CREDIT */}
    <div className="text-xs">
      Designed & Developed by{" "}
      <a
        href="https://encegenailabs.com"
        target="_blank"
        rel="noopener noreferrer"
        className="relative font-semibold text-emerald-400 hover:text-emerald-300 transition"
      >
        Encegen AI Labs
        <span className="absolute left-0 -bottom-1 w-full h-[1px] bg-emerald-400 scale-x-0 hover:scale-x-100 origin-left transition-transform"></span>
      </a>
    </div>
<div className="flex gap-6 text-xs uppercase tracking-widest">
      <Link to="/" className="hover:text-emerald-400 transition">Privacy</Link>
      <Link to="/" className="hover:text-emerald-400 transition">Terms</Link>
      <Link to="/" className="hover:text-emerald-400 transition">Sustainability</Link>
    </div>
  </div>
</div>
      

    </footer>
  );
}