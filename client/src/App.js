import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./routing/router.js";
import Header from "./components/Header";
import "./style/materialize.css";
import "./style/App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div id="outer-container" className="App">
          <Header />
          <Routing />
        </div>
      </Router>
    );
  }
}

export default App;
