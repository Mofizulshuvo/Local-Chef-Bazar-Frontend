import React from 'react';
import UserDashboardSideBar from './UserDashboardSideBar';
import { Outlet } from 'react-router';

const UserDashboard = () => {
    return (
        <div>
          <UserDashboardSideBar></UserDashboardSideBar>
         <Outlet></Outlet>
        </div>
    );
};

export default UserDashboard;