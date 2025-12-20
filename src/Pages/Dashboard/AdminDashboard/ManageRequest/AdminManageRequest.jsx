import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../../Components/Loader/Loader";

const AdminManageRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/request");
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
      await axios.put(`http://localhost:3000/request/${req._id}/accept`);

      fetchRequests();
    } catch (err) {
      console.error("Error accepting request:", err);
    }
  };

  const rejectRequest = async (req) => {
    try {
      await axios.put(`http://localhost:3000/request/${req._id}/reject`);

      fetchRequests();
    } catch (err) {
      console.error("Error rejecting request:", err);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6 bg-white shadow rounded-lg w-full">
      <h2 className="text-2xl text-center font-bold mb-4">Manage Requests</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Current Role
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Request For
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((req) => (
              <tr key={req._id}>
                <td className="px-6 py-4 text-sm text-gray-700">{req.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700 capitalize">
                  {req.currentRole}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 capitalize">
                  {req.requestFor}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm font-semibold ${
                      req.requestStatus === "pending"
                        ? "bg-yellow-500"
                        : req.requestStatus === "approved"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {req.requestStatus}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => acceptRequest(req)}
                    disabled={req.requestStatus !== "pending"}
                    className={`px-3 py-1 rounded text-white text-sm font-semibold ${
                      req.requestStatus === "pending"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => rejectRequest(req)}
                    disabled={req.requestStatus !== "pending"}
                    className={`px-3 py-1 rounded text-white text-sm font-semibold ${
                      req.requestStatus === "pending"
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-gray-400 cursor-not-allowed"
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
