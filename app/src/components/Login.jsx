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

  loadingTextAnimation = async (dots) => {
    const maxDots = 4;
    const loadingText = document.getElementById("loadingText");
    if (loadingText) {
      let dotString = "";
      for (let i=0; i < dots; i++) {
        dotString += ".";
      }
      for (let i=0; i < (maxDots-dots); i++) {
        dotString += "&nbsp;";
      }
      console.log(dotString);
      loadingText.innerHTML = "Logging in" + dotString;
    } else {
      console.log("No loading animation found");
    }
    if (this.state.loggingIn) {
      setTimeout(this.loadingTextAnimation, 500, (dots + 1) % maxDots);
    }
  };

  loading = () => {
    console.log("loading");
    const { loggingIn } = this.state;
    const loginCard = document.getElementById("loginCard");
    console.log("Before if");
    if (loggingIn && loginCard) {
      console.log("logging in");
      const height = loginCard.clientHeight + "px";
      const width = loginCard.clientWidth + "px";
      this.loadingInterval = setTimeout(this.loadingTextAnimation, 500, 0);
      return (
        <div className="loading-overlay" style={{ height, width }}>
          <div className="loading-overlay-inner">
            <div className="loading-animation">
              <SVG src={loading} />
            </div>
            <h1 className="loading-text" id="loadingText">
              Logging in...
            </h1>
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="background">
        <div className="login">
          <LoginLoadingOverlay loadingText="Logging in" maxDots={3} overlayElementId="loginCard" loading={this.state.loggingIn}/>
          {/* {this.loading()} */}
          <div id="loginCard">
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
