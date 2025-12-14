import React, { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../../Context/AuthContext";
import Logo from "../../../Components/Logo/Logo";
import LogOutButton from "../../../Components/Buttons/LogOutButton";
import { FiUser, FiPlusCircle, FiCoffee, FiClipboard } from "react-icons/fi";

const DashboardSideBar = () => {
  const { UsersAllDataFromDB } = useContext(AuthContext);

  const activeClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-6 py-3 rounded-lg bg-emerald-500 text-white font-semibold transition-all duration-200"
      : "flex items-center gap-3 px-6 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200";

  return (
    <aside className="w-72 bg-white shadow-lg h-screen flex flex-col justify-between">
      {/* Top Section */}
      <div>
        {/* Logo & User Info */}
        <div className="p-6 flex flex-col items-center border-b">
          <Logo />

          <div className="mt-4 flex flex-col items-center">
            <img
              src={
                UsersAllDataFromDB?.profileImage ||
                "https://via.placeholder.com/80"
              }
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
            />
            <h2 className="mt-2 text-lg font-semibold text-gray-700">
              {UsersAllDataFromDB?.name || "User"}
            </h2>
            <p className="text-xs text-gray-500">Dashboard</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex flex-col gap-2 px-2">
          <NavLink to="" end className={activeClass}>
            <FiUser size={20} /> My Profile
          </NavLink>

          <NavLink to="CreateMeal" className={activeClass}>
            <FiPlusCircle size={20} /> Create Meal
          </NavLink>

          <NavLink to="MyMeal" className={activeClass}>
            <FiCoffee size={20} /> My Meals
          </NavLink>

          <NavLink to="OrderRequest" className={activeClass}>
            <FiClipboard size={20} /> Order Requests
          </NavLink>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-6 border-t">
        <LogOutButton className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-all duration-200" />
      </div>
    </aside>
  );
};

export default DashboardSideBar;
