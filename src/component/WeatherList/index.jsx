import React, { Component } from "react";
import DayJS from "dayjs";
import WeatherCard from "../WeatherCard";
import Loading from '../Loading';
import cities from "../../data/city.json";
import "./styles.css";

class WeatherList extends Component {
  state = {
    result: undefined,
    error: "",
    forecast: [],
    loading: false
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    this.getDailyWeather(id);
    this.get5DaysForecast(id);
  }

  getDailyWeather(id) {
    fetch(
      `${process.env.REACT_APP_API_URL}/weather?appid=${process.env.REACT_APP_API_KEY}&id=${id}`,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status = ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        this.setState({ result });
      })
      .catch((error) => this.setState({ error: error.message }))
      .finally(() => {
        this.setState(oldState => ({
          loading: !oldState.loading,
        }))
      });
  }

  get5DaysForecast(id) {
    fetch(
      `${process.env.REACT_APP_API_URL}/forecast?appid=${process.env.REACT_APP_API_KEY}&id=${id}`,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status = ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        this.setState({ forecast: result.list });
      })
      .catch((error) => this.setState({ error: error.message }))
      .finally(() => {
        this.setState(oldState => ({
          loading: !oldState.loading,
        }))
      });
  }

  groupForecastByDay(arrayForecast) {
    const result = {};

    for (let item of arrayForecast) {
      const dateKey = DayJS(item.dt * 1000).format("dddd, MMMM D, YYYY");
      const dayForecasts = result[dateKey] || [];
      result[dateKey] = [...dayForecasts, item];
    }

    return result;
  }

  formatDataForecast(forecast) {
    const result = {};
    result["time"] = DayJS(forecast.dt * 1000).format("HH:mm");
    result["temp"] = `${Math.round(forecast.main.temp - 273)} °C`;
    result["temp_min"] = `${Math.round(forecast.main.temp_min - 273)} °C`;
    result["temp_max"] = `${Math.round(forecast.main.temp_max - 273)} °C`;
    result["icon"] = forecast.weather[0].icon;

    return result;
  }

  render() {
    const { id } = this.props.match.params;
    const { result, error, forecast, loading } = this.state;
    const forecastByDay = this.groupForecastByDay(forecast);

    const city = cities.find((city) => city.id === Number(id));
    return (
      <React.Fragment>
        <div>
          {loading && <Loading />}
          {result && (
            <div className="container">
              <div className="city-name">
                <p className="title">{city.name}</p>
                <span className="date">
                  {DayJS(result.dt * 1000).format("hh:mma, dddd, MMMM D, YYYY")}
                </span>
              </div>
              <div className="temp-container">
                <img
                  src={`${process.env.REACT_APP_IMAGE_URL}/${result.weather[0].icon}.png`}
                  alt="icon"
                />
                <span className="temp">
                  {Math.round(result.main.temp - 273)}°C
                </span>
              </div>
            </div>
          )}
          {error}
          <div>
            {Object.keys(forecastByDay).map((day) => {
              const dayForecasts = forecastByDay[day];
              return (
                <div key={day}>
                  <h3>{day}</h3>
                  <div className="weather-forecast-list">
                    {dayForecasts.map((forecast) => (
                      <WeatherCard
                        key={forecast.dt}
                        forecast={this.formatDataForecast(forecast)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default WeatherList;
