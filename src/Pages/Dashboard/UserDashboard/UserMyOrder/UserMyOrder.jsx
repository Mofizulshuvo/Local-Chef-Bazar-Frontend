import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";
import { toast } from "react-toastify";

const UserMyMeal = () => {
  const { UsersAllDataFromDB, token } = useContext(AuthContext);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/meals", {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        setMeals(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch meals.");
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [token]);

  if (loading)
    return <p className="text-center mt-10">Loading meals...</p>;

  if (meals.length === 0)
    return (
      <div className="flex justify-center items-center h-full mt-10">
        <p className="text-gray-500 text-lg">No meals found.</p>
      </div>
    );

  return (
    <div className="p-4 flex flex-col gap-6 max-w-7xl mx-auto">
      {meals.map((meal) => (
        <div
          key={meal._id}
          className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {meal.foodName}
              </h2>
              <p className="text-gray-500">Chef: {meal.chefName}</p>
              <p className="text-gray-500">Chef ID: {meal.chefId}</p>
            </div>

            <div className="flex flex-col gap-1 text-gray-600 sm:text-right">
              <p>
                <span className="font-medium">Price:</span> ${meal.price}
              </p>
              <p>
                <span className="font-medium">Rating:</span> {meal.rating}/5
              </p>
              <p>
                <span className="font-medium">Delivery Time:</span> {meal.deliveryTime} min
              </p>
              <p>
                <span className="font-medium">Ingredients:</span> {meal.ingredients}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserMyMeal;
