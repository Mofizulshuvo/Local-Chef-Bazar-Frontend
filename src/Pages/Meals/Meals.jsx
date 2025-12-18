import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiHeart } from "react-icons/fi";
import { AuthContext } from "../../Context/AuthContext";
import Loader from "../../Components/Loader/Loader";
import Swal from "sweetalert2";

const Meals = () => {
  const { UsersAllDataFromDB, token } = useContext(AuthContext);

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("");

  
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");

 
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

 
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOrder(value);

    if (!value) return;

    const sortedMeals = [...meals].sort((a, b) =>
      value === "asc" ? a.price - b.price : b.price - a.price
    );

    setMeals(sortedMeals);
  };

 
  const handleOrder = (meal) => {
    setSelectedMeal(meal);
    setQuantity(1);
    setAddress("");
    setShowModal(true);
  };

 
  const confirmOrder = async () => {
    if (!address) {
      toast.error("Please enter delivery address");
      return;
    }

    const totalPrice = selectedMeal.price * quantity;

    const result = await Swal.fire({
      title: "Confirm Order",
      text: `Your total price is $${totalPrice}. Do you want to confirm the order?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    const orderPayload = {
      foodId: selectedMeal._id,
      foodImage:selectedMeal.foodImage,
      mealName: selectedMeal.foodName,
      price: selectedMeal.price,
      quantity: quantity,
      chefId: selectedMeal.chefId,
      paymentStatus: "Pending",
      userEmail: UsersAllDataFromDB.email,
      userAddress: address,
      orderStatus: "pending",
      orderTime: new Date().toISOString(),
    };

    try {
      await axios.post("http://localhost:3000/orders", orderPayload);
      Swal.fire("Success!", "Order placed successfully!", "success");
      setShowModal(false);
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to place order.", "error");
    }
  };

  
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

  if (loading) return <Loader className="items-center" />;
  if (!meals.length)
    return <p className="text-center mt-10">No meals available.</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Meals</h1>

        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="border rounded-lg px-4 py-2 text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <option value="">Sort by price</option>
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>
      </div>

      
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
            <p className="text-sm text-gray-500 mt-2 truncate">
              Ingredients: {meal.ingredients}
            </p>
            <p className="text-sm text-gray-500">
              Delivery: {meal.deliveryTime} min
            </p>

            {UsersAllDataFromDB?.role !== "admin" &&
              UsersAllDataFromDB?.role !== "chef" && (
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
              )}
          </div>
        ))}
      </div>

      
      {showModal && selectedMeal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirm Order</h2>

            <div className="space-y-2 text-sm">
              <p><b>Name:</b> {UsersAllDataFromDB?.name}</p>
              <p><b>Email:</b> {UsersAllDataFromDB?.email}</p>
              <p><b>Meal:</b> {selectedMeal.foodName}</p>
              <p><b>Price:</b> ${selectedMeal.price}</p>

              <label className="block mt-3">
                Quantity
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full border rounded px-3 py-1 mt-1"
                />
              </label>

              <label className="block mt-3">
                Delivery Address
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border rounded px-3 py-1 mt-1"
                  rows="3"
                />
              </label>

              <p className="mt-2 font-semibold">
                Total Price: ${selectedMeal.price * quantity}
              </p>
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmOrder}
                className="px-4 py-2 rounded bg-emerald-500 text-white"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Meals;
