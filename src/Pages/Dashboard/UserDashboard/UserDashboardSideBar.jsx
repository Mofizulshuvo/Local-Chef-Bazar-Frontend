import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { Link } from "react-router";

const UserDashboardSideBar = () => {
  const { UsersAllDataFromDB } = useContext(AuthContext);
  const IsActive = ({ isActive }) =>
    isActive
      ? "w-auto px-7 h-10 text-center bg-[#F8B602] rounded-[20px] text-black px-2 py-1"
      : "";

  return (
    <div className="w-1/5 bg-white h-screen p-5">
      <h2 className="text-xl font-semibold mb-6">User Dashboard</h2>
      <nav className="flex flex-col gap-3">
        <img src={UsersAllDataFromDB.profileImage} alt=""  className="w-[200px] h-[100px] rounded-[100%] bg-white" />
        <Link to=" " className={IsActive}>
         Profile
        </Link>
         
        
  
        
          My Orders
      
       
          Favorites
        
   
          My Reviews
       
      </nav>
    </div>
  );
};

export default UserDashboardSideBar;
