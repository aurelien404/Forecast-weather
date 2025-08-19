import { useState } from "react";
import { useTranslation } from "react-i18next";

import CitySearch from "./components/CitySearch";
import Weather from "./components/Weather";

import { useGeolocated } from "react-geolocated";
import { MdCopyright } from "react-icons/md";
import { RiMenu4Fill } from "react-icons/ri";

function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [menu, setMenu] = useState(false);

  const { t, i18n } = useTranslation();

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
          menu ? "pt-37" : "pt-auto"
        } `}
      >
        <div
          className={`absolute left-0 z-10  w-screen h-50 flex flex-col px-4 py-5 bg-linear-to-b from-[#000000ca] to-[#00000000] transition-top duration-150 ${
            menu ? "flex top-0" : "-top-100"
          }`}
        >
          <div className="w-full md:w-5/12 mx-auto flex flex-col justify-between">
            <p className="text-[8px]">{t("country")}</p>
            <CitySearch onCitySelect={setSelectedCity} onClick={handleMenu} />
            <div className="w-full mt-3 flex flex-row gap-5">
              <p className="cursor-pointer font-bold" onClick={handleMenu}>
                {t("closed")}
              </p>
              <p
                className={`cursor-pointer text-zzlink ${
                  i18n.language === "fr" ? "hidden" : ""
                } `}
                onClick={() => i18n.changeLanguage("fr")}
              >
                Francais
              </p>
              <p
                className={`cursor-pointer text-zzlink ${
                  i18n.language === "en" ? "hidden" : ""
                } `}
                onClick={() => i18n.changeLanguage("en")}
              >
                English
              </p>
            </div>
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
            i18n={i18n.language}
            city={selectedCity}
            coords={
              isGeolocationAvailable && isGeolocationEnabled && coords
                ? coords
                : null
            }
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center font-pixel text-xs md:text-sm py-5">
          <p>api: open-meteo.com & geonames.org</p>
          <a
            href=" https://github.com/aurelien404/Forecast-weather/blob/main/Docs/LICENSE.md"
            className=" flex flex-row items-center gap-1 text-zzlink"
          >
            Copyright <MdCopyright /> 2025 aurelien404
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
