"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, User, Search, Sun, Moon, Menu, X, Package, LogOut, ChevronRight } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import { useTheme } from "../context/ThemeContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/why-us", label: "Why Us" },
    { to: "/products", label: "Products" },
    { to: "/hydroponics", label: "Hydroponics" },
    { to: "/blogs", label: "Blogs" },
    { to: "/careers", label: "Careers" },
    { to: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchCartCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) return setCartCount(0);
    try {
      const res = await API.get("/cart");
      setCartCount(res.data.length);
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCartCount();
    const interval = setInterval(fetchCartCount, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate("/");
  };

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await API.get(`/global-search?q=${query}`);
        setResults(res.data);
      } catch (err) {
        console.error("Search Error:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <nav
      className={`fixed top-[-1px] left-0 w-full z-[100] transition-all duration-300 select-none
      ${scrolled
          ? "bg-emerald-50/95 dark:bg-[#020403]/95 shadow-lg backdrop-blur-xl border-b border-emerald-500/10"
          : "bg-emerald-50 dark:bg-[#020403] border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="flex items-center justify-between py-3 md:py-4 gap-4">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0" onClick={() => setMobileOpen(false)}>
            <img src="/logo.png" alt="Logo" className="h-9 md:h-11 w-auto" />
            <h1 className={`text-lg md:text-xl font-black tracking-tighter transition-colors text-white`}>
              PRAMAY<span className="text-emerald-500">AGRO</span>
            </h1>
          </Link>

          {/* DESKTOP SEARCH */}
          <div className="hidden md:flex flex-1 max-w-xl relative items-center text-white">
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white dark:bg-[#111314] border border-gray-200 dark:border-gray-800 rounded-full py-2 px-10 text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all text-white"
            />
            <Search className="absolute left-4 text-gray-400" size={16} />
            
            {query && (
              <div className="absolute top-full left-0 w-full bg-white dark:bg-[#0b0f0d] border border-gray-200 dark:border-gray-800 rounded-2xl mt-2 shadow-2xl z-50 overflow-hidden">
                {loading && <div className="p-4 text-xs animate-pulse text-emerald-500">Searching...</div>}
                {results.map((item) => (
                  <Link key={item.id} to={item.link} onClick={() => setQuery("")} className="flex justify-between items-center px-4 py-3 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 border-b border-gray-50 dark:border-gray-800 last:border-0">
                    <span className="text-sm font-medium dark:text-gray-200">{item.name}</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded-full font-bold">{item.type}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* ACTIONS (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2.5 rounded-xl bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-yellow-400 hover:scale-110 transition">
              {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            <LanguageSwitcher />

            <Link to="/cart" className="relative p-2.5 rounded-xl bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-gray-200 hover:scale-110 transition">
              <ShoppingCart size={19} />
              {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white dark:border-black">{cartCount}</span>}
            </Link>

            <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-800 mx-1" />

            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/20">
                  <User size={16} /> {user.name.split(' ')[0]}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#0b0f0d] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
                   <Link to="/orders" className="flex items-center gap-2 px-4 py-3 text-sm dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition"><Package size={16}/> My Orders</Link>
                   <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition"><LogOut size={16}/> Logout</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
            <Link to="/login" className="text-gray-900 dark:text-white hover:text-emerald-500 text-sm font-bold transition">Login</Link>
            <span className="text-gray-300 dark:text-gray-700">|</span>
            <Link to="/register" className="bg-emerald-500 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-emerald-600 transition shadow-lg shadow-emerald-500/20">Signup</Link>
          </div>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <div className="flex lg:hidden items-center gap-3">
             <Link to="/cart" className="relative p-2 text-gray-700 dark:text-gray-200">
                <ShoppingCart size={22} />
                {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">{cartCount}</span>}
             </Link>
             <button
                className={`p-2 rounded-xl transition-colors ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
          </div>
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-7 pb-3 border-t border-gray-100 dark:border-white/5 pt-3">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-[10px] font-black uppercase tracking-[1.5px] transition-all ${
                  isActive ? "text-emerald-500" : "text-gray-400 hover:text-emerald-500"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* MOBILE MENU - Fixed 'White Line' and Spacing */}
      <div className={`lg:hidden fixed inset-0 top-[60px] bg-white dark:bg-[#020403] z-[90] transition-transform duration-500 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="h-full flex flex-col px-6 py-8 space-y-8 overflow-y-auto">
            
            {/* Search in Mobile */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-gray-100 dark:bg-zinc-900 border-none rounded-2xl py-3 px-12 text-sm focus:ring-2 focus:ring-emerald-500"
              />
              <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
            </div>

            {/* Links */}
            <div className="flex flex-col gap-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Navigation</p>
              {navLinks.map((item) => (
                <NavLink 
                  key={item.to} 
                  to={item.to} 
                  onClick={() => setMobileOpen(false)} 
                  className={({ isActive }) => `flex justify-between items-center text-xl font-bold ${isActive ? "text-emerald-500" : "text-gray-800 dark:text-gray-200"}`}
                >
                  {item.label} <ChevronRight size={18} className="opacity-20"/>
                </NavLink>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="mt-auto pt-8 border-t border-gray-100 dark:border-gray-800 space-y-6">
               <div className="flex items-center justify-between">
                  <LanguageSwitcher />
                  <button onClick={toggleTheme} className="p-3 rounded-2xl bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-yellow-400">
                    {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
                  </button>
               </div>

               {user ? (
                 <div className="space-y-3">
                    <div className="flex items-center gap-3 p-4 bg-emerald-500/10 rounded-2xl">
                      <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">{user.name[0]}</div>
                      <div>
                        <p className="text-sm font-bold dark:text-white">{user.name}</p>
                        <p className="text-xs text-emerald-500">Active Account</p>
                      </div>
                    </div>
                    <Link to="/orders" onClick={() => setMobileOpen(false)} className="block w-full text-center py-4 rounded-2xl font-bold bg-gray-100 dark:bg-zinc-900 dark:text-white">My Orders</Link>
                    <button onClick={handleLogout} className="w-full py-4 text-red-500 font-bold">Logout</button>
                 </div>
               ) : (
                 <Link to="/login" onClick={() => setMobileOpen(false)} className="block w-full text-center py-4 bg-emerald-500 text-white rounded-2xl font-bold shadow-xl shadow-emerald-500/20">Login / Signup</Link>
               )}
            </div>
          </div>
      </div>
    </nav>
  );
}