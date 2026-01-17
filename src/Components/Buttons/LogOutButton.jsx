import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const LogOutButton = () => {
    const {LogOut}=useContext(AuthContext)
    const handleLogOut=()=>{
      LogOut();
    }
  return (
    <button onClick={()=>handleLogOut()} className="btn-outline">
      Log Out
    </button>
  );
};

export default LogOutButton;
