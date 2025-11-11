import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="main-header shadow-sm sticky-top">
      <div className="container d-flex justify-content-between align-items-center py-3">
        {/* 🛍️ Logo */}
        <Link to="/" className="logo text-warning fw-bold fs-3 text-decoration-none">
          MyShop
        </Link>

        {/* 🔹 Desktop Navigation */}
        <nav className="d-none d-md-flex align-items-center gap-3">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/shop" className="nav-link">Shop</Link>
          <Link to="/cart" className="nav-link">Cart</Link>
          <Link to="/wishlist" className="nav-link">Wishlist</Link>
        </nav>

        {/* 🔹 Desktop Buttons */}
        <div className="d-none d-md-flex align-items-center gap-3">
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
        </div>

        {/* 🔹 Mobile Menu Button */}
        <button
          className="menu-toggle d-md-none btn border-0"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 🔹 Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu animate__animated animate__fadeInDown">
          <div className="container d-flex flex-column gap-2">
            <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/shop" className="nav-link" onClick={() => setMenuOpen(false)}>Shop</Link>
            <Link to="/cart" className="nav-link" onClick={() => setMenuOpen(false)}>Cart</Link>
            <Link to="/wishlist" className="nav-link" onClick={() => setMenuOpen(false)}>Wishlist</Link>
            <hr />
            <Link to="/login" className="btn btn-outline-dark w-100 mt-2" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
            <Link to="/register" className="btn btn-warning w-100 mt-2" onClick={() => setMenuOpen(false)}>
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
