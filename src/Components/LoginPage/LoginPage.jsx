import React, { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { login, setAuth } from "../../utils/authService"; // 👈 helper import

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🔹 Input handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login(formData.email, formData.password); // 🔥 API call via helper
      setLoading(false);

      if (result.success) {
        // ✅ Save token & user in localStorage
        setAuth(result.token, result.user);

        alert("🎉 Login successful!");
        navigate("/"); // redirect to homepage
      } else {
        setError(result.message || "Invalid credentials!");
      }
    } catch (err) {
      console.error("❌ Login Error:", err);
      setError("Server error, please try later!");
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title mb-4">Welcome Back 👋</h2>
        <p className="text-muted mb-4">
          Login to your account to continue shopping
        </p>

        <form onSubmit={handleSubmit}>
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

          {error && <p className="text-danger small text-center">{error}</p>}

          <button
            type="submit"
            className="btn btn-warning w-100 py-2 fw-bold mb-3"
            disabled={loading}
          >
            {loading ? (
              "Logging in..."
            ) : (
              <>
                <LogIn size={18} className="me-1" /> Login
              </>
            )}
          </button>

          <p className="text-center small text-muted mb-0">
            Don’t have an account?{" "}
            <Link to="/register" className="text-warning fw-semibold">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
