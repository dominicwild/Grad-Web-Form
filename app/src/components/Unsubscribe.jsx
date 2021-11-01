import React, { Component } from "react";
import api from "../util/API";
import "../css/Unsubscribe.css";
import "../css/Form.css";
import { toastr } from "react-redux-toastr";
import LoginLoadingOverlay from "./LoginLoadingOverlay";

class Unsubscribe extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  onUnsubClick = () => {
    if (document.getElementById("form").checkValidity()) {
      const { id } = this.props;
      const email = document.getElementById("emailConfirm").value;
      this.setState({ loading: true });
      api("/api/unsubscribe", {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, email }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw "Response not ok!";
          }
        })
        .then((data) => {
          if (data) {
            toastr.success("Deletion Complete", "You have been unsubscribed successfully. All your data is now deleted.");
          } else {
            toastr.error("Error", "Something went wrong. Did you enter the correct email?");
          }
          this.setState({ loading: false });
        })
        .catch((err) => {
          console.error(err);
          this.setState({ loading: false });
        });
    }
  };

  clear = () => {
    document.getElementById("emailConfirm").value = "";
  };

  render() {
    return (
      <div className="unsubscribe">
        <div className="form">
          <LoginLoadingOverlay loadingText={"Processing"} maxDots={4} overlayElementId="form" loading={this.state.loading}/>
          <form className="form-container" id="form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-header">
              <h1>Beacon</h1>
            </div>
            <p>In order to unsubscribe from the graduate and apprenticeship scheme mailing list, please confirm your email below.</p>
            <p>This will remove all your data from our records and you will not recieve any further emails.</p>
            <div className="form-fields">
              <div className="field">
                <label htmlFor="emailConfirm">Confirm Email</label>
                <input type="email" id="emailConfirm" name="emailConfirm" required />
              </div>
            </div>

            <div className="btn-container">
              <button className="btn" onClick={this.onUnsubClick}>
                Unsubscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Unsubscribe;
