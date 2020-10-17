import React, { Component } from "react";
import { Card, CardHeader } from "shards-react";

import EmployeeAPI from "../../MicroserviceAPI/EmployeeAPI";

class ReportTo extends Component {
  constructor(props) {
    console.log(props);
    super(props);

    this.retrieveSeniors = this.retrieveSeniors.bind(this);
    this.otherUserProfile = this.otherUserProfile.bind(this);

    this.state = {
      seniorsList: [],
    };
  }

  componentDidMount() {
    const param = !!localStorage.getItem("oup")
      ? JSON.parse(localStorage.getItem("otherUserProfile")).id
      : JSON.parse(localStorage.getItem("userId"));

    this.retrieveSeniors(param);
  }

  retrieveSeniors(id) {
    EmployeeAPI.getSeniorsOfEmployee(id)
      .then((response) => {
        this.setState({
          seniorsList: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  otherUserProfile(list) {
    localStorage.setItem("otherUserProfile", JSON.stringify(list));
    localStorage.setItem("oup", true);
    //console.log(localStorage);
  }

  render() {
    const { seniorsList } = this.state;
    // const temp = require("./ReportTo.json");
    return (
      <div className="col-md-12">
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h5 className="m-0">ReportTo</h5>
          </CardHeader>
          <div className="row">
            {seniorsList.map((item, id) => {
              return (
                <div key={id} className=" col-lg-3">
                  <Card
                    className="mb-2 pt-2 text-center"
                    style={{ padding: "4%" }}
                  >
                    <div className="mb-3 mx-auto">
                      <img
                        className="rounded-circle"
                        src={require("./../../images/avatars/user.jpg")}
                        alt={item.name}
                        width="80"
                      />
                    </div>
                    <div onClick={() => this.otherUserProfile(item)}>
                      <a
                        className="text-secondary  stretched-link"
                        href="/employee/profile"
                      >
                        <h4 className="mb-0">{item.name}</h4>
                      </a>

                      <span className="text-muted d-block mb-2">
                        {item.businessTitle}
                      </span>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    );
  }
}

export default ReportTo;
