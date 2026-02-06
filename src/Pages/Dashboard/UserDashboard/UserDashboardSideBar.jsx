import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import Logo from "../../../Components/Logo/Logo";
import LogOutButton from "../../../Components/Buttons/LogOutButton";
import {
  FiUser,
  FiShoppingCart,
  FiHeart,
  FiStar,
  FiMenu,
  FiX,
  FiHome,
  FiArrowLeft,
  FiUserCheck,
} from "react-icons/fi";

const UserDashboardSideBar = () => {
  const { UsersAllDataFromDB } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const activeClass = ({ isActive }) =>
    isActive
      ? "group relative flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold shadow-lg shadow-red-500/25 border border-red-500/20"
      : "group relative flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-700 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-800/60 hover:shadow-lg hover:shadow-red-200/50 dark:hover:shadow-red-900/50 transition-all duration-300 hover:scale-[1.02] border border-transparent hover:border-red-200/50 dark:hover:border-red-700/50";

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="p-3 bg-white/90 dark:bg-slate-800/80 backdrop-blur-lg rounded-xl shadow-lg border border-red-200/30 dark:border-red-700/30 hover:shadow-xl transition-all duration-300"
        >
          {open ? <FiX size={20} className="text-slate-700 dark:text-slate-300" /> : <FiMenu size={20} className="text-slate-700 dark:text-slate-300" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-80 bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border-r border-red-200/30 dark:border-red-700/30
          flex flex-col justify-between shadow-2xl shadow-red-900/8 dark:shadow-red-900/20
          transform transition-all duration-300 ease-in-out z-40
          lg:translate-x-0 lg:static lg:shadow-none
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-red-200/30 dark:border-red-700/30">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-3 bg-gradient-to-br from-red-600 to-red-500 rounded-2xl shadow-lg">
              <FiUserCheck size={32} className="text-white" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                My Dashboard
              </h2>
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                Personal Account
              </p>
            </div>
          </div>

          {/* Profile Section */}
          <div className="mt-6 flex flex-col items-center space-y-3">
            <div className="relative">
              <img
                src={
                  UsersAllDataFromDB?.profileImage ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
                }
                alt="User Profile"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-red-500/20 shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {UsersAllDataFromDB?.name || "User"}
              </h3>
              <p className="text-xs text-red-600 dark:text-red-400 font-medium uppercase tracking-wide">
                {UsersAllDataFromDB?.role}
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
              className="p-3 bg-red-50 dark:bg-red-950 rounded-xl hover:bg-red-100 dark:hover:bg-red-900 transition-colors duration-200 group"
              title="Go Home"
            >
              <FiHome size={18} className="text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300" />
            </NavLink>
          </div>

          {/* Menu Items */}
          <div className="space-y-1">
            <NavLink to="" end className={activeClass}>
              <FiUser size={20} />
              <span>Profile</span>
              <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </NavLink>

            <NavLink to="MyOrder" className={activeClass}>
              <FiShoppingCart size={20} />
              <span>My Orders</span>
              <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </NavLink>

            <NavLink to="MyFavouriteMeal" className={activeClass}>
              <FiHeart size={20} />
              <span>Favourite Meals</span>
              <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </NavLink>

            <NavLink to="MyReview" className={activeClass}>
              <FiStar size={20} />
              <span>My Reviews</span>
              <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </NavLink>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-red-200/30 dark:border-red-700/30">
          <LogOutButton className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 hover:scale-[1.02] border border-red-500/20" />
        </div>
      </aside>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
};

export default UserDashboardSideBar;
