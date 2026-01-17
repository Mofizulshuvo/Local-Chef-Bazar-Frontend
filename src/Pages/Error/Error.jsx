import React from 'react';
import error from "../../assets/What-is-404-error-1536x1030.jpg";

const Error = () => {
    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <img 
                src={error} 
                alt="404 Error" 
                className="w-full max-w-2xl h-auto object-contain" 
            />
        </div>
    );
};

export default Error;
