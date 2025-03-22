    import React, { useState } from "react";
    import { X, ThumbsUp, ThumbsDown } from "lucide-react";
    import "./AddReview.css";
    
    const issueOptions = [
    "None",
    "Bad odor",
    "No soap",
    "Dim lighting",
    "No water",
    "No cleaning",
    "No toilet paper",
    "Dirty",
    "Broken door",
    ].sort();

    const cleanlinessOptions = ["Pristine", "Clean", "Acceptable", "Unsanitary", "Avoid"];

    const AddReview = ({ id, open, onClose }) => {
    const [name, setName] = useState("");
    const [rating, setRating] = useState(0);
    const [cleanliness, setCleanliness] = useState("Clean");
    const [issues, setIssues] = useState([]);
    const [review, setReview] = useState("");
    const [liked, setLiked] = useState(null);

    const handleIssueChange = (issue) => {
        if (issue === "None") {
        setIssues(["None"]);
        return;
        }

        setIssues(prev => {
        // If selecting an issue and "None" was selected, remove "None"
        if (prev.includes("None")) {
            return [issue];
        }
        
        // Toggle the selected issue
        const newIssues = prev.includes(issue) 
            ? prev.filter(i => i !== issue)
            : [...prev, issue];
            
        // If no issues are selected, default to "None"
        return newIssues.length === 0 ? ["None"] : newIssues;
        });
    };

    if (!open) return null;

    return (
        <div className="modal-overlay">
        <div className="modal-content">
            <div className="modal-header">
            <h2>Add your review</h2>
            <button className="close-button" onClick={onClose}>
                <X size={36} />
            </button>
            </div>

            <form className="review-form">
            <div className="input-start">
            <div className="input-group">
                <label>Name</label>
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="text-input"
                />
            </div>

            <div className="input-group">
                <label>Rating</label>
                <div className="rating-group">
                {[1, 2, 3, 4, 5].map((value) => (
                    <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    className={`rating-button ${rating === value ? 'active' : ''}`}
                    >
                    {value}
                    </button>
                ))}
                </div>
            </div>
            <div className="input-group">
                <label>Cleanliness</label>
                <select
                value={cleanliness}
                onChange={(e) => setCleanliness(e.target.value)}
                className="text-input"
                >
                {cleanlinessOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
                </select>
            </div>
            </div>
            <div className="input-group">
                <label>Issues Encountered</label>
                <div className="issues-grid">
                {issueOptions.map((issue) => (
                    <button
                    key={issue}
                    type="button"
                    onClick={() => handleIssueChange(issue)}
                    className={`issue-button ${issues.includes(issue) ? 'active' : ''} ${issue === 'None' ? 'none-issue' : ''}`}
                    >
                    {issue}
                    </button>
                ))}
                </div>
            </div>

            <div className="input-group">
                <label>Additional Comments</label>
                <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write your review..."
                className="review-textarea"
                />
            </div>

            <div className="action-buttons">
                <button type="submit" className="submit-button">
                Submit Review
                </button>
            </div>
            </form>
        </div>
        </div>
    );
    };

    export default AddReview;