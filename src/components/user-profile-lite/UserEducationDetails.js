import React, { Component } from "react";
import {
  Card,
  CardHeader,
  Col,
  Form,
  FormInput,
  CardFooter,
  Button,
} from "shards-react";

import EmployeeAPI from "../../MicroserviceAPI/EmployeeAPI";

class UserEducationDetails extends Component {
  constructor(props) {
    console.log(props);
    super(props);

    this.retrieveEmployee = this.retrieveEmployee.bind(this);
    this.updateClicked = this.updateClicked.bind(this);
    this.updateDetails = this.updateDetails.bind(this);
    this.onChangeCollege = this.onChangeCollege.bind(this);
    this.onChangeDegree = this.onChangeDegree.bind(this);
    this.cancelUpdate = this.cancelUpdate.bind(this);

    this.state = {
      educationList: [],

      otherUser: false,
      degree: "",
      college: "",
    };
  }

  onChangeDegree(e) {
    this.setState({
      degree: e.target.value,
    });
  }

  onChangeCollege(e) {
    this.setState({
      college: e.target.value,
    });
  }

  componentDidMount() {
    const param = !!localStorage.getItem("oup")
      ? JSON.parse(localStorage.getItem("otherUserProfile")).id
      : JSON.parse(localStorage.getItem("userIdAndName")).id;

    if (!!localStorage.getItem("oup")) {
      this.setState({
        otherUser: true,
      });
    }
    console.log(param);
    this.retrieveEmployee(param);
  }

  componentDidUpdate() {
    this.retrieveEmployee(JSON.parse(localStorage.getItem("userIdAndName")).id);
  }

  updateClicked() {
    this.setState({
      updateClicked: true,
    });
  }

  cancelUpdate() {
    this.setState({
      updateClicked: false,
    });
  }

  updateDetails() {
    const data = {
      degree: this.state.degree,
      college: this.state.college,
    };

    console.log(data);

    EmployeeAPI.updateEducationDetails(
      JSON.parse(localStorage.getItem("userIdAndName")).id,
      data
    )
      .then((response) => {
        this.setState({
          Resources: response.data,
        });
      })
      .catch((e) => {
        if (e.response) {
          console.log(e.response);
        }
      });

    this.setState({
      updateClicked: false,
      degree: "",
      college: "",
    });
  }

  retrieveEmployee(param) {
    EmployeeAPI.getEducation(param)
      .then((response) => {
        this.setState({
          educationList: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { educationList, otherUser, updateClicked } = this.state;

    return (
      <div className="col-md-12">
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h5 className="m-0">
              <strong>Education Details</strong>
            </h5>
          </CardHeader>
          {educationList.map((item, idx) => {
            return (
              <Form key={idx} style={{ padding: "0%" }}>
                <Col md="6" className="form-group">
                  <label htmlFor="degree">Degree</label>
                  <FormInput
                    id="degree"
                    placeholder="Degree"
                    value={item.degree}
                    onChange={() => {}}
                    disabled="disabled"
                  />
                </Col>

                <Col md="6" className="form-group">
                  <label htmlFor="university">University</label>
                  <FormInput
                    id="university"
                    placeholder="University"
                    value={item.college}
                    onChange={() => {}}
                    disabled="disabled"
                  />
                </Col>
              </Form>
            );
          })}
          {updateClicked ? (
            <Form style={{ padding: "0%" }}>
              <Col md="6" className="form-group">
                <label htmlFor="degree">Degree</label>
                <FormInput
                  id="degree"
                  placeholder="Degree"
                  required
                  value={this.state.degree}
                  onChange={this.onChangeDegree}
                />
              </Col>

              <Col md="6" className="form-group">
                <label htmlFor="university">University</label>
                <FormInput
                  id="university"
                  placeholder="University"
                  required
                  value={this.state.college}
                  onChange={this.onChangeCollege}
                />
              </Col>
            </Form>
          ) : (
            <div></div>
          )}
          {!otherUser ? (
            <CardFooter>
              {updateClicked ? (
                <div className="float-right">
                  <button
                    onClick={this.updateDetails}
                    className="btn btn-outline-primary mr-3"
                  >
                    Save
                  </button>
                  <button
                    onClick={this.cancelUpdate}
                    className="btn btn-outline-danger"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={this.updateClicked}
                  className="btn btn-outline-info float-right"
                >
                  Update
                </button>
              )}
            </CardFooter>
          ) : (
            <div></div>
          )}
        </Card>
      </div>
    );
  }
}

export default UserEducationDetails;
