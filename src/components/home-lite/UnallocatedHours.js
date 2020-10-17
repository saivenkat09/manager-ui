import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "shards-react";

import EmployeeAPI from "../../MicroserviceAPI/EmployeeAPI";

class UnallocatedHours extends Component {
  constructor(props) {
    console.log(props);
    super(props);

    this.retrieveUnallocatedHours = this.retrieveUnallocatedHours.bind(this);

    this.state = {
      juniorsHoursList: [],
    };
  }

  componentDidMount() {
    this.retrieveUnallocatedHours();

  }

  retrieveUnallocatedHours() {
    EmployeeAPI.getUnallocatedHours(
      JSON.parse(localStorage.getItem("userId")),5
    ).then((response) => {
        this.setState({
          juniorsHoursList: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { juniorsHoursList } = this.state;

    return (
      <div md="12" className="mx-auto">
        <Card small className="mb-4 overflow-hidden">
          <CardHeader className="bg-dark">
            <h6 className="m-0 text-white">
              Unallocated Hours Of Your Employee
            </h6>
          </CardHeader>
          <CardBody className="bg-dark p-0 pb-3">
            <table className="table table-dark mb-0">
              <thead className="thead-dark">
                <tr>
                  <th scope="col" className="border-0">
                    Employee Id
                  </th>
                  <th scope="col" className="border-0">
                    Employee Name
                  </th>
                  <th scope="col" className="border-0">
                    Working Day 1
                  </th>
                  <th scope="col" className="border-0">
                    Working Day 2
                  </th>
                  <th scope="col" className="border-0">
                    Working Day 3
                  </th>
                  <th scope="col" className="border-0">
                    Working Day 4
                  </th>
                  <th scope="col" className="border-0">
                    Working Day 5
                  </th>
                </tr>
              </thead>
              <tbody>
                {juniorsHoursList.map((item, id) => {
                  return (
                    <tr key={id}>
                      <td>{item.employeeId}</td>
                      <td>{item.employeeName}</td>
                      {item.availableHours.map((day, idx) => {
                        return <td key={idx}>{day}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default UnallocatedHours;
