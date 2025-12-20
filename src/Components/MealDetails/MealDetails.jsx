import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";

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

  /* ================= FETCH MEAL ================= */
  useEffect(() => {
    const fetchMeal = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3000/meals/${id}`);
        setMeal(res.data);
      } catch {
        toast.error("Failed to load meal");
      } finally {
        setLoading(false);
      }
    };
    fetchMeal();
  }, [id]);

  /* ================= FAVORITE ================= */
  const handleFavorite = async () => {
    if (!user) return navigate("/SignIn", { replace: true });

    try {
      setFavoriting(true);
      await axios.post(
        "http://localhost:3000/favorites",
        {
          mealId: meal._id,
          mealName: meal.foodName,
          userEmail: UsersAllDataFromDB?.email,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Added to favorites ❤️");
    } catch {
      toast.error("Already added or failed");
    } finally {
      setFavoriting(false);
    }
  };

  /* ================= REVIEW ================= */
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user || !comment.trim()) return;

    try {
      setPostingComment(true);
      const res = await axios.post(
        "http://localhost:3000/reviews",
        {
          mealId: meal._id,
          userEmail: UsersAllDataFromDB?.email,
          userName: UsersAllDataFromDB?.name,
          comment,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setReviews([...reviews, { ...res.data, comment }]);
      setComment("");
      toast.success("Review added");
    } catch {
      toast.error("Failed to add review");
    } finally {
      setPostingComment(false);
    }
  };

  /* ================= ORDER ================= */
  const openOrderModal = () => {
    if (!user) return navigate("/SignIn", { replace: true });
    setQuantity(1);
    setAddress("");
    setShowModal(true);
  };

  const confirmOrder = async () => {
    if (!address.trim()) {
      toast.error("Address required");
      return;
    }

    const total = meal.price * quantity;

    const result = await Swal.fire({
      title: "Confirm Order?",
      text: `Total: ৳${total}`,
      icon: "question",
      showCancelButton: true,
    });

    if (!result.isConfirmed) return;

    try {
      await axios.post(
        "http://localhost:3000/orders",
        {
          mealId: meal._id,
          mealName: meal.foodName,
          price: meal.price,
          quantity,
          chefId: meal.chefId,
          userEmail: UsersAllDataFromDB?.email,
          userAddress: address,
          orderStatus: "pending",
          paymentStatus: "pending",
          orderTime: new Date(),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire("Success", "Order placed!", "success");
      setShowModal(false);
    } catch {
      Swal.fire("Error", "Order failed", "error");
    }
  };

  if (loading) return <Loader />;
  if (!meal) return null;

  return (
    <div className="w-2/3 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 py-10"
      >
        {/* ================= HEADER ================= */}
        <div className="grid md:grid-cols-2 gap-8">
          <img
            src={meal.foodImage}
            alt={meal.foodName}
            className="w-full h-[300px] object-cover rounded-xl"
          />

          <div className="space-y-4 my-auto">
            <h1 className="text-3xl font-semibold">{meal.foodName}</h1>
            <p className="text-gray-600">Chef: {meal.chefName}</p>
            <p className="text-xl font-semibold text-[#C10007]">
              ৳ {meal.price}
            </p>

            <div className="flex gap-3">
              <button
                onClick={openOrderModal}
                className="bg-[#C10007] text-white px-6 py-2 rounded-lg text-sm"
              >
                Order Now
              </button>

              <button
                onClick={handleFavorite}
                disabled={favoriting}
                className="flex items-center gap-2 px-4 py-2 text-sm text-[#C10007]"
              >
                <Heart size={16} />
                {favoriting ? "Saving..." : "Favorite"}
              </button>
            </div>
          </div>
        </div>

        {/* ================= INGREDIENTS ================= */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-3">Ingredients</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {Array.isArray(meal.ingredients)
              ? meal.ingredients.join(", ")
              : meal.ingredients}
          </p>
        </div>

        {/* ================= REVIEWS ================= */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Reviews</h2>

          <div className="space-y-3 max-h-72 overflow-y-auto">
            {reviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet</p>
            ) : (
              reviews.map((rev) => (
                <div key={rev._id} className="flex gap-3">
                  <div className="w-9 h-9 bg-[#C10007] text-white rounded-full flex items-center justify-center">
                    {rev.userName?.[0]}
                  </div>
                  <div>
                    <p className="font-medium">{rev.userName}</p>
                    <p className="text-sm text-gray-600">{rev.comment}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleCommentSubmit} className="mt-4 flex gap-3">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a review..."
              className="flex-1 bg-gray-100 rounded-lg px-3 py-2"
            />
            <button
              disabled={postingComment}
              className="bg-[#C10007] text-white px-5 rounded-lg"
            >
              Post
            </button>
          </form>
        </div>
      </motion.div>

      {/* ================= ORDER MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Complete Order</h3>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full bg-gray-100 rounded-lg px-3 py-2 mb-3"
            />

            <textarea
              rows="3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Delivery address"
              className="w-full bg-gray-100 rounded-lg px-3 py-2 mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={confirmOrder}
                className="flex-1 bg-[#C10007] text-white py-2 rounded-lg"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-200 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealDetails;
