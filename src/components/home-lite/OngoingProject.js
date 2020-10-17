import React, { Component } from "react";
import { Card, CardHeader, Col, Form, FormInput } from "shards-react";
import EmployeeAPI from "../../MicroserviceAPI/EmployeeAPI";

class OngoingProject extends Component {
  constructor(props) {
    console.log(props);
    super(props);

    this.retrieveProject = this.retrieveProject.bind(this);
    this.state = {
      projectList: [],
    };
  }


  componentDidMount() {
    const param = !!localStorage.getItem("oup")
    ? JSON.parse(localStorage.getItem("otherUserProfile")).id
        : JSON.parse(localStorage.getItem("userId"));

    this.retrieveProject(param);
  }

  retrieveProject(param) {
    EmployeeAPI.getStartedProjects(param)
      .then((response) => {
        this.setState({
          projectList: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { projectList } = this.state;

    return (
      <div md="12" className="mx-auto">
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h5 className="m-0">Ongoing Projects</h5>
          </CardHeader>
          {projectList.map((item) => {
            return (
              <Form style={{ padding: "0%" }}>
                <Col md="6" className="form-group">
                  <label htmlFor="projectName">Project Name</label>
                  <FormInput
                    id="projectName"
                    placeholder="projectName"
                    value={item.projectName}
                    onChange={() => {}}
                    disabled="disabled"
                  />
                </Col>

                <Col md="6" className="form-group">
                  <label htmlFor="description">Description</label>
                  <FormInput
                    id="description"
                    placeholder="description"
                    value={item.description}
                    onChange={() => {}}
                    disabled="disabled"
                  />
                </Col>
              </Form>
            );
          })}
        </Card>
      </div>
    );
  }
}

export default OngoingProject;
