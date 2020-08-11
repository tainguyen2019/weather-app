import React, { Component } from "react";
import { Link } from "react-router-dom";

import cities from "../../data/city.json";
import "./styles.css";

class CityList extends Component {
  render() {
    return (
      <div className="city-list">
        {cities.map((city) => (
          <div className="city" key={city.id}>
            <Link to={`/weather/${city.id}`}>{city.name}</Link>
          </div>
        ))}
      </div>
    );
  }
}

export default CityList;
