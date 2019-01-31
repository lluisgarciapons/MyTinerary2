import React, { Component } from "react";
import Home from "../components/Home.js";
import Cities from "../components/cities/Cities.js";
import Login from "../components/auth/Login.js";
import Signup from "../components/auth/Signup.js";
import Itineraries from "../components/itineraries/Itineraries";
import { Route, Switch } from "react-router-dom";

class Routing extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/user/:token" component={Home} />
        <Route path="/cities" component={Cities} exact />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cities/:id/itineraries" component={Itineraries} />
      </Switch>
    );
  }
}

export default Routing;
