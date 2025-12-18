import React, { useContext } from "react";
import Logo from "../Logo/Logo";
import { NavLink } from "react-router";
import LoginButton from "../Buttons/LoginButton";
import SignUp from "../Buttons/SignUpButton";
import { AuthContext } from "../../Context/AuthContext";
import LogOutButton from "../Buttons/LogOutButton";

const Navbar = () => {
  const { user, userRole } = useContext(AuthContext);

  const IsActive = ({ isActive }) =>
    isActive
      ? "w-auto px-7 h-10 text-center bg-[#C10007] rounded-[20px] text-white px-2 py-1"
      : "";

  return (
    <div className=" p-5 py-2 flex justify-between items-center text-xl font-semibold  shadow-sm">
      <Logo />

      <div className="flex justify-center items-center gap-10">
        <NavLink to="/" className={IsActive}>Home</NavLink>
        <NavLink to="/Meals" className={IsActive}>Meals</NavLink>

        
        {user && userRole === "admin" && (
          <NavLink to="/AdminDashboard" className={IsActive}>Dashboard</NavLink>
        )}
        {user && userRole === "chef" && (
          <NavLink to="ChefDashboard" className={IsActive}>Dashboard</NavLink>
        )}
        {user && userRole === "user" && (
          <NavLink to="/Dashboard" className={IsActive}>Dashboard</NavLink>
        )}
      </div>

      
      {user ? (
        <LogOutButton />
      ) : (
        <div className="flex gap-3">
          <LoginButton />
          <SignUp />
        </div>
      )}
    </div>
  );
};

export default Navbar;
