import React, { Component } from "react";
import axios from "axios";
//import ProjectAPI from "../../MicroserviceAPI/ProjectAPI";

import "./Login.css";
import EmployeeAPI from "../MicroserviceAPI/EmployeeAPI";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

class Login extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      email: null,
      password: null,
      formErrors: {
        email: "",
        password: "",
      },
    };
  }

  // storeUserIdAndName(email) {
  //   EmployeeAPI.getEmployeeIdAndNameByEmail(email)
  //     .then((response) => {
  //       localStorage.setItem("userIdAndName", JSON.stringify(response.data));
  //       //console.log(JSON.parse(localStorage.getItem("userIdAndName")).name);
  //       console.log(localStorage);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }
  getAuthService(email,password) {
      var data = { emailId: email , password: password };
      console.log(data);
      axios
        .post(
          "http://a25d7841408b245f481a7ddb568dd09f-1591248461.us-east-1.elb.amazonaws.com/auth-service/login",
          data
        )
        .then((response) => {
          console.log(response.data)
          localStorage.setItem("userId", response.data.id);
          localStorage.setItem("userIdAndName",JSON.stringify(response.data));
        })
        .catch((e) => {
          console.log(e);
        });
    }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email , password} = this.state;
    const { history } = this.props;

    this.setState({ error: false });

    // const data = { id: "10004", name: "IPL" };
    // localStorage.setItem("userIdAndName", JSON.stringify(data));

    // this.storeUserIdAndName(email);
    this.getAuthService(email,password);
    localStorage.setItem("loggedIn", true);
    history.push("/home");

    if (formValid(this.state)) {
      console.log("you have entered email and password");
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
    }

    this.setState({ formErrors, [name]: value });
  };

  render() {
    const { formErrors } = this.state;

    // if (!!localStorage.getItem("loggedIn")) {
    //   return <Redirect to="/home" />;
    // }

    return (
      <div className="wrapper">
        <h1 id="appname" style={{ color: "dark", paddingBottom: "2%" }}>
          <strong>Let's Manage</strong>
        </h1>
        <div className="form-wrapper">
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="submit">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
