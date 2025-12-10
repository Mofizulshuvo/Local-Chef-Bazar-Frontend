import React, { useContext } from "react";
import Logo from "../Logo/Logo";
import { NavLink } from "react-router";
import LoginButton from "../Buttons/LoginButton";
import SignUp from "../Buttons/SignUpButton";
import { AuthContext } from "../../Context/AuthContext";
import LogOutButton from "../Buttons/LogOutButton";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  console.log("The current user is :", user);
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
      {user ? (
        <LogOutButton></LogOutButton>
      ) : (
        <div className="flex gap-3">
          <LoginButton></LoginButton>
          <SignUp></SignUp>
        </div>
      )}
    </div>
  );
};

export default Navbar;
