import { useEffect, useState } from "react";
import L from "leaflet";
import Sidebar from "../components/Sidebar";
import fetchRushroom from "../backend/rushroom";
import MapComponent from "../components/MapComponent";
import "./Map.css";
import 'leaflet/dist/leaflet.css';
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

export default function MapPage() {
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
        const currentLocation = [position.coords.latitude, position.coords.longitude];
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
      {/*<p>This is inside Map</p>*/}

      <div className="map-controls">
        <button className="location-btn" onClick={handleFetchLocation}>
          Get My Location
        </button>
      </div>

      <div className="map-container">
        <MapComponent toilets={toilets} location={location} userMarker={userMarker} onViewDetails={handleViewDetails} />
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} toilet={selectedToilet} />

      {isSidebarOpen && <div className="overlay" onClick={() => setIsSidebarOpen(false)} />}
    </div>
  );
}
