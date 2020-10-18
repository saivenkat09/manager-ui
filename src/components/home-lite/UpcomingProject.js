import React, { Component } from "react";
import { Card, CardHeader, Col, Form, FormInput } from "shards-react";

import ProjectAPI from "../../MicroserviceAPI/ProjectAPI";

class UpcomingProject extends Component {
  constructor(props) {
    super(props);

    this.retrieveProject = this.retrieveProject.bind(this);

    this.state = {
      projectList: [],
    };
  }

  componentDidMount() {
    this.retrieveProject();
  }

  retrieveProject() {
    ProjectAPI.getUpComingProject(
      JSON.parse(localStorage.getItem("userIdAndName")).id
    )
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
            <h5 className="m-0">Upcoming Projects</h5>
          </CardHeader>
          {typeof projectList !== "string" && projectList ? (
            projectList.map((item, idx) => {
              return (
                <Form key={idx} style={{ padding: "0%" }}>
                  <Col md="6" className="form-group">
                    <label htmlFor="projectId">Project Id</label>
                    <FormInput
                      id="projectId"
                      placeholder="Project Id"
                      value={item.projectId}
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
            })
          ) : (
            <div></div>
          )}
        </Card>
      </div>
    );
  }
}

export default UpcomingProject;
