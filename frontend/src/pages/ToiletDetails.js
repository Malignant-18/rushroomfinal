import "./ToiletDetails.css"

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../backend/supabaseClient";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ToiletDetails = () => {
  const [toilet, setToilet] = useState(null);
  const [direction, setDirection] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const numToilets = 10;

  const fetchToilet = async (toiletId) => {
    const { data, error } = await supabase
      .from("toilets")
      .select("*")
      .eq("id", toiletId)
      .single();

    if (!error) setToilet(data);
    return !error;
  };

  useEffect(() => {
    fetchToilet(id);
  }, [id]);

  const handleCarousel = (dir) => {
    setDirection(dir);
    const currentId = parseInt(id);
    let nextId;
    
    if (dir > 0) {
      nextId = currentId === numToilets ? 1 : currentId + 1;
    } else {
      nextId = currentId === 1 ? numToilets : currentId - 1;
    }
    
    navigate(`/toilet/${nextId}`);
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

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  if (!toilet) return <div className="toilet-details">Loading...</div>;

  const detailItems = [
    { label: "Location", value: toilet.place },
    { label: "Category", value: toilet.category },
    { label: "Price", value: toilet.free ? "Free" : `Rs. ${toilet.price}` },
    { label: "Timings", value: `${toilet.opening_hours} - ${toilet.closing_hours}` },
    { label: "Shower", value: toilet.shower ? "Available" : "Not Available" },
    { label: "Contact", value: toilet.contact_caretaker ?? "Not available" },
    { label: "Last Maintenance", value: toilet.last_maintenance ?? "Unknown" }
  ];

  return (
    <div className="carousel-container">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          className="toilet-details"
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
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              handleCarousel(1);
            } else if (swipe > swipeConfidenceThreshold) {
              handleCarousel(-1);
            }
          }}
        >
          <p>{toilet.name}</p>
          
          <div className="availability-tag">
            {toilet.gender_availability}
          </div>
          
          {toilet.average_rating && (
            <div className="rating">
              {toilet.average_rating}
            </div>
          )}

          {toilet.image && (
            <motion.img 
              className="toilet-image" 
              src={toilet.image} 
              alt={toilet.name}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          )}

          {detailItems.map((item, index) => (
            <motion.div 
              className="detail-item" 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="detail-label">{item.label}:</span>
              <span className="detail-value">{item.value}</span>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

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

      <motion.button 
        className="back-button"
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Go Back
      </motion.button>
    </div>
  );
};

export default ToiletDetails;