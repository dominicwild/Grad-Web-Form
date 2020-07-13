import React, { Component } from "react";
import "../css/Unsubscribe.css";
import "../css/Form.css";

class Unsubscribe extends Component {
  render() {
    return (
      <div className="unsubscribe">
        <div className="form">
          <form className="form-container">
            <div className="form-header">
              <h1>DXC Beacon</h1>
            </div>
            <p>In order to unsubscribe from the DXC graduate and apprenticeship scheme mailing list, please confirm your email below.</p>
            <p>This will remove all your data from our records and you will not recieve any further emails from DXC.</p>
            <div className="form-fields">
              <div className="field">
                <label htmlFor="emailConfirm">Confirm Email</label>
                <input type="text" id="emailConfirm" name="emailConfirm" />
              </div>
            </div>

            <div className="btn-container">
              <button className="btn" onClick={this.unsubscribe}>
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
