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
      confirmButtonColor: "#C10007",
      cancelButtonColor: "#000000",
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
    <div className="p-6 w-full">
      <h1 className="text-4xl font-bold mb-10 text-center text-[#C10007]">
        Manage Users
      </h1>

      <div className="grid grid-cols-6 gap-4 text-black font-semibold pb-2 mb-4 px-2">
        <div className="text-center">No</div>
        <div className="text-center">User</div>
        <div className="text-center">Email</div>
        <div className="text-center">Role</div>
        <div className="text-center">Status</div>
        <div className="text-center">Action</div>
      </div>

      <div className="space-y-6">
        {users.map((user, index) => (
          <div
            key={user._id}
            className="grid grid-cols-6 gap-4 bg-white rounded-3xl shadow-2xl p-6 transform transition-transform hover:-translate-y-2 hover:shadow-3xl border border-gray-200"
          >
            <div className="text-center font-bold text-black">{index + 1}</div>

            <div className="flex items-center justify-center gap-2 text-black font-medium">
              {user.name || "N/A"}
            </div>

            <div className="text-center text-black">{user.email}</div>

            <div className="text-center">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold`}
                style={{
                  backgroundColor:
                    user.role === "admin"
                      ? "#C10007"
                      : user.role === "chef"
                      ? "#000000"
                      : "#FFFFFF",
                  color:
                    user.role === "chef" ? "#FFFFFF" : user.role === "admin" ? "#FFF" : "#000",
                  border: user.role === "user" ? "1px solid #000" : "none",
                }}
              >
                {user.role}
              </span>
            </div>

            <div className="text-center">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold`}
                style={{
                  backgroundColor:
                    user.status === "fraud" ? "#C10007" : "#000000",
                  color: "#FFFFFF",
                }}
              >
                {user.status || "active"}
              </span>
            </div>

            <div className="flex justify-center">
              {user.status === "fraud" ? (
                <button
                  onClick={() => handleStatusChange(user._id, "active")}
                  className="bg-[#000000] hover:bg-gray-800 text-white px-4 py-2 rounded-xl font-semibold shadow-md transform transition hover:-translate-y-1 hover:shadow-lg"
                >
                  Activate
                </button>
              ) : (
                <button
                  onClick={() => handleStatusChange(user._id, "fraud")}
                  className="bg-[#C10007] hover:bg-red-800 text-white px-4 py-2 rounded-xl font-semibold shadow-md transform transition hover:-translate-y-1 hover:shadow-lg"
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
