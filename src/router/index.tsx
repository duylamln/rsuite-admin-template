import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import React from "react";
import Error404 from "@/pages/authentication/404";
import DashboardPage from "@/pages/dashboard";
import Customers from "@/pages/customers";
import SignIn from "@/pages/authentication/sign-in";
import Products from "@/pages/products";
import Orders from "@/pages/orders";
import Inventory from "@/pages/inventory";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error404></Error404>,
    children: [
      {
        path: "/",
        element: <DashboardPage></DashboardPage>,
      },
      {
        path: "/customers",
        element: <Customers></Customers>,
      },
      {
        path: "/products",
        element: <Products></Products>,
      },
      {
        path: "/inventory",
        element: <Inventory></Inventory>,
      },
      {
        path: "/orders",
        element: <Orders></Orders>,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <SignIn></SignIn>,
  },
]);

export default router;
