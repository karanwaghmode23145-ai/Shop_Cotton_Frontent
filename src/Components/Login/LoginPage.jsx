import React, { useState } from "react";
import "./LoginPage.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Input handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Simple submit (no backend)
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (formData.email === "test@gmail.com" && formData.password === "123456") {
        alert("🎉 Login successful!");
        setLoading(false);
      } else {
        setError("Invalid email or password!");
        setLoading(false);
      }
    }, 1000);
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
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center small text-muted mb-0">
            Don’t have an account?{" "}
            <a href="#" className="text-warning fw-semibold">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
