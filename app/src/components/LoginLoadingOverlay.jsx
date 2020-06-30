import React, { Component } from "react";
import SVG from "react-inlinesvg";
import loadingSvg from "../img/loading.svg";

class LoginLoadingOverlay extends Component {
  constructor() {
    super();
  }

  loadingTextAnimation = async (dots) => {
    const { maxDots, loadingText } = this.props;
    const loadingTextElement = document.getElementById("loadingText");
    if (loadingTextElement) {
      let dotString = "";
      for (let i = 0; i < dots; i++) {
        dotString += ".";
      }
      for (let i = 0; i < maxDots - dots; i++) {
        dotString += "&nbsp;";
      }
      console.log(dotString);
      loadingTextElement.innerHTML = "Logging in" + dotString;
    } else {
      console.log("No loading animation found.");
    }
    if (this.props.loading) {
      setTimeout(this.loadingTextAnimation, 500, (dots + 1) % maxDots);
    }
  };

  render() {
    const { loading, overlayElementId, loadingText } = this.props;
    const overlayElement = document.getElementById(overlayElementId);
    let width, height;
    let display = ""
    console.log("Loading is: " + loading)
    if(!loading){
        display = "none"
    }
    console.log("display: " + display)
    if (loading && overlayElement) {
      height = overlayElement.clientHeight + "px";
      width = overlayElement.clientWidth + "px";
      this.loadingInterval = setTimeout(this.loadingTextAnimation, 500, 0);
    }
    return (
      <div className="loading-overlay" style={{ height, width, display }}>
        <div className="loading-overlay-inner">
          <div className="loading-animation">
            <SVG src={loadingSvg} />
          </div>
          <h1 className="loading-text" id="loadingText">
            {loadingText}
          </h1>
        </div>
      </div>
    );
  }
}

export default LoginLoadingOverlay;
