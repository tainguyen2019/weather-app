import React, { Component } from "react";
import "./styles.css";

class Loading extends Component {
  render() {
    return (
      <div>
        <div className="loading-container">
          <div className="loader"></div>
        </div>
      </div>
    );
  }
}

export default Loading;
