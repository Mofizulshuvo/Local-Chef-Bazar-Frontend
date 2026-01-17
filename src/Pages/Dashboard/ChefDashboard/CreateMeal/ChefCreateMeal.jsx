import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../Context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FiPlus, FiUpload, FiCoffee, FiDollarSign, FiClock, FiStar, FiMapPin } from "react-icons/fi";

const ChefCreateMeal = () => {
  const { UsersAllDataFromDB, token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
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
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
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
        category: data.category,
        location: data.location,
        createdAt: new Date().toISOString(),
        chefId: UsersAllDataFromDB?.chefId,
        email: UsersAllDataFromDB?.email,
      };

      await axios.post(
        "https://local-chef-bazar-backend-1.onrender.com/meals",
        mealData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire({
        title: "Success!",
        text: "Meal created successfully!",
        icon: "success",
        background: "rgba(255, 255, 255, 0.95)",
        backdrop: "rgba(251, 146, 60, 0.4)",
        confirmButtonColor: "#f97316",
      });
      reset();
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create meal");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  if (isDisabled) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🚫</div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Account Restricted
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Your account has been marked as fraud and you cannot create meals.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg shadow-orange-500/25">
          <FiPlus size={32} className="text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Create New Meal
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Share your culinary masterpiece with food lovers
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Image Upload Section */}
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200/50 dark:border-slate-700/50">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
              Meal Image
            </h3>

            <div className="relative inline-block">
              <input
                type="file"
                accept="image/*"
                {...register("foodImage")}
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-48 h-48 mx-auto bg-slate-100 dark:bg-slate-700 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 flex flex-col items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <>
                    <FiUpload size={48} className="text-slate-400 dark:text-slate-500 mb-4" />
                    <p className="text-slate-600 dark:text-slate-400 font-medium">
                      Click to upload image
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                      PNG, JPG up to 5MB
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200/50 dark:border-slate-700/50">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <FiCoffee size={24} className="text-orange-500" />
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Food Name"
              icon={FiCoffee}
              register={register("foodName", { required: "Food name is required" })}
              error={errors.foodName?.message}
              placeholder="Enter meal name"
            />

            <InputField
              label="Chef Name"
              icon={FiCoffee}
              value={UsersAllDataFromDB.name}
              readOnly
            />

            <InputField
              label="Price ($)"
              icon={FiDollarSign}
              type="number"
              step="0.01"
              register={register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price must be positive" }
              })}
              error={errors.price?.message}
              placeholder="0.00"
            />

            <InputField
              label="Rating (1-5)"
              icon={FiStar}
              type="number"
              min="1"
              max="5"
              step="0.1"
              register={register("rating", {
                required: "Rating is required",
                min: { value: 1, message: "Rating must be at least 1" },
                max: { value: 5, message: "Rating cannot exceed 5" }
              })}
              error={errors.rating?.message}
              placeholder="4.5"
            />

            <InputField
              label="Delivery Time (min)"
              icon={FiClock}
              type="number"
              register={register("deliveryTime", {
                required: "Delivery time is required",
                min: { value: 1, message: "Delivery time must be positive" }
              })}
              error={errors.deliveryTime?.message}
              placeholder="30"
            />

            <InputField
              label="Experience (years)"
              icon={FiCoffee}
              type="number"
              register={register("experience", {
                required: "Experience is required",
                min: { value: 0, message: "Experience cannot be negative" }
              })}
              error={errors.experience?.message}
              placeholder="5"
            />
          </div>
        </div>

        {/* Additional Details */}
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200/50 dark:border-slate-700/50">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <FiMapPin size={24} className="text-blue-500" />
            Additional Details
          </h3>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Category
                </label>
                <select
                  {...register("category", { required: "Category is required" })}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select category</option>
                  <option value="appetizer">Appetizer</option>
                  <option value="main-course">Main Course</option>
                  <option value="dessert">Dessert</option>
                  <option value="beverage">Beverage</option>
                  <option value="snack">Snack</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                )}
              </div>

              <InputField
                label="Location"
                icon={FiMapPin}
                register={register("location", { required: "Location is required" })}
                error={errors.location?.message}
                placeholder="City, State"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Ingredients
              </label>
              <textarea
                {...register("ingredients", { required: "Ingredients are required" })}
                rows={4}
                className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="List all ingredients separated by commas..."
              />
              {errors.ingredients && (
                <p className="text-red-500 text-sm mt-1">{errors.ingredients.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold rounded-2xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 disabled:shadow-none transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating Meal...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <FiPlus size={20} />
                Create Meal
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

const InputField = ({ label, icon: Icon, type = "text", error, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
          <Icon size={18} />
        </div>
      )}
      <input
        type={type}
        className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200`}
        {...props}
      />
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default ChefCreateMeal;
