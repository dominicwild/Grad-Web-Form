import React, { Component } from "react";
import "./css/libs/reboot.css"
import "./css/App.css";
import { Router } from "@reach/router";
import Login from "./components/Login";


class App extends Component{
  
  

  render() {
    
    return (
      <Router>
        <Login path="/" />
      </Router>
    );
  }
}

export default App;
