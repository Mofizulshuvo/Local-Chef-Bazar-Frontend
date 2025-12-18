import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const LogOutButton = () => {
    const {LogOut}=useContext(AuthContext)
    const handleLogOut=()=>{
      LogOut();
    }
  return (
    <div>
      <button onClick={()=>handleLogOut()} className="px-4 py-2  bg-[#C10007] text-lg text-white rounded-2xl">
        Log Out
      </button>
    </div>
  );
};

export default LogOutButton;
