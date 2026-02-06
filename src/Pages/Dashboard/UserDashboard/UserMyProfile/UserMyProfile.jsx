import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import axios from "axios";
import { FiUser, FiMail, FiMapPin, FiShield, FiCheckCircle, FiClock, FiUserCheck } from "react-icons/fi";
import { ChefHat, UserCheck } from "lucide-react";
import { toast } from "react-toastify";

const UserMyProfile = () => {
  const { UsersAllDataFromDB } = useContext(AuthContext);

  const [requestData, setRequestData] = useState(null);
  const [requestLoading, setRequestLoading] = useState(true);

  const fetchRequestStatus = async () => {
    if (!UsersAllDataFromDB?.uid) return;
    setRequestLoading(true);
    try {
      const res = await axios.get(
        `https://local-chef-bazar-backend-1.onrender.com/request/${UsersAllDataFromDB.uid}`
      );
      setRequestData(res.data);
    } catch {
      setRequestData(null);
    } finally {
      setRequestLoading(false);
    }
  };

  useEffect(() => {
    fetchRequestStatus();
  }, [UsersAllDataFromDB?.uid]);

  const handleRequestChef = async () => {
    try {
      await axios.post("https://local-chef-bazar-backend-1.onrender.com/request", {
        uid: UsersAllDataFromDB.uid,
        name: UsersAllDataFromDB.name,
        currentRole: UsersAllDataFromDB.role,
        requestFor: "chef",
      });
      await fetchRequestStatus();
      toast.success("Chef request submitted successfully!");
    } catch {
      toast.error("Failed to submit chef request");
    }
  };

  const handleRequestAdmin = async () => {
    try {
      await axios.post("https://local-chef-bazar-backend-1.onrender.com/request", {
        uid: UsersAllDataFromDB.uid,
        name: UsersAllDataFromDB.name,
        currentRole: UsersAllDataFromDB.role,
        requestFor: "admin",
      });
      await fetchRequestStatus();
      toast.success("Admin request submitted successfully!");
    } catch {
      toast.error("Failed to submit admin request");
    }
  };

  if (!UsersAllDataFromDB) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl shadow-lg shadow-red-500/25">
          <FiUser size={36} className="text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            My Profile
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Manage your account information and role requests
          </p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200/50 dark:border-slate-700/50">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="relative">
            <img
              src={UsersAllDataFromDB.profileImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face"}
              alt="Profile"
              className="w-24 h-24 rounded-3xl object-cover border-4 border-white dark:border-slate-700 shadow-lg"
            />
            <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-white dark:border-slate-800 ${
              UsersAllDataFromDB.status === "fraud" ? "bg-red-500" : "bg-green-500"
            }`}></div>
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {UsersAllDataFromDB.name}
            </h2>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                UsersAllDataFromDB.role === "admin" ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400" :
                UsersAllDataFromDB.role === "chef" ? "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400" :
                "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400"
              }`}>
                {UsersAllDataFromDB.role}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                UsersAllDataFromDB.status === "fraud" ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400" :
                "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400"
              }`}>
                {UsersAllDataFromDB.status || "active"}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <FiMail size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Email Address</p>
                <p className="text-slate-900 dark:text-white font-medium">{UsersAllDataFromDB.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                <FiMapPin size={20} className="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Address</p>
                <p className="text-slate-900 dark:text-white font-medium">{UsersAllDataFromDB.address || "Not provided"}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                <FiShield size={20} className="text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Current Role</p>
                <p className="text-slate-900 dark:text-white font-medium capitalize">{UsersAllDataFromDB.role}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
                <FiCheckCircle size={20} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Account Status</p>
                <p className="text-slate-900 dark:text-white font-medium capitalize">{UsersAllDataFromDB.status || "Active"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Role Request Section */}
      <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200/50 dark:border-slate-700/50">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Role Advancement</h3>
          <p className="text-slate-600 dark:text-slate-400">Apply for higher privileges to access more features</p>
        </div>

        {requestLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            <span className="ml-3 text-slate-600 dark:text-slate-400">Checking request status...</span>
          </div>
        ) : requestData?.requestStatus === "pending" ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 dark:bg-yellow-900/50 rounded-2xl mb-4">
              <FiClock size={24} className="text-yellow-600 dark:text-yellow-400" />
            </div>
            <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Request Pending</h4>
            <p className="text-slate-600 dark:text-slate-400">Your request is being reviewed by administrators</p>
          </div>
        ) : requestData?.requestStatus === "approved" ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-2xl mb-4">
              <FiCheckCircle size={24} className="text-green-600 dark:text-green-400" />
            </div>
            <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Request Approved</h4>
            <p className="text-slate-600 dark:text-slate-400">Your role has been updated successfully</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl p-6 border border-orange-200 dark:border-orange-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-xl">
                  <ChefHat size={24} className="text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Become a Chef</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Share your culinary skills</p>
                </div>
              </div>
              <button
                onClick={handleRequestChef}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 hover:scale-[1.02]"
              >
                Request Chef Role
              </button>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-2xl p-6 border border-red-200 dark:border-red-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-100 dark:bg-red-900/50 rounded-xl">
                  <UserCheck size={24} className="text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Become an Admin</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Manage the platform</p>
                </div>
              </div>
              <button
                onClick={handleRequestAdmin}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 hover:scale-[1.02]"
              >
                Request Admin Role
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMyProfile;
