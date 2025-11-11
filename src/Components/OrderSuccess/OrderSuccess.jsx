import React, { useEffect, useState } from "react";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";
import "./OrderSuccess.css";

const OrderSuccess = () => {
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
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (err) {
        console.error("❌ Fetch orders error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  if (loading) return <p className="text-center py-5">Loading your orders...</p>;

  if (orders.length === 0)
    return (
      <div className="text-center py-5">
        <h5>No orders yet 📦</h5>
        <p className="text-muted">You haven’t placed any orders yet.</p>
        <a href="/shop" className="btn btn-warning fw-bold mt-3">
          Start Shopping
        </a>
      </div>
    );

  return (
    <div className="orders-wrapper py-5">
      <div className="container">
        <h2 className="fw-bold text-center mb-5">🧾 My Orders</h2>

        <div className="row g-4">
          {orders.map((order) => (
            <div key={order._id} className="col-md-6 col-lg-4">
              <div className="order-card p-4 shadow-sm rounded bg-white">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="fw-bold mb-0">Order ID: {order._id}</h6>
                  {order.status === "Delivered" ? (
                    <CheckCircle color="#28a745" />
                  ) : order.status === "Shipped" ? (
                    <Truck color="#007bff" />
                  ) : (
                    <Clock color="#ffc107" />
                  )}
                </div>

                <div className="order-summary">
                  <p className="mb-1 text-muted">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="fw-semibold">Total: ₹{order.totalAmount.toFixed(2)}</p>
                  <p className="mb-1 small">
                    Payment:{" "}
                    {order.paymentMethod === "cod"
                      ? "Cash on Delivery"
                      : "Bank Transfer"}
                  </p>
                  <p className="small text-muted">Status: {order.status}</p>
                </div>

                <button
                  className="btn btn-outline-dark w-100 mt-3"
                  onClick={() => (window.location.href = `/order-success/${order._id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
