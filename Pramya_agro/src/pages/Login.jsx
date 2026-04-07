"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme } = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  // -------- VALIDATION --------
  const validate = () => {
    let newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8 || form.password.length > 12) {
      newErrors.password = "Password must be 8-12 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // -------- HANDLE CHANGE --------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "", api: "" });
  };

  // -------- SUBMIT --------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await API.post("/login", form);
      login(res.data.user, res.data.token);

      if (res.data.user.role === "admin") navigate("/admin");
      else navigate("/");

      console.log("Login Response:", res.data);
    } catch (error) {
      const msg = error.response?.data?.msg;

      if (msg === "Email not found") setErrors({ email: "Email not registered" });
      else if (msg === "Incorrect password") setErrors({ password: "Incorrect password" });
      else setErrors({ api: "Login failed" });
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-6 transition-colors duration-300 ${
        theme === "dark" ? "bg-[#050707] text-white" : "bg-white text-black"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-md p-10 rounded-3xl space-y-5 transition-colors duration-300
          ${theme === "dark" 
            ? "bg-white/5 backdrop-blur-xl border border-white/10" 
            : "bg-white shadow-md border border-gray-200"
          }`}
      >
        <h2 className={`text-3xl font-bold text-center ${theme === "dark" ? "text-emerald-400" : "text-emerald-500"}`}>
          Login
        </h2>

        {/* API ERROR */}
        {errors.api && (
          <p className="text-red-500 text-sm text-center">{errors.api}</p>
        )}

        {/* EMAIL */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg outline-none transition-colors duration-300
              ${theme === "dark" 
                ? "bg-black/40 border border-white/10 text-white placeholder:text-gray-400 focus:border-emerald-400" 
                : "bg-gray-100 border border-gray-300 text-black placeholder:text-gray-500 focus:border-emerald-500"
              }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            className={`w-full p-3 pr-10 rounded-lg outline-none transition-colors duration-300
              ${theme === "dark" 
                ? "bg-black/40 border border-white/10 text-white placeholder:text-gray-400 focus:border-emerald-400" 
                : "bg-gray-100 border border-gray-300 text-black placeholder:text-gray-500 focus:border-emerald-500"
              }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400"
          >
            {showPassword ? <Eye size={20}/> : <EyeOff size={20}/>}
          </button>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* LOGIN BUTTON */}
        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-bold transition-colors duration-300
            ${theme === "dark" 
              ? "bg-emerald-500 text-black hover:bg-emerald-600" 
              : "bg-emerald-500 text-white hover:bg-emerald-600"
            }`}
        >
          Login
        </button>

        {/* FORGOT PASSWORD */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className={`text-sm transition-colors duration-300 ${
              theme === "dark" ? "text-gray-400 hover:text-emerald-400" : "text-gray-600 hover:text-emerald-500"
            }`}
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
}