import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiUser,
  FiClipboard,
  FiUsers,
  FiSettings,
  FiMenu,
  FiX,
  FiHome,
  FiBarChart,
  FiShield,
} from "react-icons/fi";

import LogOutButton from "../../../Components/Buttons/LogOutButton";
import Logo from "../../../Components/Logo/Logo";
import { AuthContext } from "../../../Context/AuthContext";

const AdminDashSidebar = () => {
  const { UsersAllDataFromDB } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const IsActive = ({ isActive }) =>
    isActive
      ? "group relative flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold shadow-lg shadow-red-500/25 border border-red-500/20"
      : "group relative flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800/60 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300 hover:scale-[1.02] border border-transparent hover:border-slate-200/50 dark:hover:border-slate-700/50";

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300"
        >
          {isOpen ? <FiX size={20} className="text-slate-700 dark:text-slate-300" /> : <FiMenu size={20} className="text-slate-700 dark:text-slate-300" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50
          flex flex-col justify-between shadow-2xl shadow-slate-900/10 dark:shadow-slate-900/50
          transform transition-all duration-300 ease-in-out z-40
          lg:translate-x-0 lg:static lg:shadow-none
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg">
              <FiShield size={32} className="text-white" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Admin Panel
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Management Dashboard
              </p>
            </div>
          </div>

          {/* Profile Section */}
          <div className="mt-6 flex flex-col items-center space-y-3">
            <div className="relative">
              <img
                src={
                  UsersAllDataFromDB?.profileImage ||
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                }
                alt="Admin Profile"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-red-500/20 shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {UsersAllDataFromDB?.name || "Admin"}
              </h3>
              <p className="text-xs text-red-600 dark:text-red-400 font-medium uppercase tracking-wide">
                {UsersAllDataFromDB?.role || "admin"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {/* Quick Actions */}
          <div className="flex items-center justify-center mb-6">
            <NavLink
              to="/"
              className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 group"
              title="Go Home"
            >
              <FiHome size={18} className="text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white" />
            </NavLink>
          </div>

          {/* Menu Items */}
          <div className="space-y-1">
            <NavLink to="" end className={IsActive}>
              <FiUser size={20} />
              <span>My Profile</span>
              <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </NavLink>

            <NavLink to="ManageUser" className={IsActive}>
              <FiUsers size={20} />
              <span>Manage Users</span>
              <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </NavLink>

            <NavLink to="ManageRequest" className={IsActive}>
              <FiClipboard size={20} />
              <span>Manage Requests</span>
              <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </NavLink>

            <NavLink to="PlatformStatistics" className={IsActive}>
              <FiBarChart size={20} />
              <span>Platform Statistics</span>
              <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </NavLink>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200/50 dark:border-slate-700/50">
          <LogOutButton className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 hover:scale-[1.02] border border-red-500/20" />
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default AdminDashSidebar;
