import React from 'react';
import UserDashboardSideBar from './UserDashboardSideBar';
import { Outlet } from 'react-router';

const UserDashboard = () => {
    return (
        <div className='flex gap-5 '>
        <UserDashboardSideBar className="w-[200px]"></UserDashboardSideBar>
         <Outlet className=""></Outlet>
        </div>
    );
};

export default UserDashboard;