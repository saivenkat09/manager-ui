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

    this.state = {
      employee: null,
      skills: null,
      updateClicked: false,
      primarySkill: "",
      secondarySkill: "",
      businessTitle: "",
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
      : JSON.parse(localStorage.getItem("userId"));
    this.retrieveEmployee(param);
  }

  updateClicked() {
    this.setState({
      updateClicked: true,
    });
  }

  updateDetails() {
    const data = {
      primarySkill: this.state.primarySkill,
      secondarySkill: this.state.secondarySkill,
      businessTitle: this.state.businessTitle,
    };

    const id = !!localStorage.getItem("oup")
      ? JSON.parse(localStorage.getItem("otherUserProfile")).id
      : JSON.parse(localStorage.getItem("userId"));

    EmployeeAPI.updateEmployeeSkills(id, data)
      .then((response) => {
        this.setState({
          Resources: response.data,
          updateClicked: false,
        });
      })
      .catch((e) => {
        if (e.response) {
          console.log(e.response);
        }
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
    const { employee, updateClicked } = this.state;

    return (
      <div className="col-md-12">
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h5 className="m-0">
              <strong>Personal Details</strong>
            </h5>
          </CardHeader>
          {employee ? (
            <Form style={{ padding: "2%" }}>
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
                  id="emaimanagerIdl"
                  placeholder="Manager Id"
                  value={employee.managerId}
                  onChange={() => {}}
                  disabled="disabled"
                />
              </Col>
              <Col md="6" className="form-group">
                <label htmlFor="businessTitle">Business Title</label>
                <FormInput
                  id="businessTitle"
                  placeholder="Business Title"
                  value={employee.businessTitle}
                  onChange={this.onChangeBusinessTitle}
                />
              </Col>
              <Col md="6" className="form-group">
                <label htmlFor="primarySkill">Primary Skill</label>
                <FormInput
                  id="primarySkill"
                  placeholder="Primary Skill"
                  value={employee.primarySkill}
                  onChange={this.onChangePrimarySkill}
                />
              </Col>
              <Col md="6" className="form-group">
                <label htmlFor="secondarySkill">Secondary Skill</label>
                <FormInput
                  id="secondarySkill"
                  placeholder="Secondary Skill"
                  value={employee.secondarySkill}
                  onChange={this.onChangeSecondarySkill}
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
          <CardFooter>
            {updateClicked ? (
              <button
                onClick={this.updateDetails}
                className="btn btn-primary float-right"
              >
                Save
              </button>
            ) : (
              <button
                onClick={this.updateClicked}
                className="btn btn-info float-right"
              >
                Update
              </button>
            )}
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default UserAccountDetails;
