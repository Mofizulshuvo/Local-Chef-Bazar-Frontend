import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home";
import Meals from "../Pages/Meals/Meals";
import Dashboard from "../Pages/Dashboard/Dashboard";



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
        element:<Dashboard></Dashboard>
      }
    ]
    
  },
]);