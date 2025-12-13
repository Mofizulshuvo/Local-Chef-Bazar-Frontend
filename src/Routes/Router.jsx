import { createBrowserRouter } from "react-router";
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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/Meals", element: <Meals /> },
      { path: "/SignUp", element: <SignUp /> },
      { path: "/SignIn", element: <SignIn /> },
    ],
  },
  {
    path: "/Dashboard",
    element: (
      <PrivateRouter>
        <Dashboard />
      </PrivateRouter>
    ),
    children: [
      {
        path: "",
        element: (
          <PrivateRouter>
            <UserMyProfile />
          </PrivateRouter>
        ),
      },
      {
        path: "MyOrder",
        element: (
          <PrivateRouter>
            <UserMyOrder />
          </PrivateRouter>
        ),
      },
      {
        path: "MyFavouriteMeal",
        element: (
          <PrivateRouter>
            <UserMyFavouriteMeal />
          </PrivateRouter>
        ),
      },
      {
        path: "MyReview",
        element: (
          <PrivateRouter>
            <UserMyReview />
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "/AdminDashboard",
    element: (
      <PrivateRouter>
        <AdminDashboard />
      </PrivateRouter>
    ),
    children: [
      {
        path: "",
        element: (
          <PrivateRouter>
            <AdminMyProfile />
          </PrivateRouter>
        ),
      },
      {
        path: "ManageUser",
        element: (
          <PrivateRouter>
            <AdminManageUser />
          </PrivateRouter>
        ),
      },
      {
        path: "ManageRequest",
        element: (
          <PrivateRouter>
            <AdminManageRequest />
          </PrivateRouter>
        ),
      },
      {
        path: "PlatformStatistics",
        element: (
          <PrivateRouter>
            <AdminPlatformStatistics />
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "/ChefDashboard",
    element: (
      <PrivateRouter>
        <ChefDashboard />
      </PrivateRouter>
    ),
    children: [
      {
        path: "",
        element: (
          <PrivateRouter>
            <ChefMyProfile />
          </PrivateRouter>
        ),
      },
      {
        path: "MyMeal",
        element: (
          <PrivateRouter>
            <ChefMyMeal />
          </PrivateRouter>
        ),
      },
      {
        path: "CreateMeal",
        element: (
          <PrivateRouter>
            <ChefCreateMeal />
          </PrivateRouter>
        ),
      },
      {
        path: "OrderRequest",
        element: (
          <PrivateRouter>
            <ChefOrderRequest />
          </PrivateRouter>
        ),
      },
    ],
  },
]);
