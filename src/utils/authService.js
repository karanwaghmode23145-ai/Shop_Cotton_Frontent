// src/utils/authService.js
// simple helpers for storing token/user & calling auth APIs

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001";

export const setAuth = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getToken = () => localStorage.getItem("token");
export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

// Login helper (returns { success, ... })
export const login = async (email, password) => {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

// Register helper
export const register = async (name, email, password) => {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
};

// Fetch profile using token
export const fetchProfile = async () => {
  const token = getToken();
  if (!token) return { success: false, message: "No token" };

  const res = await fetch(`${API_BASE}/api/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
