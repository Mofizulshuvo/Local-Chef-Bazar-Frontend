import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = [
    {
      name: 'Italian Cuisine',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      description: 'Authentic pasta, pizza, and Mediterranean flavors',
      mealCount: 45,
      color: 'from-red-500 to-red-600',
    },
    {
      name: 'Asian Fusion',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
      description: 'Exotic blends of flavors from across Asia',
      mealCount: 38,
      color: 'from-orange-500 to-orange-600',
    },
    {
      name: 'Healthy & Organic',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
      description: 'Nutritious meals made with fresh, organic ingredients',
      mealCount: 52,
      color: 'from-green-500 to-green-600',
    },
    {
      name: 'Middle Eastern',
      image: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?w=400&h=300&fit=crop',
      description: 'Rich spices and traditional Middle Eastern delicacies',
      mealCount: 29,
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      name: 'Comfort Food',
      image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop',
      description: 'Hearty, soul-warming dishes for every occasion',
      mealCount: 67,
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'Desserts & Sweets',
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
      description: 'Indulgent treats and homemade desserts',
      mealCount: 34,
      color: 'from-pink-500 to-pink-600',
    },
  ];

  return (
    <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Explore Our Categories
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Discover diverse cuisines and meal types prepared by our talented local chefs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <Link to={`/Meals?category=${category.name.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}>
                <div className="card-base overflow-hidden h-80 hover:shadow-strong transition-all duration-300">
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

                    {/* Meal Count Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-neutral-800">
                      {category.mealCount} meals
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                      {category.description}
                    </p>

                    <div className="mt-4 flex items-center text-primary-600 dark:text-primary-400 font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
                      Explore Category
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Categories CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/Meals">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              View All Meals
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;