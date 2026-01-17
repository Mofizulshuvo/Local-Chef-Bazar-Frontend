import React from 'react';
import { motion } from 'framer-motion';
import { Search, ChefHat, Truck, Star, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: Search,
      title: 'Discover & Choose',
      description: 'Browse through hundreds of delicious meals from local chefs. Filter by cuisine, dietary preferences, or location.',
      color: 'from-red-500 to-red-600',
      details: ['Advanced search & filters', 'Real-time availability', 'Detailed meal descriptions'],
    },
    {
      number: 2,
      icon: ChefHat,
      title: 'Place Your Order',
      description: 'Select your favorite meals, customize portions, and schedule delivery. Payment is secure and instant.',
      color: 'from-red-500 to-red-600',
      details: ['Flexible portion sizes', 'Scheduled delivery', 'Secure payment processing'],
    },
    {
      number: 3,
      icon: Truck,
      title: 'Fresh Delivery',
      description: 'Our chefs prepare your meal fresh and our delivery partners bring it hot to your doorstep within 30 minutes.',
      color: 'from-red-500 to-red-600',
      details: ['Hot & fresh guarantee', '30-minute delivery', 'Contactless delivery'],
    },
    {
      number: 4,
      icon: Star,
      title: 'Enjoy & Review',
      description: 'Savor every bite and share your experience. Your feedback helps us maintain the highest quality standards.',
      color: 'from-red-500 to-red-600',
      details: ['Rate your experience', 'Detailed reviews', 'Quality improvement'],
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
            How Local Chef Bazar Works
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            From discovery to delivery, we've streamlined the entire process to bring you the best home-cooked meals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-16 bg-gradient-to-b from-primary-200 to-primary-300 dark:from-primary-700 dark:to-primary-600"></div>
                )}

                <div className="flex items-start space-x-6">
                  {/* Step Number & Icon */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                    <step.icon className="w-9 h-9 text-white" strokeWidth={2.5} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-sm font-bold text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900 px-3 py-1 rounded-full">
                        Step {step.number}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                      {step.title}
                    </h3>

                    <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Details */}
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Visual Representation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="card-base p-8 text-center">
              <div className="mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <ChefHat className="w-14 h-14 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  Start Your Journey
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  Join thousands of food lovers who have discovered their new favorite meals through Local Chef Bazar.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-4">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">30min</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Avg. Delivery</div>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-4">
                  <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">4.9★</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Customer Rating</div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary w-full group"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-100 dark:bg-primary-900 rounded-full opacity-50 animate-bounce-gentle"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-secondary-100 dark:bg-secondary-900 rounded-full opacity-50 animate-pulse-slow"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;