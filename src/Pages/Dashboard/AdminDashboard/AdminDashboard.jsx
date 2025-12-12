import React from 'react';
import AdminDashSidebar from './AdminDashSidebar';
import { Outlet } from 'react-router';

const AdminDashboard = () => {
    return (
        <div className='flex'>
            <AdminDashSidebar className="w-1/3"></AdminDashSidebar>
            <Outlet className="w-2/3"></Outlet>
        </div>
    );
};

export default AdminDashboard;