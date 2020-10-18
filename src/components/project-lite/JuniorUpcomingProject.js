import React, { Component } from "react";
import ProjectAPI from "../../MicroserviceAPI/ProjectAPI";
import { Card, CardFooter, CardHeader } from "shards-react";

class JuniorUpcomingProject extends Component {
  constructor(props) {
    console.log(props);
    super(props);

    this.getDetails = this.getDetails.bind(this);

    this.refreshList = this.refreshList.bind(this);
    this.onChangeEmployeeId = this.onChangeEmployeeId.bind(this);

    this.state = {
      Projects: [],
      currentProject: null,
      employeeId: null,
      currentIndex: -1,
    };
  }

  onChangeEmployeeId(e) {
    this.setState({
      employeeId: e.target.value,
    });
  }

  //   componentDidMount() {
  //     this.retrieveProjects();
  //   }

  getDetails() {
    console.log(this.state.employeeId);
    ProjectAPI.getJuniorUpcomingProject(
      JSON.parse(localStorage.getItem("userIdAndName")).id,
      this.state.employeeId
    )
      .then((response) => {
        this.setState({
          Projects: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveProjects();
    this.setState({
      currentProject: null,
      employeeId: null,
      currentIndex: -1,
    });
  }

  render() {
    const { Projects, currentProject } = this.state;

    return (
      <div className="col-md-12">
        <h4>Your Employee's Upcoming Projects</h4>
        <div className="list row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="employeeId">
                <strong>Employee Id</strong>
              </label>
              <input
                className="form-control"
                id="employeeId"
                type="text"
                placeholder="Employee Id"
                required
                value={this.state.employeeId}
                onChange={this.onChangeEmployeeId}
                name="employeeId"
              />
              <div className="mt-3 mb-3">
                <button
                  onClick={this.getDetails}
                  className=" inline btn btn-outline-success"
                >
                  Get Details
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <Card className=" text-center border border-primary">
              {typeof Projects !== "string" &&
                Projects &&
                Projects.map((Project, idx) => (
                  <div key={idx}>
                    <CardHeader className="border-bottom">
                      <h5 className="m-0">
                        <strong>Details</strong>
                      </h5>
                    </CardHeader>
                    <div>
                      <label>
                        <strong>({idx + 1})</strong>
                      </label>
                    </div>
                    <div>
                      <label>
                        <strong>Project Id:</strong>
                      </label>{" "}
                      {Project.projectId}
                    </div>
                    <div>
                      <label>
                        <strong>Project Name:</strong>
                      </label>{" "}
                      {Project.projectName}
                    </div>
                    <div>
                      <label>
                        <strong>Description:</strong>
                      </label>{" "}
                      {Project.description}
                    </div>
                    <div>
                      <label>
                        <strong>Project Lead Id:</strong>
                      </label>{" "}
                      {Project.projectLeadId}
                    </div>
                    <div>
                      <label>
                        <strong>Start Date:</strong>
                      </label>{" "}
                      {Project.startDate}
                    </div>
                    <div>
                      <label>
                        <strong>End Date:</strong>
                      </label>{" "}
                      {Project.endDate}
                    </div>

                    <div>
                      <label>
                        <strong>Working Hours:</strong>
                      </label>{" "}
                      {Project.hours}
                    </div>
                    <CardFooter className="border-top">
                      <a onClick={this.refreshList}>
                        <u>Hide</u>
                      </a>
                    </CardFooter>
                  </div>
                ))}
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default JuniorUpcomingProject;
