import React, { useContext } from "react";
import { AuthContext } from "../../../../Context/AuthContext";

const UserMyOrder = () => {
  const { UsersAllOrders } = useContext(AuthContext); // assuming you store user orders in context

  if (!UsersAllOrders || UsersAllOrders.length === 0) {
    return (
      <div className="flex justify-center items-center h-full mt-10">
        <p className="text-gray-500 text-lg">No orders found.</p>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-6">
      {UsersAllOrders.map((order, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {order.foodName}
              </h2>
              <p className="text-gray-500">Chef: {order.chefName}</p>
              <p className="text-gray-500">Chef ID: {order.chefId}</p>
            </div>

            <div className="flex flex-col gap-1 text-gray-600 sm:text-right">
              <p>
                <span className="font-medium">Status:</span> {order.orderStatus}
              </p>
              <p>
                <span className="font-medium">Payment:</span> {order.paymentStatus}
              </p>
              <p>
                <span className="font-medium">Quantity:</span> {order.quantity}
              </p>
              <p>
                <span className="font-medium">Price:</span> ${order.price}
              </p>
              <p>
                <span className="font-medium">Delivery Time:</span> {order.deliveryTime}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserMyOrder;
