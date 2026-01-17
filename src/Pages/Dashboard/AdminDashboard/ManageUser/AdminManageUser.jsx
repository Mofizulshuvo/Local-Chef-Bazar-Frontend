import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FiUsers, FiUserCheck, FiUserX, FiShield, FiSearch, FiFilter } from "react-icons/fi";
import Loader from "../../../../Components/Loader/Loader";

const AdminManageUser = () => {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://local-chef-bazar-backend-1.onrender.com/users", {
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
          ? "This user will be marked as fraud and restricted from ordering!"
          : "This user will be activated and can place orders!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, continue",
      confirmButtonColor: status === "fraud" ? "#ef4444" : "#10b981",
      cancelButtonColor: "#6b7280",
      background: "rgba(255, 255, 255, 0.95)",
      backdrop: "rgba(0, 0, 0, 0.8)",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.put(
        `https://local-chef-bazar-backend-1.onrender.com/users/${userId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, status } : u))
      );

      toast.success(`User ${status === "fraud" ? "marked as fraud" : "activated"} successfully`);
    } catch (err) {
      toast.error("Failed to update user status");
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = !searchTerm ||
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" ||
      (statusFilter === "active" && user.status !== "fraud") ||
      (statusFilter === "fraud" && user.status === "fraud");

    return matchesSearch && matchesRole && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg shadow-red-500/25">
          <FiShield size={32} className="text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            User Management
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Manage user accounts, roles, and access permissions
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <FiUsers size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Users</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{users.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <FiUserCheck size={20} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Active Users</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {users.filter(u => u.status !== "fraud").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
              <FiShield size={20} className="text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Chefs</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {users.filter(u => u.role === "chef").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg">
              <FiUserX size={20} className="text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Restricted</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {users.filter(u => u.status === "fraud").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200/50 dark:border-slate-700/50">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <FiSearch size={20} className="text-slate-600 dark:text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FiFilter size={16} className="text-slate-600 dark:text-slate-400" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="chef">Chef</option>
                <option value="user">User</option>
              </select>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="fraud">Restricted</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user, index) => (
          <div
            key={user._id}
            className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
          >
            {/* User Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <img
                  src={user.profileImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"}
                  alt={user.name}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-slate-200 dark:border-slate-700"
                />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 ${
                  user.status === "fraud" ? "bg-red-500" : "bg-green-500"
                }`}></div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-white">{user.name || "N/A"}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{user.email}</p>
              </div>
            </div>

            {/* User Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Role:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.role === "admin" ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400" :
                  user.role === "chef" ? "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400" :
                  "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400"
                }`}>
                  {user.role}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.status === "fraud" ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400" :
                  "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400"
                }`}>
                  {user.status || "active"}
                </span>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => handleStatusChange(user._id, user.status === "fraud" ? "active" : "fraud")}
              className={`w-full py-2 px-4 rounded-xl font-medium transition-all duration-300 ${
                user.status === "fraud"
                  ? "bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25"
                  : "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25"
              }`}
            >
              {user.status === "fraud" ? "Activate User" : "Restrict User"}
            </button>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            No users found
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminManageUser;
