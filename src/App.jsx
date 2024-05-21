import { useState, useEffect } from "react";
import "./App.css";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const URL1 = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Hamburg&aqi=yes`;
const URL2 = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=Hamburg&aqi=yes`;

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(URL1 && URL2);
        const data = await response1.json();
        setData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const LOCATION = `Location: ${data?.location?.name}`;
  const CONDITION = `Condition: ${data?.current?.condition?.text}`;
  const SUNRISE = `Sunrise: ${data?.forecast?.forecastday?.map(
    (item) => item?.astro?.sunrise
  )}`;

  const SUNSET = `Sunset: ${data?.forecast?.forecastday?.map(
    (item) => item?.astro?.sunset
  )}`;

  const TEMPERATURE =
    data?.current?.temp_c > 0
      ? `Temp: +${data?.current?.temp_c} c°`
      : data?.current?.temp_c < 0
      ? `Temp: -${data?.current?.temp_c} c°`
      : `Temp: ${data?.current?.temp_c} c°`;

  const TEMP_MAX =
    data?.forecast?.forecastday?.map((item) => item?.day?.maxtemp_c) > 0
      ? `Max Temp: +${data?.forecast?.forecastday?.map(
          (item) => item?.day?.maxtemp_c
        )} c°`
      : data?.forecast?.forecastday?.map((item) => item?.day?.maxtemp_c) < 0
      ? `Max Temp: -${data?.forecast?.forecastday?.map(
          (item) => item?.day?.maxtemp_c
        )} c°`
      : `Max Temp: ${data?.forecast?.forecastday?.map(
          (item) => item?.day?.maxtemp_c
        )} c°`;

  const TEMP_MIN =
    data?.forecast?.forecastday?.map((item) => item?.day?.mintemp_c) > 0
      ? `Min Temp: +${data?.forecast?.forecastday?.map(
          (item) => item?.day?.mintemp_c
        )} c°`
      : data?.forecast?.forecastday?.map((item) => item?.day?.mintemp_c) < 0
      ? `Min Temp: -${data?.forecast?.forecastday?.map(
          (item) => item?.day?.mintemp_c
        )} c°`
      : `Min Temp: ${data?.forecast?.forecastday?.map(
          (item) => item?.day?.mintemp_c
        )} c°`;

  const TEMP_FEELS_LIKE =
    Math.round(data?.current?.feelslike_c) > 0
      ? `Feels like: +${Math.round(data?.current?.feelslike_c)} c°`
      : Math.round(data?.current?.feelslike_c) < 0
      ? `Feels like: -${Math.round(data?.current?.feelslike_c)} c°`
      : `Feels like: ${Math.round(data?.current?.feelslike_c)} c°`;

  const WIND_KPH = `Wind: ${Math.round(data?.current?.wind_kph)} kph`;
  const HUMIDITY = `Humidity: ${Math.round(data?.current?.humidity)}%`;

  return (
    <div className="container">
      <h1 className="location">{LOCATION}</h1>
      <div className="condition">{CONDITION}</div>
      <div className="condition">{SUNRISE}</div>
      <div className="condition">{SUNSET}</div>
      <div className="temperature">{TEMPERATURE}</div>
      <div className="temperature">{TEMP_MAX}</div>
      <div className="temperature">{TEMP_MIN}</div>
      <div className="temp-feelslike">{TEMP_FEELS_LIKE}</div>
      <div className="wind-speed">{WIND_KPH}</div>
      <div className="air-humidity">{HUMIDITY}</div>
      <div className="footer">
        <div className="geo-location">Geo-Location</div>
        <div className="locations"></div>
        <div className="burger-menu">Burger-Menu</div>
      </div>
    </div>
  );
}

export default App;
