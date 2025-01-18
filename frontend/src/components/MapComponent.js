import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function MapComponent() {
  const position = [9.505, 76.09]; // Default center position: London

  return (
    <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100%" }}>
<TileLayer
  attribution='&copy; <a href="https://www.thunderforest.com/">Thunderforest</a>'
  url="https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=ef6d4e93e166485fa4a2c4de63db606a"
/>



      <Marker position={position}>
        <Popup>
          A pretty popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapComponent;
