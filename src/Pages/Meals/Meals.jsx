import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import { FiHeart } from "react-icons/fi";
import { AuthContext } from "../../Context/AuthContext";

const Meals = () => {
  const { UsersAllDataFromDB, token } = useContext(AuthContext);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all meals
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/meals", {
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : undefined,
        });
        setMeals(response.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch meals.");
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [token]);

  // Handle Order
  const handleOrder = async (meal) => {
    try {
      const payload = {
        mealId: meal._id,
        chefId: meal.chefId,
        userEmail: UsersAllDataFromDB.email,
        mealName: meal.foodName,
        price: meal.price,
        
      };
      await axios.post("http://localhost:3000/orders", payload);
      toast.success("Order placed successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order.");
    }
  };

  // Handle Favorite
  const handleFavorite = async (meal) => {
    try {
      const payload = {
        mealId: meal._id,
        userEmail: UsersAllDataFromDB.email,
        mealName: meal.foodName,
      };
      await axios.post("http://localhost:3000/favorites", payload);
      toast.success("Added to favorites!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to favorites.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading meals...</p>;
  if (meals.length === 0) return <p className="text-center mt-10">No meals available.</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Meals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {meals.map((meal) => (
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

            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => handleOrder(meal)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white py-1.5 px-3 rounded-lg text-sm font-semibold transition"
              >
                Order
              </button>
              <button
                onClick={() => handleFavorite(meal)}
                className="text-red-500 hover:text-red-600"
              >
                <FiHeart size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Meals;
