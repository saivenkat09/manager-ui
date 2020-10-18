import React, { Component } from "react";
import ProjectAPI from "../../MicroserviceAPI/ProjectAPI";

class AssignProject extends Component {
  constructor(props) {
    super(props);
    this.onChangeProjectId = this.onChangeProjectId.bind(this);
    this.onChangeEmployeeId = this.onChangeEmployeeId.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onChangeHourPerDay = this.onChangeHourPerDay.bind(this);
    this.saveRequest = this.saveRequest.bind(this);
    this.newRequest = this.newRequest.bind(this);

    this.state = {
      projectId: null,
      employeeId: null,
      startDate: null,
      endDate: null,
      hoursPerDay: null,
      submitted: false,
    };
  }

  onChangeProjectId(e) {
    this.setState({
      projectId: e.target.value,
    });
  }

  onChangeEmployeeId(e) {
    this.setState({
      employeeId: e.target.value,
    });
  }

  onChangeStartDate(e) {
    this.setState({
      startDate: e.target.value,
    });
  }

  onChangeEndDate(e) {
    this.setState({
      endDate: e.target.value,
    });
  }

  onChangeHourPerDay(e) {
    this.setState({
      hoursPerDay: e.target.value,
    });
  }

  saveRequest() {
    var data = {
      employeeId: this.state.employeeId,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      hoursPerDay: this.state.hoursPerDay,
    };

    ProjectAPI.assign(
      JSON.parse(localStorage.getItem("userIdAndName")).id,
      this.state.projectId,
      data
    )
      .then((response) => {
        this.setState({
          projectId: response.data.projectId,
          employeeId: response.data.employeeId,
          startDate: response.data.startDate,
          endDate: response.data.endDate,
          hoursPerDay: response.data.hoursPerDay,
          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newRequest() {
    this.setState({
      projectId: null,
      endDate: null,
      startDate: null,
      hoursPerDay: null,
      submitted: false,
    });
  }

  render() {
    return (
      <div md="12" className="mx-auto">
        <h4>Assign Project</h4>

        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You Submitted Successfully!</h4>
              <button className="btn btn-success" onClick={this.newRequest}>
                Assign Again
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group ">
                <label htmlFor="projectId">
                  <strong>Project Id</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="projectId"
                  required
                  value={this.state.projectId}
                  onChange={this.onChangeProjectId}
                  name="projectId"
                />
              </div>

              <div className="form-group ">
                <label htmlFor="employeeId">
                  <strong>Employee Id</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="employeeId"
                  required
                  value={this.state.employeeId}
                  onChange={this.onChangeEmployeeId}
                  name="employeeId"
                />
              </div>

              <div className="form-group ">
                <label htmlFor="startDate">
                  <strong>Start Date</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="startDate"
                  required
                  value={this.state.startDate}
                  onChange={this.onChangeStartDate}
                  name="startDate"
                />
              </div>

              <div className="form-group ">
                <label htmlFor="endDate">
                  <strong>End Date</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="endDate"
                  required
                  value={this.state.endDate}
                  onChange={this.onChangeEndDate}
                  name="endDate"
                />
              </div>

              <div className="form-group ">
                <label htmlFor="hoursPerDay">
                  <strong>Hours Per Day</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="hoursPerDay"
                  required
                  value={this.state.hoursPerDay}
                  onChange={this.onChangeHourPerDay}
                  name="hoursPerDay"
                />
              </div>

              <button onClick={this.saveRequest} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AssignProject;
