import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const CustomersReview = () => {
  const [reviews, setReviews] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  // Fetch latest 3 reviews
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("http://localhost:3000/websiteReview");
      setReviews(res.data.slice(-3).reverse()); // latest 3
    } catch (err) {
      console.error(err);
      toast.error("Failed to load reviews");
    }
  };

  // Submit review
  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3000/websiteReview", data);
      toast.success("Review submitted!");
      reset();
      fetchReviews();
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">
        Customer Reviews
      </h2>

      {/* Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="border rounded-lg p-5 shadow-sm bg-white"
          >
            <p className="text-gray-600 mb-4">
              “{review.reviewText}”
            </p>
            <h4 className="font-semibold text-emerald-600">
              {review.name}
            </h4>
            <p className="text-sm text-gray-400">
              Rating: {review.rating}/5
            </p>
          </div>
        ))}
      </div>

      {/* Review Form */}
      <div className="max-w-md mx-auto border rounded-lg p-6 shadow">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Leave a Review
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("name", { required: true })}
            placeholder="Your Name"
            className="w-full border px-4 py-2 rounded"
          />

          <select
            {...register("rating", { required: true })}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="">Rating</option>
            <option value="5">★★★★★ (5)</option>
            <option value="4">★★★★☆ (4)</option>
            <option value="3">★★★☆☆ (3)</option>
            <option value="2">★★☆☆☆ (2)</option>
            <option value="1">★☆☆☆☆ (1)</option>
          </select>

          <textarea
            {...register("reviewText", { required: true })}
            placeholder="Write your review..."
            rows="4"
            className="w-full border px-4 py-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded font-semibold"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomersReview;
