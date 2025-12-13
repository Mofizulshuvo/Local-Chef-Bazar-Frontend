import React, { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../../Context/AuthContext";
import Logo from "../../../Components/Logo/Logo";
import LogOutButton from "../../../Components/Buttons/LogOutButton";
import { FiUser, FiShoppingCart, FiHeart, FiStar } from "react-icons/fi";

const UserDashboardSideBar = () => {
  const { UsersAllDataFromDB } = useContext(AuthContext);
  console.log(UsersAllDataFromDB);

  const activeClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-6 py-3 rounded-lg bg-yellow-500 text-white font-semibold transition-all duration-200"
      : "flex items-center gap-3 px-6 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200";

  return (
    <aside className="w-72 bg-white shadow-lg h-screen flex flex-col justify-between">
      <div>
        <div className="p-6 flex flex-col items-center border-b">
          <Logo />
          <div className="mt-4 flex flex-col items-center">
            <img
              src={UsersAllDataFromDB?.profileImage || "https://via.placeholder.com/80"}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
            />
            <h2 className="mt-2 text-xl font-semibold text-gray-700">
              {UsersAllDataFromDB?.name }
            </h2>
          </div>
        </div>

        <nav className="mt-6 flex flex-col gap-2 px-2">
          <NavLink to="" end className={activeClass}>
            <FiUser size={20} /> Profile
          </NavLink>

          <NavLink to="MyOrder" className={activeClass}>
            <FiShoppingCart size={20} /> My Orders
          </NavLink>

          <NavLink to="MyFavouriteMeal" className={activeClass}>
            <FiHeart size={20} /> Favourite Meals
          </NavLink>

          <NavLink to="MyReview" className={activeClass}>
            <FiStar size={20} /> My Reviews
          </NavLink>
        </nav>
      </div>

      <div className="p-6 border-t">
        <LogOutButton className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-all duration-200" />
      </div>
    </aside>
  );
};

export default UserDashboardSideBar;
