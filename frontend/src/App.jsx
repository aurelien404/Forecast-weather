import { useState } from "react";

import CitySearch from "./components/CitySearch";
import Weather from "./components/Weather";

import { useGeolocated } from "react-geolocated";
import { MdCopyright } from "react-icons/md";
import { RiMenu4Fill } from "react-icons/ri";

function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [menu, setMenu] = useState(false);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: { enableHighAccuracy: false },
      userDecisionTimeout: 5000,
    });

  const handleMenu = () => {
    setMenu((prev) => !prev);
  };
  return (
    <>
      <div className="fixed top-0 left-0 -z-1 bg_box w-screen min-h-screen inset-0"></div>

      <div
        className={`flex flex-col gap-2 p-5 h-auto w-full md:w-5/12 mx-auto overflow-hidden transition-all duration-150 ${
          menu ? "pt-20" : "pt-auto"
        } `}
      >
        <div
          className={`absolute left-0 z-10  w-screen h-50 flex flex-col px-4 py-5 bg-linear-to-b from-[#000000ca] to-[#00000000] transition-top duration-150 ${
            menu ? "flex top-0" : "-top-100"
          }`}
        >
          <div className="w-full md:w-5/12 mx-auto flex flex-col justify-between">
            <p className="text-[8px]">
              *Countries available: Switzerland, France, and the United Kingdom
            </p>
            <CitySearch onCitySelect={setSelectedCity} onClick={handleMenu} />
            <p className="mt-3 cursor-pointer" onClick={handleMenu}>
              Close
            </p>
          </div>
        </div>
        <div>
          <button
            className={`${menu ? "opacity-0" : "opacity-100"}`}
            onClick={handleMenu}
          >
            <RiMenu4Fill size={30} />
          </button>
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
            className=" flex flex-row items-center gap-1 py-5 text-zzlink"
          >
            <MdCopyright />
            www.aurelienj.ch
          </a>
          <p>api: open-meteo.com & geonames.org</p>
          <p>w8ther.com V1.3</p>
        </div>
      </div>
    </>
  );
}

export default App;
