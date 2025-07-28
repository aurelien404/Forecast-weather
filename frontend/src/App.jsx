import { useState } from "react";
import CitySearch from "./components/CitySearch";
import Weather from "./components/Weather";
import { useGeolocated } from "react-geolocated";
import { MdCopyright } from "react-icons/md";

function App() {
  const [selectedCity, setSelectedCity] = useState(null);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: { enableHighAccuracy: false },
      userDecisionTimeout: 5000,
    });

  return (
    <>
      <div className="w-auto h-auto  absolute right-5 bottom-1 font-pixel p-0 m-0">
        <a
          href="https://aurelienj.ch"
          className="flex flex-row items-center gap-1 text-zzlink"
        >
          <MdCopyright />
          www.aurelienj.ch
        </a>
      </div>
      <div className="flex flex-col gap-2 p-5 w-full md:w-5/12 mx-auto h-screen overflow-hidden">
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
        <div className="absolute left-0 md:left-auto bottom-0 w-full md:w-5/12 flex flex-col justify-between p-5">
          <CitySearch onCitySelect={setSelectedCity} />
          <p className="text-[8px]">
            *Countries available: Switzerland, France, and the United Kingdom
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
