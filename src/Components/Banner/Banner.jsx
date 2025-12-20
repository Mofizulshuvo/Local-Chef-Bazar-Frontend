import React from "react";
import { motion } from "framer-motion";
import image_background from "../../assets/top-view-grated-whole-potatoes-bowls-with-salt-black-pepper-butter-grater-knife-bordo-background-with-copy-space.jpg";
import { Link } from "react-router";

const Banner = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative text-white flex flex-col items-center justify-center h-[500px] bg-cover bg-center"
      style={{
        backgroundImage: `url(${image_background})`,
      }}
    >
      <div className="absolute inset-0 backdrop-blur-0 bg-opacity-50"></div>

      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold">
          Welcome to Local Chef Bazar
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
          Delicious homemade meals delivered to your doorstep every day.
        </p>
        <Link to="/Meals">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-8 px-8 py-3 bg-white text-[#C10007] font-bold rounded-full shadow-lg hover:shadow-2xl transition-all"
          >
            Order Now
          </motion.button>
        </Link>
      </div>
    </motion.section>
  );
};

export default Banner;
