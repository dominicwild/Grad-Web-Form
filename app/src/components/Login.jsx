import React, { Component } from "react";
import "../css/Login.css";
import logo from "../img/DXC_Technology_logo.svg"

class Login extends Component {
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
                <input type="text" id="password" name="password" />
              </div>

              <div className="login-btn-container">
                <button>Log in</button>
              </div>

              <div className="footer">
                <img src={logo} />
              </div>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
