import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../Context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ChefCreateMeal = () => {
  const { UsersAllDataFromDB, token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (!data.foodImage || !data.foodImage[0]) {
      toast.error("Please select a food image.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", data.foodImage[0]);

      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );

      const imageUrl = imgbbRes.data.data.display_url;
      if (!imageUrl) throw new Error("Image upload failed");

      const A = {
        foodName: data.foodName,
        chefName: data.chefName,
        foodImage: imageUrl,
        price: Number(data.price),
        rating: Number(data.rating),
        ingredients: data.ingredients,
        deliveryTime: Number(data.deliveryTime),
        experience: Number(data.experience),
        chefId: UsersAllDataFromDB?.chefId,
        email: UsersAllDataFromDB?.email,
      };

      await axios.post("http://localhost:3000/meals", A, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // toast.success("Meal created successfully!");
      Swal.fire({
        title: "Good job!",
        text: "Meal created succesfully!",
        icon: "success",
      });
      reset();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create meal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-3/5 mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Create Meal</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Food Name</label>
          <input
            type="text"
            {...register("foodName", { required: "Food name is required" })}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.foodName && (
            <p className="text-red-500 text-xs">{errors.foodName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Chef Name</label>
          <input
            type="text"
            
            value={UsersAllDataFromDB.name}
            readOnly
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Food Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("foodImage", { required: "Food image is required" })}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input
              type="number"
              {...register("price", { required: true })}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Rating</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              {...register("rating", { required: true })}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Ingredients</label>
          <textarea
            rows="3"
            {...register("ingredients", { required: true })}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium">
              Delivery Time (min)
            </label>
            <input
              type="number"
              {...register("deliveryTime", { required: true })}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Experience (years)
            </label>
            <input
              type="number"
              {...register("experience", { required: true })}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Chef ID</label>
          <input
            type="text"
            value={UsersAllDataFromDB?.chefId}
            readOnly
            className="w-full border rounded-lg px-3 py-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={UsersAllDataFromDB?.email}
            readOnly
            className="w-full border rounded-lg px-3 py-2 bg-gray-100"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-lg font-semibold transition"
        >
          {loading ? "Creating Meal..." : "Create Meal"}
        </button>
      </form>
    </div>
  );
};

export default ChefCreateMeal;
