import React, { useState } from "react";
import { Mail, Lock, User, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import "./RegisterPage.css";

const RegisterPage = () => {
  // State to store input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Just show alert instead of calling API
    alert(
      `✅ Registration Successful!\n\nName: ${formData.name}\nEmail: ${formData.email}\nPassword: ${formData.password}`
    );

    // Reset form after submit
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h2 className="register-title mb-4">Create Account 📝</h2>
        <p className="text-muted mb-4">
          Join us and start your shopping journey today!
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <User className="input-icon" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group mb-3">
            <Mail className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group mb-3">
            <Lock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-warning w-100 py-2 fw-bold mb-3"
          >
            <UserPlus size={18} className="me-1" /> Register
          </button>

          <p className="text-center small text-muted mb-0">
            Already have an account?{" "}
            <Link to="/login" className="text-warning fw-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
