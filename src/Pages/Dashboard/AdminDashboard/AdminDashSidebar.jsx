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

 const IsActive = ({ isActive }) =>
    isActive
       ? "flex items-center gap-3 px-6 py-3 rounded-lg bg-yellow-500 text-white font-semibold transition-all duration-200"
      : "flex items-center gap-3 px-6 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200";
     

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
        <nav className="mt-6 flex flex-col gap-2 px-2">
          <NavLink to="" end className={IsActive}>
                 <FiUser size={20} /> My Profile    
          </NavLink>

          <NavLink to="ManageUser" className={IsActive}>
               <FiUsers size={20} />Manage User      
          </NavLink>

          <NavLink to="ManageRequest" className={IsActive}>
                  <FiClipboard size={20} />Manage Request  
          </NavLink>

          <NavLink to="PlatformStatistics" className={IsActive}>
                <FiSettings size={20} />
                <span>Statistics</span>  
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
