import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const OurChefs = () => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const res = await axios.get("https://local-chef-bazar-backend-1.onrender.com/users");

        const activeChefs = res.data
          .filter(
            (user) => user.role === "chef" && user.status === "active"
          )
          .slice(0, 4);

        setChefs(activeChefs);
      } catch (error) {
        console.error("Failed to fetch chefs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChefs();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-500">
        Loading chefs...
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-14">
      <h2 className="text-3xl font-bold text-center mb-10 text-black">
        Our Chefs
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {chefs.map((chef) => (
          <motion.div
            key={chef._id}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition flex flex-col items-center text-center"
          >
            <img
              src={
                chef.profileImage?.trim()
                  ? chef.profileImage
                  : "https://i.pravatar.cc/150?img=12"
              }
              alt={chef.name}
              className="w-20 h-20 rounded-full object-cover mb-3"
            />

            <h3 className="text-gray-800 font-semibold text-base">
              {chef.name}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              📍 {chef.address || "Bangladesh"}
            </p>

            <span className="mt-3 text-xs font-medium px-3 py-1 rounded-full bg-red-50 text-[#C10007]">
              Professional Chef
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OurChefs;
