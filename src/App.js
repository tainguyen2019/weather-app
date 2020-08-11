import React, { Component } from 'react';
import './App.css';
import CityList from './component/CityList';
import WeatherList from './component/WeatherList';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/weather/:id" exact component={WeatherList} />
          <Route path="/weather-app" exact>
            <CityList />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
