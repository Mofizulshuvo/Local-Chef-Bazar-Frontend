import React from 'react';
import { ClipLoader } from 'react-spinners';


const Loader = () => {
    return (
        <div className="flex mx-auto items-center ">
            <ClipLoader
                size={60}
                color={"#123abc"}
                loading={true}
            />  
        </div>
    );
};

export default Loader;