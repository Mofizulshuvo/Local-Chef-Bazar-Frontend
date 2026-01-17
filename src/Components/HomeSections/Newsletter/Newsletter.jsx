import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsSubmitting(false);
      toast.success('Successfully subscribed to our newsletter!');
      setEmail('');
    }, 1500);
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-10">
            <g fill="none" fillRule="evenodd">
              <g fill="#000000" fillOpacity="0.1">
                <circle cx="30" cy="30" r="4"/>
              </g>
            </g>
          </svg>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-black/10 backdrop-blur-sm rounded-2xl mb-6">
            <Mail className="w-8 h-8 text-black" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            Stay Updated with Local Flavors
          </h2>

          <p className="text-lg text-black/90 mb-8 max-w-2xl mx-auto">
            Get weekly recommendations, exclusive chef spotlights, and special offers delivered straight to your inbox.
            Join our community of food lovers!
          </p>

          {!isSubscribed ? (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="max-w-md mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 rounded-xl border border-black/20 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white text-neutral-900 placeholder-neutral-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Subscribing...</span>
                    </div>
                  ) : (
                    'Subscribe Now'
                  )}
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-black/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto border border-black/20"
            >
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-black mb-2">
                You're Subscribed!
              </h3>
              <p className="text-black/80">
                Thank you for joining our newsletter. Get ready for delicious updates!
              </p>
            </motion.div>
          )}

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            <div>
              <div className="text-2xl font-bold text-black">2,500+</div>
              <div className="text-sm text-black/80">Subscribers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-black">Weekly</div>
              <div className="text-sm text-black/80">Updates</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-black">Exclusive</div>
              <div className="text-sm text-black/80">Content</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-black">Free</div>
              <div className="text-sm text-black/80">Forever</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;