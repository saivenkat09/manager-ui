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

class UserWorkEx extends Component {
  constructor(props) {
    console.log(props);
    super(props);

    this.retrieveEmployee = this.retrieveEmployee.bind(this);
    this.updateClicked = this.updateClicked.bind(this);
    this.updateDetails = this.updateDetails.bind(this);
    this.onChangeCompany = this.onChangeCompany.bind(this);
    this.onChangePosition = this.onChangePosition.bind(this);
    this.cancelUpdate = this.cancelUpdate.bind(this);

    this.state = {
      workExList: [],
      otherUser: false,
      position: "",
      companyName: "",
    };
  }

  onChangePosition(e) {
    this.setState({
      position: e.target.value,
    });
  }

  onChangeCompany(e) {
    this.setState({
      companyName: e.target.value,
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
      position: this.state.position,
      companyName: this.state.companyName,
    };

    EmployeeAPI.updateWorkEx(
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
      position: "",
      companyName: "",
    });
  }

  retrieveEmployee(id) {
    EmployeeAPI.getWorkEx(id)
      .then((response) => {
        this.setState({
          workExList: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { workExList, otherUser, updateClicked } = this.state;

    return (
      <div className="col-md-12">
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h5 className="m-0">
              <strong>Work Experience Details</strong>
            </h5>
          </CardHeader>
          {workExList.map((item, idx) => {
            return (
              <Form key={idx} style={{ padding: "1%" }}>
                <Col md="6" className="form-group">
                  <label htmlFor="position">Position</label>
                  <FormInput
                    id="position"
                    placeholder="Position"
                    value={item.position}
                    onChange={() => {}}
                    disabled="disabled"
                  />
                </Col>

                <Col md="6" className="form-group">
                  <label htmlFor="companyName">Company Name</label>
                  <FormInput
                    id="companyName"
                    placeholder="Company Name"
                    value={item.companyName}
                    onChange={() => {}}
                    disabled="disabled"
                  />
                </Col>
              </Form>
            );
          })}
          {updateClicked ? (
            <Form style={{ padding: "1%" }}>
              <Col md="6" className="form-group">
                <label htmlFor="position">Position</label>
                <FormInput
                  id="position"
                  placeholder="Position"
                  required
                  value={this.state.position}
                  onChange={this.onChangePosition}
                />
              </Col>

              <Col md="6" className="form-group">
                <label htmlFor="companyName">Company Name</label>
                <FormInput
                  id="companyName"
                  placeholder="Company Name"
                  required
                  value={this.state.companyName}
                  onChange={this.onChangeCompany}
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

export default UserWorkEx;
