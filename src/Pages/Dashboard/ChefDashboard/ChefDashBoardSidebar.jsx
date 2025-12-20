import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../../Context/AuthContext";
import Logo from "../../../Components/Logo/Logo";
import LogOutButton from "../../../Components/Buttons/LogOutButton";
import {
  FiUser,
  FiPlusCircle,
  FiCoffee,
  FiClipboard,
  FiMenu,
  FiX,
  FiHome,
  FiArrowLeft,
} from "react-icons/fi";

const DashboardSideBar = () => {
  const { UsersAllDataFromDB } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const activeClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-5 py-3 rounded-xl bg-[#C10007] text-white font-semibold"
      : "flex items-center gap-3 px-5 py-3 rounded-xl text-black/70 hover:bg-black/5";

  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between">
      {/* ---------- TOP ---------- */}
      <div>
        {/* Profile */}
        <div className="p-6 flex flex-col items-center">
          <Logo />
          <img
            src={
              UsersAllDataFromDB?.profileImage ||
              "https://via.placeholder.com/80"
            }
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover mt-4 shadow-md"
          />
          <h2 className="mt-3 text-lg font-bold text-black">
            {UsersAllDataFromDB?.name || "User"}
          </h2>
          <p className="text-sm text-black/50 capitalize">
            {UsersAllDataFromDB?.role}
          </p>
        </div>

        {/* Home & Back */}
        <div className="flex justify-center gap-6 mb-6">
          <button onClick={() => navigate(-1)}>
            <FiArrowLeft
              size={22}
              className="text-black/70 hover:text-black"
            />
          </button>

          <NavLink to="/">
            <FiHome size={22} className="text-black/70 hover:text-black" />
          </NavLink>
        </div>

        {/* Navigation */}
        <nav className="px-3 flex flex-col gap-2">
          <NavLink to="" end className={activeClass} onClick={() => setOpen(false)}>
            <FiUser size={18} /> My Profile
          </NavLink>

          <NavLink
            to="CreateMeal"
            className={activeClass}
            onClick={() => setOpen(false)}
          >
            <FiPlusCircle size={18} /> Create Meal
          </NavLink>

          <NavLink
            to="MyMeal"
            className={activeClass}
            onClick={() => setOpen(false)}
          >
            <FiCoffee size={18} /> My Meals
          </NavLink>

          <NavLink
            to="OrderRequest"
            className={activeClass}
            onClick={() => setOpen(false)}
          >
            <FiClipboard size={18} /> Order Requests
          </NavLink>
        </nav>
      </div>

      {/* ---------- LOGOUT ---------- */}
      <div className="p-5">
        <LogOutButton className="w-full bg-[#C10007] hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-md transition" />
      </div>
    </div>
  );

  return (
    <>
      {/* ---------- MOBILE TOP BAR ---------- */}
      <div className="md:hidden sticky top-0 z-50 bg-white shadow-md px-4 py-3 flex justify-between items-center">
        <button onClick={() => setOpen(true)}>
          <FiMenu size={26} className="text-black" />
        </button>
        <span className="font-bold text-black">Dashboard</span>
      </div>

      {/* ---------- OVERLAY ---------- */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* ---------- SIDEBAR ---------- */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-white shadow-2xl z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Close button (mobile) */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 md:hidden"
        >
          <FiX size={22} />
        </button>

        <SidebarContent />
      </aside>
    </>
  );
};

export default DashboardSideBar;
