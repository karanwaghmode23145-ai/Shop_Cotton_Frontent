import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "./NewArrivals.css";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🧠 Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/products");
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="new-arrivals py-5 text-center">
        <div className="container">
          <h2 className="section-title mb-3">New Arrivals</h2>
          <p>Loading products...</p>
        </div>
      </section>
    );
  }

  if (!products.length) {
    return (
      <section className="new-arrivals py-5 text-center">
        <div className="container">
          <h2 className="section-title mb-3">New Arrivals</h2>
          <p>No products available yet. Add some products first.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="new-arrivals py-5">
      <div className="container-fluid px-5">
        <h2 className="section-title text-center mb-4">✨ New Arrivals</h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={25}
          slidesPerView={4.3}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          breakpoints={{
            320: { slidesPerView: 1.2 },
            576: { slidesPerView: 2.2 },
            768: { slidesPerView: 3.2 },
            1200: { slidesPerView: 4.3 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <div
                className="product-card"
                onClick={() => navigate(`/product/${product._id}`)} // ✅ navigate to product page
                style={{ cursor: "pointer" }}
              >
                <div className="discount-badge">New</div>
                <button
                  className="wishlist-btn"
                  onClick={(e) => e.stopPropagation()} // prevents navigation on wishlist click
                >
                  <Heart size={18} />
                </button>

                <div className="product-image">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="img-fluid"
                  />
                </div>

                <div className="product-info">
                  <h5>{product.name}</h5>
                  <p className="text-muted small">{product.category}</p>

                  <div className="price-box">
                    <span className="price">₹{product.price}</span>
                  </div>

                  <button
                    className="add-btn"
                    onClick={(e) => e.stopPropagation()} // stops card click
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default NewArrivals;
