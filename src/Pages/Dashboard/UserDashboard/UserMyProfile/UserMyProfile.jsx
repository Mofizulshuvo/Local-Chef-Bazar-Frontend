import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import axios from "axios";

const UserMyProfile = () => {
  const { UsersAllDataFromDB } = useContext(AuthContext);

  // State for request data and loading
  const [requestData, setRequestData] = useState(null);
  const [requestLoading, setRequestLoading] = useState(true);

  /* ---------------- FETCH REQUEST STATUS ---------------- */
  const fetchRequestStatus = async () => {
    if (!UsersAllDataFromDB?.uid) return;

    setRequestLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/request/${UsersAllDataFromDB.uid}`
      );

      // backend now returns a proper object with requestStatus
      setRequestData(res.data);
    } catch (error) {
      // 404 or error = no request found
      setRequestData(null);
    } finally {
      setRequestLoading(false);
    }
  };

  useEffect(() => {
    fetchRequestStatus();
  }, [UsersAllDataFromDB?.uid]);

  /* ---------------- REQUEST HANDLERS ---------------- */
  const handleRequestChef = async () => {
    await axios.post("http://localhost:3000/request", {
      uid: UsersAllDataFromDB.uid,
      name: UsersAllDataFromDB.name,
      currentRole: UsersAllDataFromDB.role,
      requestFor: "chef",
    });

    // fetch the real backend data again
    await fetchRequestStatus();
  };

  const handleRequestAdmin = async () => {
    await axios.post("http://localhost:3000/request", {
      uid: UsersAllDataFromDB.uid,
      name: UsersAllDataFromDB.name,
      currentRole: UsersAllDataFromDB.role,
      requestFor: "admin",
    });

    await fetchRequestStatus();
  };

  /* ---------------- GUARD ---------------- */
  if (!UsersAllDataFromDB) {
    return <p className="text-center">Loading profile...</p>;
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="w-4/5 flex justify-center">
      <div className="w-full bg-white shadow-lg rounded-xl p-8">

        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <img
            src={
              UsersAllDataFromDB.profileImage ||
              "https://via.placeholder.com/150"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
          />
          <h1 className="mt-4 text-2xl font-bold text-gray-800">
            {UsersAllDataFromDB.name}
          </h1>
          <p className="mt-1 text-gray-500 capitalize">
            {UsersAllDataFromDB.role}
          </p>
        </div>

        {/* User Info */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Info title="Email" value={UsersAllDataFromDB.email} />
          <Info title="Address" value={UsersAllDataFromDB.address} />
          <Info title="Role" value={UsersAllDataFromDB.role} />
          <Info title="Status" value={UsersAllDataFromDB.status || "Active"} />
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          {requestLoading ? (
            <Button disabled text="Checking request..." />
          ) : requestData?.requestStatus === "pending" ? (
            <Button disabled text="Request Pending" />
          ) : requestData?.requestStatus === "approved" ? (
            <Button disabled text="Request Approved" />
          ) : (
            <>
              <Button
                onClick={handleRequestChef}
                text="Become a Chef"
                className="bg-yellow-500 hover:bg-yellow-600"
              />
              <Button
                onClick={handleRequestAdmin}
                text="Become an Admin"
                className="bg-blue-500 hover:bg-blue-600"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* ---------------- SMALL COMPONENTS ---------------- */

const Info = ({ title, value }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h2 className="text-gray-400 text-sm">{title}</h2>
    <p className="text-gray-700 font-medium">{value || "-"}</p>
  </div>
);

const Button = ({ text, onClick, disabled, className = "" }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`text-white font-semibold py-2 px-6 rounded-lg ${
      disabled
        ? "bg-gray-400 cursor-not-allowed"
        : className
    }`}
  >
    {text}
  </button>
);

export default UserMyProfile;
