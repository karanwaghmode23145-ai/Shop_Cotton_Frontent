import React, { useEffect, useState } from "react";
import { Package, Truck, CheckCircle } from "lucide-react";

const MyOrders = () => {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) setOrders(data.orders);
      } catch (err) {
        console.error("❌ Fetch Orders Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  if (loading) return <p>Loading your orders...</p>;

  if (orders.length === 0)
    return <p className="text-muted">No orders placed yet.</p>;

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h4 className="fw-bold mb-4">📦 My Orders</h4>

      {orders.map((order) => (
        <div key={order._id} className="order-item border-bottom pb-3 mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <h6>Order ID: {order._id}</h6>
            {order.status === "Delivered" ? (
              <CheckCircle color="green" />
            ) : order.status === "Shipped" ? (
              <Truck color="orange" />
            ) : (
              <Package color="gray" />
            )}
          </div>
          <p className="mb-1">Total: ₹{order.totalAmount}</p>
          <p className="small text-muted">
            Placed on: {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
