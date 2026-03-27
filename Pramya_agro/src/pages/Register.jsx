"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useTheme } from "../context/ThemeContext";

export default function Register() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (!/^[a-zA-Z0-9]+$/.test(form.password)) {
      newErrors.password = "Password must be alphanumeric";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (form.password.length > 12) {
      newErrors.password = "Password cannot exceed 12 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      await API.post("/register", form);
      navigate("/login");
    } catch (error) {
      setErrors({
        api: error.response?.data?.msg || "Registration failed",
      });
    } finally {
      setLoading(false);
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
        <h2
          className={`text-3xl font-bold text-center ${
            theme === "dark" ? "text-emerald-400" : "text-emerald-500"
          }`}
        >
          Create Account
        </h2>

        {/* API ERROR */}
        {errors.api && (
          <p className="text-red-500 text-sm text-center">{errors.api}</p>
        )}

        {/* NAME */}
        <div>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg outline-none transition-colors duration-300
              ${theme === "dark"
                ? "bg-black/40 border border-white/10 text-white placeholder:text-gray-400 focus:border-emerald-400"
                : "bg-gray-100 border border-gray-300 text-black placeholder:text-gray-500 focus:border-emerald-500"
              }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
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
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg outline-none transition-colors duration-300
              ${theme === "dark"
                ? "bg-black/40 border border-white/10 text-white placeholder:text-gray-400 focus:border-emerald-400"
                : "bg-gray-100 border border-gray-300 text-black placeholder:text-gray-500 focus:border-emerald-500"
              }`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-bold transition-colors duration-300
            ${theme === "dark"
              ? "bg-emerald-500 text-black hover:bg-emerald-600"
              : "bg-emerald-500 text-white hover:bg-emerald-600"
            } disabled:opacity-50`}
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <p
          className={`text-sm text-center transition-colors duration-300 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className={`text-emerald-400 hover:underline transition-colors duration-300`}
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}