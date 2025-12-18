import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";
import Swal from "sweetalert2";

const ChefMyMeals = () => {
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
      const response = await axios.get("http://localhost:3000/meals", {
        headers: { Authorization: `Bearer ${token}` },
      });
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
    if (UsersAllDataFromDB?.chefId) fetchMeals();
  }, [UsersAllDataFromDB, token]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/meals/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire("Deleted!", "Meal has been deleted.", "success");
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
      await axios.put(`http://localhost:3000/meals/${updatingMeal}`, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire("Updated!", "Meal updated successfully.", "success");
      setUpdatingMeal(null);
      fetchMeals();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update meal", "error");
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading meals...</p>;
  if (meals.length === 0) return <p className="text-center mt-10 text-gray-500">No meals found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Meals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div key={meal._id} className="border rounded-lg shadow p-4 flex flex-col">
            <img
              src={meal.foodImage || "https://via.placeholder.com/200"}
              alt={meal.foodName}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h2 className="text-lg font-semibold">{meal.foodName}</h2>
            <p className="text-sm text-gray-500">Price: ${meal.price}</p>
            <p className="text-sm text-gray-500">Rating: {meal.rating}/5</p>
            <p className="text-sm text-gray-500 mt-2">Ingredients: {meal.ingredients}</p>
            <p className="text-sm text-gray-500">Delivery: {meal.deliveryTime} min</p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleUpdateClick(meal)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(meal._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {updatingMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form
            onSubmit={handleUpdateSubmit}
            className="bg-white p-6 rounded-xl w-96 space-y-3"
          >
            <h2 className="text-xl font-bold mb-3">Update Meal</h2>
            <input
              type="text"
              name="foodName"
              value={updateData.foodName}
              onChange={handleUpdateChange}
              placeholder="Food Name"
              className="w-full border rounded px-3 py-2"
              required
            />
            <input
              type="number"
              name="price"
              value={updateData.price}
              onChange={handleUpdateChange}
              placeholder="Price"
              className="w-full border rounded px-3 py-2"
              required
            />
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              name="rating"
              value={updateData.rating}
              onChange={handleUpdateChange}
              placeholder="Rating"
              className="w-full border rounded px-3 py-2"
              required
            />
            <textarea
              name="ingredients"
              value={updateData.ingredients}
              onChange={handleUpdateChange}
              placeholder="Ingredients"
              className="w-full border rounded px-3 py-2"
              required
            />
            <input
              type="number"
              name="deliveryTime"
              value={updateData.deliveryTime}
              onChange={handleUpdateChange}
              placeholder="Delivery Time"
              className="w-full border rounded px-3 py-2"
              required
            />
            <input
              type="number"
              name="experience"
              value={updateData.experience}
              onChange={handleUpdateChange}
              placeholder="Experience"
              className="w-full border rounded px-3 py-2"
              required
            />
            <div className="flex justify-between mt-3">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setUpdatingMeal(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChefMyMeals;
