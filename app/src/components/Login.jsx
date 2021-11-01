import React, { Component } from "react";
import "../css/Login.css";
import SVG from "react-inlinesvg";
import logo from "../img/logoipsum-logo.svg";
import loading from "../img/loading.svg";
import { navigate } from "@reach/router";
import { toastr } from "react-redux-toastr";
import LoginLoadingOverlay from "./LoginLoadingOverlay";
import LoginControls from "./LoginControls";
import { Auth } from "aws-amplify";
import ResetPasswordControls from "./ResetPasswordControls";

class Login extends Component {
  loadingInterval;

  constructor() {
    super();

    this.state = {
      loggingIn: false,
      resetPassword: false,
      loadingText: "Logging in",
      user: null,
    };
  }

  login = async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log({ username, password });
    this.setState({ loggingIn: true });
    const response = await this.props.login(username, password);
    this.setState({ loggingIn: false, user: response });
    console.log(`Response: ${response}`);
    if (response.challengeName === "NEW_PASSWORD_REQUIRED") {
      this.setState({ resetPassword: true });
    } else if (response.username) {
      navigate("/form");
    } else {
      toastr.error("Login Error", response.message);
    }
  };

  resetPassword = async (password, confirmPassword) => {
    const { user } = this.state;

    if (password === confirmPassword) {
      console.log("CompleteNewPassword:");
      this.setState({ loggingIn: true, loadingText: "Resetting Password" });
      await Auth.completeNewPassword(user, password)
        .then((data) => {
          console.log(data);
          navigate("/form");
        })
        .catch((err) => {
          console.error(err);
          toastr.error("Reset Password Error", err.message);
        }); // Used to confirm new account, when created through admin cognito console.
      this.setState({ loggingIn: false, loadingText: "Logging in" });
    } else {
      toastr.error("Reset Password Error", "Your passwords do not match.");
    }
  };

  renderControls = () => {
    const { resetPassword, user } = this.state;
    if (resetPassword) {
      return <ResetPasswordControls resetPassword={this.resetPassword} username={user.username} />;
    } else {
      return <LoginControls login={this.login} />;
    }
  };

  render() {
    const { resetPassword, loadingText } = this.state;
    return (
      <div className="background">
        <div className="login">
          <LoginLoadingOverlay loadingText={loadingText} maxDots={4} overlayElementId="loginCard" loading={this.state.loggingIn} />
          <div className="login-card-content" id="loginCard">
            <h1>Beacon Login</h1>
            {this.renderControls()}
            <div className="footer">
              <SVG src={logo} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
