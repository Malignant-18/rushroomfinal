import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Sidebar from "./Sidebar";
import RecenterMap from "./RecenterMap";
import Filter from "./Filter";

// Fix Leaflet marker icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Inline CSS for the Map Component
const mapStyles = `
  .map-container {
    position: relative;
    height: calc(90vh - 64px);
    width: 100%;
  }

  .leaflet-map {
    height: 100%;
    width: 100%;
  }


  .refresh-location-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    z-index: 1000;
  }

  .refresh-location-btn:hover {
    background-color: #0056b3;
  }

  .view-details-btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
  }

  .view-details-btn:hover {
    background-color: #0056b3;
  }
`;

export default function Map() {
  const [toilets, setToilets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedToilet, setSelectedToilet] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [location, setLocation] = useState([9.965579, 76.24275]);
  const [userMarker, setUserMarker] = useState(null);

  // Inject CSS into the document
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = mapStyles;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Fetch toilets on mount
  useEffect(() => {
    async function fetchToilets() {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/list");
        if (!response.ok) throw new Error("Failed to fetch toilets.");
        const data = await response.json();
        setToilets(data);
      } catch (error) {
        console.error("Error fetching toilets:", error.message);
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

  const handleFetchLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLocation = [position.coords.latitude, position.coords.longitude];
        setLocation(currentLocation);
        setUserMarker(currentLocation);
        alert("Location fetched successfully!");
      },
      (error) => {
        console.error("Error fetching location:", error.message);
        alert("Unable to fetch location. Please check your permissions.");
      }
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="map-container">
      <MapContainer center={location} zoom={15} className="leaflet-map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {toilets.map((toilet) => (
          <Marker key={toilet.id} position={[toilet.coordinates.lat, toilet.coordinates.lng]}>
            <Popup>
              <h3>{toilet.name}</h3>
              <p>{toilet.location}</p>
              <button className="view-details-btn" onClick={() => handleViewDetails(toilet)}>
                View Details
              </button>
            </Popup>
          </Marker>
        ))}

        {userMarker && (
          <Marker position={userMarker}>
            <Popup>Your current location</Popup>
          </Marker>
        )}

        <RecenterMap location={location} />
      </MapContainer>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        toilet={selectedToilet}
      />
      <Filter />


      <button className="refresh-location-btn" onClick={handleFetchLocation}>
        Refresh Location
      </button>
    </div>
  );
}
