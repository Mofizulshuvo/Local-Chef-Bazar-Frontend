import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home";
import Meals from "../Pages/Meals/Meals";
import Dashboard from "../Pages/Dashboard/Dashboard";
import SignUp from "../Pages/SignUp/SignUp";
import SignIn from "../Pages/SignIn/SignIn";
import PrivateRouter from "./PrivateRoutes";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard";
import ChefDashboard from "../Pages/Dashboard/ChefDashboard";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    errorElement:<Error></Error>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:"/Meals",
        element:<Meals></Meals>
      },
      {
        path:"/Dashboard",
        element:<PrivateRouter><Dashboard></Dashboard></PrivateRouter>
      },
      {
       path:"/AdminDashboard",
       element:<PrivateRouter><AdminDashboard></AdminDashboard></PrivateRouter>
      },
      {
        path:"/ChefDashboard",
        element:<PrivateRouter><ChefDashboard></ChefDashboard></PrivateRouter>
      },
      {
        path:"/SignUp",
        element:<SignUp></SignUp>
      },
      {
        path:"/SignIn",
        element:<SignIn></SignIn>
      }
    ]
    
  },
]);