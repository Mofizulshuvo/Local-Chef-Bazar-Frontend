import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";
import { toast } from "react-toastify";

const ChefMyMeals = () => {
  const { UsersAllDataFromDB, token } = useContext(AuthContext);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/meals", {
          headers: {
            Authorization: `Bearer ${token}`, // Optional if /meals is public
          },
        });

        // Filter meals by chefId if you want "My Meals" for the logged-in chef
        const myMeals = response.data.filter(
          (meal) => meal.chefId === UsersAllDataFromDB?.chefId
        );

        setMeals(myMeals);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch meals.");
      } finally {
        setLoading(false);
      }
    };

    if (UsersAllDataFromDB?.chefId) {
      fetchMeals();
    }
  }, [UsersAllDataFromDB, token]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading meals...</p>;
  }

  if (meals.length === 0) {
    return <p className="text-center mt-10 text-gray-500">No meals found.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Meals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {meals.map((meal) => (
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
            <p className="text-sm text-gray-500 mt-2">
              Ingredients: {meal.ingredients}
            </p>
            <p className="text-sm text-gray-500">
              Delivery: {meal.deliveryTime} min
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChefMyMeals;
