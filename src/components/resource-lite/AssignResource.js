import React, { Component } from "react";
import EmployeeAPI from "../../MicroserviceAPI/EmployeeAPI";

class AssignResource extends Component {
  constructor(props) {
    super(props);
    this.onChangeResourceId = this.onChangeResourceId.bind(this);
    this.onChangeEmployeeId = this.onChangeEmployeeId.bind(this);
    this.onChangeAllocatedFrom = this.onChangeAllocatedFrom.bind(this);
    this.onChangeAllocatedTill = this.onChangeAllocatedTill.bind(this);
    this.saveRequest = this.saveRequest.bind(this);
    this.newRequest = this.newRequest.bind(this);

    this.state = {
      resourceId: null,
      employeeId: null,
      allocatedFrom: null,
      allocatedTill: null,
      submitted: false,
    };
  }

  onChangeResourceId(e) {
    this.setState({
      id: e.target.value,
    });
  }

  onChangeEmployeeId(e) {
    this.setState({
      employeeId: e.target.value,
    });
  }

  onChangeAllocatedFrom(e) {
    this.setState({
      allocatedFrom: e.target.value,
    });
  }

  onChangeAllocatedTill(e) {
    this.setState({
      allocatedTill: e.target.value,
    });
  }

  saveRequest() {
    var data = {
      resourceId: this.state.resourceId,
      employeeId: this.state.employeeId,
      allocatedFrom: this.state.allocatedFrom,
      allocatedTill: this.state.allocatedTill,
    };

    EmployeeAPI.assign(data)
      .then((response) => {
        this.setState({
          resourceId: response.data.resourceId,
          employeeId: response.data.employeeId,
          allocatedFrom: response.data.allocatedFrom,
          allocatedTill: response.data.allocatedTill,
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
      resourceId: null,
      employeeId: null,
      allocatedFrom: null,
      allocatedTill: null,
      submitted: false,
    });
  }

  render() {
    return (
      <div md="12" className="mx-auto">
        <h4>
          <span>Assign Resource</span>
        </h4>

        <div className="submit-form ">
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
                <label htmlFor="resourceId">
                  <strong>Resource Id</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="resourceId"
                  required
                  value={this.state.resourceId}
                  onChange={this.onChangeResourceId}
                  name="resourceId"
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
                <label htmlFor="allocatedFrom">
                  <strong>Assigned Date</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="allocatedFrom"
                  required
                  value={this.state.allocatedFrom}
                  onChange={this.onChangeAllocatedFrom}
                  name="allocatedFrom"
                />
              </div>

              <div className="form-group ">
                <label htmlFor="allocatedTill">
                  <strong>Assigned Upto</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="allocatedTill"
                  required
                  value={this.state.allocatedTill}
                  onChange={this.onChangeAllocatedTill}
                  name="allocatedTill"
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

export default AssignResource;
