import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import * as SC from "../../style";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [usersRes, meRes] = await Promise.all([
          API.get("/api/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          API.get("/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUsers(usersRes.data);
        setCurrentUserId(meRes.data.user._id);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.message || err.message);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/api/admin/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <SC.Main8>
      <div className="text-white  min-h-screen p-6">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

        {error && <p className="text-red-500">{error}</p>}

        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user._id}
              className="border-b pb-2 flex justify-between items-center"
            >
              <span>
                {user.username} - {user.email}
              </span>
              {user._id !== currentUserId && (
                <button
                  className="bg-red-600 px-2 py-1 rounded"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              )}
              {user._id === currentUserId && (
                <span className="text-gray-400 italic text-sm">[You]</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </SC.Main8>
  );
}