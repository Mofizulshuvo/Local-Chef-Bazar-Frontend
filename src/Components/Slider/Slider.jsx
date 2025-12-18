import React from 'react';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import image1 from "../../assets/hero1.jpg"
import image2 from "../../assets/hero2.jpg"
import image3 from "../../assets/hero3.jpg"
 import image4 from "../../assets/hero4.jpg"

const Slider = () => {
    return (
         <Swiper
     
      spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
    >
      <SwiperSlide><img src={image1} alt="" className='h-[610px] w-full'/></SwiperSlide>
      <SwiperSlide><img src={image2} alt="" className='h-[610px] w-full'/></SwiperSlide>
      <SwiperSlide><img src={image3} alt="" className='h-[610px] w-full'/></SwiperSlide>
      <SwiperSlide><img src={image4} alt="" className='h-[610px] w-full'/></SwiperSlide>
     
    </Swiper>
    );
};

export default Slider;