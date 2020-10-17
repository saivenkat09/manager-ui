import React, { Component } from "react";

import { Card, CardHeader } from "shards-react";

import EmployeeAPI from "../../MicroserviceAPI/EmployeeAPI";

class UserDetails extends Component {
  constructor(props) {
    console.log(props);
    super(props);

    this.retrieveEmployee = this.retrieveEmployee.bind(this);

    this.state = {
      employee: null,
    };
  }

  componentDidMount() {
    const param = !!localStorage.getItem("oup")
      ? JSON.parse(localStorage.getItem("otherUserProfile")).id
      : JSON.parse(localStorage.getItem("userIdAndName")).id;

    this.retrieveEmployee(param);
  }

  retrieveEmployee(param) {
    EmployeeAPI.get(param)
      .then((response) => {
        this.setState({
          employee: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { employee } = this.state;

    return (
      <div className="mx-auto">
        {employee ? (
          <Card
            className="mb-4 pt-2 text-center"
            style={{ padding: "4%", width: "350%" }}
          >
            <CardHeader className="border-bottom">
              <h5 className="m-0"></h5>
            </CardHeader>
            <div className="mb-2 mt-3 mx-auto">
              <img
                className="rounded-circle"
                src={require("./../../images/avatars/user.jpg")}
                alt={employee.name}
                width="80"
              />
            </div>
            <h4 className="mb-0">{employee.name}</h4>
            <span className="text-muted d-block mb-2">
              {employee.businessTitle}
            </span>
          </Card>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default UserDetails;
