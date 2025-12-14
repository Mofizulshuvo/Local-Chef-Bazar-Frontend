import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const AdminMyProfile = () => {
  const { UsersAllDataFromDB, setUserAllDataFromDB, token } =
    useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false); // 🔥 active/edit state

  const { register, handleSubmit, reset } = useForm();

  // Reset form when DB data changes
  useEffect(() => {
    if (UsersAllDataFromDB) {
      reset({
        name: UsersAllDataFromDB?.name || "",
        email: UsersAllDataFromDB?.email || "",
        profileImage: UsersAllDataFromDB?.profileImage || "",
      });
    }
  }, [UsersAllDataFromDB, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const res = await axios.put(
        `http://localhost:3000/users/${UsersAllDataFromDB.uid}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Profile updated successfully!");
      setUserAllDataFromDB({ ...UsersAllDataFromDB, ...data });
      setIsEdit(false); // 🔥 back to view mode
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg mt-8">
      {/* Header */}
      <div className="flex justify-between items-center border-b p-6">
        <h1 className="text-xl font-semibold">Admin Profile</h1>

        {/* Active button (like isActive) */}
        <button
          onClick={() => setIsEdit(!isEdit)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition
            ${
              isEdit
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }
          `}
        >
          {isEdit ? "Cancel Edit" : "Edit Profile"}
        </button>
      </div>

      {/* Body */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
        {/* Profile Image */}
        <div className="flex items-center gap-6">
          <img
            src={
              UsersAllDataFromDB?.profileImage ||
              "https://via.placeholder.com/100"
            }
            alt="Admin"
            className="w-24 h-24 rounded-full object-cover border"
          />

          {isEdit && (
            <input
              type="text"
              {...register("profileImage")}
              placeholder="Profile Image URL"
              className="flex-1 border rounded-lg px-3 py-2"
            />
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            {...register("name")}
            disabled={!isEdit}
            className={`w-full border rounded-lg px-3 py-2 transition
              ${!isEdit ? "bg-gray-100 cursor-not-allowed" : ""}
            `}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            disabled
            className="w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Submit */}
        {isEdit && (
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }
            `}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        )}
      </form>
    </div>
  );
};

export default AdminMyProfile;
