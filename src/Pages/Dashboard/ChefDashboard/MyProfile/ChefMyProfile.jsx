import React, { useContext } from "react";
import { AuthContext } from "../../../../Context/AuthContext";

const ChefMyProfile = () => {
  const { UsersAllDataFromDB } = useContext(AuthContext);

  return (
    <div className="w-full mx-auto p-4 sm:p-6 md:p-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-black">My Profile</h1>
        <p className="text-sm text-black/50 mt-1">
          Manage your personal information
        </p>
      </div>

      <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-10">
        {/* Profile Image */}
        <div className="flex-shrink-0 flex justify-center md:justify-start">
          <img
            src={UsersAllDataFromDB?.profileImage || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-bold text-black truncate">
              {UsersAllDataFromDB?.name || "User Name"}
            </h2>
            <p className="text-sm text-black/70 capitalize">
              {UsersAllDataFromDB?.role || "User"}
            </p>
            <p className="text-sm text-black/50 truncate">{UsersAllDataFromDB?.email}</p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-black/70">
            <Info label="Chef ID" value={UsersAllDataFromDB?.chefId || "Pending"} />
            <Info
              label="Experience"
              value={
                UsersAllDataFromDB?.experience
                  ? `${UsersAllDataFromDB.experience} years`
                  : "N/A"
              }
            />
            <Info label="Account Status" value={UsersAllDataFromDB?.status || "Active"} />
            <Info
              label="Joined On"
              value={
                UsersAllDataFromDB?.createdAt
                  ? new Date(UsersAllDataFromDB.createdAt).toDateString()
                  : "N/A"
              }
            />
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button className="w-full sm:w-auto px-6 py-2 bg-[#C10007] text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform">
              Edit Profile
            </button>
            <button className="w-full sm:w-auto px-6 py-2 bg-black/10 text-black font-semibold rounded-xl hover:bg-black/20 transition-colors">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-black/50 text-xs">{label}</span>
    <span className="font-medium text-black truncate">{value || "-"}</span>
  </div>
);

export default ChefMyProfile;
