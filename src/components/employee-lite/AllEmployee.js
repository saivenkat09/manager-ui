import React, { Component } from "react";
import EmployeeAPI from "../../MicroserviceAPI/EmployeeAPI";
import { Card, CardFooter, CardHeader } from "shards-react";

class AllEmployee extends Component {
  constructor(props) {
    console.log(props);
    super(props);

    this.retrieveEmployees = this.retrieveEmployees.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveEmployee = this.setActiveEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);

    this.state = {
      Employees: [],
      currentEmployee: null,
      currentIndex: -1,
      searchName: "",
    };
  }

  componentDidMount() {
    this.retrieveEmployees();
  }

  retrieveEmployees() {
    EmployeeAPI.getAll()
      .then((response) => {
        this.setState({
          Employees: response.data,
        });
        //console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveEmployees();
    this.setState({
      currentEmployee: null,
      currentIndex: -1,
    });
  }

  setActiveEmployee(Employee, index) {
    this.setState({
      currentEmployee: Employee,
      currentIndex: index,
    });
  }

  deleteEmployee() {
    EmployeeAPI.deleteEmployee(this.state.currentEmployee.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/resource");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { Employees, currentEmployee, currentIndex } = this.state;

    return (
      <div className="col-md-12">
        <h4>All Employees</h4>
        <div className="list row">
          <div className="col-md-6">
            <ul className="list-group">
              {Employees &&
                Employees.map((Employee, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveEmployee(Employee, index)}
                    key={index}
                    id="resource-list"
                  >
                    {Employee.name}
                  </li>
                ))}
            </ul>
          </div>

          <div className="col-md-6">
            <Card className="text-center border border-primary">
              {currentEmployee ? (
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
                    {currentEmployee.id}
                  </div>
                  <div>
                    <label>
                      <strong>Resource Type:</strong>
                    </label>{" "}
                    {currentEmployee.type}
                  </div>
                  <div>
                    <label>
                      <strong>Name:</strong>
                    </label>{" "}
                    {currentEmployee.name}
                  </div>
                  <div>
                    <label>
                      <strong>Total Quantity:</strong>
                    </label>{" "}
                    {currentEmployee.totalQuantity}
                  </div>
                  <div>
                    <label>
                      <strong>Remaining Quantity:</strong>
                    </label>{" "}
                    {currentEmployee.remainingQuantity}
                  </div>

                  <CardFooter className="border-top">
                    <button
                      className="btn btn-danger mr-3"
                      onClick={this.deleteEmployee}
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

export default AllEmployee;
