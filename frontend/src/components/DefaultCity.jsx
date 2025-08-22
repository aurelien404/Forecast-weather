// ./component/DefaultCity.jsx
export const infoCity = (i18n) => {
  const lng = i18n;
  let defaultCity;

  if (lng.includes("CH")) {
    defaultCity = {
      name: "Bern",
      latitude: 46.9481,
      longitude: 7.4474,
      country_code: "CH",
    };
  } else if (lng.startsWith("fr")) {
    defaultCity = {
      name: "Paris",
      latitude: 48.8566,
      longitude: 2.3522,
      country_code: "FR",
    };
  } else if (lng.includes("GB") || lng.startsWith("en")) {
    defaultCity = {
      name: "London",
      latitude: 51.5074,
      longitude: -0.1278,
      country_code: "GB",
    };
  } else {
    defaultCity = {
      name: "Ullapool",
      latitude: 57.8954,
      longitude: 5.1613,
      country_code: "GB",
    };
  }

  return defaultCity;
};
