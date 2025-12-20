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

  const isDisabled = UsersAllDataFromDB.status === "fraud";

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

      const mealData = {
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

      await axios.post("https://local-chef-bazar-backend-1.onrender.com/meals", mealData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire({
        title: "Good job!",
        text: "Meal created successfully!",
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
    <div className=" mx-auto w-2/3 mt-10 p-6 bg-white rounded-2xl shadow-2xl">
      <h1 className="text-3xl text-c font-bold text-center text-black mb-6">Create Meal</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Food Name */}
        <InputField
          label="Food Name"
          type="text"
          register={register("foodName", { required: "Food name is required" })}
          error={errors.foodName?.message}
        />

        {/* Chef Name */}
        <InputField
          label="Chef Name"
          type="text"
          value={UsersAllDataFromDB.name}
          readOnly
        />

        {/* Food Image */}
        <InputField
          label="Food Image"
          type="file"
          register={register("foodImage", { required: "Food image is required" })}
        />

        {/* Price & Rating */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Price"
            type="number"
            register={register("price", { required: true })}
          />
          <InputField
            label="Rating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            register={register("rating", { required: true })}
          />
        </div>

        {/* Ingredients */}
        <InputField
          label="Ingredients"
          type="textarea"
          register={register("ingredients", { required: true })}
        />

        {/* Delivery Time & Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Delivery Time (min)"
            type="number"
            register={register("deliveryTime", { required: true })}
          />
          <InputField
            label="Experience (years)"
            type="number"
            register={register("experience", { required: true })}
          />
        </div>

        {/* Chef ID & Email */}
        <InputField label="Chef ID" type="text" value={UsersAllDataFromDB?.chefId} readOnly />
        <InputField label="Email" type="email" value={UsersAllDataFromDB?.email} readOnly />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || isDisabled}
          className={`w-full py-3 rounded-xl font-semibold text-white text-lg transition-transform shadow-lg ${
            isDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#C10007] hover:bg-black hover:shadow-2xl"
          }`}
          title={isDisabled ? "User not approved / flagged as fraud" : ""}
        >
          {loading ? "Creating Meal..." : "Create Meal"}
        </button>
      </form>
    </div>
  );
};

/* ---------- Input Component ---------- */
const InputField = ({ label, type, register, error, value, readOnly }) => (
  <div>
    <label className="block text-sm font-medium text-black/70 mb-1">{label}</label>
    {type === "textarea" ? (
      <textarea
        {...(register || {})}
        value={value}
        readOnly={readOnly}
        className="w-full px-4 py-2 rounded-xl shadow-inner focus:shadow-outline focus:outline-none text-black"
      />
    ) : (
      <input
        type={type}
        {...(register || {})}
        value={value}
        readOnly={readOnly}
        className="w-full px-4 py-2 rounded-xl shadow-inner focus:shadow-outline focus:outline-none text-black"
      />
    )}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default ChefCreateMeal;
