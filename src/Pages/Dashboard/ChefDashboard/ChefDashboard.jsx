import React from 'react';
import ChefDashBoardSidebar from './ChefDashBoardSidebar';
import { Outlet } from 'react-router';

const ChefDashboard = () => {
    return (
        <div className="flex gap-3">
            <ChefDashBoardSidebar className="w-1/5"></ChefDashBoardSidebar>
            <Outlet  className="w-4/5"></Outlet>
        </div>
    );
};

export default ChefDashboard;