import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Truck, Shield, Clock, Users, Star } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: ChefHat,
      title: 'Expert Local Chefs',
      description: 'Passionate home chefs with years of culinary experience sharing authentic recipes from their kitchens.',
      color: 'text-primary-600',
      bgColor: 'bg-primary-50 dark:bg-primary-900/20',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Hot and fresh meals delivered to your doorstep within 30 minutes of preparation.',
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-50 dark:bg-secondary-900/20',
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'Every meal undergoes quality checks and hygiene standards to ensure the best experience.',
      color: 'text-accent-600',
      bgColor: 'bg-accent-50 dark:bg-accent-900/20',
    },
    {
      icon: Clock,
      title: 'Flexible Timing',
      description: 'Order anytime with 24/7 availability. Perfect for breakfast, lunch, dinner, or special occasions.',
      color: 'text-primary-600',
      bgColor: 'bg-primary-50 dark:bg-primary-900/20',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Support local chefs while enjoying diverse cuisines from different cultures and backgrounds.',
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-50 dark:bg-secondary-900/20',
    },
    {
      icon: Star,
      title: 'Customer Favorite',
      description: 'Rated 4.8/5 by over 500+ satisfied customers who keep coming back for more.',
      color: 'text-accent-600',
      bgColor: 'bg-accent-50 dark:bg-accent-900/20',
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
            Why Choose Local Chef Bazar?
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Discover the unique advantages that make us the preferred choice for food lovers and aspiring chefs alike.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card-base p-8 text-center group hover:shadow-strong transition-all duration-300"
            >
              <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                {feature.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;