import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import LogOutButton from "../../../Components/Buttons/LogOutButton";
import {
  FiUser,
  FiPlusCircle,
  FiCoffee,
  FiClipboard,
  FiMenu,
  FiX,
  FiHome,
} from "react-icons/fi";

const ChefDashBoardSidebar = () => {
  const { UsersAllDataFromDB } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  // Lock body scroll when sidebar is open on mobile
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  // Active link styling
  const activeClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-5 py-3 rounded-xl bg-red-600 text-white font-semibold shadow-md"
      : "flex items-center gap-3 px-5 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-slate-800 transition-all";

  return (
    <>
      {/* Mobile toggle button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="p-3 rounded-xl bg-white dark:bg-slate-800 shadow-md"
          aria-label="Toggle sidebar"
        >
          {open ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-80 z-40
          bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl
          border-r border-red-200/30 dark:border-red-700/30
          shadow-xl
          transition-transform duration-300
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Grid layout: Header | Nav | Footer */}
        <div className="h-full grid grid-rows-[auto_1fr_auto]">

          {/* Header */}
          <div className="p-6 border-b border-red-200/30 dark:border-red-700/30 flex flex-col items-center gap-4">
            <div className="p-3 bg-red-600 rounded-2xl">
              <FiCoffee size={28} className="text-white" />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Chef Kitchen</h2>
              <p className="text-xs text-red-500 uppercase tracking-wide">Culinary Dashboard</p>
            </div>

            {/* Profile */}
            <div className="flex flex-col items-center gap-2 mt-2">
              <img
                src={
                  UsersAllDataFromDB?.profileImage ||
                  "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=100"
                }
                alt="Chef Profile"
                className="w-16 h-16 rounded-xl object-cover border-2 border-red-500/20 shadow-md"
              />
              <div className="text-center">
                <p className="font-semibold text-slate-900 dark:text-white">{UsersAllDataFromDB?.name || "Chef"}</p>
                <p className="text-xs text-red-500 uppercase">{UsersAllDataFromDB?.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="px-5 py-6 flex flex-col gap-3">
            {/* Home */}
            <NavLink
              to="/"
              title="Home"
              className="flex justify-center p-3 rounded-xl bg-red-50 dark:bg-red-950"
            >
              <FiHome className="text-red-600" />
            </NavLink>

            <NavLink to="" end className={activeClass}>
              <FiUser />
              My Profile
            </NavLink>

            <NavLink to="CreateMeal" className={activeClass}>
              <FiPlusCircle />
              Create Meal
            </NavLink>

            <NavLink to="MyMeal" className={activeClass}>
              <FiCoffee />
              My Meals
            </NavLink>

            <NavLink to="OrderRequest" className={activeClass}>
              <FiClipboard />
              Order Requests
            </NavLink>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-red-200/30 dark:border-red-700/30">
            <LogOutButton className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl shadow-md" />
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}
    </>
  );
};

export default ChefDashBoardSidebar;