import React from 'react';
import ChefDashBoardSidebar from './ChefDashBoardSidebar';
import { Outlet } from 'react-router';

const ChefDashboard = () => {
    return (
        <div>
            <ChefDashBoardSidebar></ChefDashBoardSidebar>
            <Outlet></Outlet>
        </div>
    );
};

export default ChefDashboard;