import React from "react";
import "./App.css";
import { BrowserRouter, Router, Route, Link } from "react-router-dom";

class DocLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorsList: this.props.doctorsList,
      docLogin: {},
      loginvalue: false,
      doctorLoggedIn: {},
      patients: [],
    };
  }
  componentDidMount() {
    fetch("http://localhost:8080/patients")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          patients: data,
        });
        console.log(data);
      })
      .catch(console.log);
  }
  handleChange(field, event) {
    let docLogin = this.state.docLogin;
    docLogin[field] = event.target.value;
    this.setState({ docLogin });
  }
  loginDoc(event) {
    console.log(this.state.docLogin);
    let doctor = this.state.doctorsList.find((x) => {
      if (
        x.userName == this.state.docLogin.userName &&
        x.password == this.state.docLogin.password
      ) {
        console.log("datamatched");
        this.setState({ loginvalue: true });
        this.setState({ doctorLoggedIn: x });
      }
    });
  }
  cancel(event) {
    event.preventDefault();
    alert("cancelled");
  }
  close(event) {
    event.preventDefault();
    alert("closed");
  }
  render() {
    if (this.state.loginvalue === false) {
      return (
        <div className="docLogInForm">
          <h3>Doctor's Login</h3>
          <tr>
            <td>
              <b>UserName:</b>
            </td>
            <td>
              <input
                type="text"
                placeholder="enter username"
                onChange={this.handleChange.bind(this, "userName")}
                value={this.state.docLogin["userName"]}
              />
            </td>
          </tr>
          <tr>
            <td>
              <b>Password:</b>
            </td>
            <td>
              <input
                type="password"
                placeholder="enter password"
                value={this.state.docLogin["password"]}
                onChange={this.handleChange.bind(this, "password")}
              />
            </td>
          </tr>
          <tr>
            <td />
            <td>
              <button
                className="DocLogInButton"
                onClick={this.loginDoc.bind(this)}
              >
                LOG IN
              </button>
            </td>
          </tr>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Good Day! {this.state.doctorLoggedIn.name}</h1>
          <p>We have scheduled appoinment with below patients for you today.</p>
          <div className="patient-lists">
            <th>
              <td className="patient-detail-head">Doctor id</td>
              <td className="patient-detail-head">Patient_id</td>
              <td className="patient-detail-head">Patient_name</td>
              <td className="patient-detail-head">Patient_mobile</td>
              <td className="patient-detail-head">Time</td>
            </th>
            {this.state.patients.map((patient) => (
              <div>
                <tr>
                  <td className="patient-detail-head">{patient.doctor_id}</td>
                  <td className="patient-detail-head">{patient._id}</td>
                  <td className="patient-detail-head">{patient.patientName}</td>
                  <td className="patient-detail-head">{patient.phone}</td>
                  <td className="patient-detail-head">
                    {patient.hour}:{patient.minute}
                  </td>
                  <td className="patient-detail-head">
                    <button onClick={this.cancel.bind(this)}>Cancel</button>
                    <button onClick={this.close.bind(this)}>Close</button>
                    <span>Status:{patient.status}</span>
                  </td>
                </tr>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default DocLogin;
