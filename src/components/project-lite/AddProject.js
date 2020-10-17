import React, { Component } from "react";
import ProjectAPI from "../../MicroserviceAPI/ProjectAPI";

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.onChangeProjectId = this.onChangeProjectId.bind(this);
    this.onChangeProjectName = this.onChangeProjectName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeProjectLeadId = this.onChangeProjectLeadId.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.saveRequest = this.saveRequest.bind(this);
    this.newRequest = this.newRequest.bind(this);

    this.state = {
      projectId: null,
      projectName: "",
      description: "",
      projectLeadId: "",
      startDate: null,
      endDate: null,
      submitted: false,
    };
  }

  onChangeProjectId(e) {
    this.setState({
      projectId: e.target.value,
    });
  }

  onChangeProjectName(e) {
    this.setState({
      projectName: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeProjectLeadId(e) {
    this.setState({
      projectLeadId: e.target.value,
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

  saveRequest() {
    const data = {
      projectId: this.state.projectId,
      projectName: this.state.projectName,
      description: this.state.description,
      projectLeadId: this.state.projectLeadId,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    };
    ProjectAPI.addProject(data)
      .then((response) => {
        this.setState({
          projectId: response.data.projectId,
          projectName: response.data.projectName,
          description: response.data.description,
          projectLeadId: response.data.projectLeadId,
          startDate: response.data.startDate,
          endDate: response.data.endDate,
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
      projectName: "",
      description: "",
      projectLeadId: "",
      startDate: null,
      endDate: null,
      submitted: false,
    });
  }

  render() {
    return (
      <div md="12" className="mx-auto">
        <h4>Add Project</h4>

        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You Submitted Successfully!</h4>
              <button className="btn btn-success" onClick={this.newRequest}>
                Add Again
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
                <label htmlFor="projectName">
                  <strong>Project Name</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="projectName"
                  required
                  value={this.state.projectName}
                  onChange={this.onChangeProjectName}
                  name="projectName"
                />
              </div>

              <div className="form-group ">
                <label htmlFor="description">
                  <strong>Description</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  name="description"
                />
              </div>

              <div className="form-group ">
                <label htmlFor="projectLeadId">
                  <strong>Project Lead Id</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="projectLeadId"
                  required
                  value={this.state.projectLeadId}
                  onChange={this.onChangeProjectLeadId}
                  name="projectLeadId"
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

export default AddProject;
