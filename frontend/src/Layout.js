import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

import Titlebar from "./components/Titlebar";
import BottomNavbar from "./components/BottomNavbar";

import Home from "./pages/Home";
import Map from "./pages/Map";
import Reviews from "./pages/Reviews";
import Profile from "./pages/Profile";
import ToiletDetails from "./pages/ToiletDetails";

import "./Layout.css";

export default function Layout() {
  return (
    <div className="app-container">
      
      <div className="titlebar-wrapper">
      <Titlebar />
      </div>


      <div className="main-wrapper">
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/map" element={<Map/>} />
          <Route path="/reviews" element={<Reviews/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/toilets/:id" element={<ToiletDetails/>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </BrowserRouter>
      </div>


      <div className="footer-wrapper">
      <BottomNavbar />
      </div>

    </div>
  );
}