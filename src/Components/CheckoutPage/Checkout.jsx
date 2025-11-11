import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Truck } from "lucide-react";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  // 🧠 Fetch Cart from backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setCart(data.cart);
      } catch (err) {
        console.error("❌ Fetch Cart Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [token]);

  // 🧾 Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle place order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Please login to place your order!");
      navigate("/login");
      return;
    }
    if (!cart || cart.items.length === 0) {
      alert("Your cart is empty!");
      navigate("/cart");
      return;
    }

    setPlacing(true);
    try {
      const res = await fetch("http://localhost:5001/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          shippingAddress: form,
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("✅ Order placed successfully!");
        navigate("/orders"); // You can later create order history page
      } else {
        alert(`⚠️ ${data.message}`);
      }
    } catch (err) {
      console.error("❌ Place Order Error:", err);
      alert("Server error while placing order.");
    } finally {
      setPlacing(false);
    }
  };

  if (loading) return <p className="text-center py-5">Loading checkout...</p>;
  if (!cart || cart.items.length === 0)
    return (
      <div className="text-center py-5">
        <h5>Your cart is empty 🛒</h5>
        <a href="/shop" className="btn btn-warning fw-bold mt-3">
          Continue Shopping
        </a>
      </div>
    );

  const subtotal = cart.items.reduce(
    (total, item) => total + item.productId.price * item.quantity,
    0
  );
  const shipping = 50;
  const total = subtotal + shipping;

  return (
    <div className="checkout-wrapper py-5">
      <div className="container">
        <h2 className="checkout-title text-center mb-5 fw-bold">🧾 Checkout</h2>

        <div className="row g-5">
          {/* 🧾 Billing Form */}
          <div className="col-lg-7">
            <div className="checkout-card p-4">
              <h4 className="section-title mb-4">Billing Details</h4>

              <form onSubmit={handlePlaceOrder}>
                <div className="row g-3">
                  {[
                    "firstName",
                    "lastName",
                    "email",
                    "phone",
                    "address",
                    "city",
                    "pincode",
                  ].map((field) => (
                    <div
                      key={field}
                      className={`${
                        ["firstName", "lastName", "city", "pincode"].includes(
                          field
                        )
                          ? "col-md-6"
                          : "col-12"
                      }`}
                    >
                      <label className="form-label text-capitalize">
                        {field.replace(/([A-Z])/g, " $1")}
                      </label>
                      <input
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  ))}
                </div>

                {/* 🏦 Payment Method */}
                <div className="mt-4">
                  <h5 className="mb-3">Payment Method</h5>

                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="cod"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label
                      htmlFor="cod"
                      className="form-check-label fw-semibold"
                    >
                      <Truck size={16} className="me-2" /> Cash on Delivery
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="bank"
                      name="payment"
                      value="bank"
                      checked={paymentMethod === "bank"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label
                      htmlFor="bank"
                      className="form-check-label fw-semibold"
                    >
                      <CreditCard size={16} className="me-2" /> Bank Transfer
                    </label>
                  </div>
                </div>

                {/* Buttons */}
                <div className="d-flex gap-3 mt-5">
                  <button
                    type="button"
                    className="btn btn-outline-dark d-flex align-items-center gap-2"
                    onClick={() => navigate("/cart")}
                  >
                    <ArrowLeft size={18} /> Go Back to Cart
                  </button>

                  <button
                    type="submit"
                    className="btn btn-warning fw-bold w-100"
                    disabled={placing}
                  >
                    {placing ? "Placing Order..." : "Place Order"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* 💰 Order Summary */}
          <div className="col-lg-5">
            <div className="checkout-card p-4 shadow-sm">
              <h4 className="section-title mb-4">Your Order</h4>
              <div className="order-summary">
                {cart.items.map((item) => (
                  <div
                    key={item._id}
                    className="d-flex justify-content-between mb-2"
                  >
                    <span>
                      {item.productId.name} × {item.quantity}
                    </span>
                    <span>₹{item.productId.price * item.quantity}</span>
                  </div>
                ))}
                <hr />
                <div className="d-flex justify-content-between fw-semibold">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Shipping</span>
                  <span>₹{shipping}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
