import React, { useEffect, useState } from "react";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import "./Wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // 🧠 Fetch Wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/wishlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setWishlist(data.wishlist.products || []);
        }
      } catch (err) {
        console.error("❌ Wishlist fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // ❤️ Remove from wishlist
  const handleRemove = async (productId) => {
    try {
      const res = await fetch(`http://localhost:5001/api/wishlist/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setWishlist(wishlist.filter((p) => p._id !== productId));
      }
    } catch (err) {
      console.error("❌ Remove wishlist error:", err);
    }
  };

  // 🛒 Add to cart (local or backend)
  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5001/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
        }),
      });
      const data = await res.json();
      if (data.success) alert("✅ Added to cart!");
    } catch (err) {
      console.error("❌ Add to cart error:", err);
    }
  };

  if (loading) return <p className="text-center py-5">Loading wishlist...</p>;

  return (
    <div className="wishlist-wrapper py-5">
      <div className="container">
        <h2 className="wishlist-title text-center fw-bold mb-5">
          ❤️ My Wishlist
        </h2>

        {wishlist.length === 0 ? (
          <div className="text-center py-5">
            <Heart size={40} className="text-warning mb-3" />
            <h5>Your wishlist is empty</h5>
            <p className="text-muted">
              Add products you love to save them for later!
            </p>
          </div>
        ) : (
          <div className="row g-4">
            {wishlist.map((item) => (
              <div key={item._id} className="col-md-6 col-lg-4">
                <div className="wishlist-card shadow-sm rounded p-3 bg-white">
                  <div className="wishlist-img text-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </div>

                  <div className="wishlist-content text-center mt-3">
                    <h5 className="fw-semibold">{item.name}</h5>
                    <p className="wishlist-price text-success fw-bold">
                      ₹{item.price}
                    </p>

                    <div className="wishlist-actions d-flex justify-content-center gap-3 mt-3">
                      <button
                        className="btn btn-warning d-flex align-items-center gap-2"
                        onClick={() => handleAddToCart(item)}
                      >
                        <ShoppingCart size={18} /> Add to Cart
                      </button>
                      <button
                        className="btn btn-outline-danger d-flex align-items-center gap-2"
                        onClick={() => handleRemove(item._id)}
                      >
                        <Trash2 size={18} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
