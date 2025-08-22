import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { infoCity } from "../components/DefaultCity";
import { useTranslation } from "react-i18next";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function LocationMarker({ onSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng); // e.latlng contains { lat, lng }
      onSelect(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        Latitude: {position.lat.toFixed(1)} <br />
        Longitude: {position.lng.toFixed(1)}
      </Popup>
    </Marker>
  );
}

export default function MapsView() {
  const { i18n } = useTranslation();

  const defaultCity = infoCity(i18n.language);
  const lat = defaultCity.latitude;
  const long = defaultCity.longitude;
  const navigate = useNavigate();

  const handleSelect = (position) => {
    navigate("/", { state: { position } }); // Navigate with position
  };

  return (
    <MapContainer center={[lat, long]} zoom={10} className="w-screen h-screen">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker onSelect={handleSelect} />
    </MapContainer>
  );
}
