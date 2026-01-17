import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";
import Loader from "../../../../Components/Loader/Loader";

const UserMyReview = () => {
  const { UsersAllDataFromDB, token } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    if (!UsersAllDataFromDB?._id) return;

    try {
      setLoading(true);
      const res = await axios.get(
        `https://local-chef-bazar-backend-1.onrender.com/reviews/${UsersAllDataFromDB._id}`,
        { headers: token ? { Authorization: `Bearer ${token}` } : undefined }
      );

      setReviews(res.data);
    } catch (error) {
      console.error(error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [UsersAllDataFromDB?._id]);

  if (loading) return <Loader />;

  if (!reviews.length)
    return (
      <div className="flex justify-center items-center mt-16 px-4">
        <p className="text-gray-500 text-base sm:text-lg text-center">
          You haven’t written any reviews yet.
        </p>
      </div>
    );

  return (
    <div className="w-full px-4 sm:px-6 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-10 text-gray-900">
        My Reviews
      </h1>

      <div className="max-w-5xl mx-auto space-y-5">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 sm:p-6 flex flex-col gap-3"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                {review.foodName}
              </h2>
              <span className="text-xs sm:text-sm text-gray-400">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* Chef */}
            <p className="text-sm sm:text-base text-gray-500">
              Chef: <span className="font-medium">{review.chefName}</span>
            </p>

            {/* Comment */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed break-words">
              “{review.comment}”
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMyReview;
