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
      credential: null,
    };
  }

  login = async (username, password) => {
    const response = await Auth.signIn(username, password).catch((err) => {
      console.log(err);
      return err;
    });

    // const user = await Auth.currentAuthenticatedUser().catch(err => {
    //   console.error(err)
    // })

    console.log("Response is: ");
    console.log(response);

    // Auth.forgotPasswordSubmit(username, "915317", "Password1234!")
    // .then(data => console.log(data))
    // .catch(err => console.log(err));

    //await Auth.completeNewPassword(user, password).then(data => console.log(data)).catch(err => console.error(err)); // Used to confirm new account, when created through admin cognito console.

    // Auth.currentAuthenticatedUser()
    //   .then(user => {
    //     return Auth.changePassword(user, password, password);
    //   })
    //   .then(data => {
    //     console.log("Password changed")
    //     console.log(data)})
    //   .catch(err => console.log(err));

    return response;
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
