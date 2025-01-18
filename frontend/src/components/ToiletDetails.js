import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ToiletDetails() {
  const [toilet, setToilet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchToiletDetails() {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/list`);
        if (!response.ok) {
          throw new Error("Toilet not found");
        }
        const data = await response.json();
        const selectedToilet = data.find((t) => t.id === parseInt(id));
        if (!selectedToilet) {
          throw new Error("Toilet not found");
        }
        setToilet(selectedToilet);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchToiletDetails();
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <div style={{ fontSize: "1.25rem" }}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", minHeight: "50vh", paddingTop: "2.5rem" }}>
        <div style={{ fontSize: "1.25rem", color: "#dc2626" }}>{error}</div>
        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#3b82f6",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          Back to Map
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "40rem", margin: "0 auto", backgroundColor: "white", borderRadius: "0.5rem", boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)", padding: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.875rem", fontWeight: "700", color: "#1f2937" }}>{toilet.name}</h1>
        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#f3f4f6",
            color: "#4b5563",
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          Back to Map
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ backgroundColor: "#f9fafb", padding: "1rem", borderRadius: "0.375rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem", color: "#374151" }}>Location Details</h2>
          <p style={{ color: "#4b5563" }}>{toilet.location}</p>
          <p style={{ color: "#4b5563", marginTop: "0.25rem" }}>
            Coordinates: {toilet.coordinates.lat}, {toilet.coordinates.lng}
          </p>
        </div>

        <div style={{ backgroundColor: "#f9fafb", padding: "1rem", borderRadius: "0.375rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem", color: "#374151" }}>Status</h2>
          <p style={{ color: "#4b5563" }}>
            <span style={{ fontWeight: "500" }}>Condition:</span> {toilet.condition}
          </p>
        </div>

        <div style={{ backgroundColor: "#f9fafb", padding: "1rem", borderRadius: "0.375rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem", color: "#374151" }}>Facilities</h2>
          {toilet.facilities ? (
            <ul style={{ listStyle: "none", padding: "0", color: "#4b5563" }}>
              {toilet.facilities.baby_changing && <li>✓ Baby Changing Station</li>}
              {toilet.facilities.wheelchair_accessible && <li>✓ Wheelchair Accessible</li>}
              {!toilet.facilities.baby_changing && !toilet.facilities.wheelchair_accessible && <li>No special facilities available</li>}
            </ul>
          ) : (
            <p style={{ color: "#4b5563" }}>No facilities information available</p>
          )}
        </div>
      </div>
    </div>
  );
}
