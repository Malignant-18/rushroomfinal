import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import RecenterMap from "../components/RecenterMap";
import "../pages/Map.css"
import 'leaflet/dist/leaflet.css';
import { Star } from "lucide-react";


export default function MapComponent({ toilets, location, userMarker, onViewDetails }) {
  return (
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
        <p>
          <Star size={15} fill = "rgb(255 244 116)"color="rgb(255 247 0)" /> Rating: {toilet.average_rating}
        </p>
        <button onClick={() => onViewDetails(toilet)}>View Details</button>
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
  );
}
