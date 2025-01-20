import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="app-container">
      <div className="navbar-wrapper">
        <Navbar />
      </div>
      <div className="main-wrapper">
        <div className="content-container">
          <Outlet />
        </div>
      </div>
      <div className="footer-wrapper">
        <Footer />
      </div>
    </div>
  );
}