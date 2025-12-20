import React, { useContext } from "react";
import { NavLink } from "react-router";
import { FiUser, FiClipboard, FiUsers, FiSettings } from "react-icons/fi";

import LogOutButton from "../../../Components/Buttons/LogOutButton";
import Logo from "../../../Components/Logo/Logo";
import { AuthContext } from "../../../Context/AuthContext";

const AdminDashSidebar = () => {
  const { UsersAllDataFromDB } = useContext(AuthContext);

  const IsActive = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-6 py-3 rounded-xl bg-[#C10007] text-white font-semibold shadow-lg transform transition-all duration-200 hover:scale-105"
      : "flex items-center gap-3 px-6 py-3 rounded-xl text-black hover:bg-[#C10007] hover:text-white hover:shadow-lg transform transition-all duration-200 hover:scale-105";

  return (
    <aside className="w-72 bg-white shadow-2xl h-screen flex flex-col justify-between border-r border-black">
      {/* Top Section */}
      <div>
        {/* Logo & Admin Info */}
        <div className="p-6 flex flex-col items-center border-b border-black/20">
          <Logo />

          <div className="mt-4 flex flex-col items-center">
            <img
              src={
                UsersAllDataFromDB?.profileImage ||
                "https://via.placeholder.com/80"
              }
              alt="Admin Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-[#C10007] shadow-lg"
            />

            <h2 className="mt-2 text-lg font-semibold text-black">
              {UsersAllDataFromDB?.name || "Admin"}
            </h2>

            <p className="text-sm text-[#C10007] capitalize">
              {UsersAllDataFromDB?.role || "admin"}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex flex-col gap-3 px-2">
          <NavLink to="" end className={IsActive}>
            <FiUser size={20} /> My Profile
          </NavLink>

          <NavLink to="ManageUser" className={IsActive}>
            <FiUsers size={20} /> Manage User
          </NavLink>

          <NavLink to="ManageRequest" className={IsActive}>
            <FiClipboard size={20} /> Manage Request
          </NavLink>

          <NavLink to="PlatformStatistics" className={IsActive}>
            <FiSettings size={20} /> Statistics
          </NavLink>
        </nav>
      </div>

      {/* Logout */}
      <div className="p-6 border-t border-black/20">
        <LogOutButton className="w-full bg-[#C10007] hover:bg-black text-white font-semibold py-2 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105" />
      </div>
    </aside>
  );
};

export default AdminDashSidebar;
