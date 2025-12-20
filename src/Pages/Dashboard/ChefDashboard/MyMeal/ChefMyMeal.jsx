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
      confirmButtonColor: "#C10007",
      cancelButtonColor: "#6b7280",
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
      await axios.put(
        `http://localhost:3000/meals/${updatingMeal}`,
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

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500">Loading meals...</p>
    );
  if (meals.length === 0)
    return (
      <p className="text-center mt-10 text-gray-500">No meals found.</p>
    );

  return (
    <div className="w-full mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#C10007]">My Meals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div
            key={meal._id}
            className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <img
              src={meal.foodImage || "https://via.placeholder.com/200"}
              alt={meal.foodName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-xl font-bold text-center mb-2 text-[#C10007]">
                {meal.foodName}
              </h2>
              <div className="grid grid-cols-2 gap-2 text-gray-600 text-sm">
                <p className="font-medium">
                  Price: <span className="text-[#C10007]">${meal.price}</span>
                </p>
                <p className="font-medium">
                  Rating: <span className="text-[#FFB800]">{meal.rating}/5</span>
                </p>
                <p className="col-span-2 mt-1">Ingredients: {meal.ingredients}</p>
                <p>Delivery: {meal.deliveryTime} min</p>
                <p>Experience: {meal.experience} yrs</p>
              </div>
              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={() => handleUpdateClick(meal)}
                  className="bg-[#FFB800] text-white px-4 py-2 rounded-xl hover:bg-[#e6a800] transition"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(meal._id)}
                  className="bg-[#C10007] text-white px-4 py-2 rounded-xl hover:bg-[#a00005] transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      {updatingMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdateSubmit}
            className="bg-white p-6 rounded-3xl w-full max-w-md space-y-4 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-center text-[#C10007]">Update Meal</h2>
            <InputField
              label="Food Name"
              name="foodName"
              value={updateData.foodName}
              onChange={handleUpdateChange}
            />
            <InputField
              label="Price"
              name="price"
              type="number"
              value={updateData.price}
              onChange={handleUpdateChange}
            />
            <InputField
              label="Rating"
              name="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={updateData.rating}
              onChange={handleUpdateChange}
            />
            <InputField
              label="Ingredients"
              name="ingredients"
              type="textarea"
              value={updateData.ingredients}
              onChange={handleUpdateChange}
            />
            <InputField
              label="Delivery Time"
              name="deliveryTime"
              type="number"
              value={updateData.deliveryTime}
              onChange={handleUpdateChange}
            />
            <InputField
              label="Experience"
              name="experience"
              type="number"
              value={updateData.experience}
              onChange={handleUpdateChange}
            />

            <div className="flex justify-between mt-4">
              <button
                type="submit"
                className="bg-[#FFB800] text-white px-5 py-2 rounded-2xl hover:bg-[#e6a800] transition"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setUpdatingMeal(null)}
                className="bg-gray-400 text-white px-5 py-2 rounded-2xl hover:bg-gray-500 transition"
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

const InputField = ({ label, name, type = "text", value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {type === "textarea" ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#C10007] resize-none"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#C10007]"
      />
    )}
  </div>
);

export default ChefMyMeals;
