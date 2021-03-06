import React, { Component } from "react";
import EmployeeAPI from "../../MicroserviceAPI/EmployeeAPI";

class UnAssignResource extends Component {
  constructor(props) {
    super(props);
    this.onChangeResourceId = this.onChangeResourceId.bind(this);
    this.onChangeEmployeeId = this.onChangeEmployeeId.bind(this);
    this.saveRequest = this.saveRequest.bind(this);
    this.newRequest = this.newRequest.bind(this);

    this.state = {
      resourceId: null,
      employeeId: null,

      submitted: false,
    };
  }

  onChangeResourceId(e) {
    this.setState({
      resourceId: e.target.value,
    });
  }

  onChangeEmployeeId(e) {
    this.setState({
      employeeId: e.target.value,
    });
  }

  saveRequest() {
    var data = {
      resourceId: this.state.resourceId,
      employeeId: this.state.employeeId,
      allocatedFrom: this.state.allocatedFrom,
      allocatedTill: this.state.allocatedTill,
    };

    EmployeeAPI.unassign(data)
      .then((response) => {
        this.setState({
          id: response.data.resourceId,
          employeeId: response.data.employeeId,
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
      submitted: false,
    });
  }

  render() {
    return (
      <div md="12" className="mx-auto">
        <h4>UnAssign Resource</h4>

        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You Submitted Successfully!</h4>
              <button className="btn btn-success" onClick={this.newRequest}>
                UnAssign Again
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

export default UnAssignResource;
