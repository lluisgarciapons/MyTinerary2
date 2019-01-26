import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export class Footer extends Component {
  render() {
    if (this.props.goBack) {
      const route = `/${this.props.goBack}`;
      return (
        <div className="footer">
          <NavLink className="home-icon" to={route}>
            <i className="material-icons">chevron_left</i>
          </NavLink>
          <NavLink className="home-icon" to="/">
            <i className="material-icons">home</i>
            {/* <MaterialIcon icon="home" invert size="40" /> */}
          </NavLink>
          <div className="home-icon hidden-icon">
            <i className="material-icons">chevron_right</i>
          </div>
        </div>
      );
    } else {
      return (
        <div className="footer">
          <NavLink className="home-icon" to="/">
            <i className="material-icons">home</i>
            {/* <MaterialIcon icon="home" invert size="40" /> */}
          </NavLink>
        </div>
      );
    }
  }
}

export default Footer;
