import React, { Component } from "react";

class LoginControls extends Component {
  onKeyPress = (e) => {
    if (e.keyCode === 13) {
      document.getElementById("loginBtn").click();
    }
  };

  render() {
    const { login } = this.props;
    return (
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
          <button className="btn" id="loginBtn" onClick={login}>
            Log in
          </button>
        </div>
      </div>
    );
  }
}

export default LoginControls;
