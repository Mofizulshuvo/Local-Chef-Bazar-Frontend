import React from "react";
import AdminDashSidebar from "./AdminDashSidebar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-slate-50/50 to-red-50/30 dark:from-red-950/20 dark:via-slate-900/80 dark:to-red-950/20 relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-red-50/20 to-transparent pointer-events-none"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-red-400/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-red-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <AdminDashSidebar />

        {/* Main Content */}
        <main className="flex-1 relative min-h-screen flex flex-col">
          {/* Glass Effect Background */}
          <div className="absolute inset-0 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border-l border-white/20 dark:border-slate-700/20 pointer-events-none"></div>

          {/* Page Content */}
          <div className="relative z-10 p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8 p-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl shadow-xl shadow-red-500/10 border border-white/20 dark:border-slate-700/20 relative overflow-hidden">
                {/* Decorative Gradients */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-700"></div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-red-400/10 rounded-full blur-2xl"></div>

                {/* Actual Page Content */}
                <div className="relative z-10">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;