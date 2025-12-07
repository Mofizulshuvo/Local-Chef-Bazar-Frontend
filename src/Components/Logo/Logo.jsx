import React from 'react';
import { PiChefHatFill } from 'react-icons/pi';

const Logo = () => {
    return (
        <div className='flex justify-center items-center font-bold text-5xl'>
            {/* <PiChefHatFill className='relative translate-x-23 -translate-y-1' /> */}
            <h1><span className='text-red-600'>Chef</span><span className="text-orange-600">Bazar</span></h1>
        </div>
    );
};

export default Logo;