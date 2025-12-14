import React, { useContext } from "react";
import { AuthContext } from "../../../../Context/AuthContext";

const ChefMyProfile = () => {
  const { UsersAllDataFromDB } = useContext(AuthContext);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">My Profile</h1>
        <p className="text-sm text-gray-500">Manage your personal information</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow p-6 max-w-4xl">
        {/* Top Section */}
        <div className="flex items-center gap-6">
          <img
            src={
              UsersAllDataFromDB?.profileImage ||
              "https://via.placeholder.com/120"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border"
          />

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {UsersAllDataFromDB?.name || "User Name"}
            </h2>
            <p className="text-sm text-gray-500">
              {UsersAllDataFromDB?.role || "User"}
            </p>
            <p className="text-sm text-gray-500">
              {UsersAllDataFromDB?.email || "user@email.com"}
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6" />

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500">Chef ID</p>
            <p className="font-medium text-gray-700">
              {UsersAllDataFromDB?.chefId || "Pending Approval"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Experience</p>
            <p className="font-medium text-gray-700">
              {UsersAllDataFromDB?.experience
                ? `${UsersAllDataFromDB.experience} years`
                : "N/A"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Account Status</p>
            <p className="font-medium text-gray-700">
              {UsersAllDataFromDB?.status || "Active"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Joined On</p>
            <p className="font-medium text-gray-700">
              {UsersAllDataFromDB?.createdAt
                ? new Date(UsersAllDataFromDB.createdAt).toDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-semibold">
            Edit Profile
          </button>
          <button className="px-4 py-2 border rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChefMyProfile;
