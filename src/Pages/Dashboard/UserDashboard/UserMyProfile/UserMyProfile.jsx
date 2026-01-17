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
    return <p className="text-center text-black mt-8">Loading profile...</p>;
  }

  return (
    <div className="w-full px-4 sm:px-6 flex justify-center mt-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
        {/* Profile Image and Name */}
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-lg">
            <img
              src={UsersAllDataFromDB.profileImage || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-black text-center">{UsersAllDataFromDB.name}</h1>
          <p className="mt-1 text-[#C10007] uppercase tracking-wide text-sm sm:text-base">{UsersAllDataFromDB.role}</p>
        </div>

        {/* Info Grid */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <Info title="Email" value={UsersAllDataFromDB.email} />
          <Info title="Address" value={UsersAllDataFromDB.address} />
          <Info title="Role" value={UsersAllDataFromDB.role} />
          <Info title="Status" value={UsersAllDataFromDB.status || "Active"} />
        </div>

        {/* Action Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-4">
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
                className="btn-primary"
              />
              <Button
                onClick={handleRequestAdmin}
                text="Become an Admin"
                className="btn-outline"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Info = ({ title, value }) => (
  <div className="bg-black/5 p-4 rounded-xl shadow-inner flex flex-col justify-center items-start hover:shadow-md transition duration-300">
    <h2 className="text-[#C10007] text-xs sm:text-sm uppercase tracking-wide">{title}</h2>
    <p className="text-black font-medium truncate text-sm sm:text-base">{value || "-"}</p>
  </div>
);

const Button = ({ text, onClick, disabled, className = "" }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex-1 py-2 px-6 rounded-xl text-white font-semibold transition-all duration-300 text-sm sm:text-base ${
      disabled ? "bg-gray-400 cursor-not-allowed" : className
    }`}
  >
    {text}
  </button>
);

export default UserMyProfile;
