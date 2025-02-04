import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

//import Titlebar from "./components/Title";
//import BottomNavbar from "./components/BottomNavbar";

import Home from "./pages/Home";
import Map from "./pages/Map";
import Reviews from "./pages/Reviews";
import Profile from "./pages/Profile";

import "./Layout.css";
{/* <Titlebar /> */}

export default function Layout() {
  return (
    <div className="app-container">
      
      <div className="titlebar-wrapper">
        <p>this is inside Layout</p>
      </div>


      <div className="main-wrapper">
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/map" element={<Map/>} />
          <Route path="/reviews" element={<Reviews/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </BrowserRouter>
      </div>


      <div className="footer-wrapper">
      </div>

    </div>
  );
}
{/* <BottomNavbar /> */}