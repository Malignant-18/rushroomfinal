import { useMap } from "react-leaflet";
import { useEffect } from "react";

export default function RecenterMap({ location }) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.setView(location, 15);
    }
  }, [location, map]);

  return null;
}
