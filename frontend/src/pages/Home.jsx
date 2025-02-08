import React from "react";
import { motion } from "framer-motion";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section - Fullscreen */}
      <section className="home-section">
        <div className="title-section">
          <motion.div
            className="hero-content"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="main-title">
              <span className="rush">RUSH</span>
              <span className="room">
                ROOM<span className="dot">.</span>
              </span>
            </h1>
            <p className="subtitle">Find Your Comfort, Anywhere</p>
          </motion.div>
        </div>
      </section>

      {/* Overview Section - Animated Scroll */}
      <motion.section
        className="overview-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="overview-content">
  <h2 className="overview-title">About <span className="highlight">RushRoom</span></h2>
  <p className="overview-text">
    RushRoom helps you locate <span className="bold">clean</span>, <span className="bold">accessible</span>, and 
    <span className="bold"> convenient</span> restrooms wherever you go.  
    Say goodbye to the stress of searching for a restroom in unfamiliar places.  
    With <span className="highlight">real-time data</span>, <span className="highlight">user reviews</span>, and a  
    <span className="highlight"> community-driven</span> approach, we make restroom discovery <span className="bold">easier than ever.</span>
  </p>
</div>

      </motion.section>
    </div>
  );
}

export default Home;
