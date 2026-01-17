import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hover = true,
  onClick,
  image,
  title,
  subtitle,
  meta,
  actions,
  overlay, // New prop for overlay content
  variant = 'default', // default, featured, compact
  size = 'medium', // small, medium, large, xl
}) => {
  const sizeClasses = {
    small: 'h-64',
    medium: 'h-80',
    large: 'h-96',
    xl: 'h-[32rem]', // 512px - even taller
  };

  const variantClasses = {
    default: '',
    featured: 'ring-2 ring-primary-500/20 bg-gradient-to-br from-primary-50/50 to-secondary-50/50 dark:from-primary-900/20 dark:to-secondary-900/20',
    compact: 'h-48',
  };

  return (
    <motion.div
      className={`
        card-base overflow-hidden rounded-2xl shadow-lg hover:shadow-xl
        bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${hover ? 'hover:-translate-y-2 cursor-pointer' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      whileHover={hover ? { y: -8, scale: 1.02 } : {}}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Image Section */}
      {image && (
        <div className="h-3/5 relative overflow-hidden rounded-t-2xl">
          <img
            src={image}
            alt={title || 'Card image'}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {/* Overlay Content */}
          {overlay && (
            <div className="absolute top-4 right-4 z-10">
              {overlay}
            </div>
          )}
          
          {variant === 'featured' && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-xs font-semibold rounded-full shadow-lg">
                Featured
              </span>
            </div>
          )}
        </div>
      )}

      {/* Content Section */}
      <div className={`p-6 flex flex-col justify-between ${image ? 'h-2/5' : 'h-full'}`}>
        <div className="flex flex-col gap-3">
          {title && (
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
              {subtitle}
            </p>
          )}
          {meta && (
            <div className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400 mt-2">
              {meta}
            </div>
          )}
        </div>

        {/* Actions */}
        {actions && (
          <div className="flex items-center justify-center mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-700">
            {actions}
          </div>
        )}
      </div>

      {/* Custom children content */}
      {children}
    </motion.div>
  );
};

export default Card;