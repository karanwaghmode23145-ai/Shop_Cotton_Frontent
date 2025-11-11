import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="p-4 bg-white rounded shadow-sm text-center">
      <LogOut size={40} className="text-danger mb-3" />
      <h5>Are you sure you want to logout?</h5>
      <button
        className="btn btn-danger fw-bold mt-3"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
