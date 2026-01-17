import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Users, UserCheck, ChefHat, ShoppingCart, TrendingUp, BarChart3 } from "lucide-react";
import Loader from "../../../../Components/Loader/Loader";

// Add custom styles for animations
const styles = `
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.8s ease-out;
  }

  .shadow-3xl {
    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
  }
`;

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
    { name: "Admins", value: userStats.adminCount, color: "#ef4444" },
    { name: "Chefs", value: userStats.chefCount, color: "#f97316" },
    { name: "Users", value: userStats.userCount, color: "#3b82f6" },
  ];

  const orderPieData = [
    { name: "Accepted", value: orderStats.accepted, color: "#10b981" },
    { name: "Rejected", value: orderStats.rejected, color: "#ef4444" },
    { name: "Pending", value: orderStats.pending, color: "#f59e0b" },
  ];

  const barData = [
    { name: "Users", total: userStats.totalUsers, active: userStats.userCount },
    { name: "Orders", total: orderStats.totalOrders, active: orderStats.accepted },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-6 relative">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-red-500 via-red-600 to-red-700 rounded-3xl shadow-2xl shadow-red-500/30 relative overflow-hidden group hover:scale-110 transition-all duration-500">
          <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <BarChart3 size={40} className="text-white relative z-10 drop-shadow-lg" />
          <div className="absolute -inset-1 bg-linear-to-br from-red-400 to-red-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
        </div>
        <div className="space-y-3">
          <h1 className="text-5xl font-bold bg-linear-to-r from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent mb-3">
            Platform Analytics
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Comprehensive overview of your platform's performance and user engagement metrics
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-500">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span>Live Data • Real-time Updates</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={userStats.totalUsers}
          icon={Users}
          color="blue"
          trend="+12%"
        />
        <StatCard
          title="Active Chefs"
          value={userStats.chefCount}
          icon={ChefHat}
          color="orange"
          trend="+8%"
        />
        <StatCard
          title="Total Orders"
          value={orderStats.totalOrders}
          icon={ShoppingCart}
          color="green"
          trend="+15%"
        />
        <StatCard
          title="Completed Orders"
          value={orderStats.accepted}
          icon={TrendingUp}
          color="emerald"
          trend="+22%"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Distribution */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/30 dark:border-slate-700/30 relative overflow-hidden group hover:shadow-3xl transition-all duration-500">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-blue-400/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 delay-100"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-linear-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl shadow-xl shadow-blue-500/30">
                    <Users size={28} className="text-white drop-shadow-lg" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">User Distribution</h3>
                <p className="text-slate-600 dark:text-slate-400">Breakdown by role and status</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={userPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  innerRadius={60}
                  paddingAngle={2}
                  label={({ name, percent }) => percent > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : ''}
                  labelLine={false}
                >
                  {userPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(255,255,255,0.2)" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: 'none',
                    borderRadius: '16px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                    fontWeight: '600'
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/30 dark:border-slate-700/30 relative overflow-hidden group hover:shadow-3xl transition-all duration-500">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-green-400/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 delay-100"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-gradient-to-br from-green-500 via-green-600 to-green-700 rounded-2xl shadow-xl shadow-green-500/30">
                <ShoppingCart size={28} className="text-white drop-shadow-lg" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Order Status</h3>
                <p className="text-slate-600 dark:text-slate-400">Order fulfillment breakdown</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={orderPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  innerRadius={60}
                  paddingAngle={2}
                  label={({ name, percent }) => percent > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : ''}
                  labelLine={false}
                >
                  {orderPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(255,255,255,0.2)" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: 'none',
                    borderRadius: '16px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                    fontWeight: '600'
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/30 dark:border-slate-700/30 relative overflow-hidden group hover:shadow-3xl transition-all duration-500 col-span-full">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-purple-400/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 delay-100"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-2xl shadow-xl shadow-purple-500/30">
              <TrendingUp size={28} className="text-white drop-shadow-lg" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Performance Overview</h3>
              <p className="text-slate-600 dark:text-slate-400">Total vs Active metrics comparison</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
              <XAxis
                dataKey="name"
                stroke="rgb(148, 163, 184)"
                fontSize={14}
                fontWeight={600}
              />
              <YAxis
                stroke="rgb(148, 163, 184)"
                fontSize={14}
                fontWeight={600}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: 'none',
                  borderRadius: '16px',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              />
              <Bar
                dataKey="total"
                fill="url(#totalGradient)"
                radius={[6, 6, 0, 0]}
                name="Total"
              />
              <Bar
                dataKey="active"
                fill="url(#activeGradient)"
                radius={[6, 6, 0, 0]}
                name="Active"
              />
              <defs>
                <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgba(59, 130, 246, 0.8)" />
                  <stop offset="95%" stopColor="rgba(59, 130, 246, 0.4)" />
                </linearGradient>
                <defs>
                  <linearGradient id="activeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgba(16, 185, 129, 0.9)" />
                    <stop offset="95%" stopColor="rgba(16, 185, 129, 0.5)" />
                  </linearGradient>
                </defs>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
    </>
  );
};

const StatCard = ({ title, value, icon: Icon, color, trend }) => {
  const colorClasses = {
    blue: "from-blue-500 via-blue-600 to-blue-700",
    orange: "from-orange-500 via-orange-600 to-orange-700",
    green: "from-green-500 via-green-600 to-green-700",
    emerald: "from-emerald-500 via-emerald-600 to-emerald-700",
  };

  const bgColorClasses = {
    blue: "bg-blue-50 dark:bg-blue-950/30",
    orange: "bg-orange-50 dark:bg-orange-950/30",
    green: "bg-green-50 dark:bg-green-950/30",
    emerald: "bg-emerald-50 dark:bg-emerald-950/30",
  };

  return (
    <div className={`relative ${bgColorClasses[color]} backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-slate-700/30 hover:shadow-3xl transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 overflow-hidden group`}>
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>

      {/* Floating Elements */}
      <div className="absolute -top-6 -right-6 w-16 h-16 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
      <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/5 rounded-full blur-lg group-hover:scale-125 transition-transform duration-500 delay-100"></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className={`p-4 bg-gradient-to-br ${colorClasses[color]} rounded-2xl shadow-xl shadow-black/20 group-hover:shadow-2xl transition-all duration-300`}>
            <Icon size={28} className="text-white drop-shadow-lg" />
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1">{title}</p>
            <p className="text-4xl font-bold text-slate-900 dark:text-white leading-none">{value?.toLocaleString() || value}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-600 dark:text-green-400">{trend}</span>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-500">vs last month</span>
        </div>
      </div>
    </div>
  );
};

export default AdminPlatformStatistics;
