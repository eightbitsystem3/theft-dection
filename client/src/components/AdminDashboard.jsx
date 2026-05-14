import React, { useEffect, useState } from "react";
import api from "../api";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    api.get("/users").then((res) => setUsers(res.data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/users/${userId}`);
        fetchUsers();
      } catch (err) {
        console.error(err);
        alert("Failed to delete user");
      }
    }
  };

  return (
    <div className="card">
      <h2>Enrolled Users</h2>
      {users.length === 0 ? (
        <div className="empty-state">No users enrolled yet.</div>
      ) : (
        <div className="user-grid">
          {users.map((u) => (
            <div key={u._id} className="user-card">
              {u.image && (
                <img
                  src={u.image}
                  alt={u.name}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: "15px",
                    border: "3px solid #667eea"
                  }}
                />
              )}
              <div className="user-name">{u.name}</div>
              <div className="user-email">{u.email}</div>
              <button
                className="delete-btn"
                onClick={() => handleDelete(u._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}