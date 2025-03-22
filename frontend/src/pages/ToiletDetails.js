import "./ToiletDetails.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../backend/supabaseClient";
import { 
  ChevronLeft, 
  ChevronRight,
  Star,
  ShowerHead,
  Clock,
  MapPin,
  Users,
  Building,
  IndianRupee,
  Phone,
  Calendar,
  Accessibility,
  Baby,
  PackageOpen
} from "lucide-react";

const ToiletDetails = () => {
  const [toilet, setToilet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const numToilets = 10;



  useEffect(() => {
    const fetchToilet = async (toiletId) => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("toilets")
          .select("*")
          .eq("id", toiletId)
          .single();
  
        if (error) {
          console.error("Error fetching toilet:", error);
          return false;
        }
        setToilet(data);
        return true;
      } catch (err) {
        console.error("Error in fetchToilet:", err);
        return false;
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchToilet(id);
    }
  }, [id]);

  const FacilitiesSection = ({ facilities }) => {
    const facilitiesList = [
      { key: "wheelchair", name: "Wheelchair Accessible", icon: <Accessibility size={20} /> },
      { key: "baby_change", name: "Baby Changing", icon: <Baby size={20} /> },
      { key: "sanitarypad", name: "Sanitary Pad", icon: <PackageOpen size={20} /> },
    ];
  
    return (
      <div className="facilities-section">
        
        <div className="facilities-grid">
          {facilitiesList.map((facility, index) => (
            <div
              key={index}
              className={`facility-item ${facilities[facility.key] ? "available" : "unavailable"}`}
            >
              <span className="facility-icon">{facility.icon}</span>
              <span className="facility-name">{facility.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleCarousel = async (dir) => {
    setDirection(dir);
    const currentId = parseInt(id);
    let nextId = dir > 0 ? (currentId === numToilets ? 1 : currentId + 1) : (currentId === 1 ? numToilets : currentId - 1);
    
    navigate(`/toilets/${nextId}`);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!toilet) {
    return <div className="toilet-details">No toilet data found</div>;
  }

  return (
    <div className="carousel-container">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          className="toilet-card"
          key={toilet.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
        >
          <div className="card-grid">

          
            {/* Left Section */}
            <div className="image-section">
              <img src="/assets/toiletimage.jpeg" alt={toilet.name} className="main-image" />
              <div className="image-overlay">
                <h2 className="toilet-name">{toilet.name}</h2>

                <div className="location">
                  <MapPin className="icon" />
                  <span>{toilet.place}</span>
                </div>

                {toilet.average_rating && (
                  <div className="rating">
                    <Star className="icon filled" />
                    <span>{toilet.average_rating}</span>
                  </div>
                )}
                
              </div>
            </div>




        <div className="right-section">
		
		
			<div className={`shower-status ${toilet.shower ? 'available' : 'unavailable'}`}>
				<ShowerHead className="status-icon" />
					<span>Shower {toilet.shower ? 'Available' : 'Not Available'}</span>
			</div>

			{/* Details Grid */}
			<div className="details-grid">
				{/* Hours */}
				<div className="detail-item">
					<Clock className="detail-icon" />
					<div className="detail-content">
						<span className="label">Operating Hours</span>
						<span className="value">{toilet.opening_hours} - {toilet.closing_hours}</span>
					</div>
				</div>

				{/* Price */}
				<div className="detail-item">
					<IndianRupee className="detail-icon" />
					<div className="detail-content">
						<span className="label">Price</span>
						<span className={`value ${toilet.free ? 'free' : ''}`}>
						{toilet.free ? 'Free' : `Rs. ${toilet.price}`}</span>
					</div>
				</div>

				<div className="detail-item">
				<Phone className="detail-icon" />
				<div className="detail-content">
					<span className="label">Caretaker Contact</span>
					<span className="value">{toilet.caretaker_no}</span>
				</div>
				</div>

				<div className="detail-item">
					<Calendar className="detail-icon" />
					<div className="detail-content">
						<span className="label">Last Maintained</span>
						<span className="value">
						maintansedd</span>
					</div>
				</div>

				{/* Categories */}
				<div className="detail-item categories">
					<div className="badges">
					<div className="badge">
						<Users className="badge-icon" />
						<span>{toilet.gender_availability.replace('_', ' ')}</span>
					</div>
					<div className="badge">
						<Building className="badge-icon" />
						<span>{toilet.category}</span>
					</div>
					</div>
				</div>
			</div>

			<FacilitiesSection  facilities={toilet.facilities} />
		</div>
    </div>
        </motion.div>
      </AnimatePresence>
    <button className="back-button" onClick={() => navigate("/map")}>Go Back</button>
    <button className="reviews-button" onClick={() => 
      navigate(`/reviews/${id}`,{state:{ name: toilet.name, place: toilet.place }})}>
    Reviews</button>
    <button 
        className="carousel-button prev"
        onClick={() => handleCarousel(-1)}
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        className="carousel-button next"
        onClick={() => handleCarousel(1)}
      >
        <ChevronRight size={24} />
      </button>

      
    </div>
  );
};

export default ToiletDetails;
