import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Navbar />
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px" }}>
        <Outlet /> 
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}
