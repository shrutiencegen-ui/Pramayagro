import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
// 1. User side Products la 'UserProducts' naav dya
import UserProducts from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import About from "./pages/About";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Users from "./pages/Admin/Users";
import Orders from "./pages/Admin/Orders";
import ContactUs from "./pages/Contact";
// 2. Admin side Products la 'AdminProducts' naav dya
import AdminProducts from "./pages/Admin/Products"; 
import AddProduct from "./pages/Admin/AddProduct";
import AdminLayout from "./pages/Admin/AdminLayout";
import Hydroponics from "./pages/Hydroponics";

import { useTheme } from "./context/ThemeContext";
function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const { theme } = useTheme();

  return (
   <div className="min-h-screen transition-colors duration-300">
      {!isAdminRoute && <Navbar />}

      <main className={`flex-1 ${!isAdminRoute ? "pt-24" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* 3. User side Products route */}
          <Route path="/products" element={<UserProducts />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/hydroponics" element={<Hydroponics />} />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          {/* ADMIN ROUTES */}
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<Orders />} />
            
            {/* 4. Admin side Products route */}
            <Route path="products" element={<AdminProducts />} /> 
            
            <Route path="add-product" element={<AddProduct />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;