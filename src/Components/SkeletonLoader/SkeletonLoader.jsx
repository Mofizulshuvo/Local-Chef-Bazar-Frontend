import React from 'react';

const SkeletonLoader = ({
  variant = 'card', // card, text, avatar, button, table
  lines = 1,
  className = '',
  height = 'auto',
  width = '100%',
}) => {
  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return (
          <div className={`card-base h-80 ${className}`}>
            <div className="h-2/3 skeleton"></div>
            <div className="h-1/3 p-4 space-y-3">
              <div className="h-4 skeleton w-3/4"></div>
              <div className="h-3 skeleton w-1/2"></div>
              <div className="flex justify-between">
                <div className="h-3 skeleton w-1/4"></div>
                <div className="h-3 skeleton w-1/4"></div>
              </div>
              <div className="h-8 skeleton w-full rounded-xl"></div>
            </div>
          </div>
        );

      case 'text':
        return (
          <div className={`space-y-2 ${className}`}>
            {Array.from({ length: lines }).map((_, index) => (
              <div
                key={index}
                className="skeleton h-4"
                style={{
                  width: index === lines - 1 ? '60%' : '100%',
                }}
              ></div>
            ))}
          </div>
        );

      case 'avatar':
        return (
          <div className={`flex items-center space-x-3 ${className}`}>
            <div className="w-10 h-10 skeleton rounded-full"></div>
            <div className="space-y-2">
              <div className="h-3 skeleton w-24"></div>
              <div className="h-3 skeleton w-16"></div>
            </div>
          </div>
        );

      case 'button':
        return (
          <div
            className={`skeleton rounded-xl ${className}`}
            style={{ height: height || '40px', width }}
          ></div>
        );

      case 'table':
        return (
          <div className={`space-y-3 ${className}`}>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <div key={rowIndex} className="flex space-x-4">
                <div className="h-4 skeleton flex-1"></div>
                <div className="h-4 skeleton w-24"></div>
                <div className="h-4 skeleton w-20"></div>
                <div className="h-4 skeleton w-16"></div>
              </div>
            ))}
          </div>
        );

      case 'hero':
        return (
          <div className={`space-y-4 ${className}`}>
            <div className="h-8 skeleton w-1/3"></div>
            <div className="h-4 skeleton w-2/3"></div>
            <div className="h-4 skeleton w-1/2"></div>
            <div className="h-12 skeleton w-32 rounded-xl"></div>
          </div>
        );

      default:
        return (
          <div
            className={`skeleton ${className}`}
            style={{ height, width }}
          ></div>
        );
    }
  };

  return renderSkeleton();
};

export default SkeletonLoader;