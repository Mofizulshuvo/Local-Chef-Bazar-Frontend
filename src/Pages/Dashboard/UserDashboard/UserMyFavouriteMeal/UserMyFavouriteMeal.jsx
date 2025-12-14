import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";
import { toast } from "react-toastify";
import { FiHeart } from "react-icons/fi";

const UserMyFavouriteMeal = () => {
  const { UsersAllDataFromDB, token } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!UsersAllDataFromDB?.email) return;

      try {
        setLoading(true);

        // 1️⃣ Get user's favorites
        const favRes = await axios.get("http://localhost:3000/favorites");
        const userFavorites = favRes.data.filter(
          (fav) => fav.userEmail === UsersAllDataFromDB.email
        );

        // 2️⃣ Get all meals
        const mealRes = await axios.get("http://localhost:3000/meals");
        const meals = mealRes.data;

        // 3️⃣ Match favorites to meals
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

    fetchFavorites();
  }, [UsersAllDataFromDB]);

  if (loading) return <p className="text-center mt-10">Loading favorite meals...</p>;
  if (favorites.length === 0)
    return <p className="text-center mt-10">You have no favorite meals yet.</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Favorite Meals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {favorites.map((meal) => (
          <div key={meal._id} className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
            <img
              src={meal.foodImage || "https://via.placeholder.com/200"}
              alt={meal.foodName}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h2 className="text-lg font-semibold">{meal.foodName}</h2>
            <p className="text-sm text-gray-500">Chef: {meal.chefName}</p>
            <p className="text-sm text-gray-500">Price: ${meal.price}</p>
            <p className="text-sm text-gray-500">Rating: {meal.rating}/5</p>
            <p className="text-sm text-gray-500 mt-2 truncate">Ingredients: {meal.ingredients}</p>
            <p className="text-sm text-gray-500">Delivery: {meal.deliveryTime} min</p>

            <div className="mt-4 flex items-center justify-end">
              <FiHeart size={24} className="text-red-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMyFavouriteMeal;
