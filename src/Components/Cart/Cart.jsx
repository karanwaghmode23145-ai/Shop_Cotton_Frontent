import React, { useState, useEffect } from "react";
import { Trash2, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ Add this
import "./Cart.css";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // ✅ initialize navigate

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setCart(data.cart);
        }
      } catch (err) {
        console.error("❌ Fetch Cart Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [token]);

  if (loading) return <p className="text-center py-5">Loading cart...</p>;

  if (!cart || cart.items.length === 0) {
    return (
      <div className="text-center py-5">
        <h5>Your cart is empty 🛒</h5>
        <a href="/shop" className="btn btn-warning fw-bold mt-3">
          Continue Shopping
        </a>
      </div>
    );
  }

  const subtotal = cart.items.reduce(
    (total, item) => total + item.productId.price * item.quantity,
    0
  );

  // ✅ Handle checkout navigation
  const handleCheckout = () => {
    navigate("/checkout"); // 🧭 redirect user to checkout page
  };

  return (
    <div className="cart-wrapper py-5">
      <div className="container">
        <h2 className="cart-title text-center mb-5 fw-bold">
          <ShoppingBag size={28} className="text-warning me-2" />
          Your Shopping Cart
        </h2>

        <div className="row g-4">
          {/* 🛍️ Cart Items */}
          <div className="col-lg-8">
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="cart-item border-bottom py-3 d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  <img
                    src={item.productId.image}
                    alt={item.productId.name}
                    className="cart-item-img me-3"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <h6>{item.productId.name}</h6>
                    <p className="text-warning fw-bold mb-1">
                      ₹{item.productId.price}
                    </p>
                    <small>
                      Qty: {item.quantity} | {item.size} | {item.color}
                    </small>
                  </div>
                </div>
                <button className="btn btn-sm btn-outline-danger">
                  <Trash2 size={18} /> Remove
                </button>
              </div>
            ))}
          </div>

          {/* 💰 Cart Summary */}
          <div className="col-lg-4">
            <div className="cart-summary p-4 bg-white rounded shadow-sm">
              <h4 className="fw-bold mb-4">Order Summary</h4>
              <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
              <p>Shipping: ₹50.00</p>
              <hr />
              <p className="fw-bold">Total: ₹{(subtotal + 50).toFixed(2)}</p>
              <button
                className="btn btn-warning w-100 mt-3 fw-bold"
                onClick={handleCheckout} // ✅ works now
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
