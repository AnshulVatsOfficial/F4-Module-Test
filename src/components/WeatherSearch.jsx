import { useState } from "react";
import { useNavigate } from "react-router-dom";

function WeatherSearch() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = () => {
    if (city.trim() !== "") {
      navigate(`/weatherdetails/${city}`);
    } else {
      alert("Please enter a city name !");
    }
  };

  return (
    <section id="weather-search" style={{backgroundColor: 'black', width: '100%', height:'100vh'}}>
      <div className="weather-div">
      <div className="container">
        <div className="row">
          <div id="search-page" className="d-flex flex-column justify-content-center align-items-center">
              <h1 className="heading mt-5">Weather Api</h1>
              <input className="search-box my-3" type="search" placeholder="Location" value={city} onChange={handleInputChange} style={{width:"85%"}}/>
              <div className="button d-flex mt-3">
                <button className="search-btn" onClick={handleSearch}>Search</button>
              </div>     
          </div>
        </div>
      </div>
      </div>   
    </section>
    
    
  );
}

export default WeatherSearch;