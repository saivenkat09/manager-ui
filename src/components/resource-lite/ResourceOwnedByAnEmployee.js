import React, { Component } from "react";
import EmployeeAPI from "../../MicroserviceAPI/EmployeeAPI";
import {
  Card,
  CardHeader,
  Col,
  Form,
  FormInput,
  CardFooter,
} from "shards-react";

class ResourceOwnedByAnEmployee extends Component {
  constructor(props) {
    super(props);

    this.getDetails = this.getDetails.bind(this);
    this.onChangeEmployeeId = this.onChangeEmployeeId.bind(this);
    this.onChangedAllocatedTill = this.onChangedAllocatedTill.bind(this);
    this.updateClicked = this.updateClicked.bind(this);
    this.updateDetails = this.updateDetails.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.cancelUpdate = this.cancelUpdate.bind(this);

    this.state = {
      Resources: [],
      employeeId: null,
      allocatedTill: null,
      updateClicked: false,
      detailsClicked: false,
    };
  }

  onChangeEmployeeId(e) {
    this.setState({
      employeeId: e.target.value,
    });
  }

  onChangedAllocatedTill(e) {
    this.setState({
      allocatedTill: e.target.value,
    });
  }

  getDetails() {
    EmployeeAPI.getResourcesOwned(this.state.employeeId)
      .then((response) => {
        this.setState({
          Resources: response.data,
          detailsClicked: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateClicked() {
    this.setState({
      updateClicked: true,
      Resources: this.state.Resources,
    });
  }

  refreshList() {
    this.setState({
      detailsClicked: false,
    });
  }

  cancelUpdate() {
    this.setState({
      updateClicked: false,
    });
  }

  updateDetails() {
    const data = {
      resourceId: this.state.resourceId,
      employeeId: this.state.employeeId,
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
    const { Resources, updateClicked, detailsClicked } = this.state;

    return (
      <div className="col-md-12">
        <h4>Update Resources Owned By An Employee</h4>
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

          {detailsClicked ? (
            <div className="col-md-6">
              <Card className="text-center border border-primary">
                <CardHeader className="border-bottom">
                  <h5 className="m-0">
                    <strong>Details</strong>
                  </h5>
                </CardHeader>
                {Resources.map((Resource, idx) => (
                  <div>
                    <div key={idx}>
                      <Form style={{ padding: "0%" }}>
                        <Col className="form-group">
                          <label htmlFor="resourceId">Resource Id</label>
                          <FormInput
                            id="resourceId"
                            placeholder="resourceId"
                            value={Resource.resourceId}
                            onChange={this.onChangeResourceId}
                            disabled="disabled"
                          />
                        </Col>

                        <Col className="form-group">
                          <label htmlFor="allocatedFrom">Assigned Date</label>
                          <FormInput
                            id="allocatedFrom"
                            placeholder="allocatedFrom Id"
                            value={Resource.allocatedFrom}
                            onChange={this.onChangedAllocatedFrom}
                            disabled="disabled"
                          />
                        </Col>

                        <Col className="form-group">
                          <label htmlFor="allocatedTill">Assigned Upto</label>
                          <FormInput
                            id="allocatedTill"
                            placeholder="allocatedTill"
                            value={
                              updateClicked
                                ? this.state.allocatedTill
                                : Resource.allocatedTill
                            }
                            onChange={this.onChangedAllocatedTill}
                            disabled={updateClicked ? null : "disabled"}
                          />
                        </Col>
                      </Form>
                    </div>
                  </div>
                ))}
                <CardFooter className="border-top">
                  <a onClick={this.refreshList}>
                    <u>Hide</u>
                  </a>
                  {updateClicked ? (
                    <div className="float-right">
                      <button
                        onClick={this.updateDetails}
                        className="btn btn-outline-primary mr-3"
                      >
                        Save
                      </button>
                      <button
                        onClick={this.cancelUpdate}
                        className="btn btn-outline-danger mr-3"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={this.updateClicked}
                      className="btn btn-outline-info float-right mr-3 mb-2"
                    >
                      Update
                    </button>
                  )}
                </CardFooter>
              </Card>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}

export default ResourceOwnedByAnEmployee;
