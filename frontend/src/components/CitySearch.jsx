import React, { useState } from "react";
import axios from "axios";

const CitySearch = ({ onCitySelect }) => {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [error, setError] = useState("");
  const [showList, setShowList] = useState(false);

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        "http://192.168.1.177:8000/api/cities/search",
        {
          params: { q: query },
        }
      );
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
          className={`bg-zzlink border-zzlink absolute bottom-20 max-h-screen overflow-scroll left-5 right-5 border-2 p-5 z-10`}
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
        <button className="w-3/7 ml-auto" onClick={handleSearch}>
          Search
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CitySearch;
