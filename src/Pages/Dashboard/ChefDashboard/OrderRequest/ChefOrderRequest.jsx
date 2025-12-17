import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";

const ChefOrderRequest = () => {
  const { UsersAllDataFromDB } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

console.log(typeof UsersAllDataFromDB.chefId);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3000/orders");

     console.log(res.data[0].chefId);
        const chefOrders = res.data.filter(
  (order) =>
    String(order.chefId).trim() === String(UsersAllDataFromDB.chefId).trim()
);

        setOrders(chefOrders);
        console.log(orders);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    if (UsersAllDataFromDB?.uid) {
      fetchOrders();
    }
  }, [UsersAllDataFromDB?.uid]);

 
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);

      await axios.put(`http://localhost:3000/orders/${orderId}`, {
        orderStatus: newStatus,
      });

     
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, orderStatus: newStatus }
            : order
        )
      );
    } catch (error) {
      console.error("Order update failed", error);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <p className="text-center mt-6">Loading orders...</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white shadow rounded-lg p-5 space-y-2"
        >
          <h3 className="text-xl font-bold">{order.foodName}</h3>

          <p><strong>Price:</strong> ৳{order.price}</p>
          <p><strong>Quantity:</strong> {order.quantity}</p>
          <p><strong>Status:</strong> <StatusBadge status={order.orderStatus} /></p>
          <p><strong>User Email:</strong> {order.userEmail}</p>
          <p><strong>Order Time:</strong> {new Date(order.orderTime).toLocaleString()}</p>
          <p><strong>Address:</strong> {order.userAddress}</p>
          <p><strong>Payment:</strong> {order.paymentStatus}</p>

        
          <div className="flex gap-3 mt-4">
            {/* Cancel */}
            <button
              disabled={
                order.orderStatus !== "pending" || updatingId === order._id
              }
              onClick={() => updateOrderStatus(order._id, "cancelled")}
              className={`px-4 py-1 rounded text-white ${
                order.orderStatus !== "pending"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              Cancel
            </button>

            {/* Accept */}
            <button
              disabled={
                order.orderStatus !== "pending" || updatingId === order._id
              }
              onClick={() => updateOrderStatus(order._id, "accepted")}
              className={`px-4 py-1 rounded text-white ${
                order.orderStatus !== "pending"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              Accept
            </button>

            {/* Deliver */}
            <button
              disabled={
                order.orderStatus !== "accepted" || updatingId === order._id
              }
              onClick={() => updateOrderStatus(order._id, "delivered")}
              className={`px-4 py-1 rounded text-white ${
                order.orderStatus !== "accepted"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Deliver
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ---------------- STATUS BADGE ---------------- */
const StatusBadge = ({ status }) => {
  let color = "bg-gray-400";

  if (status === "pending") color = "bg-yellow-500";
  else if (status === "accepted") color = "bg-green-500";
  else if (status === "cancelled") color = "bg-red-500";
  else if (status === "delivered") color = "bg-blue-500";

  return (
    <span className={`text-white px-2 py-1 rounded text-sm ${color}`}>
      {status}
    </span>
  );
};

export default ChefOrderRequest;
