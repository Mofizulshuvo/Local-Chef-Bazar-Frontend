import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Loader from "../../../../Components/Loader/Loader";

const AdminPlatformStatistics = () => {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    adminCount: 0,
    chefCount: 0,
    userCount: 0,
  });
  const [orderStats, setOrderStats] = useState({
    totalOrders: 0,
    accepted: 0,
    rejected: 0,
    pending: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [usersRes, ordersRes] = await Promise.all([
          axios.get("https://local-chef-bazar-backend-1.onrender.com/users"),
          axios.get("https://local-chef-bazar-backend-1.onrender.com/orders"),
        ]);

        const users = usersRes.data || [];
        const orders = ordersRes.data || [];

        const adminCount = users.filter((u) => u.role === "admin").length;
        const chefCount = users.filter((u) => u.role === "chef").length;
        const userCount = users.filter((u) => u.role === "user").length;

        const accepted = orders.filter((o) => o.orderStatus === "accepted").length;
        const rejected = orders.filter((o) => o.orderStatus === "cancelled").length;
        const pending = orders.filter((o) => o.orderStatus === "pending").length;

        setUserStats({ totalUsers: users.length, adminCount, chefCount, userCount });
        setOrderStats({ totalOrders: orders.length, accepted, rejected, pending });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  if (loading) return <Loader />;

  const userPieData = [
    { name: "Admins", value: userStats.adminCount },
    { name: "Chefs", value: userStats.chefCount },
    { name: "Users", value: userStats.userCount },
  ];

  const orderPieData = [
    { name: "Accepted", value: orderStats.accepted },
    { name: "Rejected", value: orderStats.rejected },
    { name: "Pending", value: orderStats.pending },
  ];

  return (
    <div className="p-6 w-full mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">Platform Statistics</h1>

      {/* Raw Data Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={userStats.totalUsers} color="#C10007" />
        <StatCard title="Admins" value={userStats.adminCount} color="#000000" />
        <StatCard title="Chefs" value={userStats.chefCount} color="#C10007" />
        <StatCard title="Users" value={userStats.userCount} color="#000000" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Orders" value={orderStats.totalOrders} color="#C10007" />
        <StatCard title="Accepted Orders" value={orderStats.accepted} color="#000000" />
        <StatCard title="Rejected Orders" value={orderStats.rejected} color="#C10007" />
        <StatCard title="Pending Orders" value={orderStats.pending} color="#000000" />
      </div>

      {/* Pie Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <ChartCard title="User Roles">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userPieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                <Cell fill="#C10007" stroke="#000" strokeWidth={1} />
                <Cell fill="#000000" stroke="#C10007" strokeWidth={1} />
                <Cell fill="#ffffff" stroke="#C10007" strokeWidth={1} />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Order Status">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderPieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                <Cell fill="#C10007" stroke="#000" strokeWidth={1} />
                <Cell fill="#000000" stroke="#C10007" strokeWidth={1} />
                <Cell fill="#ffffff" stroke="#C10007" strokeWidth={1} />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div
    className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center transform transition-all hover:scale-105 hover:shadow-2xl"
    style={{ borderTop: `6px solid ${color}` }}
  >
    <p className="text-sm font-semibold text-gray-500">{title}</p>
    <p className="text-3xl font-bold mt-2 text-black">{value}</p>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
    <h3 className="text-xl font-semibold text-black mb-4">{title}</h3>
    {children}
  </div>
);

export default AdminPlatformStatistics;
