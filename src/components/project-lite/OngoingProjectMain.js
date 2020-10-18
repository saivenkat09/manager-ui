import React, { Component } from "react";
import ProjectAPI from "../../MicroserviceAPI/ProjectAPI";
import { Card, CardFooter, CardHeader } from "shards-react";

class OngoingProjectMain extends Component {
  constructor(props) {
    console.log(props);
    super(props);

    this.retrieveProjects = this.retrieveProjects.bind(this);
    this.setActiveProject = this.setActiveProject.bind(this);
    this.refreshList = this.refreshList.bind(this);

    this.state = {
      Projects: [],
      currentProject: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveProjects();
  }

  retrieveProjects() {
    ProjectAPI.getOngoingProjectMain(
      JSON.parse(localStorage.getItem("userIdAndName")).id
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
        <h4>Your Ongoing Projects</h4>
        <div className="list row">
          <div className="col-md-6">
            <ul className="list-group">
              {typeof Projects !== "string" &&
                Projects &&
                Projects.map((Project, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveProject(Project, index)}
                    key={index}
                    id="project-list"
                  >
                    {Project.projectName}
                  </li>
                ))}
            </ul>
          </div>

          <div className="col-md-6">
            <Card className=" text-center border border-primary">
              {currentProject ? (
                <div>
                  <CardHeader className="border-bottom">
                    <h5 className="m-0">
                      <strong>Details</strong>
                    </h5>
                  </CardHeader>
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
              ) : (
                <div></div>
              )}
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default OngoingProjectMain;
