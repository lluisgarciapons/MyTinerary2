import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "./store/actions/userActions";
import Routing from "./routing/router.js";
import Header from "./components/Header";
import "./style/materialize.css";
import "./style/App.css";

class App extends Component {
  async componentDidMount() {
    if (localStorage.getItem("token")) {
      await this.props.fetchUser();
    } else {
      console.log("Not logged in.");
    }
  }

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

export default connect(
  null,
  { fetchUser }
)(App);
