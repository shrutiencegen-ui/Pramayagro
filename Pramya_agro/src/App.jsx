import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
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
import AdminProducts from "./pages/Admin/Products"; 
import AddProduct from "./pages/Admin/AddProduct";
import AdminLayout from "./pages/Admin/AdminLayout";
import Hydroponics from "./pages/Hydroponics";
import Blogs from "./pages/blogs";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import { useTheme } from "./context/ThemeContext";
import ScrollToTop from "./components/ScrollToTop";
import WhyUs from "./pages/WhyUs";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const { theme } = useTheme();

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Navbar only on non-admin routes */}
      {!isAdminRoute && <Navbar />}

      {/* Scroll to top on every route change */}
      <ScrollToTop />

      <main className={`flex-1 ${!isAdminRoute ? "pt-24" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* User side routes */}
          <Route path="/products" element={<UserProducts />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/hydroponics" element={<Hydroponics />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/why-us" element={<WhyUs />} />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="add-product" element={<AddProduct />} />
          </Route>

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;