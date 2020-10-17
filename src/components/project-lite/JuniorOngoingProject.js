import React, { Component } from "react";
import ProjectAPI from "../../MicroserviceAPI/ProjectAPI";
import { Card, CardFooter, CardHeader } from "shards-react";

class JuniorOngoingProject extends Component {
  constructor(props) {
    console.log(props);
    super(props);

    this.retrieveProjects = this.retrieveProjects.bind(this);
    this.setActiveProject = this.setActiveProject.bind(this);
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

  componentDidMount() {
    // this.retrieveProjects();
  }

  retrieveProjects() {
    console.log(this.state.employeeId);
    ProjectAPI.getJuniorOngoingProject(
      JSON.parse(localStorage.getItem("userId")),
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

  setActiveProject(Project, index) {
    this.setState({
      currentProject: Project,
      currentIndex: index,
    });
  }

  render() {
    const { Projects, currentProject, currentIndex } = this.state;

    return (
      <div className="col-md-12">
        <h4>Your Employee's Ongoing Projects</h4>
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
                required
                value={this.state.employeeId}
                onChange={this.onChangeEmployeeId}
                name="employeeId"
              />
              <div className="mt-3 mb-3">
                <button
                  onClick={this.retrieveProjects()}
                  className=" inline btn btn-success"
                >
                  Get Details
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <Card className=" text-center border border-primary">
              {Projects &&
                Projects.map((currentProject, idx) => (
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
                      {currentProject.projectId}
                    </div>
                    <div>
                      <label>
                        <strong>Project Name:</strong>
                      </label>{" "}
                      {currentProject.projectName}
                    </div>
                    <div>
                      <label>
                        <strong>Description:</strong>
                      </label>{" "}
                      {currentProject.description}
                    </div>
                    <div>
                      <label>
                        <strong>Project Lead Id:</strong>
                      </label>{" "}
                      {currentProject.projectLeadId}
                    </div>
                    <div>
                      <label>
                        <strong>Start Date:</strong>
                      </label>{" "}
                      {currentProject.startDate}
                    </div>
                    <div>
                      <label>
                        <strong>End Date:</strong>
                      </label>{" "}
                      {currentProject.endDate}
                    </div>

                    <div>
                      <label>
                        <strong>Working Hours:</strong>
                      </label>{" "}
                      {currentProject.hours}
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

export default JuniorOngoingProject;
