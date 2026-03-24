import { useState, useEffect } from "react";
import { ShoppingCart, User, Search } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import ContactUs from "../pages/Contact";
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch unique cart items count
  const fetchCartCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCartCount(0);
      return;
    }
    try {
      const res = await API.get("/cart");
      setCartCount(res.data.length); // unique items count
    } catch (err) {
      console.error(err);
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCartCount();

    // Optional: Polling every 10s to keep count updated
    const interval = setInterval(fetchCartCount, 10000);
    return () => clearInterval(interval);
  }, []);

  // Optional: Listen to storage changes if other tabs add to cart
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "cartUpdated") fetchCartCount();
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-md shadow-2xl" : "bg-black"
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
            <h1 className="text-xl font-black tracking-tighter text-white">
              PRAMAY<span className="text-emerald-500">AGRO</span>
            </h1>
          </Link>

          {/* SEARCH */}
          <div className="hidden md:flex flex-1 max-w-2xl relative items-center">
            <input
              type="text"
              placeholder="Search organic seeds..."
              className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 px-10 focus:outline-none focus:border-emerald-500/50 text-sm text-gray-200"
            />
            <Search className="absolute left-4 text-gray-400" size={16} />
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-6 flex-shrink-0">
            {/* USER */}
            <div className="flex items-center gap-3 group">
              <User className="text-gray-300 group-hover:text-emerald-400" size={24} />
              <div className="hidden lg:flex flex-col">
                <span className="text-[10px] text-gray-500 uppercase font-bold">
                  {user ? "Welcome" : "Account"}
                </span>
                {user ? (
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-emerald-400 uppercase">{user.name}</span>
                    <button onClick={logout} className="text-sm font-bold text-white hover:text-emerald-400 transition">
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link to="/login" className="text-sm font-bold text-white hover:text-emerald-400 transition">
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="text-sm font-bold text-emerald-400 border border-emerald-500 px-3 py-1 rounded-full hover:bg-emerald-500 hover:text-black transition"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* CART */}
            <Link to="/cart" className="relative group flex items-center">
              <ShoppingCart className="text-white group-hover:text-emerald-400" size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-black text-[10px] font-black h-4 w-4 rounded-full flex items-center justify-center border-2 border-black">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* BOTTOM MENU */}
        <div className="flex items-center gap-8 pb-3 overflow-x-auto no-scrollbar border-t border-white/5 pt-3">
          <NavLink to="/" className={({ isActive }) => `text-[11px] font-bold uppercase tracking-[1.5px] ${isActive ? "text-emerald-400" : "text-gray-400"}`}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `text-[11px] font-bold uppercase tracking-[1.5px] ${isActive ? "text-emerald-400" : "text-gray-400"}`}>
            About Us
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => `text-[11px] font-bold uppercase tracking-[1.5px] ${isActive ? "text-emerald-400" : "text-gray-400"}`}>
            Products
          </NavLink>
          <NavLink to="/smart-farming" className={({ isActive }) => `text-[11px] font-bold uppercase tracking-[1.5px] ${isActive ? "text-emerald-400" : "text-gray-400"}`}>
            Smart Farming
          </NavLink>
          <NavLink to="/sustainability" className={({ isActive }) => `text-[11px] font-bold uppercase tracking-[1.5px] ${isActive ? "text-emerald-400" : "text-gray-400"}`}>
            Sustainability
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `text-[11px] font-bold uppercase tracking-[1.5px] ${isActive ? "text-emerald-400" : "text-gray-400"}`}>
            Contact
          </NavLink>

          {user?.role === "admin" && (
            <NavLink to="/admin" className={({ isActive }) => `text-[11px] font-bold uppercase tracking-[1.5px] ${isActive ? "text-emerald-400" : "text-red-400"}`}>
              Admin
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}