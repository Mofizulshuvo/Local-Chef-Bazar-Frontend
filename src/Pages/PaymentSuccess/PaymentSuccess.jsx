import React, { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const { token } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const orderId = query.get("orderId");

    if (orderId) {
      const updatePayment = async () => {
        try {
          await axios.put(
            `http://localhost:3000/orders/payment/${orderId}`,
            {},
            { headers: token ? { Authorization: `Bearer ${token}` } : undefined }
          );
          toast.success("Payment successful!");
          navigate("/Dashboard/MyOrder"); // redirect to My Orders
        } catch (err) {
          console.error(err);
          toast.error("Failed to update payment. Contact support.");
        }
      };
      updatePayment();
    } else {
      navigate("/Dashboard/MyOrder"); // fallback
    }
  }, [location, navigate, token]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg text-gray-700">Processing your payment...</p>
    </div>
  );
};

export default PaymentSuccess;
