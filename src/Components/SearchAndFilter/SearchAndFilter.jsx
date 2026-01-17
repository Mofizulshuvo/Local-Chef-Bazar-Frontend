import React, { useState } from 'react';
import { Search, Filter, X, MapPin, Star, DollarSign, ChefHat } from 'lucide-react';

const SearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  selectedRating,
  setSelectedRating,
  selectedLocation,
  setSelectedLocation,
  sortBy,
  setSortBy,
  onClearFilters
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'All Categories',
    'Italian Cuisine',
    'Asian Fusion',
    'Healthy & Organic',
    'Middle Eastern',
    'Comfort Food',
    'Desserts & Sweets',
    'Mexican',
    'Indian',
    'Mediterranean',
    'American',
    'Vegetarian'
  ];

  const locations = [
    'All Locations',
    'Downtown',
    'Midtown',
    'Uptown',
    'Brooklyn',
    'Queens',
    'Bronx',
    'Staten Island',
    'New Jersey',
    'Connecticut'
  ];

  const ratings = [
    { value: 'all', label: 'All Ratings' },
    { value: '4.5', label: '4.5+ Stars' },
    { value: '4.0', label: '4.0+ Stars' },
    { value: '3.5', label: '3.5+ Stars' },
    { value: '3.0', label: '3.0+ Stars' }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' }
  ];

  const hasActiveFilters = searchTerm || selectedCategory !== 'All Categories' ||
    priceRange.min > 0 || priceRange.max < 500 || selectedRating !== 'all' ||
    selectedLocation !== 'All Locations';

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-6 mb-8">
      {/* Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search for meals, chefs, or cuisines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-base pl-12 pr-4 w-full"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-outline flex items-center space-x-2 ${showFilters ? 'bg-red-600 text-white border-red-600' : ''}`}

          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
            {hasActiveFilters && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                Active
              </span>
            )}
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-base max-w-xs"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category Filter */}
            <div>
              <label className="flex items-center text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                <ChefHat className="w-4 h-4 mr-2" />
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-base w-full"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="flex items-center text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                <DollarSign className="w-4 h-4 mr-2" />
                Price Range
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                  className="input-base w-20"
                  min="0"
                />
                <span className="text-neutral-500">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                  className="input-base w-20"
                  min="0"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="flex items-center text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                <Star className="w-4 h-4 mr-2" />
                Minimum Rating
              </label>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="input-base w-full"
              >
                {ratings.map(rating => (
                  <option key={rating.value} value={rating.value}>
                    {rating.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="flex items-center text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="input-base w-full"
              >
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={onClearFilters}
                className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Clear All Filters</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4">
          {searchTerm && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
              Search: "{searchTerm}"
              <button
                onClick={() => setSearchTerm('')}
                className="ml-2 hover:bg-red-200 dark:hover:bg-red-800 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedCategory !== 'All Categories' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
              {selectedCategory}
              <button
                onClick={() => setSelectedCategory('All Categories')}
                className="ml-2 hover:bg-red-200 dark:hover:bg-red-800 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {(priceRange.min > 0 || priceRange.max < 500) && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
              ${priceRange.min} - ${priceRange.max}
              <button
                onClick={() => setPriceRange({ min: 0, max: 500 })}
                className="ml-2 hover:bg-red-200 dark:hover:bg-red-800 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedRating !== 'all' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
              {selectedRating}+ Stars
              <button
                onClick={() => setSelectedRating('all')}
                className="ml-2 hover:bg-red-200 dark:hover:bg-red-800 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedLocation !== 'All Locations' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
              {selectedLocation}
              <button
                onClick={() => setSelectedLocation('All Locations')}
                className="ml-2 hover:bg-red-200 dark:hover:bg-red-800 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;