import React, { Component } from "react";
import { NavLink } from "react-router-dom";

const divStyle = {
  padding: "15px 30px 10px 30px",
  display: "flex",
  justifyContent: "space-between"
};

const iStyle = {
  fontSize: "48px"
};

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
  }

  toggleModal = () => {
    if (!this.state.isOpen) {
      document.addEventListener("click", this.toggleModal, false);
    } else {
      document.removeEventListener("click", this.toggleModal, false);
    }
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div style={divStyle}>
        <i style={iStyle} className="material-icons">
          account_circle
        </i>
        <i style={iStyle} className="material-icons" onClick={this.toggleModal}>
          menu
        </i>

        <Menu show={this.state.isOpen}>
          {/* <Menu show={this.state.isOpen} onClose={this.toggleModal}> */}
          {/* Here's some content for the modal */}
        </Menu>
      </div>
    );
  }
}

class Menu extends Component {
  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="outerWrapper">
        <div className="innerWrapper">
          <NavLink to="/login">
            <p>Log in</p>
          </NavLink>
          <NavLink to="/signup">
            <p>Create Account</p>
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Header;
