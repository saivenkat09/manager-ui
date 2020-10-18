import React, { Component } from "react";
import AdminAPI from "../../MicroserviceAPI/AdminAPI";
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

  componentDidUpdate() {
    this.retrieveEmployees();
  }

  retrieveEmployees() {
    AdminAPI.getAll()
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
    AdminAPI.delete(this.state.currentEmployee.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/employee");
      })
      .catch((e) => {
        console.log(e);
      });

    this.setState({
      currentEmployee: null,
      currentIndex: -1,
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
                      <strong>Employee Id:</strong>
                    </label>{" "}
                    {currentEmployee.id}
                  </div>
                  <div>
                    <label>
                      <strong>Employee Email:</strong>
                    </label>{" "}
                    {currentEmployee.email}
                  </div>

                  <div>
                    <label>
                      <strong>Employee Name:</strong>
                    </label>{" "}
                    {currentEmployee.name}
                  </div>
                  <div>
                    <label>
                      <strong>Level:</strong>
                    </label>{" "}
                    {currentEmployee.level}
                  </div>
                  <div>
                    <label>
                      <strong>Manager Id:</strong>
                    </label>{" "}
                    {currentEmployee.managerId}
                  </div>
                  <div>
                    <label>
                      <strong>Business Title:</strong>
                    </label>{" "}
                    {currentEmployee.businessTitle}
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
