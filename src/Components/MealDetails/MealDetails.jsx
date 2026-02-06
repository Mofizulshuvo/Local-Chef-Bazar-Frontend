import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { Heart, Star, MapPin, ChefHat, ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";

const MealDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, UsersAllDataFromDB, token } = useContext(AuthContext);

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favoriting, setFavoriting] = useState(false);

  const [imageUrls, setImageUrls] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [postingComment, setPostingComment] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");

  // Check if user is admin or chef
  const isRestricted =
    UsersAllDataFromDB?.role === "admin" || UsersAllDataFromDB?.role === "chef";

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://local-chef-bazar-backend-1.onrender.com/meals/${id}`
        );
        setMeal(res.data);
        // Assuming meal.additionalImages is an array of URLs
        const allImages = [res.data.foodImage, ...(res.data.additionalImages || [])];
        setImageUrls(allImages);
        setSelectedImage(allImages[0] || "");
      } catch {
        toast.error("Failed to load meal");
      } finally {
        setLoading(false);
      }
    };
    fetchMeal();
  }, [id]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % imageUrls.length
    );
    setSelectedImage(imageUrls[(currentImageIndex + 1) % imageUrls.length]);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );
    setSelectedImage(imageUrls[(currentImageIndex - 1 + imageUrls.length) % imageUrls.length]);
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        `https://local-chef-bazar-backend-1.onrender.com/reviews/${id}`
      );
      setReviews(res.data);
    } catch (error) {
      console.error("Failed to load reviews:", error);
      toast.error("Failed to load reviews");
    }
  };

  useEffect(() => {
    if (id) fetchReviews();
  }, [id]);

  const handleFavorite = async () => {
    if (!user) return navigate("/SignIn", { replace: true });

    try {
      setFavoriting(true);
      await axios.post(
        "https://local-chef-bazar-backend-1.onrender.com/favorites",
        {
          mealId: meal._id,
          mealName: meal.foodName,
          userEmail: UsersAllDataFromDB?.email,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Added to favorites");
    } catch {
      toast.error("Already added or failed");
    } finally {
      setFavoriting(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user || !comment.trim()) return;

    try {
      setPostingComment(true);
      console.log('Posting review with data:', {
        mealId: meal._id,
        userEmail: UsersAllDataFromDB?.email,
        userName: UsersAllDataFromDB?.name,
        comment,
      });

      const response = await axios.post(
        "https://local-chef-bazar-backend-1.onrender.com/reviews",
        {
          mealId: meal._id,
          userEmail: UsersAllDataFromDB?.email,
          userName: UsersAllDataFromDB?.name,
          comment,
        }
      );

      console.log('Review posted successfully:', response.data);
      await fetchReviews();
      setComment("");
      toast.success("Review added");
    } catch (error) {
      console.error('Failed to post review:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      toast.error(`Failed to add review: ${error.response?.data?.message || error.message}`);
    } finally {
      console.log('Setting postingComment to false');
      setPostingComment(false);
    }
  };

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
        "https://local-chef-bazar-backend-1.onrender.com/orders",
        {
          foodId: meal._id,
          mealName: meal.foodName,
          foodImage: meal.foodImage,
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
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 dark:bg-neutral-900 rounded-lg shadow-xl">
      <Helmet>
        <title>{meal.foodName} - Meal Details | Local Chef Bazar</title>
        <meta name="description" content={meal.description} />
      </Helmet>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {/* Go Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Meals
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="relative">
            <div className="w-full h-80 sm:h-96 md:h-[450px] bg-neutral-100 dark:bg-neutral-800 rounded-xl overflow-hidden shadow-md">
              <img
                src={selectedImage || imageUrls[0] || "https://via.placeholder.com/600x400?text=Meal+Image"}
                alt={meal.foodName}
                className="w-full h-full object-cover"
              />
            </div>

            {imageUrls.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <button
                  onClick={prevImage}
                  className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            )}

            {imageUrls.length > 1 && (
              <div className="flex space-x-3 mt-4 overflow-x-auto pb-2">
                {imageUrls.map((img, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${selectedImage === img
                        ? 'border-primary-500 shadow-lg'
                        : 'border-transparent hover:border-neutral-300 dark:hover:border-neutral-600'
                      }`}
                    onClick={() => {
                      setSelectedImage(img);
                      setCurrentImageIndex(index);
                    }}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Meal Details & Actions */}
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 leading-tight">
              {meal.foodName}
            </h1>

            <div className="flex items-center space-x-4 text-lg text-neutral-700 dark:text-neutral-300">
              <div className="flex items-center space-x-1">
                <ChefHat className="w-5 h-5 text-primary-600" />
                <span>{meal.chefId}</span>
              </div>
              <span className="text-neutral-400"> • </span>
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span>{meal.rating || 4.5}/5</span>
              </div>
              {meal.location && (
                <>
                  <span className="text-neutral-400"> • </span>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-5 h-5 text-secondary-600" />
                    <span>{meal.location}</span>
                  </div>
                </>
              )}
            </div>

            <p className="text-5xl font-bold text-primary-600 dark:text-primary-400 mt-4">
              ৳{meal.price}
            </p>

            {!isRestricted && (
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button
                  onClick={openOrderModal}
                  className="btn-primary py-3 flex-1"
                >
                  Order Now
                </button>

                <button
                  onClick={handleFavorite}
                  disabled={favoriting}
                  className={`btn-outline py-3 flex-1 ${favoriting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  <Heart className={`w-5 h-5 ${favoriting ? 'animate-pulse' : ''}`} />
                  {favoriting ? "Adding..." : "Add to Favorites"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-12 p-6 bg-neutral-50 dark:bg-neutral-800 rounded-xl shadow-inner border border-neutral-200 dark:border-neutral-700">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">Meal Description</h2>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {meal.description || "A delightful meal prepared with fresh, locally sourced ingredients. Perfect for a quick lunch or a cozy dinner. Our chefs put their heart into every dish, ensuring a memorable culinary experience."}
          </p>
        </div>

        {/* Ingredients Section */}
        <div className="mt-8 p-6 bg-neutral-50 dark:bg-neutral-800 rounded-xl shadow-inner border border-neutral-200 dark:border-neutral-700">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">Ingredients</h2>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {meal.ingredients || "Fresh chicken breast, organic vegetables (broccoli, carrots, bell peppers), aromatic herbs (thyme, rosemary), olive oil, garlic, and a hint of lemon for freshness."}
          </p>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 p-6 bg-neutral-50 dark:bg-neutral-800 rounded-xl shadow-inner border border-neutral-200 dark:border-neutral-700">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">Customer Reviews</h2>
          <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4">
            {reviews.length === 0 ? (
              <p className="text-neutral-600 dark:text-neutral-400">No reviews yet. Be the first to share your thoughts!</p>
            ) : (
              reviews.map((rev) => (
                <div key={rev._id} className="flex items-start gap-4 p-4 bg-white dark:bg-neutral-900 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700">
                  <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    {rev.userName?.[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-neutral-900 dark:text-neutral-100">{rev.userName}</p>
                    {/* Add star rating display here if available in review data */}
                    <p className="text-neutral-700 dark:text-neutral-300 mt-1">{rev.comment}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleCommentSubmit} className="mt-6 flex gap-4">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              className="input-base flex-1 p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-red-500 focus:border-red-500"
            />
            <button
              disabled={postingComment}
              className="btn-primary py-3"
            >
              {postingComment ? "Posting..." : "Post Review"}
            </button>
          </form>
        </div>
      </motion.div>

      {/* Order Modal */}
      {/* Order Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 w-full max-w-lg shadow-strong border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                Confirm Your Order
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Order Summary */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                <img
                  src={selectedMeal.foodImage || "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=80&h=80&fit=crop"}
                  alt={selectedMeal.foodName}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {selectedMeal.foodName}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Chef {selectedMeal.chefId}
                  </p>
                  <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    ৳{selectedMeal.price}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="input-base w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Total Price
                  </label>
                  <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">
                    ৳{(selectedMeal.price * quantity).toFixed(2)}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Delivery Address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your full delivery address"
                  className="input-base w-full resize-none p-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-red-500 focus:border-red-500"
                  rows="3"
                  required
                />
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-4 mb-6">
              <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-3">Order Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Customer:</span>
                  <span className="text-neutral-900 dark:text-neutral-100">{UsersAllDataFromDB?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Email:</span>
                  <span className="text-neutral-900 dark:text-neutral-100">{UsersAllDataFromDB?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Estimated Delivery:</span>
                  <span className="text-neutral-900 dark:text-neutral-100">30-45 minutes</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={confirmOrder}
                disabled={!address.trim()}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
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

export default MealDetails;
