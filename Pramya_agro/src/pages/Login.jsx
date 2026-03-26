import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // -------- VALIDATION --------
  const validate = () => {

    let newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } 
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } 
    else if (form.password.length < 8 || form.password.length > 12) {
      newErrors.password = "Password must be 8-12 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // -------- HANDLE CHANGE --------
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
      api: ""
    });

  };

  // -------- SUBMIT --------
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    try {

      const res = await API.post("/login", form);

      login(res.data.user, res.data.token);

      if (res.data.user.role === "admin") {
        navigate("/admin");
        console.log("Login Response:", res.data);
      } 
      else {
        navigate("/");
        console.log("Login Response:", res.data);
      }

    } catch (error) {

  const msg = error.response?.data?.msg;

  if (msg === "Email not found") {
    setErrors({ email: "Email not registered" });
  }

  else if (msg === "Incorrect password") {
    setErrors({ password: "Incorrect password" });
  }

  else {
    setErrors({ api: "Login failed" });
  }

}
  };

  return (

    <div className="min-h-screen flex items-center justify-center dark:bg-[#050707] bg-white] text-white px-6">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl space-y-5"
      >

        <h2 className="text-3xl font-bold text-center text-emerald-400">
          Login
        </h2>

        {/* API ERROR */}
        {errors.api && (
          <p className="text-red-500 text-sm text-center">
            {errors.api}
          </p>
        )}

        {/* EMAIL */}
        <div>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 bg-black/40 border border-white/10 rounded-lg focus:border-emerald-500 outline-none"
          />

          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.email}
            </p>
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
            className="w-full p-3 pr-10 bg-black/40 border border-white/10 rounded-lg focus:border-emerald-500 outline-none"
          />

          {/* EYE ICON */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400"
          >
            {showPassword ? <Eye size={20}/> : <EyeOff size={20}/>}
          </button>

          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password}
            </p>
          )}

        </div>

        {/* LOGIN BUTTON */}
        <button
          type="submit"
          className="w-full bg-emerald-500 py-3 rounded-lg font-bold hover:bg-emerald-600 transition"
        >
          Login
        </button>

        {/* FORGOT PASSWORD */}
        <div className="text-center">

          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-gray-400 hover:text-emerald-400"
          >
            Forgot Password?
          </button>

        </div>

      </form>

    </div>
  );
}