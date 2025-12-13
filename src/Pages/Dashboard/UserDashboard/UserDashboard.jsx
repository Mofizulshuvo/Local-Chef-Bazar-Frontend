import React from "react";
import UserDashboardSideBar from "./UserDashboardSideBar";
import { Outlet } from "react-router";

const UserDashboard = () => {
  return (
    <div className="flex gap-3">
      <UserDashboardSideBar className="w-1/5"></UserDashboardSideBar>
      <Outlet className="w-4/5"></Outlet>
    </div>
  );
};

export default UserDashboard;
