import React, { Component } from 'react';
import cities from '../data/city.json';
import { Link } from 'react-router-dom';

class CityList extends Component {
  render() {
    return (
      <div>
        <ul>
          {cities.map((city) => (
            <li key={city.id}>
              <Link to={`/weather/${city.id}`}>{city.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CityList;
