import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Map from "./components/Map";
import ToiletDetails from "./components/ToiletDetails";
import Layout from "./Layout"

// using createBrowserRouter from React v6.0
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Map /> },
      { path: "/toilet/:id", element: <ToiletDetails /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
