import React, { Component } from 'react';
import './App.css';
import CityList from './component/CityList';
import Weather from './component/Weather';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/weather/:id" exact component={Weather} />
          <Route path="/" exact>
            <CityList />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
