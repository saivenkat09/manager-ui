import React, { Component } from "react";
import EmployeeAPI from "../../MicroserviceAPI/EmployeeAPI";
import { Card, CardFooter, CardHeader } from "shards-react";

class MyResources extends Component {
    constructor(props) {
        console.log(props);
        super(props);

        this.retrieveResources = this.retrieveResources.bind(this);
        this.setActiveResource = this.setActiveResource.bind(this);
        this.refreshList = this.refreshList.bind(this);

        this.state = {
            Resources: [],
            currentResource: null,
            currentIndex: -1,
        };
    }

    componentDidMount() {
        this.retrieveResources();
    }

    retrieveResources() {
        EmployeeAPI.getSelfResources(
            JSON.parse(localStorage.getItem("userIdAndName")).id
        )
            .then((response) => {
                this.setState({
                    Resources: response.data,
                });
                console.log(response.data);
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
                <h4>Your Current Resources</h4>
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
                                    id="project-list"
                                >
                                    {Resource.resourceName}
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
                                            <strong>Resource Id:</strong>
                                        </label>{" "}
                                        {currentResource.resourceId}
                                    </div>
                                    <div>
                                        <label>
                                            <strong>Resource Name:</strong>
                                        </label>{" "}
                                        {currentResource.resourceName}
                                    </div>
                                    <div>
                                        <label>
                                            <strong>Start Date:</strong>
                                        </label>{" "}
                                        {currentResource.allocatedFrom}
                                    </div>
                                    <div>
                                        <label>
                                            <strong>End Date:</strong>
                                        </label>{" "}
                                        {currentResource.allocatedTill}
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

export default MyResources;
