import { useState, useEffect } from "react";
import { ShoppingCart, User, Search, Sun, Moon } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import { useTheme } from "../context/ThemeContext";


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const { theme, toggleTheme } = useTheme();

  // Scroll effect
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

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "cartUpdated") fetchCartCount();
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white dark:bg-black backdrop-blur-md ${
        scrolled ? "shadow-2xl bg-opacity-90" : "shadow-none bg-opacity-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* TOP ROW */}
        <div className="flex items-center justify-between py-4 gap-8">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
            <img
              src="/logo.png"
              alt="Pramay Agro Logo"
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <h1 className="text-xl font-black tracking-tighter text-black dark:text-white">
              PRAMAY<span className="text-emerald-500">AGRO</span>
            </h1>
          </Link>

          {/* SEARCH */}
          <div className="hidden md:flex flex-1 max-w-2xl relative items-center">
            <input
              type="text"
              placeholder="Search organic seeds..."
              className="w-full bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-full py-2.5 px-10 focus:outline-none focus:border-emerald-500 text-sm text-black dark:text-gray-200"
            />
            <Search className="absolute left-4 text-gray-500 dark:text-gray-400" size={16} />
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-6">
            {/* USER */}
            <div className="flex items-center gap-3 group">
              <User className="text-gray-600 dark:text-gray-300 group-hover:text-emerald-400" size={24} />
              <div className="hidden lg:flex flex-col">
                <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold">
                  {user ? "Welcome" : "Account"}
                </span>
                {user ? (
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-emerald-500 uppercase">{user.name}</span>
                    <button
                      onClick={logout}
                      className="text-sm font-bold text-black dark:text-white hover:text-emerald-400 transition"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link
                      to="/login"
                      className="text-sm font-bold text-black dark:text-white hover:text-emerald-400 transition"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="text-sm font-bold text-emerald-500 border border-emerald-500 px-3 py-1 rounded-full hover:bg-emerald-500 hover:text-black dark:hover:text-white transition"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* CART */}
            <Link to="/cart" className="relative group flex items-center">
              <ShoppingCart className="text-black dark:text-white group-hover:text-emerald-400" size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-black text-[10px] font-black h-4 w-4 rounded-full flex items-center justify-center border-2 border-white dark:border-black">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 transition"
            >
              {theme === "dark" ? <Sun className="text-yellow-400" size={18} /> : <Moon className="text-gray-800" size={18} />}
            </button>
          </div>
        </div>

        {/* BOTTOM MENU */}
        <div className="flex items-center gap-8 pb-3 overflow-x-auto border-t border-gray-200 dark:border-white/10 pt-3">
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
                `text-[11px] font-bold uppercase tracking-[1.5px] ${
                  isActive ? "text-emerald-500" : "text-gray-600 dark:text-gray-400"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `text-[11px] font-bold uppercase tracking-[1.5px] ${
                  isActive ? "text-emerald-500" : "text-red-500 dark:text-red-400"
                }`
              }
            >
              Admin
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}