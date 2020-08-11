import React, { Component } from "react";
import './styles.css';

class WeatherCard extends Component {
  render() {
    const { forecast } = this.props;
    return (
      <div className="weather-card">
        <p>{forecast.time}</p>
        <img
          src={`${process.env.REACT_APP_IMAGE_URL}/${forecast.icon}.png`}
          alt="icon"
        />
        <p>Temp: {forecast.temp}</p>
        <p>Temp min: {forecast.temp_min}</p>{" "}
        <p>Temp max: {forecast.temp_max}</p>{" "}
      </div>
    );
  }
}

export default WeatherCard;
