import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container py-5">
        <div className="row g-4">
          {/* 🌐 Column 1 */}
          <div className="col-lg-3 col-md-6">
            <h4 className="footer-logo">ShopEase</h4>
            <p className="footer-desc">
              Bringing you quality products at the best prices. Shop with
              confidence and enjoy fast delivery every day!
            </p>
            <div className="footer-social">
              <a href="#"><Facebook /></a>
              <a href="#"><Instagram /></a>
              <a href="#"><Twitter /></a>
              <a href="#"><Youtube /></a>
            </div>
          </div>

          {/* 🛍️ Column 2 */}
          <div className="col-lg-2 col-md-6">
            <h5 className="footer-title">Shop</h5>
            <ul className="footer-links">
              <li><a href="#">Men’s Fashion</a></li>
              <li><a href="#">Women’s Fashion</a></li>
              <li><a href="#">Electronics</a></li>
              <li><a href="#">Home & Living</a></li>
              <li><a href="#">Beauty</a></li>
            </ul>
          </div>

          {/* 🧾 Column 3 */}
          <div className="col-lg-2 col-md-6">
            <h5 className="footer-title">Help</h5>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          {/* 📞 Column 4 */}
          <div className="col-lg-3 col-md-6">
            <h5 className="footer-title">Contact</h5>
            <ul className="footer-contact">
              <li><MapPin size={18} /> 123 Market Street, Mumbai, India</li>
              <li><Phone size={18} /> +91 98765 43210</li>
              <li><Mail size={18} /> support@shopease.com</li>
            </ul>
          </div>
        </div>

        <hr className="footer-divider" />

        {/* 🔻 Bottom */}
        <div className="footer-bottom text-center">
          <p className="mb-0">
            © {new Date().getFullYear()} <strong>ShopEase</strong>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
