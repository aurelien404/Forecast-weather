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
      <div className="fixed top-0 right-0 mx-auto w-full md:w-5/12 hidden flex-col justify-between bg-zzcontrast">
        <p className="text-[8px]">
          *Countries available: Switzerland, France, and the United Kingdom
        </p>
        <CitySearch onCitySelect={setSelectedCity} />
      </div>

      <div className="fixed top-0 left-0 -z-1 bg_box w-screen h-screen"></div>
      <div className="flex flex-col gap-2 p-5 h-auto w-full md:w-5/12 mx-auto overflow-hidden ">
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
        <div className="w-full flex flex-col justify-center items-center font-pixel text-sm py-5">
          <a
            href="https://aurelienj.ch"
            className=" flex flex-row items-center gap-1 text-zzlink"
          >
            <MdCopyright />
            www.aurelienj.ch
          </a>
          <p>open-weather V1.3</p>
        </div>
      </div>
    </>
  );
}

export default App;
