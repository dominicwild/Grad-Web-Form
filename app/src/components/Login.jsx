import React, { Component } from "react";
import "../css/Login.css";
import SVG from "react-inlinesvg";
import logo from "../img/DXC_Technology_logo.svg";
import { navigate } from "@reach/router";

class Login extends Component {
  login = async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log({ username, password });
    const success = await this.props.login({ username, password });
    console.log(`Success: ${success}`);
    if (success) {
      navigate("/form");
    }
  };

  render() {
    return (
      <div className="background">
        <div className="login">
          <div>
            <h1>DXC Beacon Login</h1>
            <div className="inputs">
              <div>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />
              </div>

              <div className="login-btn-container">
                <button className="btn" onClick={this.login}>
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
