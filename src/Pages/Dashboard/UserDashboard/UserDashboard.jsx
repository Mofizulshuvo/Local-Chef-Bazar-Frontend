import React from "react";
import UserDashboardSideBar from "./UserDashboardSideBar";
import { Outlet } from "react-router";

const UserDashboard = () => {
  return (
    <div className="bg-gray-200 h-screen w-full flex gap-3 justify-between items-center">
      <UserDashboardSideBar></UserDashboardSideBar>
      <Outlet></Outlet>
    </div>
  );
};

export default UserDashboard;
