import React, { Component } from "react";

class ResetPasswordControls extends Component {
  onKeyPress = (e) => {
    if (e.keyCode === 13) {
      document.getElementById("resetPasswordBtn").click();
    }
  };

  resetPassword = async (e) => {
    const { resetPassword } = this.props;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    resetPassword(password,confirmPassword);
  };

  render() {
    const { username } = this.props;
    return (
      <div className="inputs">
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" value={username} onKeyDown={this.onKeyPress} disabled />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onKeyDown={this.onKeyPress} />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" onKeyDown={this.onKeyPress} />
        </div>

        <div className="login-btn-container">
          <button className="btn" id="resetPasswordBtn" onClick={this.resetPassword}>
            Confirm Password
          </button>
        </div>
      </div>
    );
  }
}

export default ResetPasswordControls;
