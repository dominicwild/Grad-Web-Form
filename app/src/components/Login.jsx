import React, { Component } from "react";
import "../css/Login.css";
import SVG from "react-inlinesvg";
import logo from "../img/DXC_Technology_logo.svg";
import loading from "../img/loading.svg";
import { navigate } from "@reach/router";
import { toastr } from "react-redux-toastr";
import LoginLoadingOverlay from "./LoginLoadingOverlay";

class Login extends Component {
  loadingInterval;

  constructor() {
    super();

    this.state = {
      loggingIn: false,
    };
  }

  login = async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log({ username, password });
    this.setState({ loggingIn: true });
    const response = await this.props.login(username, password);
    this.setState({ loggingIn: false });
    console.log(`Response: ${response}`);
    if (response.username) {
      navigate("/form");
    } else {
      toastr.error("Login Error", response.message);
    }
  };

  onKeyPress = (e) => {
    if (e.keyCode === 13) {
      document.getElementById("loginBtn").click();
    }
  };

  render() {
    return (
      <div className="background">
        <div className="login">
          <LoginLoadingOverlay loadingText="Logging in" maxDots={4} overlayElementId="loginCard" loading={this.state.loggingIn}/>
          <div className="login-card-content" id="loginCard">
            <h1>DXC Beacon Login</h1>
            <div className="inputs">
              <div>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" onKeyDown={this.onKeyPress} />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onKeyDown={this.onKeyPress} />
              </div>

              <div className="login-btn-container">
                <button className="btn" id="loginBtn" onClick={this.login}>
                  Log in
                </button>
              </div>

              <div className="footer">
                <SVG src={logo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
