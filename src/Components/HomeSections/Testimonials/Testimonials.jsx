import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Food Blogger',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      review: 'Local Chef Bazar has completely changed how I experience food. The authenticity and freshness of each meal is incredible. I\'ve tried dishes from 15 different chefs and each one has been memorable!',
      location: 'New York, NY',
    },
    {
      name: 'Michael Chen',
      role: 'Business Executive',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      review: 'As someone who travels frequently, finding reliable meal options is always a challenge. Local Chef Bazar solved this perfectly. The platform connects me with amazing local talent wherever I am.',
      location: 'San Francisco, CA',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Home Chef',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      review: 'I started as a customer but fell in love with the platform so much that I became a chef! The community here is supportive and the technology makes everything so easy. Highly recommended!',
      location: 'Austin, TX',
    },
    {
      name: 'David Kim',
      role: 'Fitness Enthusiast',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      review: 'Finding healthy, delicious meals that fit my dietary needs used to be impossible. Now I have access to chefs who understand nutrition and create amazing healthy dishes. Life-changing!',
      location: 'Seattle, WA',
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

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
            What Our Customers Say
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Real stories from real people who love cooking and eating with Local Chef Bazar.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="card-base p-8 md:p-12 relative overflow-hidden"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 left-6 text-primary-200 dark:text-primary-800">
                <Quote className="w-12 h-12" />
              </div>

              {/* Rating Stars */}
              <div className="flex items-center justify-center mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 text-center mb-8 leading-relaxed">
                "{testimonials[currentIndex].review}"
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-primary-100 dark:border-primary-800"
                />
                <div className="text-center md:text-left">
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {testimonials[currentIndex].role}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500">
                    {testimonials[currentIndex].location}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 w-12 h-12 bg-white dark:bg-neutral-800 rounded-full shadow-lg flex items-center justify-center hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 w-12 h-12 bg-white dark:bg-neutral-800 rounded-full shadow-lg flex items-center justify-center hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-primary-600 scale-125'
                  : 'bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500'
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center"
        >
          <div>
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">4.9/5</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-secondary-600 dark:text-secondary-400">98%</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">Satisfaction</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent-600 dark:text-accent-400">500+</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">Reviews</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">24/7</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">Support</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;