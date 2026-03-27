"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, User, Search, Sun, Moon, LogOut } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import { useTheme } from "../context/ThemeContext";
import GoogleTranslate from "./LanguageSwitcher";
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

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
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-emerald-50/80 dark:bg-[#0b0f0d]/90 shadow-md backdrop-blur-md border-b border-emerald-100/50"
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

          {/* SEARCH BAR */}
          <div className="hidden md:flex flex-1 max-w-2xl relative items-center">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-white dark:bg-[#111314] border border-gray-200 dark:border-gray-700 rounded-full py-2 px-10 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 shadow-sm focus:ring-1 focus:ring-emerald-400 transition"
            />
            <Search className="absolute left-4 text-gray-400 dark:text-gray-500" size={16} />
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-4">

            {/* THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-emerald-100/70 dark:bg-emerald-900/50 text-emerald-600 dark:text-yellow-400 hover:bg-emerald-200/80 dark:hover:bg-emerald-800/60 transition"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* USER PROFILE */}
            <div className="flex items-center gap-3 border-l border-emerald-200 dark:border-emerald-700 pl-4">
              <User className="text-gray-700 dark:text-gray-300" size={20} />
              <div className="hidden lg:flex flex-col">
                <span className="text-[9px] text-gray-400 uppercase font-bold">Account</span>
                <div className="flex gap-2 items-center">
                  {user ? (
                    <>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {user.name}
                      </span>
                      <button
                        onClick={handleLogout}
                        className="text-xs font-bold text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition flex items-center gap-1"
                      >
                        <LogOut size={14} /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="text-xs font-bold text-gray-900 dark:text-white hover:text-emerald-500 transition"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="text-xs font-bold text-gray-900 dark:text-white hover:text-emerald-500 transition"
                      >
                        / Signup
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* CART ICON */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-900 dark:text-white hover:text-emerald-500 transition"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <GoogleTranslate />
          </div>
        </div>

        {/* BOTTOM NAV LINKS */}
        <div className="flex items-center gap-8 pb-3 overflow-x-auto border-t border-emerald-100/30 dark:border-emerald-700/40 pt-3">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About Us" },
            { to: "/products", label: "Products" },
            { to: "/hydroponics", label: "Hydroponics" },
            { to: "/blogs", label: "Blogs" },
            { to: "/contact", label: "Contact" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-[11px] font-bold uppercase tracking-[1px] transition-all ${
                  isActive
                    ? "text-emerald-500"
                    : "text-gray-500 dark:text-gray-400 hover:text-emerald-500"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}