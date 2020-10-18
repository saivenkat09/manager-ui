import React, { Component } from "react";
import ResourceAPI from "../../MicroserviceAPI/ResourceAPI";

class AddResource extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeId = this.onChangeId.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeTotalQuantity = this.onChangeTotalQuantity.bind(this);

    this.saveResource = this.saveResource.bind(this);
    this.newResource = this.newResource.bind(this);

    this.state = {
      id: null,
      name: "",
      type: "",
      totalQuantity: "",

      submitted: false,
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeId(e) {
    this.setState({
      id: e.target.value,
    });
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value,
    });
  }

  onChangeTotalQuantity(e) {
    this.setState({
      totalQuantity: e.target.value,
    });
  }

  saveResource() {
    var data = {
      name: this.state.name,
      id: this.state.id,
      type: this.state.type,
      totalQuantity: this.state.totalQuantity,
    };

    ResourceAPI.create(data)
      .then((response) => {
        this.setState({
          name: response.data.name,
          id: response.data.id,
          type: response.data.type,
          totalQuantity: response.data.totalQuantity,

          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newResource() {
    this.setState({
      id: null,
      name: "",
      type: "",
      totalQuantity: "",

      submitted: false,
    });
  }

  render() {
    return (
      <div md="12" className="mx-auto">
        <h4>Add Resource</h4>
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You Submitted Successfully!</h4>
              <button className="btn btn-success" onClick={this.newResource}>
                Add Again
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group ">
                <label htmlFor="name">
                  <strong>Name</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  value={this.state.name}
                  onChange={this.onChangeName}
                  name="name"
                />
              </div>

              <div className="form-group ">
                <label htmlFor="id">
                  <strong>Resource Id</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  required
                  value={this.state.id}
                  onChange={this.onChangeId}
                  name="id"
                />
              </div>

              <div className="form-group ">
                <label htmlFor="type">
                  <strong>Type</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="type"
                  required
                  value={this.state.type}
                  onChange={this.onChangeType}
                  name="type"
                />
              </div>

              <div className="form-group ">
                <label htmlFor="totalQuantity">
                  <strong>Total Quantity</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="totalQuantity"
                  required
                  value={this.state.totalQuantity}
                  onChange={this.onChangeTotalQuantity}
                  name="totalQuantity"
                />
              </div>

              <button onClick={this.saveResource} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AddResource;
