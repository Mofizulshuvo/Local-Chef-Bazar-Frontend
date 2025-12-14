import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";
import { toast } from "react-toastify";

const AdminManageUser = () => {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // Update user role
  const handleRoleChange = async (uid, role) => {
    try {
      await axios.put(
        `http://localhost:3000/users/${uid}/role`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Role updated");
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update role");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h1 className="text-xl font-semibold mb-4">Manage Users</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm text-gray-600">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Chef ID</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="border-t text-sm hover:bg-gray-50"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 font-medium">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>

                <td className="px-4 py-3 capitalize">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold
                      ${
                        user.role === "admin"
                          ? "bg-blue-100 text-blue-600"
                          : user.role === "chef"
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold
                      ${
                        user.status === "active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                  >
                    {user.status || "active"}
                  </span>
                </td>

                <td className="px-4 py-3 text-xs">
                  {user.chefId || "—"}
                </td>

                <td className="px-4 py-3 text-center">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user.uid, e.target.value)
                    }
                    className="border rounded px-2 py-1 text-sm focus:outline-none"
                  >
                    <option value="user">User</option>
                    <option value="chef">Chef</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManageUser;
