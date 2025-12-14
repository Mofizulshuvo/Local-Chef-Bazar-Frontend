import React, { useContext } from "react";
import { NavLink } from "react-router";
import {
  FiUser,
  FiClipboard,
  FiUsers,
  FiSettings,
} from "react-icons/fi";

import LogOutButton from "../../../Components/Buttons/LogOutButton";
import Logo from "../../../Components/Logo/Logo";
import { AuthContext } from "../../../Context/AuthContext";

const AdminDashSidebar = () => {
  const { UsersAllDataFromDB } = useContext(AuthContext);

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-200 relative
     ${
       isActive
         ? "bg-blue-500 text-white font-semibold"
         : "text-gray-600 hover:bg-gray-100"
     }`;

  return (
    <aside className="w-72 bg-white shadow-lg h-screen flex flex-col justify-between">
      {/* Top */}
      <div>
        {/* Logo & Admin Info */}
        <div className="p-6 flex flex-col items-center border-b">
          <Logo />

          <div className="mt-4 flex flex-col items-center">
            <img
              src={
                UsersAllDataFromDB?.profileImage ||
                "https://via.placeholder.com/80"
              }
              alt="Admin Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
            />

            <h2 className="mt-2 text-lg font-semibold text-gray-700">
              {UsersAllDataFromDB?.name || "Admin"}
            </h2>

            <p className="text-sm text-gray-500 capitalize">
              {UsersAllDataFromDB?.role || "admin"}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex flex-col gap-1 px-2">
          <NavLink to="" className={navLinkClass}>
            {({ isActive }) => (
              <>
                {/* Active Indicator */}
                {isActive && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r"></span>
                )}
                <FiUser size={20} />
                <span>My Profile</span>
              </>
            )}
          </NavLink>

          <NavLink to="ManageUser" className={navLinkClass}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r"></span>
                )}
                <FiUsers size={20} />
                <span>Manage Users</span>
              </>
            )}
          </NavLink>

          <NavLink to="/admin/meals" className={navLinkClass}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r"></span>
                )}
                <FiClipboard size={20} />
                <span>Manage Meals</span>
              </>
            )}
          </NavLink>

          <NavLink to="/admin/settings" className={navLinkClass}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r"></span>
                )}
                <FiSettings size={20} />
                <span>Settings</span>
              </>
            )}
          </NavLink>
        </nav>
      </div>

      {/* Logout */}
      <div className="p-6 border-t">
        <LogOutButton className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-all duration-200" />
      </div>
    </aside>
  );
};

export default AdminDashSidebar;
