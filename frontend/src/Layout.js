import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./Layout.css";


export default function Layout() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="content-wrapper">
        <Outlet />
      </main>
      <Footer />
    </div>
  );

}
