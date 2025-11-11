import React, { useState, useEffect } from "react";

const EditProfile = ({ onCancel, onUpdate }) => {
  const [user, setUser] = useState({ name: "", email: "", avatar: "" });
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5001/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: user.name, avatar: user.avatar, password }),
      });

      const data = await res.json();
      if (data.success) {
        alert("✅ Profile updated successfully!");
        localStorage.setItem("user", JSON.stringify(data.user));
        onUpdate(data.user);
        onCancel();
      } else {
        alert("⚠️ " + data.message);
      }
    } catch (error) {
      console.error("❌ Update error:", error);
      alert("Server error, please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded shadow-sm"
      style={{ maxWidth: "600px" }}
    >
      <h4 className="fw-bold mb-4 text-center">✏️ Edit Profile</h4>

      <div className="text-center mb-4">
        <img
          src={user.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
          alt="Avatar"
          width="100"
          height="100"
          className="rounded-circle mb-2"
        />
        <input
          type="text"
          name="avatar"
          className="form-control"
          placeholder="Profile Image URL"
          value={user.avatar}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={user.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          value={user.email}
          disabled
        />
      </div>

      <div className="mb-3">
        <label>New Password (optional)</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="d-flex gap-3 mt-4">
        <button type="submit" className="btn btn-warning fw-bold w-100">
          Save Changes
        </button>
        <button
          type="button"
          className="btn btn-outline-dark w-100"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
