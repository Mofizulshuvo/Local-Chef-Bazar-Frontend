import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";
import { toast } from "react-toastify";
import { FiHeart, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import Loader from "../../../../Components/Loader/Loader";

const UserMyFavouriteMeal = () => {
  const { UsersAllDataFromDB, token } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    if (!UsersAllDataFromDB?.email) return;

    try {
      setLoading(true);

      const favRes = await axios.get("https://local-chef-bazar-backend-1.onrender.com/favorites");
      const userFavorites = favRes.data.filter(
        (fav) => fav.userEmail === UsersAllDataFromDB.email
      );

      const mealRes = await axios.get("https://local-chef-bazar-backend-1.onrender.com/meals");
      const meals = mealRes.data;

      const favMeals = meals.filter((meal) =>
        userFavorites.some((fav) => fav.mealId === meal._id)
      );

      setFavorites(favMeals);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch favorite meals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [UsersAllDataFromDB]);

  const handleDelete = async (mealId) => {
    const result = await Swal.fire({
      title: "Remove this meal?",
      text: "This will be removed from your favorites",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Remove",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`https://local-chef-bazar-backend-1.onrender.com/favorites/${mealId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });

        setFavorites((prev) => prev.filter((meal) => meal._id !== mealId));
        Swal.fire("Removed", "Meal removed from favorites.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to remove favorite.", "error");
      }
    }
  };

  if (loading) return <Loader />;

  if (!favorites.length)
    return (
      <div className="flex justify-center items-center mt-20">
        <p className="text-gray-500 text-lg">
          You have no favorite meals yet
        </p>
      </div>
    );

  return (
    <div className="w-full px-6 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">
        My Favorite Meals
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {favorites.map((meal) => (
          <div
            key={meal._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-[500px]"
          >
            {/* Image (2/3 height) */}
            <div className="relative h-2/3">
              <img
                src={meal.foodImage || "https://via.placeholder.com/300"}
                alt={meal.foodName}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full shadow">
                <FiHeart className="text-[#C10007]" size={16} />
              </div>
            </div>

            {/* Content (1/3 height) */}
            <div className="h-1/3 px-4 py-3 flex flex-col justify-between">
              <div className="flex flex-col gap-1">
                {/* Food name – KEEP FONT */}
                <h2 className="text-lg font-bold text-gray-900 truncate">
                  {meal.foodName}
                </h2>

                <div className="flex justify-between text-xs text-gray-500">
                  <span>{meal.chefName}</span>
                  <span>${meal.price}</span>
                </div>

                <p className="text-xs text-gray-400 truncate">
                  {meal.ingredients}
                </p>
              </div>

              <button
                onClick={() => handleDelete(meal._id)}
                className="mt-2 flex items-center justify-center gap-2 py-2 rounded-xl bg-[#C10007] text-white text-sm font-semibold hover:bg-black transition"
              >
                <FiTrash2 size={14} />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMyFavouriteMeal;
