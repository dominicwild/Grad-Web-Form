import React, { Component } from "react";
import List from "./List";
import "../css/Form.css";

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

  renderSelect = (id, labelText, list) => {
    return (
      <div>
        <label htmlFor={id}>{labelText}:</label>
        <select type="text" id={id} name={id} disabled={list === undefined}>
          {(() => {
            if (list) {
              return list.map(list => {
                return <option value={list.id}>{list.name}</option>;
              });
            } else {
              return <option>Loading...</option>;
            }
          })()}
        </select>
      </div>
    );
  };

  render() {
    const { genders, streams, studyFields } = this.state;

    return (
      <div className="form">
        <div className="form-container">
          <div>
            <h1>DXC Beacon</h1>
            <h2>Please fill out the fields below:</h2>
            <h3>* required field</h3>
          </div>

          <div>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input type="text" id="firstName" name="firstName" />
            </div>

            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input type="text" id="lastName" name="lastName" />
            </div>

            {this.renderSelect("gender", "Gender", genders)}
            {/* <List id="gender" labelText="Gender" list={genders} /> */}

            <div>
              <label htmlFor="email">Email:</label>
              <input type="text" id="email" name="email" />
            </div>

            <div>
              <label htmlFor="mobile">Mobile Number:</label>
              <input type="text" id="mobile" name="mobile" />
            </div>

            {this.renderSelect("fieldOfStudy", "Field of Study", studyFields)}

            {this.renderSelect("streams", "Preferred Role", streams)}
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
