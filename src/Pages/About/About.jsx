import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  ChefHat,
  Users,
  Heart,
  Award,
  Star,
  TrendingUp,
  Shield,
  Globe,
  Clock,
  Target,
  Zap
} from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, value: '1250+', label: 'Happy Customers', color: 'text-primary-600' },
    { icon: ChefHat, value: '85+', label: 'Expert Chefs', color: 'text-secondary-600' },
    { icon: Star, value: '4.9/5', label: 'Average Rating', color: 'text-accent-600' },
    { icon: Clock, value: '30min', label: 'Avg. Delivery Time', color: 'text-green-600' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Food',
      description: 'We believe great food brings people together and creates lasting memories.',
      color: 'text-red-500',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Supporting local chefs and building a vibrant food community.',
      color: 'text-blue-500',
    },
    {
      icon: Shield,
      title: 'Quality & Safety',
      description: 'Rigorous standards ensure every meal meets our high-quality requirements.',
      color: 'text-green-500',
    },
    {
      icon: Globe,
      title: 'Cultural Diversity',
      description: 'Celebrating culinary traditions from around the world.',
      color: 'text-purple-500',
    },
  ];

  const milestones = [
    { year: '2020', event: 'Platform Launch', description: 'Started with 10 chefs and 50 customers' },
    { year: '2021', event: 'Major Expansion', description: 'Grew to 50+ chefs across 3 cities' },
    { year: '2022', event: 'Quality Recognition', description: 'Achieved 4.8+ star rating consistently' },
    { year: '2023', event: 'Community Impact', description: 'Supported 100+ local entrepreneurs' },
    { year: '2024', event: 'Innovation Leader', description: 'Introduced AI-powered meal matching' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <Helmet>
        <title>About Us - Local Chef Bazar</title>
        <meta name="description" content="Learn about Local Chef Bazar's mission to connect food lovers with passionate home chefs, promoting authentic cuisine and supporting local communities." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-secondary-600/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              About Local Chef Bazar
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              We're revolutionizing the way people experience food by connecting passionate home chefs
              with food lovers who crave authentic, fresh, and unforgettable meals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-neutral-600 dark:text-neutral-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <p>
                  Local Chef Bazar was born from a simple idea: great food shouldn't be limited to restaurants.
                  Our founders, a group of food enthusiasts and tech innovators, noticed that many talented home
                  chefs were cooking amazing meals but had no platform to share their passion with others.
                </p>
                <p>
                  What started as a small community project has grown into a thriving platform that connects
                  food lovers with passionate chefs, creating meaningful connections through the universal
                  language of food.
                </p>
                <p>
                  Today, we're proud to support hundreds of local chefs and serve thousands of customers who
                  believe that the best meals are made with love, tradition, and fresh ingredients.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop"
                alt="Our kitchen community"
                className="rounded-2xl shadow-strong"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary-600 text-white p-4 rounded-2xl shadow-lg">
                <div className="text-2xl font-bold">4+ Years</div>
                <div className="text-sm">Of Culinary Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              The principles that guide everything we do and shape our community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-base p-6 text-center"
              >
                <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className={`w-6 h-6 ${value.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                  {value.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card-base p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  Our Mission
                </h3>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                To democratize exceptional dining experiences by connecting skilled home chefs with
                discerning food lovers, fostering a community where culinary passion meets accessibility,
                and promoting sustainable, authentic food culture.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Authenticity', 'Community', 'Quality', 'Accessibility'].map((item) => (
                  <span key={item} className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="card-base p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-secondary-600" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  Our Vision
                </h3>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                To become the world's leading platform for home-cooked cuisine, where every meal tells a story,
                every chef has a platform to shine, and every food lover discovers their next favorite dish,
                creating a global community united by the love of exceptional food.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Innovation', 'Inclusivity', 'Sustainability', 'Excellence'].map((item) => (
                  <span key={item} className="px-3 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 rounded-full text-sm font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Key milestones that have shaped our growth and success.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary-500 to-secondary-500 hidden md:block"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-8`}
                >
                  <div className="flex-1 md:text-right">
                    <div className={`card-base p-6 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        {milestone.event}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="w-4 h-4 bg-primary-600 rounded-full border-4 border-white dark:border-neutral-900 shadow-lg relative z-10"></div>

                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Join Our Culinary Community
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Whether you're a chef with stories to share or a food lover seeking new experiences,
              Local Chef Bazar welcomes you to our growing family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Become a Chef
              </button>
              <button className="btn-outline border-white text-white hover:bg-white hover:text-neutral-900">
                Explore Meals
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;