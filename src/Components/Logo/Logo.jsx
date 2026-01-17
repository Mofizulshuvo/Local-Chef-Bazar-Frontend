import React from 'react';

const Logo = ({ size = 'default' }) => {
    const isCompact = size === 'compact';

    return (
        <div className={`flex items-center ${isCompact ? 'space-x-2' : 'space-x-3'} cursor-pointer group`}>
            {/* Logo Text */}
            <div className='flex flex-col'>
                <h1 className={`${isCompact ? 'text-xl' : 'text-3xl'} font-black tracking-tight font-serif italic`}>
                    <span className='text-neutral-900 dark:text-white group-hover:text-neutral-800 transition-colors duration-300 bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent'>
                        Chef
                    </span>
                    <span className='text-red-600 group-hover:text-red-700 transition-colors duration-300 bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent font-extrabold'>
                        Bazar
                    </span>
                </h1>
                {!isCompact && (
                    <p className='text-xs text-neutral-500 dark:text-neutral-400 font-semibold tracking-widest uppercase font-mono'>
                        Local Flavors
                    </p>
                )}
            </div>
        </div>
    );
};

export default Logo;