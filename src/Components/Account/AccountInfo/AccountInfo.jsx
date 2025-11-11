import React, { useEffect, useState } from "react";
import EditProfile from "./EditProfile";

const AccountInfo = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  if (!user)
    return <p className="text-center py-5">Please log in to view your profile.</p>;

  return (
    <div>
      {editing ? (
        <EditProfile onCancel={() => setEditing(false)} onUpdate={setUser} />
      ) : (
        <div className="p-4 bg-white rounded shadow-sm text-center">
          <img
            src={user.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            alt="Avatar"
            width="100"
            height="100"
            className="rounded-circle mb-3"
          />
          <h4 className="fw-bold">{user.name}</h4>
          <p className="text-muted">{user.email}</p>

          <button
            className="btn btn-warning fw-bold mt-3"
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountInfo;
