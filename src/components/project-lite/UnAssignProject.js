import React, { Component } from "react";
import ProjectAPI from "../../MicroserviceAPI/ProjectAPI";

class UnAssignProject extends Component {
  constructor(props) {
    super(props);
    this.onChangeProjectId = this.onChangeProjectId.bind(this);
    this.onChangeEmployeeId = this.onChangeEmployeeId.bind(this);
    this.onChangeReview = this.onChangeReview.bind(this);
    this.saveRequest = this.saveRequest.bind(this);
    this.newRequest = this.newRequest.bind(this);

    this.state = {
      projectId: null,
      employeeId: null,
      review: "",
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

  onChangeReview(e) {
    this.setState({
      review: e.target.value,
    });
  }

  saveRequest() {
    var data = {
      review: this.state.review,
    };
    ProjectAPI.unassign(
      JSON.parse(localStorage.getItem("userIdAndName")).id,
      this.state.projectId,
      this.state.employeeId,
      data
    )
      .then((response) => {
        this.setState({
          projectId: response.data.projectId,
          employeeId: response.data.employeeId,
          review: response.data.review,
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
      employeeId: null,
      review: "",
      submitted: false,
    });
  }

  render() {
    return (
      <div md="12" className="mx-auto">
        <h4>UnAssign Project</h4>

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
                <label htmlFor="review">
                  <strong>Review</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="review"
                  required
                  value={this.state.review}
                  onChange={this.onChangeReview}
                  name="review"
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

export default UnAssignProject;
