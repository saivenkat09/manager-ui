import React, { Component } from "react";
import ResourceAPI from "../../MicroserviceAPI/ResourceAPI";
class UpdateQuantity extends Component {
  constructor(props) {
    super(props);
    this.onChangeResourceId = this.onChangeResourceId.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.saveRequest = this.saveRequest.bind(this);
    this.newRequest = this.newRequest.bind(this);

    this.state = {
      resourceId: null,
      quantity: null,

      submitted: false,
    };
  }

  onChangeResourceId(e) {
    this.setState({
      resourceId: e.target.value,
    });
  }

  onChangeQuantity(e) {
    this.setState({
      quantity: e.target.value,
    });
  }

  saveRequest() {
    const data = {
      resourceId: this.state.resourceId,
      quantity: this.state.quantity,
    };

    ResourceAPI.update(data)
      .then((response) => {
        this.setState({
          resourceId: response.data.resourceId,
          quantity: response.data.quantity,
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
      resourceId: null,
      quantity: null,
      submitted: false,
    });
  }

  render() {
    return (
      <div md="12" className="mx-auto">
        <h4>Update Resource Quantity</h4>

        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You Submitted Successfully!</h4>
              <button className="btn btn-success" onClick={this.newRequest}>
                Update Again
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group ">
                <label htmlFor="resourceId">
                  <strong>Resource Id</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="resourceId"
                  required
                  value={this.state.resourceId}
                  onChange={this.onChangeResourceId}
                  name="resourceId"
                />
              </div>

              <div className="form-group ">
                <label htmlFor="Quantity">
                  <strong>Quantity</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="quantity"
                  required
                  value={this.state.quantity}
                  onChange={this.onChangeQuantity}
                  name="quantity"
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

export default UpdateQuantity;
