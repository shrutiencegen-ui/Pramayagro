"use client";
import { useState, useEffect, useMemo } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/admin/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch {
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Update order status
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await API.put(`/admin/orders/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Order status updated");
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o))
      );
    } catch {
      toast.error("Failed to update status");
    }
  };

  // Delete order with confirmation
  const deleteOrder = async (id) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/admin/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Order deleted");
      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch {
      toast.error("Failed to delete order");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto py-10 space-y-6">
      <h1 className="text-4xl font-bold text-center mb-8">Admin: Orders</h1>
      {orders.map((order) => (
        <div key={order.id} className="border p-4 rounded-xl shadow flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Order ID: #{order.id}</p>
              <p className="text-sm text-gray-500">User: {order.user}</p>
              <p className="text-sm text-gray-500">Date: {order.createdAt}</p>
            </div>

           <div className="flex items-center gap-3">
                {/* Dropdown Fix: Added bg-gray-900 and text-white to options */}
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className="bg-gray-900 text-white border border-gray-700 p-2 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer text-sm"
                >
                  <option value="Pending" className="bg-gray-900 text-white">Pending</option>
                  <option value="Shipped" className="bg-gray-900 text-white">Shipped</option>
                  <option value="Delivered" className="bg-gray-900 text-white">Delivered</option>
                </select>
              <button
                onClick={() => deleteOrder(order.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="grid gap-2">
            {order.products.map((p) => (
              <div key={p.product_id} className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <img src={p.image} alt={p.name} className="h-12 w-12 object-cover rounded" />
                  <span>{p.name} x {p.quantity}</span>
                </div>
                <span className="font-bold text-emerald-500">₹{p.price}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{order.total_price}</span>
          </div>
        </div>
      ))}
    </div>
  );
}