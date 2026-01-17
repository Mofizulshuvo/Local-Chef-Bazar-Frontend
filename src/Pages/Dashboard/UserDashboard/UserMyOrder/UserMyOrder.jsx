import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";
import { toast } from "react-toastify";
import Loader from "../../../../Components/Loader/Loader";
import Swal from "sweetalert2";

const UserMyMeal = () => {
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

  if (loading) return <Loader />;

  if (!orders.length)
    return (
      <div className="flex justify-center items-center mt-16 px-4">
        <p className="text-black/60 text-lg text-center">No orders yet</p>
      </div>
    );

  return (
    <div className="w-full px-4 sm:px-6 py-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-black text-center mb-8 sm:mb-10">
        My Orders
      </h2>

      <div className="space-y-6 max-w-6xl mx-auto">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-6"
          >
            {/* Meal Image */}
            <div className="w-full md:w-32 h-32 rounded-xl overflow-hidden shadow-md flex-shrink-0">
              <img
                src={order.foodImage || "https://via.placeholder.com/150"}
                alt={order.mealName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Meal Info */}
            <div className="flex-1 flex flex-col gap-1 text-center md:text-left">
              <h3 className="text-lg sm:text-xl font-bold text-black truncate">
                {order.mealName}
              </h3>
              <p className="text-sm sm:text-base text-black/60">
                Quantity: {order.quantity || 1}
              </p>
              <p className="text-sm sm:text-base text-black/60">
                Total: ${order.price * (order.quantity || 1)}
              </p>
            </div>

            {/* Order Status */}
            <div className="flex flex-col items-center gap-2 min-w-[120px]">
              <span className="text-xs sm:text-sm uppercase tracking-wide text-black/50">
                Order
              </span>
              <span
                className={`px-4 py-1 rounded-full text-sm sm:text-base font-semibold text-center ${
                  order.orderStatus === "pending"
                    ? "bg-black/10 text-black"
                    : order.orderStatus === "accepted"
                    ? "bg-[#C10007]/10 text-[#C10007]"
                    : "bg-black text-white"
                }`}
              >
                {order.orderStatus}
              </span>
            </div>

            {/* Payment Status */}
            <div className="flex flex-col items-center gap-2 min-w-[140px]">
              <span className="text-xs sm:text-sm uppercase tracking-wide text-black/50">
                Payment
              </span>

              {order.orderStatus === "accepted" &&
              order.paymentStatus !== "paid" ? (
                <button
                  onClick={() => handlePayment(order._id)}
                  className="px-5 py-2 rounded-xl bg-[#C10007] text-white font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
                >
                  Pay Now
                </button>
              ) : order.paymentStatus === "paid" ? (
                <span className="px-4 py-2 rounded-xl bg-black text-white text-sm sm:text-base font-semibold">
                  Paid
                </span>
              ) : (
                <span className="px-4 py-2 rounded-xl bg-black/10 text-black/50 text-sm sm:text-base font-semibold">
                  Waiting
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMyMeal;
