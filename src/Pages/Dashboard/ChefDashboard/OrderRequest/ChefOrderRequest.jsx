import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";
import Modal from "react-modal";

Modal.setAppElement("#root"); // For accessibility

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

  if (loading) return <p className="text-center mt-6">Loading orders...</p>;

  return (
    <div>
      <h1 className="text-3xl text-center mt-10">
        Customer's request for meals
      </h1>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white shadow rounded-lg p-5">
            <img
              src={order.foodImage}
              className="w-full mx-1 my-1 h-[150px] object-cover rounded"
              alt={order.mealName}
            />
            <h3 className="text-xl font-bold">{order.mealName}</h3>
            <p>
              <strong>Price:</strong> ৳{order.price}
            </p>
            <p>
              <strong>Quantity:</strong> {order.quantity}
            </p>
            <p>
              <strong>Status:</strong> <StatusBadge status={order.orderStatus} />
            </p>
            <p>
              <strong>User Email:</strong> {order.userEmail}
            </p>
            <p>
              <strong>Order Time:</strong>{" "}
              {new Date(order.orderTime).toLocaleString()}
            </p>
            <p>
              <strong>Address:</strong> {order.userAddress}
            </p>
            <p>
              <strong>Payment:</strong> {order.paymentStatus}
            </p>

            <div className="flex gap-3 mt-4">
              <button
                disabled={
                  order.orderStatus !== "pending" || updatingId === order._id
                }
                onClick={() => confirmAction(order, "cancelled")}
                className={`px-4 py-1 rounded text-white ${
                  order.orderStatus !== "pending"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                Cancel
              </button>

              <button
                disabled={
                  order.orderStatus !== "pending" || updatingId === order._id
                }
                onClick={() => confirmAction(order, "accepted")}
                className={`px-4 py-1 rounded text-white ${
                  order.orderStatus !== "pending"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                Accept
              </button>

              <button
                disabled={
                  order.orderStatus !== "accepted" || order.paymentStatus!=="paid"|| updatingId === order._id
                }
                onClick={() => confirmAction(order, "delivered")}
                className={`px-4 py-1 rounded text-white ${
                  order.orderStatus !== "accepted" || order.paymentStatus!=="paid"
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

      {/* Confirmation Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Confirm Action"
        className="bg-white p-6 max-w-md mx-auto mt-40 rounded shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold mb-4">Confirm {selectedAction}</h2>
        <p className="mb-6">
          Are you sure you want to {selectedAction} this order for "
          {selectedOrder?.mealName}"?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setModalOpen(false)}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateStatus}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

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
