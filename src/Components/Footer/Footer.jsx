import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p className="text-sm">123 Local Chef Bazar St.</p>
          <p className="text-sm">Dhaka, Bangladesh</p>
          <p className="text-sm">Phone: +880 123 456 789</p>
          <p className="text-sm">Email: info@localchefbazar.com</p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a
              href="#"
              className="p-2 bg-white text-black rounded-full hover:bg-white/80 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-2 bg-white text-black rounded-full hover:bg-white/80 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="p-2 bg-white text-black rounded-full hover:bg-white/80 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="p-2 bg-white text-black rounded-full hover:bg-white/80 transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Working Hours</h3>
          <p className="text-sm">Monday - Friday: 9:00 AM - 8:00 PM</p>
          <p className="text-sm">Saturday: 10:00 AM - 6:00 PM</p>
          <p className="text-sm">Sunday: Closed</p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Newsletter</h3>
          <p className="text-sm mb-2">Subscribe to get the latest updates.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 bg-white py-2 rounded-lg text-black"
            />
            <button className="px-4 py-2 bg-black rounded-lg text-white font-semibold hover:bg-black/80 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white/20 py-4 text-center text-sm text-white/80">
        &copy; {new Date().getFullYear()} Local Chef Bazar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
