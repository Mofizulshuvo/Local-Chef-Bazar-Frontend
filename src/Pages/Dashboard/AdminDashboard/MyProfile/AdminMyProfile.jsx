import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const AdminMyProfile = () => {
  const { UsersAllDataFromDB, setUserAllDataFromDB, token } =
    useContext(AuthContext);

  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (UsersAllDataFromDB) {
      reset({
        name: UsersAllDataFromDB?.name || "",
        email: UsersAllDataFromDB?.email || "",
        phone: UsersAllDataFromDB?.phone || "",
        status: UsersAllDataFromDB?.status || "",
        uid: UsersAllDataFromDB?.uid || "",
        profileImage: UsersAllDataFromDB?.profileImage || "",
      });
    }
  }, [UsersAllDataFromDB, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const res = await axios.put(
        `https://local-chef-bazar-backend-1.onrender.com/users/${UsersAllDataFromDB.uid}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Profile updated successfully!");
      setUserAllDataFromDB({ ...UsersAllDataFromDB, ...data });
      setIsEdit(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-black">Admin Profile</h1>
        <p className="text-sm text-black/50">Manage your personal information</p>
      </div>

      {/* Profile Card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-2xl rounded-2xl p-6 md:p-10 flex flex-col md:flex-row gap-8"
      >
        {/* Profile Image */}
        <div className="flex-shrink-0 flex flex-col items-center md:items-start gap-2">
          <img
            src={UsersAllDataFromDB?.profileImage || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg"
          />
          {isEdit && (
            <input
              type="text"
              placeholder="Profile Image URL"
              {...register("profileImage")}
              className="w-full border rounded-lg px-2 py-1 text-sm shadow-sm focus:ring-2 focus:ring-[#C10007] focus:outline-none"
            />
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            {/* Name */}
            {isEdit ? (
              <input
                type="text"
                {...register("name")}
                className="w-full border rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-[#C10007] focus:outline-none"
              />
            ) : (
              <h2 className="text-2xl font-bold text-black">
                {UsersAllDataFromDB?.name || "Admin Name"}
              </h2>
            )}

            {/* Role */}
            <p className="text-sm text-black/70 capitalize">
              {UsersAllDataFromDB?.role || "Admin"}
            </p>

            {/* Email */}
            <p className="text-sm text-black/50">{UsersAllDataFromDB?.email}</p>
          </div>

          {/* Details Grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-black/70">
            <Info
              label="UID"
              value={
                isEdit ? (
                  <input
                    type="text"
                    {...register("uid")}
                    className="w-full border rounded-lg px-2 py-1 shadow-sm focus:ring-2 focus:ring-[#C10007] focus:outline-none"
                  />
                ) : (
                  UsersAllDataFromDB?.uid
                )
              }
            />
            <Info
              label="Phone"
              value={
                isEdit ? (
                  <input
                    type="text"
                    {...register("phone")}
                    className="w-full border rounded-lg px-2 py-1 shadow-sm focus:ring-2 focus:ring-[#C10007] focus:outline-none"
                  />
                ) : (
                  UsersAllDataFromDB?.phone || "N/A"
                )
              }
            />
            <Info
              label="Status"
              value={
                isEdit ? (
                  <input
                    type="text"
                    {...register("status")}
                    className="w-full border rounded-lg px-2 py-1 shadow-sm focus:ring-2 focus:ring-[#C10007] focus:outline-none"
                  />
                ) : (
                  UsersAllDataFromDB?.status || "Active"
                )
              }
            />
            <Info
              label="Joined On"
              value={
                UsersAllDataFromDB?.createdAt
                  ? new Date(UsersAllDataFromDB.createdAt).toDateString()
                  : "N/A"
              }
            />
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4 flex-wrap">
            <button
              type={isEdit ? "submit" : "button"}
              onClick={() => !isEdit && setIsEdit(true)}
              className="px-6 py-2 bg-[#C10007] text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform"
            >
              {isEdit ? (loading ? "Saving..." : "Save Changes") : "Edit Profile"}
            </button>
            {!isEdit && (
              <button className="px-6 py-2 bg-black/10 text-black font-semibold rounded-xl hover:bg-black/20 transition-colors">
                Change Password
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

/* ---------- Small Info Component ---------- */
const Info = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-black/50 text-xs">{label}</span>
    <span className="font-medium text-black">{value || "-"}</span>
  </div>
);

export default AdminMyProfile;
