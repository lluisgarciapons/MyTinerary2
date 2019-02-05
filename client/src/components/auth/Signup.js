import React, { Component } from "react";
import Footer from "../Footer";
import axios from "axios";
import { loginFail } from "../../store/actions/userActions";
import { connect } from "react-redux";

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordVal: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (!this.state.username || !this.state.email || !this.state.password) {
      console.log("fields not filled");
      this.setState({
        isError: true,
        error: "All fields are required."
      });
    } else if (this.state.password !== this.state.passwordVal) {
      console.log("password don't match");
      this.setState({
        isError: true,
        error: "Passwords must be the same."
      });
    } else {
      this.setState({
        isError: false,
        error: ""
      });

      axios
        .post("/auth/signup", {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          passwordVal: this.state.passwordVal
        })
        .then(res => {
          axios
            .post("/auth/login", {
              email: res.data.auth.local.email,
              password: res.data.auth.local.password
            })
            .then(res => {
              localStorage.setItem("token", res.data.token);
              window.location = localStorage.getItem("url");
            })
            .catch(err => {
              console.log(err.response.data);
              this.props.loginFail(err.response.data.message);
            });
        })
        .catch(err => {
          this.setState({
            isError: true,
            error: err.response.data.message
          });
          console.log(err.response.data);
        });
    }
  }

  errorMessage() {
    return <div className="alert">{this.state.error}</div>;
  }

  render() {
    return (
      <div>
        <h1>This is the Signup page</h1>
        {this.state.isError ? this.errorMessage() : null}
        <form onSubmit={this.onSubmit} className="row">
          <div className="col s8 offset-s2">
            <div className="input-field col s12">
              <input
                name="username"
                id="username-input"
                type="text"
                className="validate"
                value={this.state.username}
                onChange={this.onChange}
              />
              <label htmlFor="username-input">Username</label>
            </div>

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

            <div className="input-field col s12">
              <input
                name="passwordVal"
                id="confirm-input"
                type="password"
                className="validate"
                value={this.state.passwordVal}
                onChange={this.onChange}
              />
              <label htmlFor="confirm-input">Confirm Password</label>
            </div>
          </div>
          <div className="form-group">
            <button className="btn">Sign Up</button>
          </div>
        </form>
        <Footer />
      </div>
    );
  }
}

export default connect(
  null,
  { loginFail }
)(Signup);
