import React from 'react';
import Slider from '../../Components/Slider/Slider';
import Latest6Meal from '../../Components/Latest6Meal/Latest6Meal';
import OurChefs from '../../Components/OurChefs/OurChefs'
import Banner from '../../Components/Banner/Banner';
import CustomersReview from '../../Components/CustomersReview/CustomersReview';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <Latest6Meal></Latest6Meal>
          <CustomersReview></CustomersReview>
          <OurChefs></OurChefs>
          
        </div>
    );
};

export default Home;