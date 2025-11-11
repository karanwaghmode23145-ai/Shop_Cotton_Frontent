import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, clearAuth } from "../../utils/authService";
import { Menu, X } from "lucide-react"; // icons
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const user = getUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
    window.location.reload();
  };

  return (
    <header className="main-header shadow-sm sticky-top">
      <div className="container d-flex justify-content-between align-items-center py-3">
        {/* 🛍️ Logo */}
        <Link to="/" className="logo text-warning fw-bold fs-3 text-decoration-none">
          MyShop
        </Link>

        {/* 🔹 Desktop Navigation */}
        <nav className={`nav-links d-none d-md-flex align-items-center gap-3`}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/shop" className="nav-link">Shop</Link>
          <Link to="/cart" className="nav-link">Cart</Link>
          <Link to="/wishlist" className="nav-link">Wishlist</Link>
        </nav>

        {/* 🔹 Desktop Auth Section */}
        <div className="auth-section d-none d-md-flex align-items-center gap-3">
          {user ? (
            <>
              <span className="fw-semibold text-dark">
                👋 Hello, <span className="text-warning">{user.name.split(" ")[0]}</span>
              </span>
              <Link to="/accountdashboard" className="btn btn-sm btn-outline-dark rounded-pill px-3">
                Account
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-danger rounded-pill px-3"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-sm btn-outline-dark rounded-pill px-3"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-sm btn-warning text-dark fw-semibold rounded-pill px-3"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* 🔹 Mobile Menu Icon */}
        <button
          className="menu-toggle d-md-none btn border-0"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 🔹 Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="mobile-menu animate__animated animate__fadeInDown">
          <div className="container">
            <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/shoppage" className="nav-link" onClick={() => setMenuOpen(false)}>Shop</Link>
            <Link to="/cart" className="nav-link" onClick={() => setMenuOpen(false)}>Cart</Link>
            <Link to="/wishlist" className="nav-link" onClick={() => setMenuOpen(false)}>Wishlist</Link>
            <hr />
            {user ? (
              <>
                <span className="fw-semibold text-dark d-block mb-2">
                  👋 Hello, <span className="text-warning">{user.name.split(" ")[0]}</span>
                </span>
                <Link to="/accountdashboard" className="nav-link" onClick={() => setMenuOpen(false)}>
                  My Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-danger w-100 mt-3"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-outline-dark w-100 mt-2"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-warning w-100 mt-2"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
