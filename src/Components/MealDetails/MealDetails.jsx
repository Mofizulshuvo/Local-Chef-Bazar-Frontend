import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MealDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, UsersAllDataFromDB, token } = useContext(AuthContext);

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favoriting, setFavoriting] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [postingComment, setPostingComment] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");

  // Fetch meal details
  useEffect(() => {
    const fetchMeal = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3000/meals/${id}`);
        setMeal(res.data);

        // If backend included existing review IDs, you could fetch them here
        // For now, reviews will be added locally after POST
      } catch (err) {
        toast.error("Failed to load meal details");
      } finally {
        setLoading(false);
      }
    };
    fetchMeal();
  }, [id]);

  // Add to favorites
  const handleFavorite = async () => {
    if (!user) return navigate("/SignIn", { replace: true });
    try {
      setFavoriting(true);
      const payload = {
        mealId: meal._id,
        userEmail: UsersAllDataFromDB?.email,
        mealName: meal.foodName,
      };
      await axios.post("http://localhost:3000/favorites", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Added to favorites!");
    } catch {
      toast.error("Already in favorites or failed");
    } finally {
      setFavoriting(false);
    }
  };

  // Submit comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) return navigate("/SignIn", { replace: true });
    if (!comment.trim()) return;

    try {
      setPostingComment(true);
      const payload = {
        mealId: meal._id,
        userEmail: UsersAllDataFromDB?.email,
        userName: UsersAllDataFromDB?.name,
        comment: comment.trim(),
      };

      const res = await axios.post("http://localhost:3000/reviews", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Construct review manually for frontend display
      const newReview = {
        _id: res.data.id,
        mealId: meal._id,
        userEmail: UsersAllDataFromDB?.email,
        userName: UsersAllDataFromDB?.name,
        comment: comment.trim(),
      };

      setReviews([...reviews, newReview]);
      setComment("");
      toast.success("Review added!");
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Failed to add review");
    } finally {
      setPostingComment(false);
    }
  };

  // Open order modal
  const openOrderModal = () => {
    if (!user) return navigate("/SignIn", { replace: true });
    setQuantity(1);
    setAddress("");
    setShowModal(true);
  };

  const closeOrderModal = () => {
    setQuantity(1);
    setAddress("");
    setShowModal(false);
  };

  // Confirm order
  const confirmOrder = async () => {
    if (!address.trim()) {
      toast.error("Please enter delivery address");
      return;
    }

    const totalPrice = meal.price * quantity;

    const result = await Swal.fire({
      title: "Confirm Order",
      text: `Your total price is ৳${totalPrice}. Confirm the order?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    const orderPayload = {
      mealId: meal._id,
      mealName: meal.foodName,
      price: meal.price,
      quantity,
      chefId: meal.chefId,
      userEmail: UsersAllDataFromDB?.email,
      userAddress: address,
      orderStatus: "pending",
      paymentStatus: "pending",
      orderTime: new Date().toISOString(),
    };

    try {
      await axios.post("http://localhost:3000/orders", orderPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire("Success!", "Order placed successfully!", "success");
      closeOrderModal();
    } catch (err) {
      Swal.fire("Error!", "Failed to place order.", "error");
    }
  };

  if (loading) return <div className="text-center py-20">Loading meal details...</div>;
  if (!meal) return <div className="text-center py-20">Meal not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto px-4 py-10"
    >
      {/* Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-200">
          <img src={meal.image} alt={meal.foodName} className="w-full h-96 object-cover" />
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{meal.foodName}</h1>
          <p className="text-gray-700 text-lg">{meal.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-3xl font-semibold text-green-600">৳ {meal.price}</span>
            <span className="text-gray-500 font-medium">Chef: {meal.chefName}</span>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={openOrderModal}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl shadow-md transition"
            >
              Order Now
            </button>

            <button
              onClick={handleFavorite}
              disabled={favoriting}
              className="flex-1 flex items-center justify-center gap-2 border border-gray-300 px-4 py-3 rounded-xl hover:bg-gray-100 transition disabled:opacity-50"
            >
              <Heart size={20} />
              {favoriting ? "Saving..." : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>

      {/* Ingredients / Prep / Availability */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border p-5 shadow-sm">
          <h3 className="font-semibold mb-2">Ingredients</h3>
          <ul className="list-disc list-inside text-gray-600">
            {(Array.isArray(meal.ingredients)
              ? meal.ingredients
              : meal.ingredients?.split(",") || []
            ).map((item) => (
              <li key={item.trim()}>{item.trim()}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border p-5 shadow-sm">
          <h3 className="font-semibold mb-2">Preparation Time</h3>
          <p className="text-gray-600">{meal.prepTime} minutes</p>
        </div>
        <div className="rounded-xl border p-5 shadow-sm">
          <h3 className="font-semibold mb-2">Availability</h3>
          <p className="text-gray-600">
            {meal.available ? "Available today" : "Not available"}
          </p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6">Reviews</h2>

        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet. Be the first to comment!</p>
          ) : (
            reviews.map((rev) => (
              <div
                key={rev._id}
                className="flex items-start gap-4 border rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition"
              >
                <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-lg">
                  {rev.userName?.[0]?.toUpperCase() || "A"}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{rev.userName}</p>
                  <p className="text-gray-700 mt-1">{rev.comment}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <form
          onSubmit={handleCommentSubmit}
          className="flex flex-col md:flex-row gap-3 items-start"
        >
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className="flex-1 border rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={postingComment}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md disabled:opacity-50 transition"
          >
            {postingComment ? "Posting..." : "Submit"}
          </button>
        </form>
      </div>

      {/* Order Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Order</h2>
            <div className="space-y-2 text-sm">
              <p>
                <b>Name:</b> {UsersAllDataFromDB?.name}
              </p>
              <p>
                <b>Email:</b> {UsersAllDataFromDB?.email}
              </p>
              <p>
                <b>Meal:</b> {meal.foodName}
              </p>
              <p>
                <b>Price:</b> ৳ {meal.price}
              </p>
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
                Total Price: ৳ {meal.price * quantity}
              </p>
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button onClick={closeOrderModal} className="px-4 py-2 rounded bg-gray-300">
                Cancel
              </button>
              <button onClick={confirmOrder} className="px-4 py-2 rounded bg-green-600 text-white">
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MealDetails;
