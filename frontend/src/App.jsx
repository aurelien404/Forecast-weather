import { useState } from "react";
import CitySearch from "./components/CitySearch";
import Weather from "./components/Weather";
import { useGeolocated } from "react-geolocated";
import { MdCopyright } from "react-icons/md";
import { CiLocationArrow1 } from "react-icons/ci";

function App() {
  const [selectedCity, setSelectedCity] = useState(null);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: { enableHighAccuracy: false },
      userDecisionTimeout: 5000,
    });

  return (
    <>
      <div className="fixed top-0 right-0 mx-auto w-full md:w-5/12 hidden flex-col justify-between p-5 bg-zzcontrast">
        <p className="text-[8px]">
          *Countries available: Switzerland, France, and the United Kingdom
        </p>
        <CitySearch onCitySelect={setSelectedCity} />
      </div>

      <div className="flex flex-col gap-2 p-5 h-auto w-full md:w-5/12 mx-auto overflow-hidden ">
        <div className="font-pixel text-sm">
          <a
            href="https://aurelienj.ch"
            className="flex flex-row items-center gap-1 text-zzlink"
          >
            <MdCopyright />
            www.aurelienj.ch
          </a>
        </div>
        <div>
          <Weather
            city={selectedCity}
            coords={
              isGeolocationAvailable && isGeolocationEnabled && coords
                ? coords
                : null
            }
          />
        </div>
      </div>
    </>
  );
}

export default App;
