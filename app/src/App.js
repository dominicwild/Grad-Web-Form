import React, { Component } from "react";
import "./css/libs/reboot.css";
import "./css/App.css";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import { Router } from "@reach/router";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";
import Amplify, { Auth } from "aws-amplify";
import { cognito } from "./config";

import Login from "./components/Login";
import Form from "./components/Form";
import Unsubscribe from "./components/Unsubscribe";

Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: cognito.region,

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: cognito.poolId,

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: cognito.clientId,

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,
  },
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  login = async (username, password) => {
    const response = await Auth.signIn(username, password).catch((err) => {
      console.log(err);
      return err;
    });

    console.log("Response is: ");
    console.log(response);

    // console.log("CompleteNewPassword:");
    // await Auth.completeNewPassword(response, password)
    //   .then((data) => console.log(data))
    //   .catch((err) => console.error(err)); // Used to confirm new account, when created through admin cognito console.

    return response;
  };

  render() {
    Auth.currentSession().then((data) => {
      console.log(data);
    });
    Auth.currentAuthenticatedUser()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
    return (
      <Provider store={this.props.store}>
        <div>
          <Router>
            <Login path="/" login={this.login} />
            <Form path="/form" />
            <Unsubscribe path="/unsubscribe/:id" />
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
