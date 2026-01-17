import React from "react";
import { Helmet } from "react-helmet";

// Hero Section
import Banner from "../../Components/Banner/Banner";

// Home Sections
import Features from "../../Components/HomeSections/Features/Features";
import Statistics from "../../Components/HomeSections/Statistics/Statistics";
import HowItWorks from "../../Components/HomeSections/HowItWorks/HowItWorks";
import Categories from "../../Components/HomeSections/Categories/Categories";
import Latest6Meal from "../../Components/Latest6Meal/Latest6Meal";
import OurChefs from "../../Components/OurChefs/OurChefs";
import Testimonials from "../../Components/HomeSections/Testimonials/Testimonials";
import Newsletter from "../../Components/HomeSections/Newsletter/Newsletter";
import CallToAction from "../../Components/HomeSections/CallToAction/CallToAction";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Local Chef Bazar - Fresh Home-Cooked Meals Delivered</title>
        <meta
          name="description"
          content="Discover authentic home-cooked meals from local chefs. Fresh ingredients, fast delivery, and unforgettable flavors. Join the food revolution today!"
        />
        <meta
          name="keywords"
          content="home cooked meals, local chefs, food delivery, authentic cuisine, fresh ingredients, meal delivery"
        />
      </Helmet>

      {/* Hero Section */}
      <Banner />

      {/* Features Section */}
      <Features />

      {/* Statistics Section */}
      <Statistics />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Categories Section */}
      <Categories />

      {/* Latest Meals Section */}
      <Latest6Meal />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Newsletter Section */}
      <Newsletter />

      {/* Call to Action Section */}
      <CallToAction />
    </div>
  );
};

export default Home;
