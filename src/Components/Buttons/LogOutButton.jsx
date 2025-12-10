import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const LogOutButton = () => {
    const {LogOut}=useContext(AuthContext)
  return (
    <div>
      <button onClick={LogOut()} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl bg-[#FC8A06]  text-white rounded-2xl">
        Log Out
      </button>
    </div>
  );
};

export default LogOutButton;
