import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";

function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out",
    });
  }, []);

  const features = [
    {
      title: "Find Toilets on the Map",
      description: "Locate nearby public restrooms quickly with our interactive map.",
      image: "/image/map.png",
    },
    {
      title: "Detailed Toilet Information",
      description: "View toilet details, including cleanliness, accessibility, and amenities.",
      image: "/image/rushroom.png",
    },
    {
      title: "User Reviews & Ratings",
      description: "Read reviews and ratings from the community to find the best options.",
      image: "/image/review.png",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    adaptiveHeight: true,
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="home-section">
        <div className="title-section">
          <div className="hero-content" data-aos="fade-up" data-aos-delay="500">
            <h1 className="main-title">
              <span className="rush">RUSH</span>
              <span className="room">
                ROOM<span className="dot">.</span>
              </span>
            </h1>
            <p className="subtitle">Find Your Comfort, Anywhere</p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="overview-section" data-aos="fade-up">
        <div className="overview-content">
          <h2 className="overview-title">
            About <span className="highlight">RushRoom</span>
          </h2>
          <p className="overview-text">
            RushRoom helps you locate <span className="bold">clean</span>, <span className="bold">accessible</span>,
            and <span className="bold">convenient</span> restrooms wherever you go. Say goodbye to the stress of searching
            for a restroom in unfamiliar places. With <span className="highlight">real-time data</span>, <span className="highlight">user reviews</span>,
            and a <span className="highlight">community-driven</span> approach, we make restroom discovery <span className="bold">easier than ever.</span>
          </p>
        </div>
      </section>

      {/* Features Section with Carousel */}
      <section className="features-section">
        <Slider {...settings}>
          {features.map((feature, index) => (
            <div key={index} className="feature-slide">
              <img src={feature.image} alt={feature.title} className="feature-image" />
              <div className="feature-text">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
}

export default Home;
