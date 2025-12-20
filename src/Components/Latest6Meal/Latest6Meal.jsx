import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router"; 

const Latest6Meals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/meals");
        setMeals(res.data.slice(0, 8));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-black">
        Available Meals
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {meals.map((meal) => (
          <motion.div
            key={meal._id}
            className="bg-white shadow-xl rounded-2xl h-[450px] overflow-hidden transform hover:scale-105 transition-all flex flex-col"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={meal.foodImage}
              alt={meal.foodName}
              className="w-full h-6/9 object-cover"
            />
            <div className="p-4 text-center flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-lg text-black">
                  {meal.foodName}
                </h3>
                <p className="text-sm text-gray-500">
                  {meal.description?.slice(0, 40)}
                </p>
                <p className="mt-2 font-bold text-[#C10007]">${meal.price}</p>
              </div>
              <Link to={`/MealDetails/${meal._id}`}>
                <button className="mt-4 w-full px-4 py-2 bg-white text-black border border-gray-200 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                  View Details
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Latest6Meals;
