import React, { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import axios from "axios";

const CitySearch = ({ onCitySelect }) => {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [error, setError] = useState("");
  const [showList, setShowList] = useState(true);

  const handleSearch = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/cities/search", {
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
    <div>
      <input
        className="border-2 border-amber-50 py-2 px-5"
        type="text"
        placeholder="Search for a city"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="border-2 border-amber-50 py-2 px-5"
        onClick={handleSearch}
      >
        Search
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {showList && (
        <ul>
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
    </div>
  );
};

export default CitySearch;
