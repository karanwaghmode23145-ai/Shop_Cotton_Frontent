import React, { useEffect, useState } from "react";
import { Grid, List } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import "./ShopPageMain.css";

const ShopPageMain = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState(5000);
  const [sortType, setSortType] = useState("default");
  const navigate = useNavigate();
  const { category } = useParams();

  // 🧠 Fetch products (All or by Category)
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = "http://localhost:5001/api/products";
        if (category) {
          url = `http://localhost:5001/api/products/category/${category}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
          setFilteredProducts(data.products);
        }
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  // 🆕 Fetch Recent Products
  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await fetch(
          "http://localhost:5001/api/products?limit=3&sort=desc"
        );
        const data = await res.json();
        if (data.success) setRecentProducts(data.products);
      } catch (err) {
        console.error("❌ Error fetching recent products:", err);
      }
    };
    fetchRecent();
  }, []);

  // 💰 Filter by price range
  useEffect(() => {
    const filtered = products.filter((item) => item.price <= priceRange);
    setFilteredProducts(filtered);
  }, [priceRange, products]);

  // 🔃 Sorting logic
  const handleSort = (type) => {
    setSortType(type);
    let sorted = [...filteredProducts];
    if (type === "lowToHigh") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (type === "highToLow") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (type === "newest") {
      sorted.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    setFilteredProducts(sorted);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <h4>Loading products...</h4>
      </div>
    );
  }

  return (
    <div className="shop-page-wrapper py-5">
      <div className="container">
        <div className="row g-4">
          {/* ✅ LEFT SIDEBAR FILTERS */}
          <div className="col-lg-3">
            {/* Category Filter */}
            <div className="filter-box mb-4">
              <h5 className="filter-title">Filter By Categories</h5>
              <ul className="filter-list">
                <li onClick={() => navigate("/shop/Men")}>
                  <input
                    type="checkbox"
                    checked={category === "Men"}
                    readOnly
                  />{" "}
                  Men
                </li>
                <li onClick={() => navigate("/shop/Women")}>
                  <input
                    type="checkbox"
                    checked={category === "Women"}
                    readOnly
                  />{" "}
                  Women
                </li>
                 <li onClick={() => navigate("/shop/tshirts")}>
                  <input
                    type="checkbox"
                    checked={category === "tshirts"}
                    readOnly
                  />{" "}
                  tshirts
                </li>
                <li onClick={() => navigate("/shop/hoodies")}>
                  <input
                    type="checkbox"
                    checked={category === "hoodies"}
                    readOnly
                  />{" "}
                  hoodies
                </li>
                <li onClick={() => navigate("/shop/jeans")}>
                  <input
                    type="checkbox"
                    checked={category === "jeans"}
                    readOnly
                  />{" "}
                  jeans
                </li>
                <li onClick={() => navigate("/shop/footwear")}>
                  <input
                    type="checkbox"
                    checked={category === "footwear"}
                    readOnly
                  />{" "}
                  footwear
                </li>
                <li onClick={() => navigate("/shop/jackets")}>
                  <input
                    type="checkbox"
                    checked={category === "jackets"}
                    readOnly
                  />{" "}
                  jackets
                </li>
                <li onClick={() => navigate("/shop")}>
                  <input type="checkbox" checked={!category} readOnly /> All
                </li>
              </ul>
            </div>

            {/* 💰 Filter by Price */}
            <div className="filter-box mb-4">
              <h5 className="filter-title">Filter By Price</h5>
              <input
                type="range"
                className="form-range"
                min="0"
                max="5000"
                step="100"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              />
              <div className="d-flex justify-content-between">
                <span>₹0</span>
                <span>₹{priceRange}</span>
              </div>
            </div>

            {/* 🔄 Sort Options */}
            <div className="filter-box mb-4">
              <h5 className="filter-title">Sort By</h5>
              <select
                className="form-select"
                value={sortType}
                onChange={(e) => handleSort(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="lowToHigh">Price: Low → High</option>
                <option value="highToLow">Price: High → Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {/* 🆕 Recent Products */}
            <div className="filter-box">
              <h5 className="filter-title">Recent Products</h5>
              <div className="recent-products">
                {recentProducts.length === 0 ? (
                  <p className="text-muted small">
                    No recent products available.
                  </p>
                ) : (
                  recentProducts.slice(0, 4).map((item) => (
                    <div
                      key={item._id}
                      className="recent-item d-flex align-items-center mb-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/product/${item._id}`)}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="recent-thumb rounded me-3"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <h6 className="mb-1">{item.name}</h6>
                        <span className="text-warning fw-bold small">
                          ₹{item.price}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* ✅ RIGHT: PRODUCT LIST */}
          <div className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold mb-0">
                {category ? `${category} Collection` : "All Products"}
              </h4>

              <div className="view-toggle">
                <button
                  className={`toggle-btn ${
                    viewMode === "grid" ? "active" : ""
                  }`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid size={18} /> Grid
                </button>
                <button
                  className={`toggle-btn ${
                    viewMode === "list" ? "active" : ""
                  }`}
                  onClick={() => setViewMode("list")}
                >
                  <List size={18} /> List
                </button>
              </div>
            </div>

            {/* Product Cards */}
            <div
              className={`products-wrapper row ${
                viewMode === "list" ? "list-view" : ""
              }`}
            >
              {filteredProducts.map((item) => (
                <div
                  key={item._id}
                  className={`${
                    viewMode === "grid" ? "col-md-4" : "col-12"
                  } mb-4`}
                  onClick={() => navigate(`/product/${item._id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card h-100 border-0 shadow-sm product-card">
                    <div className="card-img-top-wrapper">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="card-img-top rounded-3"
                        style={{
                          height: "250px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="card-body text-center">
                      <h5 className="fw-semibold">{item.name}</h5>
                      <p className="text-warning fw-bold mb-0">₹{item.price}</p>
                      <p className="text-muted small mb-2">
                        {item.category || "General"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {!filteredProducts.length && (
              <p className="text-center text-muted mt-4">
                No products available in this price range or category.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPageMain;
