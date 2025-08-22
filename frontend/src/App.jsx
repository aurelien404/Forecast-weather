import { Routes, Route } from "react-router-dom";
import Weather from "./pages/Weather";
import Maps from "./pages/Maps";
import ReverseCity from "./components/ReverseCity";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Weather />} />
      <Route path="/maps" element={<Maps />} />
      <Route path="/reverse" element={<ReverseCity />} />
    </Routes>
  );
}

export default App;
