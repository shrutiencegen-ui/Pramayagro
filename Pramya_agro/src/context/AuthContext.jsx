import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct Import style

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    // Initial check from localStorage to prevent flicker
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          logout(); // Token expired
        } else {
          // Set auto-logout timer
          const remainingTime = (decoded.exp - currentTime) * 1000;
          const timer = setTimeout(() => {
            logout();
          }, remainingTime);
          
          return () => clearTimeout(timer);
        }
      } catch (err) {
        console.error("Token decoding failed:", err);
        logout();
      }
    }
  }, [user]); // Re-run when user state changes (e.g. after login)

  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}