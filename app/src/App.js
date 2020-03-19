import React, { Component } from "react";
import "./css/libs/reboot.css";
import "./css/App.css";
import { Router } from "@reach/router";
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

    fetch("/api/locations").then(res => {
      return res.json();
    }).then(data => {
      console.log(data);
    })
    

    return (
      <Router>
        <Login path="/" login={this.login} />
        <Form path="/form" />
      </Router>
    );
  }
}

export default App;
