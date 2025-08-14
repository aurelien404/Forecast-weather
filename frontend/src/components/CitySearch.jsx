import React, { useState } from "react";
import api from "../api";

const CitySearch = ({ onCitySelect, onClick }) => {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [error, setError] = useState("");
  const [showList, setShowList] = useState(false);

  const handleSearch = async () => {
    try {
      const res = await api.get("/cities/search", {
        params: { q: query },
      });
      setCities(res.data.cities);
      setError("");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
          err.response?.statusText ||
          err.message ||
          "Something went wrong"
      );
    }
    setShowList(true);
  };

  return (
    <div className="w-full font-txtBold">
      {showList && (
        <ul
          className={`bg-zzlink border-zzlink absolute top-20 md:w-5/12 md:mx-auto max-h-screen overflow-scroll left-2 right-2 border-2 p-5 z-19`}
        >
          {cities.map((city) => (
            <li key={`${city.name}-${city.latitude}-${city.longitude}`}>
              <a
                className="cursor-pointer"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onCitySelect(city);
                  setShowList(false);
                  setQuery("");
                  onClick(false);
                }}
              >
                {city.name} ({city.country_code})
              </a>
            </li>
          ))}
        </ul>
      )}
      <div className="w-full flex flex-row gap-x-2">
        <input
          className="w-full"
          type="text"
          placeholder="Search for a city"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn w-3/7 ml-auto" onClick={handleSearch}>
          Search
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CitySearch;
