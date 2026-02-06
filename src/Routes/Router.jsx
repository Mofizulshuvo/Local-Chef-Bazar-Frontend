import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home";
import Meals from "../Pages/Meals/Meals";
import Dashboard from "../Pages/Dashboard/UserDashboard/UserDashboard";
import SignUp from "../Pages/SignUp/SignUp";
import SignIn from "../Pages/SignIn/SignIn";
import PrivateRouter from "./PrivateRoutes";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard/AdminDashboard";
import ChefDashboard from "../Pages/Dashboard/ChefDashboard/ChefDashboard";
import AdminMyProfile from "../Pages/Dashboard/AdminDashboard/MyProfile/AdminMyProfile";
import AdminManageUser from "../Pages/Dashboard/AdminDashboard/ManageUser/AdminManageUser";
import AdminManageRequest from "../Pages/Dashboard/AdminDashboard/ManageRequest/AdminManageRequest";
import AdminPlatformStatistics from "../Pages/Dashboard/AdminDashboard/PlatformStatistics/AdminPlatformStatistics";
import UserMyProfile from "../Pages/Dashboard/UserDashboard/UserMyProfile/UserMyProfile";
import UserMyOrder from "../Pages/Dashboard/UserDashboard/UserMyOrder/UserMyOrder";
import UserMyFavouriteMeal from "../Pages/Dashboard/UserDashboard/UserMyFavouriteMeal/UserMyFavouriteMeal";
import UserMyReview from "../Pages/Dashboard/UserDashboard/UserMyReview/UserMyReview";
import ChefMyProfile from "../Pages/Dashboard/ChefDashboard/MyProfile/ChefMyProfile";
import ChefMyMeal from "../Pages/Dashboard/ChefDashboard/MyMeal/ChefMyMeal";
import ChefCreateMeal from "../Pages/Dashboard/ChefDashboard/CreateMeal/ChefCreateMeal";
import ChefOrderRequest from "../Pages/Dashboard/ChefDashboard/OrderRequest/ChefOrderRequest";
import PaymentSuccess from "../Pages/PaymentSuccess/PaymentSuccess";
import MealDetails from "../Components/MealDetails/MealDetails";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/Meals", element: <Meals /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/SignUp", element: <SignUp /> },
      { path: "/SignIn", element: <SignIn /> },
      {
        path: "/MealDetails/:id",
        element:<PrivateRouter allowedRoles={["user", "chef", "admin"]}><MealDetails /></PrivateRouter> ,
      },
    ],
  },
  { path: "/paymentSuccess", element: <PaymentSuccess /> },
  {
    path: "/Dashboard",
    element: (
      <PrivateRouter allowedRoles={["user"]}>
        <Dashboard />
      </PrivateRouter>
    ),
    children: [
      { path: "", element: <UserMyProfile /> },
      { path: "MyOrder", element: <UserMyOrder /> },
      { path: "MyFavouriteMeal", element: <UserMyFavouriteMeal /> },
      { path: "MyReview", element: <UserMyReview /> },
    ],
  },
  {
    path: "/AdminDashboard",
    element: (
      <PrivateRouter allowedRoles={["admin"]}>
        <AdminDashboard />
      </PrivateRouter>
    ),
    children: [
      { path: "", element: <AdminMyProfile /> },
      { path: "ManageUser", element: <AdminManageUser /> },
      { path: "ManageRequest", element: <AdminManageRequest /> },
      { path: "PlatformStatistics", element: <AdminPlatformStatistics /> },
    ],
  },
  {
    path: "/ChefDashboard",
    element: (
      <PrivateRouter allowedRoles={["chef"]}>
        <ChefDashboard />
      </PrivateRouter>
    ),
    children: [
      { path: "", element: <ChefMyProfile /> },
      { path: "MyMeal", element: <ChefMyMeal /> },
      { path: "CreateMeal", element: <ChefCreateMeal /> },
      { path: "OrderRequest", element: <ChefOrderRequest /> },
    ],
  },
]);
