import React from 'react';
import Slider from '../../Components/Slider/Slider';
import Latest6Meal from '../../Components/Latest6Meal/Latest6Meal';
import CustomersReview from '../../Components/CustomersReview/CustomersReview';

const Home = () => {
    return (
        <div>
          <Slider className=""></Slider>
          <Latest6Meal></Latest6Meal>
          <CustomersReview></CustomersReview>
        </div>
    );
};

export default Home;