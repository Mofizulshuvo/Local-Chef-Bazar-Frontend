import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../../Components/Loader/Loader";

const AdminManageRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://local-chef-bazar-backend-1.onrender.com/request");
      const sorted = res.data.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setRequests(sorted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const acceptRequest = async (req) => {
    try {
      await axios.put(`https://local-chef-bazar-backend-1.onrender.com/request/${req._id}/accept`);
      fetchRequests();
    } catch (err) {
      console.error("Error accepting request:", err);
    }
  };

  const rejectRequest = async (req) => {
    try {
      await axios.put(`https://local-chef-bazar-backend-1.onrender.com/request/${req._id}/reject`);
      fetchRequests();
    } catch (err) {
      console.error("Error rejecting request:", err);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-4 sm:p-6 w-full">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#C10007] mb-6 sm:mb-10">
        Manage Requests
      </h2>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-2xl shadow-xl bg-white border border-gray-100">
          <thead className="bg-black rounded-t-2xl">
            <tr>
              <th className="px-4 sm:px-6 py-2 text-left text-sm sm:text-base font-medium text-white uppercase">
                Name
              </th>
              <th className="px-4 sm:px-6 py-2 text-left text-sm sm:text-base font-medium text-white uppercase">
                Current Role
              </th>
              <th className="px-4 sm:px-6 py-2 text-left text-sm sm:text-base font-medium text-white uppercase">
                Request For
              </th>
              <th className="px-4 sm:px-6 py-2 text-left text-sm sm:text-base font-medium text-white uppercase">
                Status
              </th>
              <th className="px-4 sm:px-6 py-2 text-left text-sm sm:text-base font-medium text-white uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((req) => (
              <tr
                key={req._id}
                className="hover:shadow-2xl transition-all transform hover:-translate-y-1 rounded-lg"
              >
                <td className="px-4 sm:px-6 py-3 text-sm sm:text-base text-black">{req.name}</td>
                <td className="px-4 sm:px-6 py-3 text-sm sm:text-base text-black capitalize">
                  {req.currentRole}
                </td>
                <td className="px-4 sm:px-6 py-3 text-sm sm:text-base text-black capitalize">
                  {req.requestFor}
                </td>
                <td className="px-4 sm:px-6 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm sm:text-base font-semibold`}
                    style={{
                      backgroundColor:
                        req.requestStatus === "pending"
                          ? "#C10007"
                          : req.requestStatus === "approved"
                          ? "#000000"
                          : "#FFFFFF",
                      color:
                        req.requestStatus === "pending"
                          ? "#FFFFFF"
                          : req.requestStatus === "approved"
                          ? "#FFFFFF"
                          : "#000000",
                      border:
                        req.requestStatus === "rejected"
                          ? "1px solid #C10007"
                          : "none",
                    }}
                  >
                    {req.requestStatus}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-3 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => acceptRequest(req)}
                    disabled={req.requestStatus !== "pending"}
                    className={`btn-primary disabled:opacity-50 disabled:cursor-not-allowed ${
                      req.requestStatus !== "pending" ? "bg-gray-400 hover:bg-gray-400" : ""
                    }`}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => rejectRequest(req)}
                    disabled={req.requestStatus !== "pending"}
                    className={`btn-outline disabled:opacity-50 disabled:cursor-not-allowed ${
                      req.requestStatus !== "pending" ? "bg-gray-400 hover:bg-gray-400 text-white" : ""
                    }`}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManageRequest;
