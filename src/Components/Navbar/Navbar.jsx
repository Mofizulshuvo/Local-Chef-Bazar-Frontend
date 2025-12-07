import React from "react";
import Logo from "../Logo/Logo";
import { NavLink } from "react-router";
import LoginButton from "../Buttons/LoginButton";
import SignUp from "../Buttons/SignUpButton";

const Navbar = () => {
  const IsActive = ({ isActive }) => {
    return isActive
      ? "w-auto px-7 h-10 text-center bg-[#FC8A06] rounded-[20px] text-white px-2 py-1"
      : " ";
  };

  return (
    <div className="flex justify-between items-center text-2xl font-semibold text-">
      <Logo></Logo>
      <div className="flex justify-center items-center gap-10">
        <NavLink to="/" className={IsActive}>
          Home
        </NavLink>
        <NavLink to="/Meals" className={IsActive}>
          Meals
        </NavLink>
        <NavLink to="/Dashboard" className={IsActive}>
          Dashboard
        </NavLink>
      </div>
      <div className="flex gap-3">
        <LoginButton></LoginButton>
        <SignUp></SignUp>
      </div>
    </div>
  );
};

export default Navbar;
