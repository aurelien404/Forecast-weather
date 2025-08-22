import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api";

export default function ReverseCity() {
  const location = useLocation();
  const [city, setCity] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const position = location.state?.position;

  useEffect(() => {
    const fetchCity = async () => {
      if (!position) {
        setError("No coordinates provided.");
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/city/reverse", {
          params: {
            lat: position.lat,
            lng: position.lng,
          },
        });
        setCity(res.data.city);
      } catch (err) {
        console.error("Reverse lookup failed:", err);
        setError(
          err.response?.data?.error ||
            err.response?.statusText ||
            err.message ||
            "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCity();
  }, [position]);

  if (loading) return <p>Loading city info...</p>;
  if (error) return <p>Error: {error}</p>;

  return city ? (
    <div className="p-4">
      <h2 className="text-xl font-bold">Nearest City</h2>
      <p>
        <strong>Name:</strong> {city.name}
      </p>
      <p>
        <strong>Country:</strong> {city.country_code}
      </p>
      <p>
        <strong>Latitude:</strong> {city.latitude}
      </p>
      <p>
        <strong>Longitude:</strong> {city.longitude}
      </p>
    </div>
  ) : (
    <p>No city found near this location.</p>
  );
}
