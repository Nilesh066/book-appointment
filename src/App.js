import React from "react";
import "./App.css";
import DocLogin from "./DocLogin";
import Doclist from "./DoctorsList";
import { BrowserRouter, Router, Route, Link } from "react-router-dom";
import DoctorScreen from "./DoctorScreen";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorsList: [],
    };
  }
  componentDidMount() {
    fetch("http://localhost:8080/")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          doctorsList: data,
        });
        console.log(data);
      })
      .catch(console.log);
  }
  render() {
    return (
      <div className="main">
        <BrowserRouter>
          <div className="header">
            <h1>
              <Link to="/home" exact className="headLink">
                <header>Doc-At-Door</header>
              </Link>
            </h1>
            <Link to="/docLogin">
              <h3 className="doctorLogin">Doctor's Login</h3>
            </Link>
          </div>
          <div className="body">
            <Route path="/home">
              <Doclist doctorsList={this.state.doctorsList} />
            </Route>
            <Route path="/docLogin">
              <DocLogin doctorsList={this.state.doctorsList} />
            </Route>
            <Route path="/id/:id">
              <DoctorScreen
                doctorsList={this.state.doctorsList}
                {...this.props}
              />
            </Route>
          </div>
          <div className="footer"></div>
        </BrowserRouter>
      </div>
    );
  }
}

export default Home;
