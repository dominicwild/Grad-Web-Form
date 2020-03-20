import React, { Component } from "react";
import List from "./List";
import "../css/Form.css";
import { toastr } from "react-redux-toastr";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.getGenders();
    this.getLocations();
    this.getStreams();
    this.getStudyFields();
  }

  getGenders = () => {
    fetch("/api/genders")
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          console.error("Failed to get genders ", res.statusText);
        }
      })
      .then(({ genders }) => {
        this.setState({ genders });
      });
  };

  getStudyFields = () => {
    fetch("/api/studyFields")
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          console.error("Failed to get genders ", res.statusText);
        }
      })
      .then(({ studyFields }) => {
        this.setState({ studyFields });
      });
  };

  getStreams = () => {
    fetch("/api/streams")
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          console.error("Failed to get genders ", res.statusText);
        }
      })
      .then(({ streams }) => {
        this.setState({ streams });
      });
  };

  getLocations = () => {
    fetch("/api/locations")
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          console.error("Failed to get genders ", res.statusText);
        }
      })
      .then(data => {
        this.setState({ locations: data });
      });
  };

  renderSelect = (id, labelText, defaultOptionText, list) => {
    return (
      <div className="field">
        <label htmlFor={id}>{labelText}:</label>
        <select type="text" id={id} name={id} disabled={list === undefined} defaultValue={3}>
          {(() => {
            if (list) {
              return list.map(list => {
                return (
                  <option value={list.id} key={list.id + list.name}>
                    {list.name}
                  </option>
                );
              });
            } else {
              return <option key="loading">Loading...</option>;
            }
          })()}

          <option defaultValue key={"default" + labelText} value="-1">
            {" "}
            {defaultOptionText}{" "}
          </option>
        </select>
      </div>
    );
  };

  submit = event => {
    if (document.getElementById("form").checkValidity()) {
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const GenderId = document.getElementById("gender").value;
      const email = document.getElementById("email").value;
      const mobile = document.getElementById("mobile").value;
      const StudyFieldId = document.getElementById("fieldOfStudy").value;
      const StreamId = document.getElementById("stream").value;

      fetch("/api/user", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ firstName, lastName, GenderId, email, mobile, StudyFieldId, StreamId })
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            console.error("Failed to submit form. " + res.statusText);
            toastr.error("", "Failed to submit form.");
          }
        })
        .then(data => {
          if (data.success) {
            toastr.success("", "Successfully submitted form with email: " + email);
            this.clear();
          }
        });
    }
  };

  clear = () => {
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("gender").value = "-1";
    document.getElementById("email").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("fieldOfStudy").value = "-1";
    document.getElementById("stream").value = "-1";
  };

  render() {
    const { genders, streams, studyFields } = this.state;

    return (
      <div className="form">
        <form className="form-container" id="form" onSubmit={e => e.preventDefault()}>
          <div className="form-header">
            <h1>DXC Beacon</h1>
            <h2>Please fill out the fields below:</h2>
            <h3>* required field</h3>
          </div>

          <div className="form-fields">
            <div className="field required">
              <label htmlFor="firstName">First Name:</label>
              <input type="text" id="firstName" name="firstName" required />
            </div>

            <div className="field required">
              <label htmlFor="lastName">Last Name:</label>
              <input type="text" id="lastName" name="lastName" required />
            </div>

            {this.renderSelect("gender", "Gender", "Select your gender", genders)}

            <div className="field required">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className="field">
              <label htmlFor="mobile">Mobile Number:</label>
              <input type="text" id="mobile" name="mobile" />
            </div>

            {this.renderSelect("fieldOfStudy", "Field of Study", "Select the field you study", studyFields)}

            {this.renderSelect("stream", "Preferred Role", "Select the type of role you're interested in", streams)}
          </div>

          <div className="privacy-policy">
            <label htmlFor="privacyPolicy">
              <span>
                <input type="checkbox" name="privacyPolicy" id="privacyPolicy" required />
              </span>
              <span className="privacy-text">
                I agree to DXC's <a href="#privacyPolicy">Privacy Policy</a>
              </span>
            </label>
          </div>

          <div className="btn-container">
            <button className="btn" onClick={this.submit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
