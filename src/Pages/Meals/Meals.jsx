import React, { useEffect, useState, useContext, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
import Loader from "../../Components/Loader/Loader";
import Card from "../../Components/Card/Card";
import SkeletonLoader from "../../Components/SkeletonLoader/SkeletonLoader";
import SearchAndFilter from "../../Components/SearchAndFilter/SearchAndFilter";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import { Helmet } from "react-helmet";
import { Heart, ChefHat, DollarSign, X } from "lucide-react";

const Meals = () => {
  const navigate = useNavigate();
  const { UsersAllDataFromDB, token, user } = useContext(AuthContext);

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [sortBy, setSortBy] = useState("relevance");

  // Order Modal States
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 12;

  const isRestricted =
    UsersAllDataFromDB?.role === "admin" || UsersAllDataFromDB?.role === "chef";

  // minimal logging in production

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://local-chef-bazar-backend-1.onrender.com/meals");
        setMeals(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching meals:', error);
        // Fallback to empty array on error
        setMeals([]);
        setLoading(false);
      }
    };

    const fetchFavorites = async () => {
      if (user && UsersAllDataFromDB?.email) {
        try {
          const response = await axios.get(`https://local-chef-bazar-backend-1.onrender.com/favorites?userEmail=${UsersAllDataFromDB.email}`);
          setFavorites(response.data || []);
        } catch (err) {
          console.error("Failed to fetch favorites:", err);
          setFavorites([]);
        }
      } else {
        setFavorites([]);
      }
    };

    fetchMeals();
    fetchFavorites();
  }, [token, user, UsersAllDataFromDB?.email]);

  // Filtered and sorted meals
  const filteredAndSortedMeals = useMemo(() => {
    // filtering and sorting meals
    let filtered = meals.filter(meal => {
      // Basic validation - meal must have essential fields
      if (!meal || !meal._id || !meal.foodName || meal.foodName.trim() === '') {
        return false;
      }

      // Search term filter
      const matchesSearch = !searchTerm ||
        meal.foodName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meal.ingredients?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meal.chefId?.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === 'All Categories' || !meal.category || meal.category === selectedCategory;

      // Price range filter
      const mealPrice = parseFloat(meal.price || 0);
      const matchesPrice = isNaN(mealPrice) || (mealPrice >= Number(priceRange.min) && mealPrice <= Number(priceRange.max));

      // Rating filter
      const mealRating = parseFloat(meal.rating || 0);
      const matchesRating = selectedRating === 'all' || isNaN(mealRating) || mealRating >= parseFloat(selectedRating || '0');

      // Location filter
      const matchesLocation = selectedLocation === 'All Locations' ||
        !meal.location || meal.location === selectedLocation;

      return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesLocation;
    });

    

    // Sort meals
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
        break;
      case 'rating':
        filtered.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      case 'popular':
        filtered.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
        break;
      default: // relevance
        break;
    }

    return filtered;
  }, [meals, searchTerm, selectedCategory, priceRange, selectedRating, selectedLocation, sortBy]);

  const refreshFavorites = async () => {
    if (user && UsersAllDataFromDB?.email) {
      try {
        console.log('Manually refreshing favorites for user:', UsersAllDataFromDB.email);
        const response = await axios.get(`https://local-chef-bazar-backend-1.onrender.com/favorites?userEmail=${UsersAllDataFromDB.email}`);
        console.log('Refreshed favorites response:', response.data);
        setFavorites(response.data);
        toast.success(`Refreshed favorites: ${response.data.length} items`);
      } catch (err) {
        console.error("Failed to refresh favorites:", err);
        toast.error("Failed to refresh favorites");
      }
    }
  };

  const handleOrder = (meal) => {
    if (!user) {
      navigate("/SignIn");
      return;
    }

    setSelectedMeal(meal);
    setQuantity(1);
    setAddress("");
    setShowModal(true);
  };

  const confirmOrder = async () => {
    if (!address) {
      toast.error("Please enter delivery address");
      return;
    }

    const totalPrice = selectedMeal.price * quantity;

    const result = await Swal.fire({
      title: "Confirm Order",
      text: `Your total price is $${totalPrice}. Do you want to confirm the order?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    const orderPayload = {
      foodId: selectedMeal._id,
      foodImage: selectedMeal.foodImage,
      mealName: selectedMeal.foodName,
      price: selectedMeal.price,
      quantity: quantity,
      chefId: selectedMeal.chefId,
      paymentStatus: "Pending",
      userEmail: UsersAllDataFromDB.email,
      userAddress: address,
      orderStatus: "pending",
      orderTime: new Date().toISOString(),
    };

    try {
      await axios.post(
        "https://local-chef-bazar-backend-1.onrender.com/orders",
        orderPayload
      );
      Swal.fire("Success!", "Order placed successfully!", "success");
      setShowModal(false);
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to place order.", "error");
    }
  };

  const handleFavorite = async (meal) => {
    console.log('handleFavorite called with meal:', meal);
    console.log('Current user:', user);
    console.log('User email:', UsersAllDataFromDB?.email);
    console.log('Current favorites before operation:', favorites);

    if (!user) {
      console.log('No user, navigating to sign in');
      navigate("/SignIn");
      return;
    }

    const isFavorited = favorites.some(fav => fav.mealId === meal._id);
    console.log('Is currently favorited:', isFavorited);

    try {
      if (isFavorited) {
        console.log('Removing from favorites - API call starting');
        await axios.delete(`https://local-chef-bazar-backend-1.onrender.com/favorites/${meal._id}?userEmail=${UsersAllDataFromDB.email}`);
        console.log('Successfully removed from favorites');

        // Only update state after successful API call
        setFavorites(prev => {
          const newFavorites = prev.filter(fav => fav.mealId !== meal._id);
          console.log('New favorites after removal:', newFavorites);
          return newFavorites;
        });
        toast.success("Removed from favorites!");
      } else {
        console.log('Adding to favorites - API call starting');
        const payload = {
          mealId: meal._id,
          userEmail: UsersAllDataFromDB.email,
          mealName: meal.foodName,
        };
        console.log('Payload being sent:', payload);
        const response = await axios.post("https://local-chef-bazar-backend-1.onrender.com/favorites", payload);
        console.log('Add to favorites response:', response.data);

        // Only update state after successful API call
        setFavorites(prev => {
          const newFavorites = [...prev, { ...payload, _id: response.data._id || "fav_" + Date.now() }];
          console.log('New favorites after addition:', newFavorites);
          return newFavorites;
        });
        toast.success("Added to favorites!");
      }
    } catch (err) {
      console.error('Favorite operation failed:', err);
      console.error('Error status:', err.response?.status);
      console.error('Error response:', err.response?.data);
      toast.error(`Failed to update favorites: ${err.response?.data?.message || err.message}`);

      // Re-fetch favorites to ensure UI is in sync with backend
      try {
        console.log('Re-fetching favorites after error');
        const response = await axios.get(`https://local-chef-bazar-backend-1.onrender.com/favorites?userEmail=${UsersAllDataFromDB.email}`);
        setFavorites(response.data);
        console.log('Re-fetched favorites after error:', response.data);
      } catch (fetchErr) {
        console.error('Failed to re-fetch favorites:', fetchErr);
        setFavorites([]); // Clear on fetch error
      }
    }
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'All Categories' ||
    priceRange.min > 0 || priceRange.max < 500 || selectedRating !== 'all' ||
    selectedLocation !== 'All Locations';

  // Pagination logic
  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = filteredAndSortedMeals.slice(indexOfFirstMeal, indexOfLastMeal);
  console.log('Current meals to display:', currentMeals);
  const totalPages = Math.ceil(filteredAndSortedMeals.length / mealsPerPage);

  const isOrderDisabled = UsersAllDataFromDB.status === "fraud";

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, priceRange, selectedRating, selectedLocation, sortBy]);

  // Clear all filters function
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All Categories");
    setPriceRange({ min: 0, max: 500 });
    setSelectedRating("all");
    setSelectedLocation("All Locations");
    setSortBy("relevance");
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <SkeletonLoader variant="text" lines={2} className="mb-4" />
          <SkeletonLoader variant="button" className="w-48 h-12" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <SkeletonLoader key={index} variant="card" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <Helmet>
          <title>Meals - Local Chef Bazar</title>
          <meta name="description" content="Browse and order delicious home-cooked meals from local chefs in your area." />
        </Helmet>

        {console.log('Rendering Meals component, loading:', loading, 'meals:', meals.length, 'currentMeals:', currentMeals.length)}

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                Discover Amazing Meals
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-400">
                Explore {filteredAndSortedMeals.length} delicious dishes from talented local chefs
              </p>
            </div>
            {user && (
              <button
                onClick={refreshFavorites}
                className="btn-outline text-sm px-4 py-2 self-center sm:self-auto"
                title="Refresh favorites from server"
              >
                Refresh Favorites ({favorites.length})
              </button>
            )}
          </div>
        </div>

      {/* Search and Filter */}
      <SearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onClearFilters={clearFilters}
      />

      {/* Results Count */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 p-4 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700">
        <p className="text-neutral-600 dark:text-neutral-400 text-center sm:text-left">
          Showing <span className="font-semibold text-red-600">{currentMeals.length}</span> of <span className="font-semibold text-red-600">{filteredAndSortedMeals.length}</span> meals
        </p>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="btn-outline text-sm px-4 py-2 self-center sm:self-auto flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </button>
        )}
      </div>

      {/* Meals Grid */}
      {currentMeals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {currentMeals.map((meal) => {
            const isFavorited = favorites.some(fav => fav.mealId === meal._id);

            return (
              <Card
                key={meal._id}
                size="xl"
                image={meal.foodImage || "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop"}
                title={meal.foodName}
                overlay={
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavorite(meal);
                    }}
                    className={`p-3 rounded-full transition-all duration-300 border-2 backdrop-blur-sm ${
                      isFavorited
                        ? 'bg-red-500 text-white border-red-500 shadow-lg'
                        : 'bg-white/20 text-white border-white/50 hover:bg-white/30 hover:border-white/70 shadow-md'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                }
                meta={
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <ChefHat className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                      <span className="text-neutral-700 dark:text-neutral-300 truncate">Chef {meal.chefId}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4 text-green-600" strokeWidth={2} />
                      <span className="font-bold text-green-600 text-lg">${meal.price}</span>
                    </div>
                  </div>
                }
                actions={
                  <div className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOrder(meal);
                      }}
                      disabled={isOrderDisabled}
                      className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-neutral-400 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <span>Order Now</span>
                    </button>

                    <Link to={`/MealDetails/${meal._id}`} className="flex-1">
                      <button className="w-full bg-white hover:bg-neutral-50 text-neutral-800 font-semibold text-sm py-3 px-4 rounded-lg border border-neutral-300 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                        <span>View Details</span>
                      </button>
                    </Link>
                  </div>
                }
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700">
          <div className="text-6xl mb-4">🤷‍♂️</div>
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            No Delicious Meals Found!
          </h3>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6 max-w-md mx-auto">
            It looks like we couldn't find any meals matching your current criteria. Try broadening your search or clearing the filters.
          </p>
          <button onClick={clearFilters} className="btn-primary">
            Clear All Filters
          </button>
        </div>
      )}

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 p-4 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700">
          <div className="text-sm text-neutral-600 dark:text-neutral-400 text-center sm:text-left">
            Page <span className="font-semibold text-red-600">{currentPage}</span> of <span className="font-semibold text-red-600">{totalPages}</span>
          </div>

          <div className="flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 text-sm"
            >
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                if (pageNum > totalPages) return null;

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 rounded-lg border transition-all text-sm ${
                      currentPage === pageNum
                        ? 'bg-red-600 text-white border-red-600 shadow-md'
                        : 'bg-neutral-50 dark:bg-neutral-700 border-neutral-200 dark:border-neutral-600 hover:bg-red-50 dark:hover:bg-red-900'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 text-sm"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Order Modal */}
      {showModal && selectedMeal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-4 sm:p-6 lg:p-8 w-full max-w-md sm:max-w-lg shadow-strong border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                Confirm Your Order
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Order Summary */}
            <div className="space-y-4 mb-6">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                <img
                  src={selectedMeal.foodImage || "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=80&h=80&fit=crop"}
                  alt={selectedMeal.foodName}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {selectedMeal.foodName}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Chef {selectedMeal.chefId}
                  </p>
                  <p className="text-lg font-bold text-red-600 dark:text-red-400">
                    ${selectedMeal.price}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="input-base w-full p-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Total Price
                  </label>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    ${(selectedMeal.price * quantity).toFixed(2)}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Delivery Address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your full delivery address"
                  className="input-base w-full resize-none p-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-red-500 focus:border-red-500"
                  rows="3"
                  required
                />
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-4 mb-6">
              <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-3">Order Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Customer:</span>
                  <span className="text-neutral-900 dark:text-neutral-100">{UsersAllDataFromDB?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Email:</span>
                  <span className="text-neutral-900 dark:text-neutral-100">{UsersAllDataFromDB?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Estimated Delivery:</span>
                  <span className="text-neutral-900 dark:text-neutral-100">30-45 minutes</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={confirmOrder}
                disabled={!address.trim()}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Meals;
