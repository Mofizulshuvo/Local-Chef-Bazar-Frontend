import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../../../../Components/Loader/Loader";

const AdminManageUser = () => {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (userId, status) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text:
        status === "fraud"
          ? "This user will be marked as fraud!"
          : "This user will be activated!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, continue",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.put(
        `http://localhost:3000/users/${userId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, status } : u))
      );

      toast.success(`User marked as ${status}`);
    } catch (err) {
      toast.error("Failed to update user status");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mx-auto my-auto h-64">
        <Loader className="mx-auto flex justify-center items-center" />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 w-full rounded-2xl mx-auto shadow-lg">
      <h1 className="text-3xl font-bold mb-10 mx-auto text-center ">Manage Users</h1>

  
      <div className="grid grid-cols-6  gap-4 text-gray-500 font-semibold pb-2 mb-4 px-2">
        <div className="text-center">No</div>
        <div className="text-center">User</div>
        <div className="text-center">Email</div>
        <div className="text-center">Role</div>
        <div className="text-center">Status</div>
        <div className="text-center">Action</div>
      </div>

     
      <div className="space-y-4">
        {users.map((user, index) => (
          <div
            key={user._id}
            className="grid grid-cols-6 gap-4 bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-xl transition items-center"
          >
            <div className="text-gray-400 mx-auto ">{index + 1}</div>

            <div className="flex mx-auto items-center gap-3">
            
              <span className="font-medium mx-auto ">{user.name || "N/A"}</span>
            </div>

            <div className="text-gray-600 mx-auto">{user.email}</div>

            <div className="text-center">
              <span
                className={`px-2 py-1 rounded text-xs mx-auto font-semibold ${
                  user.role === "admin"
                    ? "bg-blue-100 text-blue-600"
                    : user.role === "chef"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {user.role}
              </span>
            </div>

            <div className="text-center">
              <span
                className={`px-2 py-1 rounded text-xs mx-auto font-semibold ${
                  user.status === "fraud"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {user.status || "active"}
              </span>
            </div>

            <div className="text-center mx-auto">
              {user.status === "fraud" ? (
                <button
                  onClick={() => handleStatusChange(user._id, "active")}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-xs font-semibold"
                >
                  Activate
                </button>
              ) : (
                <button
                  onClick={() => handleStatusChange(user._id, "fraud")}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-xs font-semibold"
                >
                  Mark Fraud
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminManageUser;
