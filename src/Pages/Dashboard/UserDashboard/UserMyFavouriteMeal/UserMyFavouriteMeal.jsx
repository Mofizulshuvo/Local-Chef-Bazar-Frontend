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

      const favRes = await axios.get("http://localhost:3000/favorites");
      const userFavorites = favRes.data.filter(
        (fav) => fav.userEmail === UsersAllDataFromDB.email
      );

      const mealRes = await axios.get("http://localhost:3000/meals");
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
      title: "Are you sure?",
      text: "Do you want to remove this meal from favorites?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/favorites/${mealId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });

        setFavorites((prev) => prev.filter((meal) => meal._id !== mealId));
        Swal.fire("Removed!", "Meal has been removed from favorites.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to remove favorite.", "error");
      }
    }
  };

  if (loading) return <Loader></Loader>;
  if (favorites.length === 0)
    return <p className="text-center mt-10">You have no favorite meals yet.</p>;

  return (
    <div className="w-full mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Favorite Meals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {favorites.map((meal) => (
          <div
            key={meal._id}
            className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            <img
              src={meal.foodImage || "https://via.placeholder.com/200"}
              alt={meal.foodName}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h2 className="text-lg font-semibold">{meal.foodName}</h2>
            <p className="text-sm text-gray-500">Chef: {meal.chefName}</p>
            <p className="text-sm text-gray-500">Price: ${meal.price}</p>
            <p className="text-sm text-gray-500">Rating: {meal.rating}/5</p>
            <p className="text-sm text-gray-500 mt-2 truncate">
              Ingredients: {meal.ingredients}
            </p>
            <p className="text-sm text-gray-500">Delivery: {meal.deliveryTime} min</p>

            <div className="mt-4 flex items-center justify-between">
              <FiHeart size={24} className="text-red-500" />
              <button
                onClick={() => handleDelete(meal._id)}
                className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                <FiTrash2 size={16} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMyFavouriteMeal;
