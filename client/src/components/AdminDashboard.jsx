import React, { useEffect, useState } from "react";
import api from "../api";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {users.map((u) => (
        <div key={u._id}>
          {u.name} - {u.email}
        </div>
      ))}
    </div>
  );
}