"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, User, Search, Sun, Moon, Menu, X } from "lucide-react";
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
    {to:"/why-us", label:"Why Us"},
    { to: "/products", label: "Products" },
    { to: "/hydroponics", label: "Hydroponics" },
    { to: "/blogs", label: "Blogs" },
    { to: "/careers", label: "Careers" },
    { to: "/contact", label: "Contact" },
  ];

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch cart count
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
    navigate("/");
  };

// Debounced search
useEffect(() => {
  if (!query.trim()) {
    setResults([]);
    return;
  }
  const timeout = setTimeout(async () => {
    setLoading(true);
    try {
      // इथे /products/search ऐवजी /global-search वापरा
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-emerald-50/90 dark:bg-[#0b0f0d]/90 shadow-md backdrop-blur-md border-b border-emerald-100/50"
          : "bg-emerald-50 dark:bg-[#0b0f0d] border-b border-emerald-200/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between py-4 gap-6">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
            <h1 className="text-xl font-black tracking-tighter text-gray-900 dark:text-white">
              PRAMAY<span className="text-emerald-500">AGRO</span>
            </h1>
          </Link>

          {/* DESKTOP SEARCH */}
          <div className="hidden md:flex flex-1 max-w-2xl relative items-center">
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white dark:bg-[#111314] border border-gray-200 dark:border-gray-700 rounded-full py-2 px-10 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 shadow-sm focus:ring-1 focus:ring-emerald-400 transition"
            />
            <Search className="absolute left-4 text-gray-400 dark:text-gray-500" size={16} />

            {/* Suggestions */}
            {query && (
              <div className="absolute top-full left-0 w-full bg-white dark:bg-[#111314] border border-gray-200 dark:border-gray-700 rounded-lg mt-2 shadow-lg z-50">
                {loading && <div className="p-2 text-sm text-gray-500 dark:text-gray-400">Searching...</div>}
                {!loading && results.length === 0 && <div className="p-2 text-sm text-gray-500 dark:text-gray-400">No results found</div>}
                {results.map((item) => (
  <Link
    key={item.id}
    to={item.link} 
    onClick={() => {
      setQuery(""); 
      setResults([]);
    }}
    className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 border-b border-gray-50 dark:border-gray-800"
  >
    <div className="flex justify-between items-center">
      <span>{item.name}</span>
      <span className="text-[10px] text-emerald-500 font-bold uppercase">{item.type}</span>
    </div>
  </Link>
))}
              </div>
            )}
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-emerald-100/70 dark:bg-emerald-900/50 text-emerald-600 dark:text-yellow-400 hover:bg-emerald-200/80 dark:hover:bg-emerald-800/60 transition"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* User */}
            <div className="relative group flex items-center gap-3 border-l border-emerald-200 dark:border-emerald-700 pl-4">
              <User className="text-gray-700 dark:text-gray-300" size={20} />
              {user ? (
                <>
                  <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 cursor-pointer">{user.name}</div>
                  <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-[#111314] border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
                    <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/40 transition text-white">📦 My Orders</Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/40 transition">🚪 Logout</button>
                  </div>
                </>
              ) : (
                <div className="flex gap-2 text-xs font-bold">
                  <Link to="/login" className="text-gray-900 dark:text-white hover:text-emerald-500 transition">Login</Link>
                  <span className="text-gray-400">/</span>
                  <Link to="/register" className="text-gray-900 dark:text-white hover:text-emerald-500 transition">Signup</Link>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-900 dark:text-white hover:text-emerald-500 transition">
              <ShoppingCart size={22} />
              {cartCount > 0 && <span className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">{cartCount}</span>}
            </Link>

            {/* Language */}
            <LanguageSwitcher />
          </div>

          {/* MOBILE MENU BUTTON */}
         <button
  className="lg:hidden p-2 rounded-md hover:bg-emerald-100 dark:hover:bg-emerald-800/50 transition text-white"
  onClick={() => setMobileOpen(!mobileOpen)}
>
  {mobileOpen ? <X size={24} /> : <Menu size={24} />}
</button>
        </div>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 pb-3 overflow-x-auto border-t border-emerald-100/30 dark:border-emerald-700/40 pt-3">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-[11px] font-bold uppercase tracking-[1px] transition-all ${
                  isActive ? "text-emerald-500" : "text-gray-500 dark:text-gray-400 hover:text-emerald-500"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* MOBILE MENU (SYSTEMATIC LAYOUT) */}
      {mobileOpen && (
        <div className="lg:hidden bg-emerald-50 dark:bg-[#0b0f0d] border-t border-emerald-200/30 dark:border-emerald-700/40">
          <div className="px-6 py-4 space-y-4">

            {/* 1️⃣ Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-white dark:bg-[#111314] border border-gray-200 dark:border-gray-700 rounded-full py-2 px-10 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 shadow-sm focus:ring-1 focus:ring-emerald-400 transition"
              />
              <Search className="absolute left-4 top-2.5 text-gray-400 dark:text-gray-500" size={16} />

              {query && (
                <div className="absolute top-full left-0 w-full bg-white dark:bg-[#111314] border border-gray-200 dark:border-gray-700 rounded-lg mt-2 shadow-lg z-50">
                  {loading && <div className="p-2 text-sm text-gray-500 dark:text-gray-400">Searching...</div>}
                  {!loading && results.length === 0 && <div className="p-2 text-sm text-gray-500 dark:text-gray-400">No results found</div>}
                {results.map((item) => (
  <Link
    key={item.id}
    to={item.link} // आता बॅकएंडवरून येणारा डायनॅमिक लिंक वापरा
    onClick={() => { setQuery(""); setResults([]); }} // क्लिक केल्यावर सर्च बंद करा
    className="flex items-center justify-between px-4 py-3 text-sm text-gray-900 dark:text-gray-100 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 border-b border-gray-100 dark:border-gray-800 last:border-0"
  >
    <div className="flex flex-col">
      <span className="font-medium">{item.name}</span>
      <span className="text-[10px] uppercase text-gray-400">{item.type}</span>
    </div>
    <div className="text-emerald-500 text-xs">View →</div>
  </Link>
))}
                </div>
              )}
            </div>

            {/* 2️⃣ Nav Links */}
            <div className="flex flex-col gap-2 border-t border-emerald-100/30 dark:border-emerald-700/40 pt-3">
              {navLinks.map((item) => (
                <NavLink key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className={({ isActive }) => `block text-sm font-bold uppercase tracking-[1px] ${isActive ? "text-emerald-500" : "text-gray-500 dark:text-gray-400 hover:text-emerald-500"}`}>
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* 3️⃣ User / Account */}
            <div className="flex flex-col gap-2 border-t border-emerald-100/30 dark:border-emerald-700/40 pt-3">
              {user ? (
                <>
                  <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{user.name}</div>
                  <Link to="/orders" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/40 transition text-white">📦 My Orders</Link>
                  <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/40 transition">🚪 Logout</button>
                </>
              ) : (
                <div className="flex gap-4 text-sm font-bold">
                  <Link onClick={() => setMobileOpen(false)} to="/login" className="hover:text-emerald-500">Login</Link>
                  <Link onClick={() => setMobileOpen(false)} to="/register" className="hover:text-emerald-500">Signup</Link>
                </div>
              )}
            </div>

            {/* 4️⃣ Cart / Theme / Language */}
            <div className="flex items-center gap-4 border-t border-emerald-100/30 dark:border-emerald-700/40 pt-3">
              <button onClick={toggleTheme} className="p-2 rounded-full bg-emerald-100/70 dark:bg-emerald-900/50 text-emerald-600 dark:text-yellow-400 hover:bg-emerald-200/80 dark:hover:bg-emerald-800/60 transition">
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <Link onClick={() => setMobileOpen(false)} to="/cart" className="relative p-2 text-gray-900 dark:text-white hover:text-emerald-500 transition">
                <ShoppingCart size={22} />
                {cartCount > 0 && <span className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">{cartCount}</span>}
              </Link>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}