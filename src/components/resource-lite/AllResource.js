import React, { Component } from "react";
import ResourceAPI from "../../MicroserviceAPI/ResourceAPI";
import { Card, CardFooter, CardHeader } from "shards-react";

class AllResource extends Component {
  constructor(props) {
    console.log(props);
    super(props);

    this.retrieveResources = this.retrieveResources.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveResource = this.setActiveResource.bind(this);
    this.deleteResource = this.deleteResource.bind(this);

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

  componentDidUpdate() {
    this.retrieveResources();
  }

  retrieveResources() {
    ResourceAPI.getAll()
      .then((response) => {
        this.setState({
          Resources: response.data,
        });
        //console.log(response.data);
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

  deleteResource() {
    ResourceAPI.delete(this.state.currentResource.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/resource");
      })
      .catch((e) => {
        console.log(e);
      });

    this.setState({
      currentResource: null,
      currentIndex: -1,
    });
  }

  render() {
    const { Resources, currentResource, currentIndex } = this.state;

    return (
      <div className="col-md-12">
        <h4>All Resources</h4>
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
                    {Resource.name}
                  </li>
                ))}
            </ul>
          </div>

          <div className="col-md-6">
            <Card className="text-center border border-primary">
              {currentResource ? (
                <div>
                  <CardHeader className="border-bottom">
                    <h5 className="m-0">
                      <strong>Details</strong>
                    </h5>
                  </CardHeader>
                  <div>
                    <label>
                      <strong>Resource Id:</strong>
                    </label>{" "}
                    {currentResource.id}
                  </div>
                  <div>
                    <label>
                      <strong>Resource Type:</strong>
                    </label>{" "}
                    {currentResource.type}
                  </div>
                  <div>
                    <label>
                      <strong>Name:</strong>
                    </label>{" "}
                    {currentResource.name}
                  </div>
                  <div>
                    <label>
                      <strong>Total Quantity:</strong>
                    </label>{" "}
                    {currentResource.totalQuantity}
                  </div>
                  <div>
                    <label>
                      <strong>Remaining Quantity:</strong>
                    </label>{" "}
                    {currentResource.remainingQuantity}
                  </div>

                  <CardFooter className="border-top">
                    <button
                      className="btn btn-danger mr-3"
                      onClick={this.deleteResource}
                    >
                      Delete
                    </button>
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

export default AllResource;
