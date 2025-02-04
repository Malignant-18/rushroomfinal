import { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import Sidebar from "../components/Sidebar";
import RecenterMap from "../components/RecenterMap";
import Filter from "../components/Filter";
import fetchRushroom from "../backend/rushroom";
import "./Map.css";

// Fix Leaflet marker icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function Map() {
  const [toilets, setToilets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedToilet, setSelectedToilet] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [location, setLocation] = useState([9.965579, 76.24275]);
  const [userMarker, setUserMarker] = useState(null);

  useEffect(() => {
    async function fetchToilets() {
      try {
        const data = await fetchRushroom();
        setToilets(data);
      } catch (error) {
        console.error("Error fetching toilets:", error.message);
        alert("There was an error fetching the toilets. Please try again.");
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
        const currentLocation = [position.coords.latitude,position.coords.longitude,];
        setLocation(currentLocation);
        setUserMarker(currentLocation);
      },
      (error) => {
        console.error("Error fetching location:", error.message);
        alert("Unable to fetch location. Please check your permissions.");
      }
    );
  };

  if (loading) {
      return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="map-page">
      <p>this is inside Map</p>
      <div className="map-controls">
        <button className="location-btn" onClick={handleFetchLocation}>Get My Location</button>
      </div>

      <div className="map-container">
        <MapContainer center={location} zoom={15} className="leaflet-map">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {toilets.map((toilet) =>
            toilet.latitude && toilet.longitude ? (
              <Marker key={toilet.id} position={[toilet.latitude, toilet.longitude]}>
                <Popup>
                  <div className="popup-content">
                    <h3>{toilet.name}</h3>
                    <p>{toilet.place}</p>
                    <button onClick={() => handleViewDetails(toilet)}>View Details</button>
                  </div>
                </Popup>
              </Marker>
            ) : null
          )}

          {userMarker && (
            <Marker position={userMarker}>
              <Popup>Your current location</Popup>
            </Marker>
          )}

          <RecenterMap location={location} />
        </MapContainer>
      </div>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        toilet={selectedToilet}
      />

      {isSidebarOpen && <div className="overlay" onClick={() => setIsSidebarOpen(false)} />}
    </div>
  );
}

//<Filter />