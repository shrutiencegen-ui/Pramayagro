"use client";
import { useState, useEffect, useMemo } from "react";
import API from "../services/api";
import { useTheme } from "../context/ThemeContext";
import toast from "react-hot-toast";

export default function MyOrders() {
  const { theme } = useTheme();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");

  // 🔄 Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched Orders:", res.data); // Debug log
        setOrders(res.data);
      } catch {
        toast.error("Orders load failed");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // 🔍 FILTER + SEARCH (FIXED)
  const filteredOrders = useMemo(() => {
    let filtered = [...orders];

    if (search.trim()) {
      const q = search.toLowerCase();

      filtered = filtered.filter((order) => {
        const matchOrderId = String(order.id).includes(q);

        const matchProduct = order.products?.some((p) =>
          (p.name || "").toLowerCase().includes(q)
        );

        return matchOrderId || matchProduct;
      });
    }

    // 📅 SORT FIXED
    filtered = [...filtered].sort((a, b) => {
      if (sort === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

    return filtered;
  }, [orders, search, sort]);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === "dark" ? "bg-[#030504]" : "bg-[#f8fafc]"
      }`}>
        <div className="animate-spin h-12 w-12 border-t-2 border-emerald-500 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-28 px-4 pb-20 ${
      theme === "dark" ? "bg-[#030504] text-white" : "bg-[#f8fafc] text-black"
    }`}>
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <h1 className="text-4xl font-black text-center mb-8 bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
          Your Orders
        </h1>

        {/* 🔍 SEARCH BAR */}
        <div className={`mb-8 p-4 rounded-2xl flex gap-4 ${
          theme === "dark"
            ? "bg-white/5 border border-white/10"
            : "bg-white shadow"
        }`}>
          <input
            type="text"
            placeholder="Search by product name or order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`flex-1 p-3 rounded-xl outline-none ${
              theme === "dark"
                ? "bg-black/40 border border-white/10"
                : "bg-gray-100"
            }`}
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className={`p-3 rounded-xl ${
              theme === "dark"
                ? "bg-black/40 border border-white/10"
                : "bg-gray-100"
            }`}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        {/* EMPTY STATE */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            No matching orders 😔
          </div>
        ) : (
          <div className="space-y-8">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className={`rounded-2xl p-6 ${
                  theme === "dark"
                    ? "bg-white/5 border border-white/10"
                    : "bg-white shadow"
                }`}
              >
                {/* TOP */}
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-400">Order ID</p>
                    <p className="font-bold text-emerald-500">#{order.id}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Date</p>
                    <p>{order.createdAt}</p>
                  </div>

                  <span className="text-xs font-bold text-yellow-500">
                    {order.status}
                  </span>
                </div>

                {/* PRODUCTS */}
                <div className="space-y-3">
                  {order.products.map((item, i) => (
                    <div key={i} className="flex justify-between">
                      <img src={item.image || "https://via.placeholder.com/50"} alt={item.name} className="w-12 h-12 object-contain rounded-lg" />
                      <span>{item.name} x {item.quantity}</span>
                      <span className="text-emerald-500 font-bold">
                        ₹{item.price}
                      </span>
                    </div>
                  ))}
                </div>

                {/* TOTAL */}
                <div className="mt-4 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-emerald-500">₹{order.total}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}