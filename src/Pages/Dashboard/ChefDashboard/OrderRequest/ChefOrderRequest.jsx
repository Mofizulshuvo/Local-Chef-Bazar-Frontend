import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";
import { FiClipboard, FiUser, FiMapPin, FiClock, FiDollarSign, FiPackage, FiCheckCircle, FiXCircle, FiTruck, FiAlertCircle } from "react-icons/fi";
import Loader from "../../../../Components/Loader/Loader";
import Swal from "sweetalert2";

const ChefOrderRequest = () => {
  const { UsersAllDataFromDB, token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://local-chef-bazar-backend-1.onrender.com/orders",
          { headers: token ? { Authorization: `Bearer ${token}` } : undefined }
        );

        const chefOrders = res.data.filter(
          (order) =>
            String(order.chefId).trim() ===
            String(UsersAllDataFromDB.chefId).trim()
        );

        setOrders(chefOrders);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    if (UsersAllDataFromDB?.uid) {
      fetchOrders();
    }
  }, [UsersAllDataFromDB?.uid, token]);

  const handleUpdateStatus = async (order, newStatus) => {
    const statusMessages = {
      accepted: "accept",
      cancelled: "cancel",
      delivered: "mark as delivered"
    };

    const confirmResult = await Swal.fire({
      title: `Confirm Action`,
      text: `Are you sure you want to ${statusMessages[newStatus]} this order for "${order.mealName}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed",
      confirmButtonColor: newStatus === "cancelled" ? "#ef4444" : "#10b981",
      cancelButtonColor: "#6b7280",
      background: "rgba(255, 255, 255, 0.95)",
      backdrop: "rgba(0, 0, 0, 0.8)",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      setUpdatingId(order._id);

      await axios.put(
        `https://local-chef-bazar-backend-1.onrender.com/orders/${order._id}`,
        { orderStatus: newStatus },
        { headers: token ? { Authorization: `Bearer ${token}` } : undefined }
      );

      setOrders((prev) =>
        prev.map((o) =>
          o._id === order._id
            ? { ...o, orderStatus: newStatus }
            : o
        )
      );

      Swal.fire("Success!", `Order ${newStatus} successfully.`, "success");
    } catch (error) {
      console.error("Order update failed", error);
      Swal.fire("Error", "Failed to update order status", "error");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400";
      case "accepted": return "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400";
      case "delivered": return "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400";
      case "cancelled": return "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-900/50 dark:text-gray-400";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400";
      case "pending": return "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-900/50 dark:text-gray-400";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl shadow-lg shadow-purple-500/25">
          <FiClipboard size={36} className="text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Order Requests
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Manage customer orders for your meals ({orders.length} orders)
          </p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            No Orders Yet
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
            You haven't received any orders yet. Keep your meals updated and customers will find you!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300"
            >
              {/* Order Header */}
              <div className="flex items-start gap-4 mb-6">
                <img
                  src={order.foodImage || "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=80&h=80&fit=crop"}
                  alt={order.mealName}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200 dark:border-slate-700"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                    {order.mealName}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <FiClock size={14} />
                    <span>{new Date(order.orderTime).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Order Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FiDollarSign size={16} className="text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Price</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    ${(order.price * (order.quantity || 1)).toFixed(2)}
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FiPackage size={16} className="text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Quantity</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {order.quantity || 1}
                  </p>
                </div>
              </div>

              {/* Customer Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <FiUser size={16} className="text-slate-600 dark:text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">Customer:</span>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">{order.userEmail}</span>
                </div>

                <div className="flex items-start gap-3">
                  <FiMapPin size={16} className="text-slate-600 dark:text-slate-400 mt-0.5" />
                  <div className="flex-1">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Delivery Address:</span>
                    <p className="text-sm font-medium text-slate-900 dark:text-white mt-1">{order.userAddress}</p>
                  </div>
                </div>
              </div>

              {/* Status Section */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <FiTruck size={16} className="text-slate-600 dark:text-slate-400" />
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Order Status</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                  {order.orderStatus}
                </span>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <FiCheckCircle size={16} className="text-slate-600 dark:text-slate-400" />
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Payment Status</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                  {order.paymentStatus}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {order.orderStatus === "pending" && (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleUpdateStatus(order, "cancelled")}
                      disabled={updatingId === order._id}
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-red-500/25 hover:shadow-red-500/40 disabled:shadow-none transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100 flex items-center justify-center gap-2"
                    >
                      {updatingId === order._id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <FiXCircle size={16} />
                      )}
                      <span>Cancel</span>
                    </button>

                    <button
                      onClick={() => handleUpdateStatus(order, "accepted")}
                      disabled={updatingId === order._id}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 disabled:shadow-none transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100 flex items-center justify-center gap-2"
                    >
                      {updatingId === order._id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <FiCheckCircle size={16} />
                      )}
                      <span>Accept</span>
                    </button>
                  </div>
                )}

                {order.orderStatus === "accepted" && order.paymentStatus === "paid" && (
                  <button
                    onClick={() => handleUpdateStatus(order, "delivered")}
                    disabled={updatingId === order._id}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:shadow-none transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {updatingId === order._id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <FiTruck size={18} />
                    )}
                    <span>Mark as Delivered</span>
                  </button>
                )}

                {(order.orderStatus === "delivered" || order.orderStatus === "cancelled") && (
                  <div className="text-center py-4">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${
                      order.orderStatus === "delivered"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                    }`}>
                      {order.orderStatus === "delivered" ? (
                        <FiCheckCircle size={18} />
                      ) : (
                        <FiXCircle size={18} />
                      )}
                      <span className="font-medium capitalize">{order.orderStatus}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChefOrderRequest;
