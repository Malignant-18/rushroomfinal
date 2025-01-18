import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for missing marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to dynamically recenter the map
const RecenterMap = ({ location }) => {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.setView(location, 15); // Recenter map to the location with zoom level 15
    }
  }, [location, map]);

  return null;
};

export default function Map() {
  const [toilets, setToilets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedToilet, setSelectedToilet] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [location, setLocation] = useState([9.965579, 76.24275]);
  const [userMarker, setUserMarker] = useState(null); // For user's marker

  useEffect(() => {
    async function fetchToilets() {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/list");
        const data = await response.json();
        setToilets(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchToilets();
  }, []);

  const handleViewDetails = (toilet) => {
    setSelectedToilet(toilet);
    setIsSidebarOpen(true);
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = [position.coords.latitude, position.coords.longitude];
          setLocation(currentLocation);
          setUserMarker(currentLocation); // Set marker for the user's location
          alert("Location fetched successfully!");
        },
        (error) => {
          console.error("Error fetching location:", error.message);
          alert("Unable to fetch location. Please check your permissions.");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      alert("Geolocation is not supported by your browser.");
    }
  };

  const sidebarStyle = {
    position: "fixed",
    top: 0,
    left: isSidebarOpen ? "0" : "-320px",
    height: "100%",
    width: "320px",
    backgroundColor: "white",
    boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
    transition: "left 0.3s ease-in-out",
    zIndex: 1000,
    overflowY: "auto",
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999,
    display: isSidebarOpen ? "block" : "none",
  };

  const Sidebar = () => (
    <div style={sidebarStyle}>
      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", alignItems: "center" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", margin: 0 }}>{selectedToilet?.name}</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#666",
            }}
          >
            ×
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <h3 style={{ fontWeight: "bold", marginBottom: "8px" }}>Location</h3>
            <p>{selectedToilet?.location}</p>
            <p style={{ fontSize: "0.875rem", color: "#666", marginTop: "4px" }}>
              Lat: {selectedToilet?.coordinates.lat}, Lng: {selectedToilet?.coordinates.lng}
            </p>
          </div>

          <div>
            <h3 style={{ fontWeight: "bold", marginBottom: "8px" }}>Condition</h3>
            <p>{selectedToilet?.condition}</p>
          </div>

          <div>
            <h3 style={{ fontWeight: "bold", marginBottom: "8px" }}>Facilities</h3>
            {selectedToilet?.facilities ? (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {selectedToilet.facilities.baby_changing && <li style={{ marginBottom: "4px" }}>• Baby Changing Station</li>}
                {selectedToilet.facilities.wheelchair_accessible && <li style={{ marginBottom: "4px" }}>• Wheelchair Accessible</li>}
              </ul>
            ) : (
              <p>No facilities available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const mapContainerStyle = {
    maxWidth: "1050px",
    margin: "0 auto",
    height: "calc(90vh - 64px)",
    position: "relative",
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={mapContainerStyle}>
      <MapContainer center={location} zoom={15} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {toilets.map((toilet) => (
          <Marker key={toilet.id} position={[toilet.coordinates.lat, toilet.coordinates.lng]}>
            <Popup>
              <div>
                <h3 style={{ fontWeight: "bold", marginBottom: "8px" }}>{toilet.name}</h3>
                <p style={{ marginBottom: "4px" }}>{toilet.location}</p>
                <button
                  onClick={() => handleViewDetails(toilet)}
                  style={{
                    backgroundColor: "#3b82f6",
                    color: "white",
                    padding: "4px 12px",
                    borderRadius: "4px",
                    border: "none",
                    marginTop: "8px",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#2563eb")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#3b82f6")}
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {userMarker && (
          <Marker position={userMarker}>
            <Popup>Your current location</Popup>
          </Marker>
        )}

        {/* Dynamically recenter map when location changes */}
        <RecenterMap location={location} />
      </MapContainer>

      <Sidebar />

      {/* Overlay when sidebar is open */}
      <div style={overlayStyle} onClick={() => setIsSidebarOpen(false)} />

      <button onClick={handleLocation} style={{ margin: "20px", padding: "10px", cursor: "pointer" }}>
        Refresh Location
      </button>
    </div>
  );
}
