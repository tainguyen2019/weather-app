import React, { Component } from 'react';
import cities from '../data/city.json';

class Weather extends Component {
  state = {
    result: undefined,
    error: '',
  };

  componentDidMount() {
    const { id } = this.props.match.params;
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
      .catch((error) => this.setState({ error: error.message }));
  }

  render() {
    const { id } = this.props.match.params;
    const { result, error } = this.state;
    const city = cities.find((city) => city.id === Number(id));
    return (
      <div>
        <h1>Welcome Weather {city.name}</h1>
        {result && (
          <p>
            {new Date(result.dt * 1000).toLocaleDateString('en-US')}{' '}
            {Math.round(result.main.temp - 273)}°C
          </p>
        )}
        {error && <p>{error}</p>}
      </div>
    );
  }
}

export default Weather;
