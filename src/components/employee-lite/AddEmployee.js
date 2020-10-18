import React, { Component } from "react";
import AdminAPI from "../../MicroserviceAPI/AdminAPI";

class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.onChangeId = this.onChangeId.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onChangeBusinessTitle = this.onChangeBusinessTitle.bind(this);
    this.onChangeLevel = this.onChangeLevel.bind(this);
    this.onChangeManagerId = this.onChangeManagerId.bind(this);
    this.onChangeDob = this.onChangeDob.bind(this);
    this.onChangeDoj = this.onChangeDoj.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);
    this.newEmployee = this.newEmployee.bind(this);

    this.state = {
      id: null,
      name: "",
      email: "",
      password: "",
      role: "",
      businessTitle: "",
      level: "",
      managerId: "",
      dob: null,
      doj: null,
      submitted: false,
    };
  }

  onChangeId(e) {
    this.setState({
      id: e.target.value,
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeRole(e) {
    this.setState({
      role: e.target.value,
    });
  }

  onChangeBusinessTitle(e) {
    this.setState({
      businessTitle: e.target.value,
    });
  }

  onChangeLevel(e) {
    this.setState({
      level: e.target.value,
    });
  }

  onChangeManagerId(e) {
    this.setState({
      managerId: e.target.value,
    });
  }

  onChangeDob(e) {
    this.setState({
      dob: e.target.value,
    });
  }

  onChangeDoj(e) {
    this.setState({
      doj: e.target.value,
    });
  }

  saveEmployee() {
    var data = {
      id: this.state.id,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role,
      businessTitle: this.state.businessTitle,
      level: this.state.level,
      managerId: this.state.managerId,
      dob: this.state.dob,
      doj: this.state.doj,
    };

    AdminAPI.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          password: response.data.password,
          role: response.data.role,
          businessTitle: response.data.businessTitle,
          level: response.data.level,
          managerId: response.data.managerId,
          dob: response.data.dob,
          doj: response.data.doj,
          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newEmployee() {
    this.setState({
      id: null,
      name: "",
      email: "",
      password: "",
      role: "",
      businessTitle: "",
      level: "",
      managerId: "",
      dob: null,
      doj: null,
      submitted: false,
    });
  }

  render() {
    return (
      <div md="12" className="mx-auto">
        <h4>Add Employee</h4>
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You Submitted Successfully!</h4>
              <button className="btn btn-success" onClick={this.newEmployee}>
                Add Again
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group ">
                <label htmlFor="id">
                  <strong>Employee Id</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  required
                  value={this.state.id}
                  onChange={this.onChangeId}
                  name="id"
                  name="id"
                />
              </div>

              <div className="form-group ">
                <label htmlFor="name">
                  <strong>Name</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  value={this.state.name}
                  onChange={this.onChangeName}
                  name="name"
                />
              </div>

              <div className="form-group ">
                <label htmlFor="email">
                  <strong>Email</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  required
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  name="email"
                />
              </div>

              <div className="form-group ">
                <label htmlFor="password">
                  <strong>Email Password</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="password"
                  required
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  name="password"
                />
              </div>

              <div className="form-group ">
                <label htmlFor="role">
                  <strong>Role</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="role"
                  required
                  value={this.state.role}
                  onChange={this.onChangeRole}
                  name="role"
                />
              </div>

              <div className="form-group ">
                <label htmlFor="businessTitle">
                  <strong>Business Title</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="businessTitle"
                  required
                  value={this.state.businessTitle}
                  onChange={this.onChangeBusinessTitle}
                  name="businessTitle"
                />
              </div>

              <div className="form-group ">
                <label htmlFor="level">
                  <strong>Level</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="level"
                  required
                  value={this.state.level}
                  onChange={this.onChangeLevel}
                  name="level"
                />
              </div>

              <div className="form-group">
                <label htmlFor="managerId">
                  <strong>Manager Id</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="managerId"
                  required
                  value={this.state.managerId}
                  onChange={this.onChangeManagerId}
                  name="managerId"
                />
              </div>

              <div className="form-group ">
                <label htmlFor="dob">
                  <strong>Birthday</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="dob"
                  required
                  value={this.state.dob}
                  onChange={this.onChangeDob}
                  name="dob"
                />
              </div>

              <div className="form-group ">
                <label htmlFor="doj">
                  <strong>Joining Date</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="doj"
                  required
                  value={this.state.doj}
                  onChange={this.onChangeDoj}
                  name="doj"
                />
              </div>

              <button onClick={this.saveEmployee} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AddEmployee;
