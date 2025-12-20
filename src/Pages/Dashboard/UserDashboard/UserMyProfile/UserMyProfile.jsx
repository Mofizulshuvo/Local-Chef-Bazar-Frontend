import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import axios from "axios";

const UserMyProfile = () => {
  const { UsersAllDataFromDB } = useContext(AuthContext);

  const [requestData, setRequestData] = useState(null);
  const [requestLoading, setRequestLoading] = useState(true);

  const fetchRequestStatus = async () => {
    if (!UsersAllDataFromDB?.uid) return;
    setRequestLoading(true);
    try {
      const res = await axios.get(
        `https://local-chef-bazar-backend-1.onrender.com/request/${UsersAllDataFromDB.uid}`
      );
      setRequestData(res.data);
    } catch {
      setRequestData(null);
    } finally {
      setRequestLoading(false);
    }
  };

  useEffect(() => {
    fetchRequestStatus();
  }, [UsersAllDataFromDB?.uid]);

  const handleRequestChef = async () => {
    await axios.post("https://local-chef-bazar-backend-1.onrender.com/request", {
      uid: UsersAllDataFromDB.uid,
      name: UsersAllDataFromDB.name,
      currentRole: UsersAllDataFromDB.role,
      requestFor: "chef",
    });
    await fetchRequestStatus();
  };

  const handleRequestAdmin = async () => {
    await axios.post("https://local-chef-bazar-backend-1.onrender.com/request", {
      uid: UsersAllDataFromDB.uid,
      name: UsersAllDataFromDB.name,
      currentRole: UsersAllDataFromDB.role,
      requestFor: "admin",
    });
    await fetchRequestStatus();
  };

  if (!UsersAllDataFromDB) {
    return <p className="text-center text-black">Loading profile...</p>;
  }

  return (
    <div className="w-full flex justify-center mt-8">
      <div className="w-full  bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
        
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg">
            <img
              src={UsersAllDataFromDB.profileImage || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-black">{UsersAllDataFromDB.name}</h1>
          <p className="mt-1 text-[#C10007] uppercase tracking-wide">{UsersAllDataFromDB.role}</p>
        </div>

        {/* User Info */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Info title="Email" value={UsersAllDataFromDB.email} />
          <Info title="Address" value={UsersAllDataFromDB.address} />
          <Info title="Role" value={UsersAllDataFromDB.role} />
          <Info title="Status" value={UsersAllDataFromDB.status || "Active"} />
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
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
                className="bg-[#C10007] hover:bg-black shadow-md hover:shadow-lg"
              />
              <Button
                onClick={handleRequestAdmin}
                text="Become an Admin"
                className="bg-black hover:bg-[#C10007] shadow-md hover:shadow-lg"
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
  <div className="bg-black/5 p-4 rounded-xl shadow-inner flex flex-col justify-center items-start hover:shadow-md transition duration-300">
    <h2 className="text-[#C10007] text-sm uppercase tracking-wide">{title}</h2>
    <p className="text-black font-medium truncate">{value || "-"}</p>
  </div>
);

const Button = ({ text, onClick, disabled, className = "" }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex-1 py-2 px-6 rounded-xl text-white font-semibold transition-all duration-300 ${
      disabled
        ? "bg-black/40 cursor-not-allowed"
        : className
    }`}
  >
    {text}
  </button>
);

export default UserMyProfile;
