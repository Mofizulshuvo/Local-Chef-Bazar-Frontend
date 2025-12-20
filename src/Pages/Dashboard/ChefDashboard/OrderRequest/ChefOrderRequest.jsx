import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ChefOrderRequest = () => {
  const { UsersAllDataFromDB, token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedAction, setSelectedAction] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/orders", {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });

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

  const confirmAction = (order, action) => {
    setSelectedOrder(order);
    setSelectedAction(action);
    setModalOpen(true);
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder) return;
    const orderId = selectedOrder._id;
    try {
      setUpdatingId(orderId);

      await axios.put(
        `http://localhost:3000/orders/${orderId}`,
        { orderStatus: selectedAction },
        { headers: token ? { Authorization: `Bearer ${token}` } : undefined }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, orderStatus: selectedAction }
            : order
        )
      );
      setModalOpen(false);
    } catch (error) {
      console.error("Order update failed", error);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading orders...</p>;
  if (orders.length === 0)
    return <p className="text-center mt-10 text-gray-500">No orders found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-[#C10007] mb-8">
        Customer Meal Requests
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow-xl p-5 transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 border border-black"
          >
            <img
              src={order.foodImage || "https://via.placeholder.com/200"}
              alt={order.mealName}
              className="w-full h-40 object-cover rounded-xl mb-4 border border-black"
            />
            <h3 className="text-xl font-bold text-[#C10007] mb-2">
              {order.mealName}
            </h3>
            <div className="grid grid-cols-2 text-black gap-2 text-sm mb-3">
              <p>
                Price: <span className="font-semibold">৳{order.price}</span>
              </p>
              <p>
                Quantity: <span className="font-semibold">{order.quantity}</span>
              </p>
              <p>User Email: <span className="font-semibold">{order.userEmail}</span></p>
              <p>Payment: <span className="font-semibold">{order.paymentStatus}</span></p>
              <p className="col-span-2">Address: {order.userAddress}</p>
              <p className="col-span-2">
                Order Time: {new Date(order.orderTime).toLocaleString()}
              </p>
            </div>
            <StatusBadge status={order.orderStatus} />

            <div className="flex gap-3 mt-4 justify-center">
              <ActionButton
                onClick={() => confirmAction(order, "cancelled")}
                disabled={order.orderStatus !== "pending" || updatingId === order._id}
                color="#C10007"
                label="Cancel"
              />
              <ActionButton
                onClick={() => confirmAction(order, "accepted")}
                disabled={order.orderStatus !== "pending" || updatingId === order._id}
                color="#000000"
                label="Accept"
              />
              <ActionButton
                onClick={() => confirmAction(order, "delivered")}
                disabled={
                  order.orderStatus !== "accepted" ||
                  order.paymentStatus !== "paid" ||
                  updatingId === order._id
                }
                color="#C10007"
                label="Deliver"
              />
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Confirm Action"
        className="bg-white p-6 max-w-md mx-auto mt-40 rounded-2xl shadow-2xl border border-black"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-bold text-[#C10007] mb-4">
          Confirm {selectedAction}
        </h2>
        <p className="mb-6">
          Are you sure you want to <strong>{selectedAction}</strong> this order for "
          <strong>{selectedOrder?.mealName}</strong>"?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setModalOpen(false)}
            className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateStatus}
            className="px-4 py-2 rounded-xl text-white bg-[#C10007] hover:bg-red-800"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  let color = "bg-black";
  if (status === "pending") color = "#C10007";
  else if (status === "accepted") color = "#000000";
  else if (status === "cancelled") color = "#C10007";
  else if (status === "delivered") color = "#000000";

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-white font-semibold mt-2 text-sm`}
      style={{ backgroundColor: color }}
    >
      {status.toUpperCase()}
    </span>
  );
};

const ActionButton = ({ onClick, disabled, color, label }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="px-4 py-2 rounded-xl font-semibold text-white shadow-md transform transition hover:-translate-y-1 hover:shadow-xl"
    style={{
      backgroundColor: disabled ? "#9ca3af" : color,
      cursor: disabled ? "not-allowed" : "pointer",
    }}
  >
    {label}
  </button>
);

export default ChefOrderRequest;
