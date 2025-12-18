import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Latest6Meal = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchLatestMeals = async () => {
      try {
        const res = await axios.get("http://localhost:3000/meals");
        setMeals(res.data.slice(-6)); // latest 6 meals
      } catch (err) {
        console.error(err);
      }
    };
    fetchLatestMeals();
  }, []);

  if (!meals.length)
    return <p className="text-center mt-10 text-lg">No Meals available</p>;

  return (
    <div className="px-4 sm:px-6 md:px-10 py-8">
      <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center">
        Latest Meals
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {meals.map((meal) => (
          <motion.div
            key={meal._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -6, scale: 1.03 }}
            className="w-[260px] h-[400px]"
          >
            <div className="border rounded-xl shadow-md overflow-hidden bg-gray-50 flex flex-col h-full">
              <div className="h-[65%] overflow-hidden">
                <img
                  src={meal.foodImage}
                  alt={meal.foodName}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="font-bold text-lg truncate">
                  {meal.foodName}
                </h3>
                <p className="text-[#056a89] text-sm truncate">
                  Chef: {meal.chefName}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Latest6Meal;
