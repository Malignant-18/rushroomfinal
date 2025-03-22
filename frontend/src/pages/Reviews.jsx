import React, { useEffect, useState } from "react";
import { supabase } from "../backend/supabaseClient";
import { useParams, useLocation } from "react-router-dom";
import "./Reviews.css";
import { Separator } from "@radix-ui/react-separator";
import { Plus ,Quote ,Star , ChevronDown , ChevronUp} from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";
import AddReview from "../components/AddReview"


function Reviews() {
    const { id } = useParams();
    const { name, place } = useLocation().state;
    const [reviews, setReviews] = useState([]);
    
    const [modalopen , setModalOpen]  = useState(false)

    const [expandedReviews, setExpandedReviews] = useState({}); 

    useEffect(() => {
        const fetchReviews = async () => {
            const { data, error } = await supabase
                .from("reviews") 
                .select("*") 
                .eq("toilet_id", id);

            if (error) {
                console.error("Error fetching reviews:", error);
            } else {
                setReviews(data);
            }
        };

        fetchReviews();
    }, [id]); 

    const formatReviewTime = (dateString) => {
        return formatDistanceToNowStrict(new Date(dateString), { addSuffix: true });
      };

    const handleAdd = () =>{
        setModalOpen(true);  
    }
    const handleClose = () =>{
        setModalOpen(false);  
    } 

    const toggleExpand = (reviewId) => {
        setExpandedReviews((prev) => ({
            ...prev,
            [reviewId]: !prev[reviewId],
        }));
    };

    return (
        <div className="container">
            <div className="review-page">
                <div className="review-grid">
                    <div className="review-left">
                        <div className="title">
                            <p>Review for</p>
                            <span className="titlehigh">{name},</span>
                            <span className="titlehigh place"> {place}</span>
                        </div>
                        <Separator className="SeparatorRoot" style={{ margin: "20px 24px" }} />
                        <button className="add-review-button" onClick={handleAdd}
                        ><Plus size={24}/><span>Add Review</span></button>
                    </div>

                    <div className="review-right">
                        <div className="review-list">
                            {reviews.length > 0 ? (
                                reviews.map((rev) => (
                                    <div key={rev.id} className="review-card">
                                        {/* Review Content */}
                                        <p className="review-card-text">
                                            <Quote size={24} style={{ transform: "scaleX(-1)" }} />
                                            {rev.review}
                                        </p>
                                        
                                        {/* Toggle Button */}
                                        <button className="toggle" onClick={() => toggleExpand(rev.id)}>
                                            {expandedReviews[rev.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </button>

                                        <p className="flex items-center">
                                            <Star size={20} className="text-yellow-500" />
                                            {rev.rating}
                                        </p>

                                        {/* Review Meta (Name & Date) */}
                                        <p className="review-card-info">
                                            <strong>{rev.user_name}</strong>&nbsp;&nbsp;·&nbsp;&nbsp;{formatReviewTime(rev.created_at)}
                                        </p>
                                        {/* Expandable Section */}
                                        {expandedReviews[rev.id] && (
                                            <div className="review-drop">
                                                <p><strong>Cleanliness:</strong> {rev.cleanliness}</p>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>No reviews yet.</p>
                            )}
                        </div>
                    </div>
                </div>
                {
                    setModalOpen && (
                        <AddReview  id={id} open={modalopen} onClose ={handleClose} />
                    )
                }
            </div>
        </div>
    );
}

export default Reviews;
