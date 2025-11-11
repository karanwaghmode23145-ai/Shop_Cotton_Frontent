import React, { useState } from "react";
import { Heart, Trash2, ShoppingCart } from "lucide-react";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  const removeItem = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  if (wishlist.length === 0)
    return <p className="text-muted">No items in wishlist.</p>;

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h4 className="fw-bold mb-4">❤️ My Wishlist</h4>
      {wishlist.map((item) => (
        <div key={item.id} className="wishlist-item d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
          <div className="d-flex align-items-center gap-3">
            <img src={item.img} alt={item.name} width="70" height="70" className="rounded" />
            <div>
              <h6>{item.name}</h6>
              <p className="text-warning fw-bold mb-0">₹{item.price}</p>
            </div>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-warning">
              <ShoppingCart size={16} /> Add to Cart
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => removeItem(item.id)}
            >
              <Trash2 size={16} /> Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
