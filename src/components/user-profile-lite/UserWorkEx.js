import React, { Component } from "react";
import {
  Card,
  CardHeader,
  Col,
  Form,
  FormInput,
  CardFooter,
  Button,
} from "shards-react";

import EmployeeAPI from "../../MicroserviceAPI/EmployeeAPI";

class UserWorkEx extends Component {
  constructor(props) {
    console.log(props);
    super(props);

    this.retrieveEmployee = this.retrieveEmployee.bind(this);

    this.state = {
      workExList: [],
    };
  }

  componentDidMount() {
    const param = !!localStorage.getItem("oup")
      ? JSON.parse(localStorage.getItem("otherUserProfile")).id
      : JSON.parse(localStorage.getItem("userId"));

    this.retrieveEmployee(param);
  }

  retrieveEmployee(id) {
    EmployeeAPI.getWorkEx(id)
      .then((response) => {
        this.setState({
          workExList: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { workExList } = this.state;

    return (
      <div className="col-md-12">
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h5 className="m-0">
              <strong>Work Experience Details</strong>
            </h5>
          </CardHeader>
          {workExList.map((item, idx) => {
            return (
              <Form key={idx} style={{ padding: "1%" }}>
                <Col md="6" className="form-group">
                  <label htmlFor="position">Position</label>
                  <FormInput
                    id="position"
                    placeholder="Position"
                    value={item.position}
                    onChange={() => {}}
                    disabled="disabled"
                  />
                </Col>

                <Col md="6" className="form-group">
                  <label htmlFor="companyName">Company Name</label>
                  <FormInput
                    id="companyName"
                    placeholder="Company Name"
                    value={item.companyName}
                    onChange={() => {}}
                    disabled="disabled"
                  />
                </Col>
              </Form>
            );
          })}

          <CardFooter>
            <Button type="button" className="btn btn-info float-right">
              Update
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default UserWorkEx;
