import React, { Component } from "react";
import {
  Card,
  CardHeader,
  Col,
  Form,
  FormInput,
  CardFooter,
} from "shards-react";

import EmployeeAPI from "../../MicroserviceAPI/EmployeeAPI";

class UserAccountDetails extends Component {
  constructor(props) {
    console.log(props);
    super(props);

    this.retrieveEmployee = this.retrieveEmployee.bind(this);
    this.onChangeBusinessTitle = this.onChangeBusinessTitle.bind(this);
    this.onChangePrimarySkill = this.onChangePrimarySkill.bind(this);
    this.onChangeSecondarySkill = this.onChangeSecondarySkill.bind(this);
    this.updateClicked = this.updateClicked.bind(this);
    this.updateDetails = this.updateDetails.bind(this);
    this.checkAccess = this.checkAccess.bind(this);
    this.cancelUpdate = this.cancelUpdate.bind(this);

    this.state = {
      employee: null,
      updateClicked: false,
      primarySkill: "",
      secondarySkill: "",
      businessTitle: "",
      access: null,
    };
  }

  onChangePrimarySkill(e) {
    this.setState({
      primarySkill: e.target.value,
    });
  }

  onChangeSecondarySkill(e) {
    this.setState({
      secondarySkill: e.target.value,
    });
  }

  onChangeBusinessTitle(e) {
    this.setState({
      businessTitle: e.target.value,
    });
  }

  componentDidMount() {
    const param = !!localStorage.getItem("oup")
      ? JSON.parse(localStorage.getItem("otherUserProfile")).id
      : JSON.parse(localStorage.getItem("userIdAndName")).id;

    if (!!localStorage.getItem("oup")) {
      this.checkAccess();
    } else {
      this.setState({
        access: 1,
      });
    }

    this.retrieveEmployee(param);
  }

  componentDidUpdate() {
    const param = !!localStorage.getItem("oup")
      ? JSON.parse(localStorage.getItem("otherUserProfile")).id
      : JSON.parse(localStorage.getItem("userIdAndName")).id;

    this.retrieveEmployee(param);
  }

  updateClicked() {
    this.setState({
      updateClicked: true,
      primarySkill: this.state.employee.primarySkill,
      secondarySkill: this.state.employee.secondarySkill,
      businessTitle: this.state.employee.businessTitle,
    });
  }

  cancelUpdate() {
    this.setState({
      updateClicked: false,
    });
  }

  checkAccess() {
    EmployeeAPI.getAccess(
      JSON.parse(localStorage.getItem("userIdAndName")).id,
      JSON.parse(localStorage.getItem("otherUserProfile")).id
    )
      .then((response) => {
        this.setState({
          access: response.data,
        });
        console.log(this.state.access);
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(JSON.parse(localStorage.getItem("otherUserProfile")).id);
    console.log(JSON.parse(localStorage.getItem("userIdAndName")).id);
  }

  updateDetails() {
    const data = {
      primarySkill: this.state.primarySkill,
      secondarySkill: this.state.secondarySkill,
      businessTitle: this.state.businessTitle,
    };

    const id =
      !!localStorage.getItem("oup") && this.state.access
        ? JSON.parse(localStorage.getItem("otherUserProfile")).id
        : JSON.parse(localStorage.getItem("userIdAndName")).id;

    EmployeeAPI.updateEmployeeSkills(
      JSON.parse(localStorage.getItem("userIdAndName")).id,
      id,
      data
    )
      .then((response) => {
        this.setState({
          primarySkill: response.data.primarySkill,
          secondarySkill: response.data.secondarySkill,
          businessTitle: response.data.businessTitle,
        });
      })
      .catch((e) => {
        if (e.response) {
          console.log(e.response);
        }
      });

    this.setState({
      updateClicked: false,
    });
  }

  retrieveEmployee(id) {
    EmployeeAPI.get(id)
      .then((response) => {
        this.setState({
          employee: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { employee, updateClicked, access } = this.state;

    return (
      <div className="col-md-12">
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h5 className="m-0">
              <strong>Personal Details</strong>
            </h5>
          </CardHeader>
          {employee ? (
            <Form style={{ padding: "0%" }}>
              <Col md="6" className="form-group">
                <label htmlFor="name">Name</label>
                <FormInput
                  id="name"
                  placeholder="Name"
                  value={employee.name}
                  onChange={() => {}}
                  disabled="disabled"
                />
              </Col>

              <Col md="6" className="form-group">
                <label htmlFor="id">Employee Id</label>
                <FormInput
                  id="id"
                  placeholder="Employee Id"
                  value={employee.id}
                  onChange={() => {}}
                  disabled="disabled"
                />
              </Col>

              <Col md="6" className="form-group">
                <label htmlFor="email">Email</label>
                <FormInput
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={employee.email}
                  onChange={() => {}}
                  disabled="disabled"
                />
              </Col>
              <Col md="6" className="form-group">
                <label htmlFor="level">Level</label>
                <FormInput
                  id="level"
                  placeholder="Level"
                  value={employee.level}
                  onChange={() => {}}
                  disabled="disabled"
                />
              </Col>
              <Col md="6" className="form-group">
                <label htmlFor="managerId">Manager Id</label>
                <FormInput
                  id="managerId"
                  placeholder="Manager Id"
                  value={employee.managerId}
                  onChange={() => {}}
                  disabled="disabled"
                />
              </Col>
              <Col md="6" className="form-group">
                <label htmlFor="businessTitle">Business Title</label>
                <FormInput
                  type="text"
                  id="businessTitle"
                  placeholder="Business Title"
                  value={
                    updateClicked
                      ? this.state.businessTitle
                      : employee.businessTitle
                  }
                  onChange={this.onChangeBusinessTitle}
                  disabled={updateClicked ? null : "disabled"}
                />
              </Col>
              <Col md="6" className="form-group">
                <label htmlFor="primarySkill">Primary Skill</label>
                <FormInput
                  type="text"
                  id="primarySkill"
                  placeholder="Primary Skill"
                  value={
                    updateClicked
                      ? this.state.primarySkill
                      : employee.primarySkill
                  }
                  onChange={this.onChangePrimarySkill}
                  disabled={updateClicked ? null : "disabled"}
                />
              </Col>
              <Col md="6" className="form-group">
                <label htmlFor="secondarySkill">Secondary Skill</label>
                <FormInput
                  type="text"
                  id="secondarySkill"
                  placeholder="Secondary Skill"
                  value={
                    updateClicked
                      ? this.state.secondarySkill
                      : employee.secondarySkill
                  }
                  onChange={this.onChangeSecondarySkill}
                  disabled={updateClicked ? null : "disabled"}
                />
              </Col>
              <Col md="6" className="form-group">
                <label htmlFor="birthday">Birthday</label>
                <FormInput
                  id="birthday"
                  placeholder="Birthday"
                  value={employee.dob}
                  onChange={() => {}}
                  disabled="disabled"
                />
              </Col>
              <Col md="6" className="form-group">
                <label htmlFor="joiningDate">Joining Date</label>
                <FormInput
                  id="joiningDate"
                  placeholder="Joining Date"
                  value={employee.doj}
                  onChange={() => {}}
                  disabled="disabled"
                />
              </Col>
            </Form>
          ) : (
            <div></div>
          )}
          {access ? (
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

export default UserAccountDetails;
