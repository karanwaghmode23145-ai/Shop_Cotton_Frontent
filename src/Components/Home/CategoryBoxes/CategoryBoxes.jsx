import React from "react";
import { Link } from "react-router-dom";
import "./CategoryBoxes.css";

const CategoryBoxes = () => {
  const categories = [
    {
      title: "Men's Collection",
      subtitle: "Latest trends & everyday essentials",
      image: "https://images.bewakoof.com/nav_menu/1x1-NEW-IK-1-1762527256.jpg",
      category: "Men", // ✅ Added category slug
    },
    {
      title: "Women's Fashion",
      subtitle: "Bold, beautiful & timeless designs",
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1000",
      category: "Women", // ✅ Added category slug
    },
  ];

  return (
    <section className="category-section py-5">
      <div className="container">
        <h2 className="category-heading mb-5 text-center">
          Shop by Category
        </h2>
        <div className="row g-4">
          {categories.map((cat, index) => (
            <div className="col-lg-6 col-md-12" key={index}>
              <Link
                to={`/shop/${cat.category}`} // ✅ Dynamic link
                className="category-card d-block position-relative"
                style={{
                  backgroundImage: `url(${cat.image})`,
                }}
              >
                <div className="category-overlay"></div>
                <div className="category-content">
                  <h3>{cat.title}</h3>
                  <p>{cat.subtitle}</p>
                  <span className="category-btn">Explore →</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryBoxes;
