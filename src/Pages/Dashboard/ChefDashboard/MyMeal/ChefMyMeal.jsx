import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";
import Swal from "sweetalert2";
import { FiEdit3, FiTrash2, FiStar, FiClock, FiDollarSign, FiPackage, FiTrendingUp, FiPlus } from "react-icons/fi";
import { ChefHat } from "lucide-react";
import { Link } from "react-router-dom";
import Loader from "../../../../Components/Loader/Loader";

const ChefMyMeal = () => {
  const { UsersAllDataFromDB, token } = useContext(AuthContext);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingMeal, setUpdatingMeal] = useState(null);
  const [updateData, setUpdateData] = useState({
    foodName: "",
    price: "",
    rating: "",
    ingredients: "",
    deliveryTime: "",
    experience: "",
  });

  const fetchMeals = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://local-chef-bazar-backend-1.onrender.com/meals",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const myMeals = response.data.filter(
        (meal) => meal.email === UsersAllDataFromDB?.email
      );
      setMeals(myMeals);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (UsersAllDataFromDB?.email) fetchMeals();
  }, [UsersAllDataFromDB, token]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Meal",
      text: "Are you sure you want to delete this meal? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      background: "rgba(255, 255, 255, 0.95)",
      backdrop: "rgba(0, 0, 0, 0.8)",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `https://local-chef-bazar-backend-1.onrender.com/meals/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        Swal.fire("Deleted!", "Meal has been deleted successfully.", "success");
        fetchMeals();
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete meal", "error");
      }
    }
  };

  const handleUpdateClick = (meal) => {
    setUpdatingMeal(meal._id);
    setUpdateData({
      foodName: meal.foodName || "",
      price: meal.price || "",
      rating: meal.rating || "",
      ingredients: meal.ingredients || "",
      deliveryTime: meal.deliveryTime || "",
      experience: meal.experience || "",
    });
  };

  const handleUpdateChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://local-chef-bazar-backend-1.onrender.com/meals/${updatingMeal}`,
        updateData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Swal.fire("Updated!", "Meal updated successfully.", "success");
      setUpdatingMeal(null);
      fetchMeals();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update meal", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="text-center md:text-left">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl shadow-lg shadow-orange-500/25 mb-4">
            <ChefHat size={36} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            My Meals
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Manage your culinary creations ({meals.length} meals)
          </p>
        </div>

        <Link to="/ChefDashboard/CreateMeal" className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 hover:scale-[1.02]">
          <FiPlus size={18} />
          <span>Add New Meal</span>
        </Link>
      </div>

      {meals.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🍳</div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            No Meals Yet
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
            Start sharing your culinary expertise by adding your first meal to the platform.
          </p>
          <Link
            to="/ChefDashboard/CreateMeal"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 hover:scale-[1.02]"
          >
            <FiPlus size={18} />
            <span>Create Your First Meal</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <div
              key={meal._id}
              className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group"
            >
              {/* Meal Image */}
              <div className="relative mb-4">
                <img
                  src={meal.foodImage || "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop"}
                  alt={meal.foodName}
                  className="w-full h-48 rounded-2xl object-cover border-2 border-slate-200 dark:border-slate-700"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => handleUpdateClick(meal)}
                    className="p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                  >
                    <FiEdit3 size={16} className="text-blue-600 dark:text-blue-400" />
                  </button>
                  <button
                    onClick={() => handleDelete(meal._id)}
                    className="p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                  >
                    <FiTrash2 size={16} className="text-red-600 dark:text-red-400" />
                  </button>
                </div>
              </div>

              {/* Meal Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
                    {meal.foodName}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">
                    {meal.ingredients}
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <FiDollarSign size={14} className="text-green-600 dark:text-green-400" />
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Price</span>
                    </div>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                      ${meal.price}
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <FiStar size={14} className="text-yellow-600 dark:text-yellow-400" />
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Rating</span>
                    </div>
                    <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                      {meal.rating}/5
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <FiClock size={14} className="text-blue-600 dark:text-blue-400" />
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Delivery</span>
                    </div>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {meal.deliveryTime}min
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <FiTrendingUp size={14} className="text-purple-600 dark:text-purple-400" />
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Experience</span>
                    </div>
                    <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {meal.experience}yrs
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => handleUpdateClick(meal)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <FiEdit3 size={16} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(meal._id)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <FiTrash2 size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {updatingMeal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Update Meal
              </h2>
              <button
                onClick={() => setUpdatingMeal(null)}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Food Name
                </label>
                <input
                  type="text"
                  name="foodName"
                  value={updateData.foodName}
                  onChange={handleUpdateChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={updateData.price}
                    onChange={handleUpdateChange}
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Rating
                  </label>
                  <input
                    type="number"
                    name="rating"
                    value={updateData.rating}
                    onChange={handleUpdateChange}
                    step="0.1"
                    min="0"
                    max="5"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Ingredients
                </label>
                <textarea
                  name="ingredients"
                  value={updateData.ingredients}
                  onChange={handleUpdateChange}
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Delivery Time (min)
                  </label>
                  <input
                    type="number"
                    name="deliveryTime"
                    value={updateData.deliveryTime}
                    onChange={handleUpdateChange}
                    min="1"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Experience (years)
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={updateData.experience}
                    onChange={handleUpdateChange}
                    min="0"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <FiEdit3 size={18} />
                  <span>Update Meal</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUpdatingMeal(null)}
                  className="flex-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChefMyMeal;
