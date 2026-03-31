"use client";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useTheme } from "../context/ThemeContext";
import API from "../services/api";
import toast from "react-hot-toast";

export default function Checkout() {
  const { theme } = useTheme();
  const location = useLocation();
  
  // If user clicked Buy Now, location.state?.buyNowItem contains that product
  const buyNowItem = location.state?.buyNowItem || null;

  const [cart, setCart] = useState([]);
  const [errors, setErrors] = useState({}); // Field-specific errors

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    addressLine: "",
  });

  const [payment, setPayment] = useState("COD");

  // Fetch Cart only if NOT Buy Now
  useEffect(() => {
    if (!buyNowItem) {
      const fetchCart = async () => {
        try {
          const res = await API.get("/cart");
          setCart(res.data);
        } catch {
          toast.error("Failed to load cart");
        }
      };
      fetchCart();
    }
  }, [buyNowItem]);

  // Items to checkout: Buy Now item or cart items
  const itemsToCheckout = buyNowItem ? [buyNowItem] : cart;

  const total = itemsToCheckout.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const validateAddress = () => {
    const newErrors = {};
    if (!address.name.trim()) newErrors.name = "Name is required";
    if (!address.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(address.phone.trim()))
      newErrors.phone = "Phone number must be 10 digits";
    if (!address.addressLine.trim()) newErrors.addressLine = "Address is required";
    if (!address.city.trim()) newErrors.city = "City is required";
    if (!address.state.trim()) newErrors.state = "State is required";
    if (!address.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(address.pincode.trim()))
      newErrors.pincode = "Pincode must be 6 digits";
    return newErrors;
  };

  const placeOrder = async () => {
    const validationErrors = validateAddress();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const token = localStorage.getItem("token");
        const orderData = {
          address,
          payment,
          products: itemsToCheckout.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
          total,
        };

        await API.post("/orders", orderData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        toast.success("Order placed successfully 🎉");

        // If it was a Buy Now item, no cart modification needed
        // If normal cart checkout, optionally clear cart
        if (!buyNowItem) setCart([]);

        setTimeout(() => {
          window.location.href = "/orders";
        }, 2000);
      } catch (err) {
        toast.error(err.response?.data?.msg || "Failed to place order");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div
        className={`min-h-screen pt-28 px-6 ${
          theme === "dark" ? "bg-[#030504]" : "bg-[#f8fafc]"
        }`}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {/* LEFT - ADDRESS */}
          <div className="md:col-span-2 space-y-6">
            <div
              className={`p-6 rounded-2xl ${
                theme === "dark"
                  ? "bg-white/5 border border-white/10"
                  : "bg-white border shadow-sm"
              }`}
            >
              <h2 className="text-xl font-bold mb-4 text-emerald-500">
                Shipping Address
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.keys(address).map((field) => (
                  <div key={field} className="flex flex-col">
                    <input
                      placeholder={field
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                      value={address[field]}
                      onChange={(e) => {
                        let value = e.target.value;
                        if (field === "phone" || field === "pincode") {
                          value = value.replace(/\D/g, "");
                        }
                        setAddress({ ...address, [field]: value });

                        if (errors[field]) {
                          setErrors({ ...errors, [field]: null });
                        }
                      }}
                      className={`p-3 rounded-lg outline-none w-full placeholder:text-gray-400 ${
                        theme === "dark"
                          ? "bg-black/40 text-white border border-white/10 placeholder:text-white/60"
                          : "bg-gray-100 text-black border"
                      }`}
                    />
                    {errors[field] && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors[field]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* PAYMENT */}
            <div
              className={`p-6 rounded-2xl ${
                theme === "dark"
                  ? "bg-white/5 border border-white/10"
                  : "bg-white border shadow-sm"
              }`}
            >
              <h2 className="text-xl font-bold mb-4 text-emerald-500">
                Payment Method
              </h2>
              <div className="space-y-3">
                <label
                  className={`flex items-center gap-3 ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  <input
                    type="radio"
                    checked={payment === "COD"}
                    onChange={() => setPayment("COD")}
                  />
                  Cash on Delivery
                </label>
                <label
                  className={`flex items-center gap-3 ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  <input
                    type="radio"
                    checked={payment === "ONLINE"}
                    onChange={() => setPayment("ONLINE")}
                  />
                  Online Payment (UPI / Card)
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT - SUMMARY */}
          <div
            className={`p-6 rounded-2xl h-fit sticky top-28 ${
              theme === "dark"
                ? "bg-white/5 border border-white/10"
                : "bg-white border shadow-sm"
            }`}
          >
            <h2 className="text-xl font-bold mb-4 text-emerald-500">
              Order Summary
            </h2>
            <div className="space-y-4">
              {itemsToCheckout.map((item) => (
                <div
                  key={item.id}
                  className={`flex justify-between text-sm ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
              <hr className="opacity-20" />
              <div
                className={`flex justify-between font-bold text-lg ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                <span>Total</span>
                <span className="text-emerald-500">₹{total}</span>
              </div>
              <button
                onClick={placeOrder}
                className="w-full mt-4 py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition"
              >
                Place Order 🚀
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}