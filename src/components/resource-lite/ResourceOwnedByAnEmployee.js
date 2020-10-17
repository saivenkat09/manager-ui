import React, { Component } from "react";
import EmployeeAPI from "../../MicroserviceAPI/EmployeeAPI";
import { Card } from "shards-react";

class ResourceOwnedByAnEmployee extends Component {
  constructor(props) {
    console.log(props);
    super(props);

    this.getDetails = this.getDetails.bind(this);
    this.onChangeEmployeeId = this.onChangeEmployeeId.bind(this);
    this.updateClicked = this.updateClicked.bind(this);
    this.updateDetails = this.updateDetails.bind(this);
    this.refreshList = this.refreshList.bind(this);

    this.state = {
      Resources: [],
      employeeId: null,
      resourceId: null,
      allocatedFrom: null,
      allocatedTill: null,
      updateClicked: false,
    };
  }

  onChangeEmployeeId(e) {
    this.setState({
      employeeId: e.target.value,
    });
  }

  getDetails() {
    EmployeeAPI.getResourcesOwned(this.state.employeeId)
      .then((response) => {
        this.setState({
          Resources: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateClicked() {
    this.setState({
      updateClicked: true,
    });
  }

  refreshList() {
    this.retrieveResources();
    this.setState({
      currentResource: null,
      currentIndex: -1,
    });
  }

  updateDetails() {
    const data = {
      resourceId: this.state.resourceId,
      employeeId: this.state.employeeId,
      allocatedFrom: this.state.allocatedFrom,
      allocatedTill: this.state.allocatedTill,
    };

    EmployeeAPI.updateAssignResourceToEmployee(data)
      .then((response) => {
        this.setState({
          Resources: response.data,
          updateClicked: false,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { Resources, updateClicked } = this.state;

    return (
      <div className="col-md-12">
        <h4>Resources Owned By An Employee</h4>
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
                  onClick={this.getDetails}
                  className=" inline btn btn-success"
                >
                  Get Details
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <Card className="text-center border border-primary">
              <div className="list row">
                <div>
                  {Resources &&
                    Resources.map((Resource, idx) => (
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
                          {Resource.resourceId}
                        </div>
                        <div>
                          <label>
                            <strong>Assigned Date:</strong>
                          </label>{" "}
                          {Resource.allocatedFrom}
                        </div>
                        <div>
                          <label>
                            <strong>Assigned Upto:</strong>
                          </label>{" "}
                          {Resource.allocatedTill}
                        </div>
                        {updateClicked ? (
                          <button
                            onClick={this.updateDetails}
                            className="btn btn-primary"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={this.updateClicked}
                            className="btn btn-primary"
                          >
                            Update
                          </button>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default ResourceOwnedByAnEmployee;
