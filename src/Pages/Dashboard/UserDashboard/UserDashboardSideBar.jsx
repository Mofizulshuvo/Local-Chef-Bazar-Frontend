import React from "react";

const UserDashboardSideBar = () => {
  return (
    <div className="w-full bg-gray-100 h-screen p-5 border-r">
      <h2 className="text-xl font-semibold mb-6">User Dashboard</h2>
      <nav className="flex flex-col gap-3">
        <button className="py-2 px-4 bg-gray-500 text-white rounded">
          Profile
        </button>
        <button className="py-2 px-4 bg-gray-500 text-white rounded">
          My Orders
        </button>
        <button className="py-2 px-4 bg-gray-500 text-white rounded">
          Favorites
        </button>
        <button className="py-2 px-4 bg-gray-500 text-white rounded">
          My Reviews
        </button>
      </nav>
    </div>
  );
};

export default UserDashboardSideBar;
