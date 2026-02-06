import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import LogOutButton from "../../../Components/Buttons/LogOutButton";
import {
  FiUser,
  FiShoppingCart,
  FiHeart,
  FiStar,
  FiMenu,
  FiX,
  FiHome,
  FiUserCheck,
} from "react-icons/fi";

const UserDashboardSideBar = () => {
  const { UsersAllDataFromDB } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  /* ===================== BODY SCROLL LOCK ===================== */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  /* ===================== ACTIVE LINK STYLE ===================== */
  const activeClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-4 px-5 py-3 rounded-xl bg-red-600 text-white font-semibold shadow-md"
      : "flex items-center gap-4 px-5 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-slate-800 transition";

  return (
    <>
      {/* ===================== MOBILE TOGGLE ===================== */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setOpen((p) => !p)}
          className="p-3 rounded-xl bg-white dark:bg-slate-800 shadow-md"
        >
          {open ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* ===================== SIDEBAR ===================== */}
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
        {/* GRID LAYOUT */}
        <div className="h-full grid grid-rows-[auto_1fr_auto]">

          {/* ===================== HEADER ===================== */}
          <div className="p-6 border-b border-red-200/30 dark:border-red-700/30">
            <div className="flex flex-col items-center gap-4">
              <div className="p-3 bg-red-600 rounded-2xl">
                <FiUserCheck size={28} className="text-white" />
              </div>

              <div className="text-center">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  My Dashboard
                </h2>
                <p className="text-xs text-red-500 uppercase tracking-wide">
                  Personal Account
                </p>
              </div>

              {/* PROFILE */}
              <div className="flex flex-col items-center gap-2 mt-2">
                <img
                  src={
                    UsersAllDataFromDB?.profileImage ||
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
                  }
                  className="w-16 h-16 rounded-xl object-cover border"
                  alt="Profile"
                />
                <div className="text-center">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {UsersAllDataFromDB?.name || "User"}
                  </p>
                  <p className="text-xs text-red-500 uppercase">
                    {UsersAllDataFromDB?.role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ===================== NAV (STATIC – NO SCROLL) ===================== */}
          <nav className="px-5 py-6 flex flex-col gap-3">
            <NavLink
              to="/"
              title="Home"
              className="flex justify-center p-3 rounded-xl bg-red-50 dark:bg-red-950"
            >
              <FiHome className="text-red-600" />
            </NavLink>

            <NavLink to="" end className={activeClass}>
              <FiUser />
              Profile
            </NavLink>

            <NavLink to="MyOrder" className={activeClass}>
              <FiShoppingCart />
              My Orders
            </NavLink>

            <NavLink to="MyFavouriteMeal" className={activeClass}>
              <FiHeart />
              Favourite Meals
            </NavLink>

            <NavLink to="MyReview" className={activeClass}>
              <FiStar />
              My Reviews
            </NavLink>
          </nav>

          {/* ===================== FOOTER ===================== */}
          <div className="p-6 border-t border-red-200/30 dark:border-red-700/30">
            <LogOutButton className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl" />
          </div>
        </div>
      </aside>

      {/* ===================== OVERLAY ===================== */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}
    </>
  );
};

export default UserDashboardSideBar;