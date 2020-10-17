import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "shards-react";
import { withRouter } from "react-router-dom";

import EmployeeAPI from "../../MicroserviceAPI/EmployeeAPI";

class ReportBy extends Component {
  constructor(props) {
    console.log(props);
    super(props);

    this.retrieveJuniors = this.retrieveJuniors.bind(this);
    this.otherUserProfile = this.otherUserProfile.bind(this);

    this.state = {
      juniorsList: [],
      employee: null,
    };
  }

  componentDidMount() {
    this.retrieveJuniors();
  }

  retrieveJuniors() {
    EmployeeAPI.getJuniorsOfEmployee(
      JSON.parse(localStorage.getItem("userIdAndName")).id
    )
      .then((response) => {
        this.setState({
          juniorsList: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  otherUserProfile(list) {
    const { history } = this.props;

    if (list.id == JSON.parse(localStorage.getItem("userIdAndName")).id) {
      // history.push("/profile");
      window.location.href = "/profile";
    } else {
      localStorage.setItem("otherUserProfile", JSON.stringify(list));
      localStorage.setItem("oup", true);
      // history.push("/employee/profile");
      window.location.href = "/employee/profile";
    }
  }

  render() {
    const { juniorsList } = this.state;
    //const temp = require("./ReportTo.json");
    return (
      <div className="col-md-12">
        <div>
          <h4>Your Employees</h4>
        </div>
        <div className="row">
          {juniorsList.map((list, id) => (
            <Card key={id} className="blog-comments mb-3 mr-4 col-lg-3">
              <CardHeader className="border-bottom">
                <h6 className="m-0"> </h6>
              </CardHeader>
              <CardBody className="p-1 mx-auto">
                <div className="blog-comments__item d-flex p-3">
                  {/* Avatar */}
                  <div className="blog-comments__avatar mr-3">
                    <img
                      src={require("../../images/avatars/user.jpg")}
                      alt={list.name}
                    />
                  </div>

                  {/* Content */}
                  <div>
                    {/* Content :: Title */}
                    <div className=" text-mutes">
                      <a
                        className="text-secondary  stretched-link"
                        href="#"
                        onClick={() => this.otherUserProfile(list)}
                      >
                        {list.name}
                      </a>{" "}
                    </div>
                    {/* Content :: Body */}
                    <p className="m-0 my-1 mb-2 text-muted">
                      {list.businessTitle}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(ReportBy);
