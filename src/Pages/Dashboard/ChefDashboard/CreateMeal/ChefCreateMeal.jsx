import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../Context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const ChefCreateMeal = () => {
  const { UsersAllDataFromDB, token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setMessage("");

      // Construct JSON payload
      const payload = {
        foodName: data.foodName || "",
        chefName: data.chefName || "",
        foodImage: data.foodImage?.[0]?.name || "", // just filename string
        price: data.price || 0,
        rating: data.rating || 0,
        ingredients: data.ingredients || "",
        deliveryTime: data.deliveryTime || 0,
        experience: data.experience || 0,
        chefId: UsersAllDataFromDB?.chefId || "",
        email: UsersAllDataFromDB?.email || ""
      };

      // POST JSON directly like your example
      await axios.post("http://localhost:3000/meals", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      setMessage("Meal created successfully!");
      toast.success("Meal created successfully!");
      reset();
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to create meal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-xl font-semibold mb-2">Create Meal</h1>

      {message && <p className={`mb-3 text-sm ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>{message}</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Food Name */}
        <div>
          <label className="block text-xs font-medium mb-1">Food Name</label>
          <input type="text" {...register("foodName", { required: "Food name is required" })} className="w-full border rounded-lg px-3 py-2" />
          {errors.foodName && <p className="text-red-500 text-xs mt-1">{errors.foodName.message}</p>}
        </div>

        {/* Chef Name */}
        <div>
          <label className="block text-xs font-medium mb-1">Chef Name</label>
          <input type="text" {...register("chefName", { required: true })} className="w-full border rounded-lg px-3 py-2" />
        </div>

        {/* Food Image (just filename string) */}
        <div>
          <label className="block text-xs font-medium mb-1">Food Image</label>
          <input type="file" accept="image/*" {...register("foodImage", { required: false })} className="w-full border rounded-lg px-3 py-2" />
        </div>

        {/* Price & Rating */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium mb-1">Price</label>
            <input type="number" step="0.01" {...register("price", { required: true })} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Rating</label>
            <input type="number" step="0.1" min="0" max="5" {...register("rating", { required: true })} className="w-full border rounded-lg px-3 py-2" />
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-xs font-medium mb-1">Ingredients</label>
          <textarea rows="2" {...register("ingredients", { required: true })} className="w-full border rounded-lg px-3 py-2" />
        </div>

        {/* Delivery Time & Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium mb-1">Delivery Time (min)</label>
            <input type="number" {...register("deliveryTime", { required: true })} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Experience (years)</label>
            <input type="number" {...register("experience", { required: true })} className="w-full border rounded-lg px-3 py-2" />
          </div>
        </div>

        {/* Chef ID */}
        <div>
          <label className="block text-xs font-medium mb-1">Chef ID</label>
          <input type="text" value={UsersAllDataFromDB?.chefId || "Pending Approval"} readOnly className="w-full border rounded-lg px-3 py-2 bg-gray-100" />
        </div>

        {/* User Email */}
        <div>
          <label className="block text-xs font-medium mb-1">User Email</label>
          <input type="email" value={UsersAllDataFromDB?.email || ""} readOnly className="w-full border rounded-lg px-3 py-2 bg-gray-100" />
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading} className={`w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-lg font-semibold transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
          {loading ? "Creating..." : "Create Meal"}
        </button>
      </form>
    </div>
  );
};

export default ChefCreateMeal;
