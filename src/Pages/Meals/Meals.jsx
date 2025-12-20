import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiHeart } from "react-icons/fi";
import { AuthContext } from "../../Context/AuthContext";
import Loader from "../../Components/Loader/Loader";
import Swal from "sweetalert2";
import { Link } from "react-router";

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
        const response = await axios.get("https://local-chef-bazar-backend-1.onrender.com/meals");
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
      foodImage: selectedMeal.foodImage,
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
      await axios.post("https://local-chef-bazar-backend-1.onrender.com/orders", orderPayload);
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
      await axios.post("https://local-chef-bazar-backend-1.onrender.com/favorites", payload);
      toast.success("Added to favorites!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to favorites.");
    }
  };

  if (loading)
    return (
      <div className="text-center w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  if (!meals.length)
    return (
      <p className="text-center mt-10 text-black font-semibold">
        No meals available.
      </p>
    );

  const isOrderDisabled = UsersAllDataFromDB.status === "fraud";

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-black">Meals</h1>
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="rounded-lg px-4 py-2 text-sm font-medium bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#C10007] shadow-md"
        >
          <option value="">Sort by price</option>
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>
      </div>

      {/* Meal Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {meals.map((meal) => (
          <div
            key={meal._id}
            className="rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 duration-300 flex flex-col bg-white overflow-hidden h-[400px]"
          >
            {/* Image - 2/3 height */}
            <div className="h-3/5 relative">
              <img
                src={meal.foodImage || "https://via.placeholder.com/400"}
                alt={meal.foodName}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => handleFavorite(meal)}
                className="absolute top-3 right-3 text-[#C10007] bg-white p-2 rounded-full shadow hover:scale-110 transition"
              >
                <FiHeart size={20} />
              </button>
            </div>

            {/* Details - 1/3 height */}
            <div className="h-1/3 p-4 flex flex-col justify-between">
              {/* Text info */}
              <div className="flex flex-col gap-0.5">
                <h2 className="text-xl font-bold text-black truncate">
                  {meal.foodName}
                </h2>
                <div className="flex justify-between">
                  <div>
                    <p className="text-black/70 text-sm truncate">
                      Chef: {meal.chefName}
                    </p>
                    <p className="text-black/70 text-sm">
                      Price: ${meal.price}
                    </p>
                  </div>
                  <div>
                    <p className="text-black/70 text-sm">
                      Rating: {meal.rating}/5
                    </p>
                    <p className="text-black/70 text-sm truncate">
                      Ingredients: {meal.ingredients}
                    </p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleOrder(meal)}
                  disabled={isOrderDisabled}
                  className={`flex-1 text-white font-semibold py-1 rounded-lg text-sm transition
          ${
            isOrderDisabled
              ? "bg-black/50 cursor-not-allowed"
              : "bg-[#C10007] hover:bg-black"
          }`}
                >
                  Order Now
                </button>
                <Link to={`/MealDetails/${meal._id}`} className="flex-1">
                  <button className="w-full border-1 border-gray-300 text-black font-semibold py-1 rounded-lg text-sm hover:bg-[#C10007] transition">
                    View
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedMeal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-2xl mx-auto text-center font-bold text-black mb-4">
              Confirm Order
            </h2>
            <div className="space-y-3 text-black">
              <p>
                <b>Name:</b> {UsersAllDataFromDB?.name}
              </p>
              <p>
                <b>Email:</b> {UsersAllDataFromDB?.email}
              </p>
              <p>
                <b>Meal:</b> {selectedMeal.foodName}
              </p>
              <p>
                <b>Price:</b> ${selectedMeal.price}
              </p>
              <label className="block mt-2">
                Quantity
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full rounded px-3 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-[#C10007]"
                />
              </label>
              <label className="block mt-2">
                Delivery Address
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border-1 border-gray-200 rounded px-3 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-[#C10007]"
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
                className="px-4 py-2 rounded-lg bg-black text-white font-semibold hover:bg-[#C10007] transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmOrder}
                className="px-4 py-2 rounded-lg bg-[#C10007] text-white font-semibold hover:bg-black transition"
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
