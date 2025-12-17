import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminManageRequest = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [updatingUid, setUpdatingUid] = useState(null);

//   /* ---------------- FETCH REQUESTS ---------------- */
//   const fetchRequests = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("http://localhost:3000/request");
//       const sorted = res.data.sort(
//         (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
//       );
//       setRequests(sorted);
//     } catch (error) {
//       console.error("Error fetching requests:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   /* ---------------- UPDATE STATUS & USER ROLE ---------------- */
//   const handleStatusChange = async (req) => {
//     const { uid, requestFor } = req;
//     const newStatus = req.requestStatus === "pending" ? "approved" : req.requestStatus;

//     try {
//       setUpdatingUid(uid);

//       // 1️⃣ Update request status
//       const statusToUpdate = req.requestStatus === "pending" ? "approved" : req.requestStatus;
//       await axios.put(`http://localhost:3000/request/${uid}`, {
//         requestStatus: newStatus,
//       });

//       // 2️⃣ If approved, update user role
//       if (newStatus === "approved") {
//         await axios.put(`http://localhost:3000/user/${uid}`, {
//           role: requestFor,
//         });
//       }

//       // update local state
//       setRequests((prev) =>
//         prev.map((r) =>
//           r.uid === uid ? { ...r, requestStatus: newStatus } : r
//         )
//       );
//     } catch (error) {
//       console.error("Error updating request or user role:", error);
//     } finally {
//       setUpdatingUid(null);
//     }
//   };

//   if (loading) return <p className="text-center mt-4">Loading requests...</p>;

//   return (
//     <div className="p-6 bg-white shadow rounded-lg w-full">
//       <h2 className="text-2xl font-bold mb-4">Manage Requests</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
//                 Name
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
//                 Current Role
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
//                 Request For
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {requests.map((req) => (
//               <tr key={req._id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                   {req.name}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 capitalize">
//                   {req.currentRole}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 capitalize">
//                   {req.requestFor}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <StatusButton status={req.requestStatus} />
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap flex gap-2">
//                   <ActionButton
//                     label="Accept"
//                     disabled={
//                       req.requestStatus !== "pending" || updatingUid === req.uid
//                     }
//                     onClick={() =>
//                       handleStatusChange({ ...req, requestStatus: "approved" })
//                     }
//                   />
//                   <ActionButton
//                     label="Reject"
//                     disabled={
//                       req.requestStatus !== "pending" || updatingUid === req.uid
//                     }
//                     onClick={() =>
//                       handleStatusChange({ ...req, requestStatus: "rejected" })
//                     }
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// /* ---------------- Status Button ---------------- */
// const StatusButton = ({ status }) => {
//   let className = "py-1 px-3 rounded-lg text-white text-sm font-semibold";

//   if (status === "pending") {
//     className += " bg-yellow-500";
//   } else if (status === "approved") {
//     className += " bg-green-500";
//   } else if (status === "rejected") {
//     className += " bg-red-500";
//   } else {
//     className += " bg-gray-400";
//   }

//   return <button className={className}>{status}</button>;
// };

// /* ---------------- Action Button ---------------- */
// const ActionButton = ({ label, disabled, onClick }) => {
//   const className = `py-1 px-3 rounded-lg text-white text-sm font-semibold ${
//     disabled
//       ? "bg-gray-400 cursor-not-allowed"
//       : label === "Accept"
//       ? "bg-green-500 hover:bg-green-600"
//       : "bg-red-500 hover:bg-red-600"
//   }`;

//   return (
//     <button onClick={onClick} disabled={disabled} className={className}>
//       {label}
//     </button>
//   );
};

export default AdminManageRequest;
