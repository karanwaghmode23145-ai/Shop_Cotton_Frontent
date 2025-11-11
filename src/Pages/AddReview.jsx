import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ArrowLeft } from "lucide-react";

const AddReview = () => {
  const { id } = useParams(); // product ID
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login to submit a review.");
      navigate("/login");
      return;
    }

    if (!rating || !comment.trim()) {
      alert("Please select a rating and write a comment.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`http://localhost:5001/api/reviews/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, comment }),
      });
      const data = await res.json();
      if (data.success) {
        alert("✅ Review added successfully!");
        navigate(`/product/${id}`);
      } else {
        alert(`⚠️ ${data.message || "Failed to add review."}`);
      }
    } catch (error) {
      console.error("❌ Error submitting review:", error);
      alert("Server error while adding review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "600px" }}>
      <button
        className="btn btn-outline-dark mb-4 d-flex align-items-center gap-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={18} /> Go Back
      </button>

      <h2 className="fw-bold text-center mb-4">Write a Review</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 text-center">
          <label className="form-label fw-semibold">Rating:</label>
          <div className="d-flex justify-content-center gap-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={28}
                color={star <= rating ? "#ffc107" : "#ccc"}
                style={{ cursor: "pointer" }}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Comment:</label>
          <textarea
            className="form-control"
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn btn-warning w-100 fw-bold py-2"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default AddReview;
