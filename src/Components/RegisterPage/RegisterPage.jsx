import React, { useState } from "react";
import { Mail, Lock, User, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔹 Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        toast.success("🎉 Registration Successful!");
        navigate("/login");
      } else {
        toast.error(data.message || "Registration failed. Try again!");
      }
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Server error, please try later!");
      setLoading(false);
    }
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
            disabled={loading}
          >
            {loading ? "Registering..." : (
              <>
                <UserPlus size={18} className="me-1" /> Register
              </>
            )}
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
