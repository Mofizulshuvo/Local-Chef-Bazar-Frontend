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
        `http://localhost:3000/orders/${UsersAllDataFromDB?.email}`,
        { headers: token ? { Authorization: `Bearer ${token}` } : undefined }
      );
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (UsersAllDataFromDB?.email) fetchOrders();
  }, [UsersAllDataFromDB, token]);

  const handlePayment = async (orderId) => {
    const confirmPayment = await Swal.fire({
      title: "Confirm Payment",
      text: "Are you sure you want to complete the payment?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, pay now",
    });

    if (!confirmPayment.isConfirmed) return;

    try {
      const res = await axios.post(
        "http://localhost:3000/createPaymentSession",
        { orderId },
        { headers: token ? { Authorization: `Bearer ${token}` } : undefined }
      );

      // Redirect to Stripe checkout
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Payment failed. Please try again.", "error");
    }
  };

  if (loading) return <Loader />;

  if (!orders.length)
    return (
      <div className="flex justify-center items-center h-full mt-10">
        <p className="text-gray-500 text-lg">You haven't placed any orders yet.</p>
      </div>
    );

  return (
    <div className="p-4 sm:p-6 md:p-10 w-full mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-800">
        My Orders
      </h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="grid grid-cols-1 md:grid-cols-6 gap-4 bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-xl transition"
          >
            
            <div className="flex justify-center md:justify-start">
              <img
                src={order.foodImage || "https://via.placeholder.com/100"}
                alt={order.mealName}
                className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-lg"
              />
            </div>

            
            <div className="flex flex-col justify-center mx-auto gap-3 text-gray-800 font-semibold text-center md:text-left">
              <span className="text-sm md:text-base text-gray-700">Food Name</span>
              <span className="text-lg md:text-xl font-bold">{order.mealName}</span>
            </div>

            
            <div className="flex flex-col mx-auto justify-center gap-3  text-center md:text-left">
              <span className="text-sm mx-auto text-gray-500">Quantity</span>
              <span className="text-lg mx-auto font-semibold">{order.quantity || 1}</span>
            </div>

          
            <div className="flex flex-col justify-center mx-auto gap-3 text-center md:text-left">
              <span className="text-sm mx-auto text-gray-500">Total Price</span>
              <span className="text-lg mx-auto font-semibold">
                ${order.price * (order.quantity || 1)}
              </span>
            </div>

            
            <div className="flex flex-col justify-center mx-auto gap-3 text-center md:text-left">
              <span className="text-sm mx-auto text-gray-500">Order Status</span>
              <span
                className={`px-3 py-1 rounded-full text-center mx-auto font-semibold text-sm ${
                  order.orderStatus === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : order.orderStatus === "accepted"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {order.orderStatus}
              </span>
            </div>

            
            <div className="flex flex-col justify-center text-center gap-3 items-center md:items-start">
              <span className="text-sm text-gray-500">Payment Status</span>
              {order.orderStatus === "accepted" && order.paymentStatus !== "paid" ? (
                <button
                  onClick={() => handlePayment(order._id)}
                  className="bg-gradient-to-r from-emerald-400 to-emerald-600 text-white px-4 py-2 rounded-xl font-semibold shadow hover:scale-105 transform transition"
                >
                  Pay Now
                </button>
              ) : (order.orderStatus === "accepted" || order.orderStatus === "delivered" )&& order.paymentStatus === "paid" ? (
                <span className="px-4 py-2 rounded-xl font-semibold bg-green-100 text-green-800">
                  Paid
                </span>
              ) : (
                <span className="px-4 py-2 rounded-xl font-semibold bg-gray-100 text-gray-400">
                 Chef not accept
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
