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
    <div className="flex flex-col gap-2 p-5 w-full h-screen overflow-hidden">
      <div className="h-9/10">
        <Weather
          city={selectedCity}
          coords={
            isGeolocationAvailable && isGeolocationEnabled && coords
              ? coords
              : null
          }
        />
      </div>
      <div className="absolute left-0 bottom-0 w-full flex flex-col justify-between p-5">
        <CitySearch onCitySelect={setSelectedCity} />
        <p className="text-[8px]">
          *Countries available: Switzerland, France, and the United Kingdom
        </p>
      </div>
    </div>
  );
}

export default App;
