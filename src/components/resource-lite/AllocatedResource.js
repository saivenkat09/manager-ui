import React, { Component } from "react";
import EmployeeAPI from "../../MicroserviceAPI/EmployeeAPI";
import { Card, CardFooter, CardHeader } from "shards-react";

class AllocatedResource extends Component {
  constructor(props) {
    console.log(props);
    super(props);

    this.retrieveResources = this.retrieveResources.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveResource = this.setActiveResource.bind(this);

    this.state = {
      Resources: [],
      currentResource: null,
      currentIndex: -1,
      searchName: "",
    };
  }

  componentDidMount() {
    this.retrieveResources();
  }

  retrieveResources() {
    EmployeeAPI.getDescendentResources(
      JSON.parse(localStorage.getItem("userIdAndName")).id
    )
      .then((response) => {
        this.setState({
          Resources: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveResources();
    this.setState({
      currentResource: null,
      currentIndex: -1,
    });
  }

  setActiveResource(Resource, index) {
    this.setState({
      currentResource: Resource,
      currentIndex: index,
    });
  }

  render() {
    const { Resources, currentResource, currentIndex } = this.state;

    return (
      <div className="col-md-12">
        <h4>Resources Allocated to Your Employees</h4>
        <div className="list row">
          <div className="col-md-6">
            <ul className="list-group">
              {Resources &&
                Resources.map((Resource, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveResource(Resource, index)}
                    key={index}
                    id="resource-list"
                  >
                    {Resource.employeeName}
                  </li>
                ))}
            </ul>
          </div>

          <div className="col-md-6">
            <Card className=" text-center border border-primary">
              {currentResource ? (
                <div>
                  <CardHeader className="border-bottom">
                    <h5 className="m-0">
                      <strong>Details</strong>
                    </h5>
                  </CardHeader>
                  <div>
                    <label>
                      <strong>Employee Id:</strong>
                    </label>{" "}
                    {currentResource.employeeId}
                  </div>
                  <div>
                    <label>
                      <strong>Employee Name:</strong>
                    </label>{" "}
                    {currentResource.employeeName}
                  </div>
                  <hr />
                  <div>
                    <div>
                      <h5>
                        <strong>Resources Allocated</strong>
                      </h5>
                    </div>
                    <hr />
                    {currentResource.allResources &&
                      currentResource.allResources.map((item, idx) => {
                        return (
                          <div key={idx}>
                            <div>
                              <label>
                                <strong>({idx + 1})</strong>
                              </label>
                            </div>
                            <div>
                              <label>
                                <strong>Resource Id:</strong>
                              </label>{" "}
                              {item.resourceId}
                            </div>
                            <div>
                              <label>
                                <strong>Assigned Date:</strong>
                              </label>{" "}
                              {item.allocatedFrom}
                            </div>
                            <div>
                              <label>
                                <strong>Assigned Upto:</strong>
                              </label>{" "}
                              {item.allocatedTill}
                            </div>
                          </div>
                        );
                      })}
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

export default AllocatedResource;
