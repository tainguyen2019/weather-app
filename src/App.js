import React from 'react';
import logo from './logo.svg';
import './App.css';
import cities from "./data/city.json";

function App() {
  console.log(cities);
  return (
    <div>
      <ul>
        {cities.map(city => (
          <li key={city.id}>{city.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
