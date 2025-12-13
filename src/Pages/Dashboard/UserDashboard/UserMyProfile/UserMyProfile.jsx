import React, { useContext } from "react";
import { AuthContext } from "../../../../Context/AuthContext";

const UserMyProfile = () => {
  const { UsersAllDataFromDB } = useContext(AuthContext);

  return (
    <div className="w-4/5 flex justify-center ">
      <div className="w-full  bg-white shadow-lg rounded-xl p-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <img
            src={UsersAllDataFromDB?.profileImage || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
          />
          <h1 className="mt-4 text-2xl font-bold text-gray-800">
            {UsersAllDataFromDB?.name || "User Name"}
          </h1>
          <p className="mt-1 text-gray-500">{UsersAllDataFromDB?.role || "User"}</p>
        </div>

        {/* User Info Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <h2 className="text-gray-400 text-sm">Email</h2>
            <p className="text-gray-700 font-medium">{UsersAllDataFromDB?.email}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <h2 className="text-gray-400 text-sm">Address</h2>
            <p className="text-gray-700 font-medium">{UsersAllDataFromDB?.address}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <h2 className="text-gray-400 text-sm">Role</h2>
            <p className="text-gray-700 font-medium">{UsersAllDataFromDB?.role}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <h2 className="text-gray-400 text-sm">Status</h2>
            <p className="text-gray-700 font-medium">{UsersAllDataFromDB?.status || "Active"}</p>
          </div>

          {/* Conditional Chef Id */}
          {UsersAllDataFromDB?.role === "chef" && (
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <h2 className="text-gray-400 text-sm">Chef ID</h2>
              <p className="text-gray-700 font-medium">{UsersAllDataFromDB?.chefId || "N/A"}</p>
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 col-span-1 sm:col-span-2">
            <h2 className="text-gray-400 text-sm">Profile Image URL</h2>
            <p className="text-gray-700 font-medium break-words">
              {UsersAllDataFromDB?.profileImage || "Not provided"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200">
            Become a Chef
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200">
            Become an Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMyProfile;
