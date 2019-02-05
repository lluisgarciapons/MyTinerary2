import React, { Component } from "react";
import Footer from "../Footer.js";
import { loginFail } from "../../store/actions/userActions";
import { connect } from "react-redux";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    axios
      .post("/auth/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        window.location = localStorage.getItem("url");
      })
      .catch(err => {
        console.log(err.response.data);
        this.props.loginFail(err.response.data.message);
      });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  errorMessage() {
    return <div className="alert">{this.props.user.error}</div>;
  }

  render() {
    return (
      <div>
        <h1>Login Page</h1>

        {this.props.user.error ? this.errorMessage() : null}
        <form onSubmit={this.onSubmit} className="row">
          <div className="col s8 offset-s2">
            <div className="input-field col s12">
              <input
                name="email"
                id="email-input"
                type="email"
                className="validate"
                value={this.state.email}
                onChange={this.onChange}
              />
              <label htmlFor="email-input">Email</label>
            </div>

            <div className="input-field col s12">
              <input
                name="password"
                id="password-input"
                type="password"
                className="validate"
                value={this.state.password}
                onChange={this.onChange}
              />
              <label htmlFor="password-input">Password</label>
            </div>
            <div className="form-group">
              <button className="btn">Log In</button>
            </div>
          </div>
        </form>
        <div>
          <img
            className="google-login-btn"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7NABN7FsJQ8rVSl_iRB5zO8vnOzf6Vck1XPNozMxQ7xkBcEjU"
            alt="google login logo"
            onClick={() =>
              (window.location = "http://localhost:5000/auth/google")
            }
          />
        </div>

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginFail: error => dispatch(loginFail(error))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
