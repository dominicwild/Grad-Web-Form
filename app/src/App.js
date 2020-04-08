import React, { Component } from "react";
import "./css/libs/reboot.css";
import "./css/App.css";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import { Router } from "@reach/router";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";
import Amplify from "aws-amplify";
import { cognito } from "./config";

import Login from "./components/Login";
import Form from "./components/Form";

Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: cognito.region,

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: cognito.poolId,

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "a1b2c3d4e5f6g7h8i9j0k1l2m3",

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,
  },
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      credential: null,
    };
  }

  login = async (credentials) => {
    return await fetch("/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.error("Failed to login.");
          return false;
        }
      })
      .then((data) => {
        if (data) {
          this.setState({ credential: data.credential });
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.error(err);
        return false;
      });
  };

  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          <Router>
            <Login path="/" login={this.login} />
            <Form path="/form" />
          </Router>
          <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="bottom-center"
            getState={(state) => state.toastr} // This is the default
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick
          />
        </div>
      </Provider>
    );
  }
}

export default App;
