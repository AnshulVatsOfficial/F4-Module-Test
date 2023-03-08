import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCelsius, setFahrenheit } from "./store/Action";

function WeatherDetails() {
  const [weatherData, setWeatherData] = useState({});
  const { cityName } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const temperatureUnit = useSelector((state) => state.temperatureUnit);
  const dispatch = useDispatch();

  const handleCheckbox = (event) => {
    const isCelsiusChecked =
      event.target.name === "Celsius" && event.target.checked;
    const isFahrenheitChecked =
      event.target.name === "Fahrenheit" && event.target.checked;

    if (isCelsiusChecked) {
      dispatch(setCelsius());
    }

    if (isFahrenheitChecked) {
      dispatch(setFahrenheit());
    }
  };

  useEffect(() => {
    const MY_API_KEY = "437274b6b733424997d132049230103";
    fetch(`https://api.weatherapi.com/v1/current.json?key=${MY_API_KEY}&q=${cityName}`)
      .then((response)=>{
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          setError(true);
          setLoading(false);
        } else {
          setWeatherData(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  }, [cityName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || Object.keys(weatherData).length === 0) {
    alert("Location Not Found.. !");
    return (window.location.href = "/");
  }

  const temperature =
    temperatureUnit === "Celsius"
      ? weatherData.current.temp_c
      : weatherData.current.temp_f;
  const feelsLike =
    temperatureUnit === "Celsius"
      ? weatherData.current.feelslike_c
      : weatherData.current.feelslike_f;

  return (
    <section id="weather-data">
      <div className="container">
        <div className="row">
        <div className="data" style={{width:"85%"}}>
          <h1 className="heading1" style={{color: "black"}}>Weather Details</h1>

          <div className="checkbox">
            <label>
              <input type="checkbox" name="Celsius" checked={temperatureUnit === "Celsius"} onChange={handleCheckbox}/>Celsius
            </label>
            <label>
              <input type="checkbox" name="Fahrenheit" checked={temperatureUnit === "Fahrenheit"} onChange={handleCheckbox} />Fahrenheit
            </label>
          </div>

          <div className="api-data">
            <p>Location: {weatherData.location.name}
              <span>
                Temperature : {temperature} {temperatureUnit}
              </span>
            </p>

            <p>Cloud : {weatherData.current.cloud}</p>

            <p>
              Longitude: {weatherData.location.lon}{" "}
              <span className="lat">Latitude: {weatherData.location.lat}</span>{" "}
            </p>

            <p>
              Country : {weatherData.location.country}{" "}
              <span className="region">Region : {weatherData.location.region}</span>{" "}
            </p>

            <p>
              Time_Zone: {weatherData.location.tz_id}{" "}
              <span>Local Time : {weatherData.location.localtime}</span>{" "}
            </p>

            <p>UV Index : {weatherData.current.uv}</p>

            <p>Pressure : {weatherData.current.pressure_in}</p>

            <p>Feels like: {feelsLike}</p>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

export default WeatherDetails;
