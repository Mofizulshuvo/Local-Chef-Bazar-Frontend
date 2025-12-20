import React, { useContext } from "react";
import { AuthContext } from "../../../../Context/AuthContext";

const ChefMyProfile = () => {
  const { UsersAllDataFromDB } = useContext(AuthContext);

  return (
    <div className="w-full mx-auto p-6">
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-black text-center">My Profile</h1>
        <p className="text-sm text-black/50 text-center">Manage your personal information</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-10 flex flex-col md:flex-row gap-8">
        {/* Profile Image */}
        <div className="flex-shrink-0 flex justify-center md:justify-start">
          <img
            src={
              UsersAllDataFromDB?.profileImage ||
              "https://via.placeholder.com/150"
            }
            alt="Profile"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-black">
              {UsersAllDataFromDB?.name || "User Name"}
            </h2>
            <p className="text-sm text-black/70 capitalize">
              {UsersAllDataFromDB?.role || "User"}
            </p>
            <p className="text-sm text-black/50">{UsersAllDataFromDB?.email}</p>
          </div>

          {/* Details Grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-black/70">
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

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4 flex-wrap">
            <button className="px-6 py-2 bg-[#C10007] text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform">
              Edit Profile
            </button>
            <button className="px-6 py-2 bg-black/10 text-black font-semibold rounded-xl hover:bg-black/20 transition-colors">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Small Info Component ---------- */
const Info = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-black/50 text-xs">{label}</span>
    <span className="font-medium text-black">{value || "-"}</span>
  </div>
);

export default ChefMyProfile;
