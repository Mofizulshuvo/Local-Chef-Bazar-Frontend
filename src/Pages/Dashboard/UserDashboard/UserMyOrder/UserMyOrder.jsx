import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";
import { toast } from "react-toastify";
import Loader from "../../../../Components/Loader/Loader";
import Swal from "sweetalert2";
import { FiShoppingBag, FiCreditCard, FiCheckCircle, FiClock, FiTruck, FiPackage, FiDollarSign, FiCalendar } from "react-icons/fi";

const UserMyOrder = () => {
  const { UsersAllDataFromDB, token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://local-chef-bazar-backend-1.onrender.com/orders/${UsersAllDataFromDB?.email}`,
        { headers: token ? { Authorization: `Bearer ${token}` } : undefined }
      );
      setOrders(res.data);
    } catch {
      toast.error("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (UsersAllDataFromDB?.email) fetchOrders();
  }, [UsersAllDataFromDB, token]);

  const handlePayment = async (orderId) => {
    if (!orderId) return toast.error("Invalid order ID");

    const confirmPayment = await Swal.fire({
      title: "Confirm Payment",
      text: "Proceed to payment?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Pay Now",
    });

    if (!confirmPayment.isConfirmed) return;

    try {
      const res = await axios.post(
        "https://local-chef-bazar-backend-1.onrender.com/createPaymentSession",
        { orderId },
        { headers: token ? { Authorization: `Bearer ${token}` } : undefined }
      );

      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        toast.error("Failed to create payment session");
        console.log("Response:", res.data);
      }
    } catch (err) {
      console.error("Payment error:", err.response?.data || err.message);
      Swal.fire("Error", "Payment failed. Check console for details.", "error");
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

  if (!orders.length) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl shadow-lg shadow-blue-500/25">
            <FiShoppingBag size={36} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              My Orders
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Track your food orders and payments
            </p>
          </div>
        </div>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            No Orders Yet
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
            You haven't placed any orders yet. Start exploring delicious meals from our chefs!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl shadow-lg shadow-blue-500/25">
          <FiShoppingBag size={36} className="text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            My Orders
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Track your food orders and payments ({orders.length} orders)
          </p>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300"
          >
            {/* Order Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="relative">
                <img
                  src={order.foodImage || "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=80&h=80&fit=crop"}
                  alt={order.mealName}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200 dark:border-slate-700"
                />
                <div className="absolute -top-2 -right-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {order.quantity || 1}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                  {order.mealName}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                  Chef {order.chefId}
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <FiCalendar size={14} />
                  <span>{new Date(order.orderTime).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Order Details */}
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

            {/* Status Section */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiTruck size={16} className="text-slate-600 dark:text-slate-400" />
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Order Status</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                  {order.orderStatus}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiCreditCard size={16} className="text-slate-600 dark:text-slate-400" />
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Payment Status</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                  {order.paymentStatus}
                </span>
              </div>
            </div>

            {/* Action Button */}
            {order.orderStatus === "accepted" && order.paymentStatus !== "paid" && (
              <button
                onClick={() => handlePayment(order._id)}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <FiCreditCard size={18} />
                <span>Pay Now - ${(order.price * (order.quantity || 1)).toFixed(2)}</span>
              </button>
            )}

            {order.paymentStatus === "paid" && (
              <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-xl py-3 px-6">
                <FiCheckCircle size={18} />
                <span className="font-medium">Payment Completed</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMyOrder;
