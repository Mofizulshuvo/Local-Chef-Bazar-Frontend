import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Users, ChefHat, Package, Star } from 'lucide-react';

const Statistics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [counts, setCounts] = useState({
    customers: 0,
    chefs: 0,
    orders: 0,
    rating: 0,
  });

  const stats = [
    {
      value: 1250,
      label: 'Happy Customers',
      suffix: '+',
      icon: Users,
      color: 'from-red-500 to-red-600',
    },
    {
      value: 85,
      label: 'Expert Chefs',
      suffix: '+',
      icon: ChefHat,
      color: 'from-green-500 to-green-600',
    },
    {
      value: 5420,
      label: 'Orders Delivered',
      suffix: '+',
      icon: Package,
      color: 'from-blue-500 to-blue-600',
    },
    {
      value: 4.9,
      label: 'Average Rating',
      suffix: '/5',
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  useEffect(() => {
    if (isInView) {
      const animateCount = (target, key, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setCounts(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, 16);
      };

      stats.forEach((stat, index) => {
        setTimeout(() => {
          animateCount(stat.value, Object.keys(counts)[index]);
        }, index * 200);
      });
    }
  }, [isInView]);

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-red-600 via-red-700 to-red-800 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:20px_20px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Local Chef Bazar for their daily meals.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-xl mb-4 mx-auto">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className={`text-4xl sm:text-5xl font-bold text-white mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {counts[Object.keys(counts)[index]]}
                  <span className="text-2xl">{stat.suffix}</span>
                </div>
                <div className="text-white/90 font-medium">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-md mx-auto">
            <Users className="w-12 h-12 text-white mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Join Our Community</h3>
            <p className="text-white/90 text-sm">Be part of thousands of food lovers who trust Local Chef Bazar</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;