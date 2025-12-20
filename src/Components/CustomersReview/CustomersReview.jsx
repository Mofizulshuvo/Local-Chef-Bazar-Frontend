import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Star } from "lucide-react";

const CustomersReview = () => {
  const [reviews, setReviews] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("http://localhost:3000/websiteReview");
      setReviews(res.data.slice(-3).reverse());
    } catch {
      toast.error("Failed to load reviews");
    }
  };

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3000/websiteReview", data);
      toast.success("Thanks for your review ❤️");
      reset();
      fetchReviews();
    } catch {
      toast.error("Failed to submit review");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* ================= HEADER ================= */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-extrabold text-gray-800">
          What Our Customers Say
        </h2>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          Real feedback from people who enjoy our homemade meals every day
        </p>
      </div>

      {/* ================= REVIEWS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* Stars */}
            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={`${
                    i < review.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            <p className="text-gray-600 leading-relaxed mb-5">
              “{review.reviewText}”
            </p>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold">
                {review.name?.[0]?.toUpperCase()}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">
                  {review.name}
                </h4>
                <p className="text-sm text-gray-400">Verified Customer</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= FORM ================= */}
      <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-center mb-2 text-gray-800">
          Leave Your Review
        </h3>
        <p className="text-center text-gray-500 mb-6">
          Your feedback helps us improve
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <input
            {...register("name", { required: true })}
            placeholder="Your Name"
            className="w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <select
            {...register("rating", { required: true })}
            className="w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Select Rating</option>
            <option value="5">★★★★★ Excellent</option>
            <option value="4">★★★★☆ Very Good</option>
            <option value="3">★★★☆☆ Good</option>
            <option value="2">★★☆☆☆ Fair</option>
            <option value="1">★☆☆☆☆ Poor</option>
          </select>

          <textarea
            {...register("reviewText", { required: true })}
            placeholder="Share your experience..."
            rows="4"
            className="w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r bg-red-800 hover:opacity-90 text-white py-3 rounded-xl font-semibold shadow-lg transition"
          >
            Submit Review
          </button>
        </form>
      </div>
    </section>
  );
};

export default CustomersReview;
