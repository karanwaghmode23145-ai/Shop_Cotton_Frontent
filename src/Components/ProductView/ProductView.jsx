import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import "./ProductView.css";

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("M");
  const [adding, setAdding] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [togglingWishlist, setTogglingWishlist] = useState(false);

  const token = localStorage.getItem("token");

  // 🧠 Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/products/${id}`);
        const data = await res.json();
        if (data.success) {
          setProduct(data.product);
          setMainImage(data.product.image);
          fetchRelated(data.product.category, data.product._id);
        }
      } catch (err) {
        console.error("❌ Product fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelated = async (category, excludeId) => {
      try {
        const res = await fetch(
          `http://localhost:5001/api/products/related/products?category=${encodeURIComponent(
            category
          )}&excludeId=${excludeId}`
        );
        const data = await res.json();
        if (data.success) setRelated(data.related);
      } catch (err) {
        console.error("❌ Related fetch error:", err);
      }
    };

    fetchProduct();
  }, [id]);

  // 🛒 Add to Cart
  const handleAddToCart = async () => {
    if (!token) {
      alert("Please login to add products to your cart!");
      navigate("/login");
      return;
    }

    if (!product) return;
    setAdding(true);
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
          size: selectedSize,
          color: selectedColor,
        }),
      });
      const data = await res.json();
      if (data.success) alert("✅ Product added to cart successfully!");
      else alert(`⚠️ ${data.message || "Could not add to cart"}`);
    } catch (err) {
      console.error("❌ Add to cart error:", err);
    } finally {
      setAdding(false);
    }
  };

  // ❤️ Wishlist toggle
  const handleToggleWishlist = async () => {
    if (!token) {
      alert("Please login to manage your wishlist!");
      navigate("/login");
      return;
    }
    if (!product) return;

    setTogglingWishlist(true);
    try {
      const url = isWishlisted
        ? `http://localhost:5001/api/wishlist/${product._id}`
        : `http://localhost:5001/api/wishlist/add`;
      const method = isWishlisted ? "DELETE" : "POST";
      const body = !isWishlisted
        ? JSON.stringify({ productId: product._id })
        : undefined;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body,
      });
      const data = await res.json();
      if (data.success) {
        setIsWishlisted(!isWishlisted);
        alert(
          isWishlisted
            ? "🗑️ Removed from wishlist"
            : "💖 Added to wishlist"
        );
      }
    } catch (err) {
      console.error("❌ Wishlist toggle error:", err);
    } finally {
      setTogglingWishlist(false);
    }
  };

  if (loading) return <p className="text-center py-5">Loading...</p>;
  if (!product) return <p className="text-center py-5">Product not found</p>;

  // ✅ Static demo thumbnails
  const thumbnails = [
    product.image,
    "https://via.placeholder.com/400x400?text=Side+1",
    "https://via.placeholder.com/400x400?text=Side+2",
    "https://via.placeholder.com/400x400?text=Back",
  ];

  // ✅ Static colors and sizes
  const staticColors = ["black", "blue", "red"];
  const staticSizes = ["S", "M", "L", "XL"];

  return (
    <div className="container product-view-container py-5">
      <div className="row g-5">
        {/* 🖼️ Left Side */}
        <div className="col-lg-6 text-center">
          <img
            src={mainImage}
            alt={product.name}
            className="main-image img-fluid rounded shadow-sm"
            style={{ maxHeight: "450px", objectFit: "cover" }}
          />
          <div className="d-flex justify-content-center gap-3 mt-4">
            {thumbnails.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                className={`img-thumbnail ${
                  mainImage === img ? "border-warning" : ""
                }`}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  cursor: "pointer",
                  borderRadius: "10px",
                }}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* 🧾 Right Side */}
        <div className="col-lg-6">
          <h2 className="fw-bold mb-2">{product.name}</h2>
          <p className="fs-5 text-success fw-semibold mb-2">
            ₹{product.price}
          </p>
          {product.averageRating ? (
            <p className="text-warning mb-3">
              ⭐ {product.averageRating.toFixed(1)} / 5
            </p>
          ) : (
            <p className="text-muted mb-3">No ratings yet</p>
          )}
          <p className="text-muted mb-4">{product.description}</p>

          {/* 🎨 Colors */}
          <div className="mb-3">
            <h6>Color:</h6>
            <div className="d-flex gap-3">
              {staticColors.map((color) => (
                <div
                  key={color}
                  className={`color-dot ${
                    selectedColor === color ? "active-color" : ""
                  }`}
                  style={{
                    backgroundColor: color,
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    border:
                      selectedColor === color
                        ? "2px solid #ffc107"
                        : "1px solid #ccc",
                  }}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
          </div>

          {/* 📏 Sizes */}
          <div className="mb-3">
            <h6>Size:</h6>
            <div className="d-flex gap-2 flex-wrap">
              {staticSizes.map((size) => (
                <button
                  key={size}
                  className={`btn btn-sm ${
                    selectedSize === size
                      ? "btn-warning"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex gap-3 mt-4">
            <button
              className="btn btn-dark d-flex align-items-center gap-2"
              onClick={handleAddToCart}
              disabled={adding}
            >
              {adding ? "Adding..." : <><ShoppingCart size={18} /> Add to Cart</>}
            </button>

            <button
              className={`btn d-flex align-items-center gap-2 ${
                isWishlisted ? "btn-outline-danger" : "btn-outline-dark"
              }`}
              onClick={handleToggleWishlist}
              disabled={togglingWishlist}
            >
              <Heart size={18} fill={isWishlisted ? "#e23" : "none"} />
              {isWishlisted ? "Wishlisted" : "Wishlist"}
            </button>
          </div>
        </div>
      </div>


        {/* 📝 Reviews Section */}
      <div className="reviews-section mt-5">
        <h4 className="fw-bold mb-4 text-center">⭐ Customer Reviews</h4>

        {product.reviews && product.reviews.length > 0 ? (
          <div className="row g-3">
            {product.reviews.map((rev, idx) => (
              <div key={idx} className="col-md-6">
                <div className="p-3 border rounded bg-light shadow-sm">
                  <div className="d-flex justify-content-between">
                    <strong>{rev.userName || "Anonymous"}</strong>
                    <span className="text-warning">
                      {"⭐".repeat(rev.rating)}{" "}
                      <span className="text-muted small">
                        ({rev.rating}/5)
                      </span>
                    </span>
                  </div>
                  <p className="mt-2 mb-0">{rev.comment}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted">
            No reviews yet for this product.
          </p>
        )}

        <div className="text-center mt-4">
          <button
            className="btn btn-outline-warning fw-semibold"
            onClick={() => navigate(`/review/${product._id}`)}
          >
            ✍️ Write a Review
          </button>
        </div>
      </div>

      {/* 🛍️ Related Products */}
      <div className="related-products mt-5">
        <h4 className="mb-4 fw-bold text-center">Related Products</h4>
        <div className="row g-4">
          {related.length > 0 ? (
            related.map((item) => (
              <div key={item._id} className="col-md-3">
                <div className="related-card text-center p-3 shadow-sm rounded">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="img-fluid mb-3 rounded"
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <h6 className="fw-semibold">{item.name}</h6>
                  <p className="text-success fw-bold mb-2">₹{item.price}</p>
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => navigate(`/product/${item._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No related products found.</p>
          )}
        </div>
      </div>

    
    </div>
  );
};

export default ProductView;
