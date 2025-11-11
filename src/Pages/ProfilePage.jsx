// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { fetchProfile } from "../utils/authService";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await fetchProfile();
      if (!mounted) return;
      if (res.success) {
        setProfile(res.user);
      } else {
        setError(res.message || "Failed to fetch profile");
      }
      setLoading(false);
    })();
    return () => (mounted = false);
  }, []);

  if (loading) return <div className="container py-5">Loading profile...</div>;
  if (error) return <div className="container py-5 text-danger">{error}</div>;

  return (
    <div className="container py-5">
      <h2>My Profile</h2>
      <div className="card p-4 mt-3">
        <div><strong>Name:</strong> {profile.name}</div>
        <div><strong>Email:</strong> {profile.email}</div>
        <div><strong>Role:</strong> {profile.role || "user"}</div>
        <div><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}</div>
      </div>
    </div>
  );
};

export default ProfilePage;
