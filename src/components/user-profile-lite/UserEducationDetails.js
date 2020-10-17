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

class UserEducationDetails extends Component {
  constructor(props) {
    console.log(props);
    super(props);

    this.retrieveEmployee = this.retrieveEmployee.bind(this);

    this.state = {
      educationList: [],
    };
  }

  componentDidMount() {
    const param = !!localStorage.getItem("oup")
      ? JSON.parse(localStorage.getItem("otherUserProfile")).id
      : JSON.parse(localStorage.getItem("userId"));

    this.retrieveEmployee(param);
  }

  retrieveEmployee(param) {
    EmployeeAPI.getEducation(param)
      .then((response) => {
        this.setState({
          educationList: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { educationList } = this.state;

    return (
      <div className="col-md-12">
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h5 className="m-0">
              <strong>Education Details</strong>
            </h5>
          </CardHeader>
          {educationList.map((item, idx) => {
            return (
              <Form key={idx} style={{ padding: "0%" }}>
                <Col md="6" className="form-group">
                  <label htmlFor="degree">Degree</label>
                  <FormInput
                    id="degree"
                    placeholder="Degree"
                    value={item.degree}
                    onChange={() => {}}
                    disabled="disabled"
                  />
                </Col>

                <Col md="6" className="form-group">
                  <label htmlFor="university">University</label>
                  <FormInput
                    id="university"
                    placeholder="University"
                    value={item.college}
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

export default UserEducationDetails;
