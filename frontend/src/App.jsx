import { useState } from "react";
import CitySearch from "./components/CitySearch";
import Weather from "./components/Weather";
import { useGeolocated } from "react-geolocated";

function App() {
  const [selectedCity, setSelectedCity] = useState(null);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: { enableHighAccuracy: false },
      userDecisionTimeout: 5000,
    });

  return (
    <div className="p-5">
      <p className="text-gray-400 text-xs">
        *Countries available: Switzerland, France, and the United Kingdom
      </p>
      <CitySearch onCitySelect={setSelectedCity} />
      <Weather
        city={selectedCity}
        coords={
          isGeolocationAvailable && isGeolocationEnabled && coords
            ? coords
            : null
        }
      />
    </div>
  );
}

export default App;
