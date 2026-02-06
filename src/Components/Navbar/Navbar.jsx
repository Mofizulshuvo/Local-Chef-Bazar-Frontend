import React, { useContext, useState } from "react";
import Logo from "../Logo/Logo";
import { NavLink } from "react-router-dom";
import LoginButton from "../Buttons/LoginButton";
import SignUp from "../Buttons/SignUpButton";
import { AuthContext } from "../../Context/AuthContext";
import LogOutButton from "../Buttons/LogOutButton";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { ChevronDown, User, ChefHat, Shield, Heart, ShoppingBag, Star, Settings, LogOut } from "lucide-react";

const Navbar = () => {
  const { user, userRole, UsersAllDataFromDB } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const IsActive = ({ isActive }) =>
    isActive
      ? "px-4 py-2 bg-red-600 text-white rounded-lg font-medium transition-all duration-200 shadow-md"
      : "px-4 py-2 text-neutral-700 dark:text-neutral-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg font-medium transition-all duration-200";

  const getDashboardLink = () => {
    switch (userRole) {
      case 'admin': return '/AdminDashboard';
      case 'chef': return '/ChefDashboard';
      case 'user': return '/Dashboard';
      default: return '/Dashboard';
    }
  };

  const getRoleIcon = () => {
    switch (userRole) {
      case 'admin': return <Shield className="w-4 h-4" />;
      case 'chef': return <ChefHat className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink to="/" className={IsActive}>Home</NavLink>
              <NavLink to="/Meals" className={IsActive}>Meals</NavLink>

              {user && (
                <NavLink to={getDashboardLink()} className={IsActive}>
                  Dashboard
                </NavLink>
              )}
            </div>

            {/* Desktop Auth & Theme */}
            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center space-x-2 p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200"
                  >
                    <img
                      src={UsersAllDataFromDB?.profileImage || user.photoURL || "https://i.ibb.co/2kR5zq0/user.png"}
                      alt="user"
                      className="w-8 h-8 rounded-full object-cover border-2 border-primary-200 dark:border-primary-800"
                    />
                    <ChevronDown className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                  </button>

                  {/* Profile Dropdown */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-neutral-800 rounded-2xl shadow-strong border border-neutral-200 dark:border-neutral-700 py-2 z-50">
                      <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
                        <div className="flex items-center space-x-3">
                          {getRoleIcon()}
                          <div>
                            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                              {UsersAllDataFromDB?.name || user.displayName}
                            </p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 capitalize">
                              {userRole}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="py-2">
                        <NavLink
                          to={getDashboardLink()}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          <span>Dashboard</span>
                        </NavLink>

                        {userRole === 'user' && (
                          <>
                            <NavLink
                              to="/Dashboard/MyOrder"
                              className="flex items-center space-x-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                              onClick={() => setProfileDropdownOpen(false)}
                            >
                              <ShoppingBag className="w-4 h-4" />
                              <span>My Orders</span>
                            </NavLink>
                            <NavLink
                              to="/Dashboard/MyFavouriteMeal"
                              className="flex items-center space-x-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                              onClick={() => setProfileDropdownOpen(false)}
                            >
                              <Heart className="w-4 h-4" />
                              <span>Favorites</span>
                            </NavLink>
                            <NavLink
                              to="/Dashboard/MyReview"
                              className="flex items-center space-x-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                              onClick={() => setProfileDropdownOpen(false)}
                            >
                              <Star className="w-4 h-4" />
                              <span>My Reviews</span>
                            </NavLink>
                          </>
                        )}

                        {userRole === 'chef' && (
                          <>
                            <NavLink
                              to="/ChefDashboard/CreateMeal"
                              className="flex items-center space-x-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                              onClick={() => setProfileDropdownOpen(false)}
                            >
                              <ChefHat className="w-4 h-4" />
                              <span>Create Meal</span>
                            </NavLink>
                            <NavLink
                              to="/ChefDashboard/MyMeal"
                              className="flex items-center space-x-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                              onClick={() => setProfileDropdownOpen(false)}
                            >
                              <ShoppingBag className="w-4 h-4" />
                              <span>My Meals</span>
                            </NavLink>
                            <NavLink
                              to="/ChefDashboard/OrderRequest"
                              className="flex items-center space-x-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                              onClick={() => setProfileDropdownOpen(false)}
                            >
                              <Star className="w-4 h-4" />
                              <span>Order Requests</span>
                            </NavLink>
                          </>
                        )}

                        {userRole === 'admin' && (
                          <>
                            <NavLink
                              to="/AdminDashboard/ManageUser"
                              className="flex items-center space-x-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                              onClick={() => setProfileDropdownOpen(false)}
                            >
                              <User className="w-4 h-4" />
                              <span>Manage Users</span>
                            </NavLink>
                            <NavLink
                              to="/AdminDashboard/ManageRequest"
                              className="flex items-center space-x-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                              onClick={() => setProfileDropdownOpen(false)}
                            >
                              <ShoppingBag className="w-4 h-4" />
                              <span>Manage Requests</span>
                            </NavLink>
                            <NavLink
                              to="/AdminDashboard/PlatformStatistics"
                              className="flex items-center space-x-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                              onClick={() => setProfileDropdownOpen(false)}
                            >
                              <Star className="w-4 h-4" />
                              <span>Platform Stats</span>
                            </NavLink>
                          </>
                        )}
                      </div>

                      <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2">
                        <div className="px-4 py-2">
                          <LogOutButton />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <LoginButton />
                  <SignUp />
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              onClick={() => setMenuOpen(true)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-neutral-800 z-50 transform transition-transform duration-300 md:hidden shadow-2xl border-r border-neutral-200 dark:border-neutral-700
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 flex justify-between items-center border-b border-neutral-200 dark:border-neutral-700">
          <Logo size="compact" />
          <button
            className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col h-full">
          {/* Navigation Links */}
          <div className="flex flex-col gap-2 p-6">
            <NavLink
              to="/"
              className={`${IsActive} flex items-center space-x-3`}
              onClick={() => setMenuOpen(false)}
            >
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/Meals"
              className={`${IsActive} flex items-center space-x-3`}
              onClick={() => setMenuOpen(false)}
            >
              <span>Meals</span>
            </NavLink>

            {user && (
              <NavLink
                to={getDashboardLink()}
                className={`${IsActive} flex items-center space-x-3`}
                onClick={() => setMenuOpen(false)}
              >
                <span>Dashboard</span>
              </NavLink>
            )}
          </div>

          {/* User Section */}
          <div className="mt-auto p-6 border-t border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center justify-between mb-4">
              <ThemeToggle />
            </div>

            {user ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={UsersAllDataFromDB?.profileImage || user.photoURL || "https://i.ibb.co/2kR5zq0/user.png"}
                    alt="user"
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary-200 dark:border-primary-800"
                  />
                  <div>
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {UsersAllDataFromDB?.name || user.displayName}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 capitalize">
                      {userRole}
                    </p>
                  </div>
                </div>
                <LogOutButton />
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <LoginButton />
                <SignUp />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
