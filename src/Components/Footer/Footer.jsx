import React, { useState } from "react";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaHeart,
  FaUtensils,
  FaStar,
  FaCheckCircle
} from "react-icons/fa";
import { toast } from "react-hot-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubscribing(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
      setIsSubscribing(false);
    }, 1000);
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Meals", path: "/Meals" },
    { name: "Become a Chef", path: "/SignUp" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const supportLinks = [
    { name: "Help Center", path: "/help" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Cookie Policy", path: "/cookies" },
    { name: "FAQ", path: "/faq" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: FaFacebookF, url: "https://facebook.com/localchefbazar", color: "hover:bg-blue-600" },
    { name: "Twitter", icon: FaTwitter, url: "https://twitter.com/localchefbazar", color: "hover:bg-sky-500" },
    { name: "Instagram", icon: FaInstagram, url: "https://instagram.com/localchefbazar", color: "hover:bg-pink-600" },
    { name: "LinkedIn", icon: FaLinkedinIn, url: "https://linkedin.com/company/localchefbazar", color: "hover:bg-blue-700" },
    { name: "YouTube", icon: FaYoutube, url: "https://youtube.com/@localchefbazar", color: "hover:bg-red-600" },
  ];

  return (
    <footer className="bg-neutral-900 text-neutral-300 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <g fill="none" fillRule="evenodd">
              <g fill="#ffffff" fillOpacity="0.1">
                <circle cx="50" cy="50" r="2"/>
              </g>
            </g>
          </svg>
        </div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                  <FaUtensils className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Local Chef Bazar</h3>
              </div>

              <p className="text-sm leading-relaxed mb-6">
                Connecting food lovers with passionate home chefs. Discover authentic flavors,
                support local talent, and enjoy fresh, homemade meals delivered to your doorstep.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="w-4 h-4 text-primary-400 flex-shrink-0" />
                  <span className="text-sm">123 Culinary Street, Food District<br />New York, NY 10001</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaPhone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                  <span className="text-sm">+1 (555) 123-CHEF</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="w-4 h-4 text-primary-400 flex-shrink-0" />
                  <span className="text-sm">hello@localchefbazar.com</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm hover:text-primary-400 transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support & Legal */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Support & Legal</h4>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm hover:text-primary-400 transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Working Hours */}
              <div className="mt-6">
                <h5 className="text-sm font-medium text-white mb-3 flex items-center">
                  <FaClock className="w-4 h-4 mr-2 text-primary-400" />
                  Working Hours
                </h5>
                <div className="text-xs space-y-1">
                  <p>Mon - Fri: 9:00 AM - 8:00 PM</p>
                  <p>Sat: 10:00 AM - 6:00 PM</p>
                  <p>Sun: 12:00 PM - 5:00 PM</p>
                </div>
              </div>
            </div>

            {/* Newsletter & Social */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Stay Connected</h4>

              {/* Newsletter */}
              <div className="mb-6">
                <p className="text-sm mb-4">
                  Get weekly meal recommendations, chef spotlights, and exclusive offers.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      required
                    />
                    <FaEnvelope className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubscribing ? "Subscribing..." : "Subscribe Now"}
                  </button>
                </form>
              </div>

              {/* Social Links */}
              <div>
                <h5 className="text-sm font-medium text-white mb-3">Follow Us</h5>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-neutral-800 rounded-xl flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-200 ${social.color}`}
                      aria-label={social.name}
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4 text-sm">
                <span>&copy; {new Date().getFullYear()} Local Chef Bazar. All rights reserved.</span>
                <span className="hidden md:inline text-neutral-600">•</span>
                <span className="hidden md:inline">Made with <FaHeart className="inline w-3 h-3 text-red-500" /> for food lovers</span>
              </div>

              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-1">
                  <FaCheckCircle className="w-4 h-4 text-green-500" />
                  <span>100% Secure</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaStar className="w-4 h-4 text-yellow-500" />
                  <span>4.9/5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
