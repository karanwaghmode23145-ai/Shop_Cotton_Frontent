import React from "react";
import { Link } from "react-router-dom";
import "./TrendingCategories.css";

const TrendingCategories = () => {
  const categories = [
    {
      title: "T-Shirts",
      image:
        "https://images.bewakoof.com/uploads/grid/app/New-Tiles-GPT-Women-1760960342.jpg",
      category: "tshirts",
    },
    {
      title: "Hoodies",
      image:
        "https://images.bewakoof.com/uploads/grid/app/New-Tiles-Plus-size-women--1--1760960339.jpg",
     category: "hoodies",
    },
    {
      title: "Jeans",
      image:
        "https://images.bewakoof.com/uploads/grid/app/New-Tiles-jackets-1762335758.jpg",
      category: "jeans",
    },
    {
      title: "Footwear",
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1000",
     category: "footwear",
    },
    {
      title: "Accessories",
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?w=1000",
      category: "accessories",
    },
    {
      title: "Jackets",
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1000",
      category: "jackets",
    },
  ];

  return (
    <section className="trending-section py-5">
      <div className="container">
        <h2 className="section-title text-center mb-5">🔥 Trending Categories</h2>

        <div className="row g-4">
          {categories.map((cat, index) => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
              <Link
                to={`/shop/${cat.category}`}
                className="trending-card d-block position-relative"
                style={{ backgroundImage: `url(${cat.image})` }}
              >
                <div className="trending-overlay"></div>
                <div className="trending-content">
                  <h3>{cat.title}</h3>
                  <span className="trending-btn">Shop Now →</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingCategories;
