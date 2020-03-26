import React, { Component } from "react";
import "./css/libs/reboot.css";
import "./css/App.css";
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import { Router } from "@reach/router";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";

import Login from "./components/Login";
import Form from "./components/Form";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      credential: null
    };
  }

  login = async credentials => {
    return await fetch("/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          console.error("Failed to login.");
          return false;
        }
      })
      .then(data => {
        if (data) {
          this.setState({ credential: data.credential });
          return true;
        } else {
          return false;
        }
      })
      .catch(err => {
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
            getState={state => state.toastr} // This is the default
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
