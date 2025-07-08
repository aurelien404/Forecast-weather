import { useState } from "react";
import CitySearch from "./components/CitySearch";
import Weather from "./components/Weather";

function App() {
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <div className="p-20">
      <CitySearch onCitySelect={setSelectedCity} />
      <Weather city={selectedCity} />
    </div>
  );
}

export default App;
