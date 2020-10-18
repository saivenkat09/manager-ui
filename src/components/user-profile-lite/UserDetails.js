import React, { Component, useCallback } from "react";

import { Card, CardHeader } from "shards-react";

import { useDropzone } from "react-dropzone";
import axios from "axios";

import EmployeeAPI from "../../MicroserviceAPI/EmployeeAPI";

class UserDetails extends Component {
  constructor(props) {
    console.log(props);
    super(props);

    this.retrieveEmployee = this.retrieveEmployee.bind(this);
    this.imageCheck = this.imageCheck.bind(this);

    this.state = {
      employee: null,
      check: null,
      pic: null,
    };
  }

  componentDidMount() {
    const param = !!localStorage.getItem("oup")
      ? JSON.parse(localStorage.getItem("otherUserProfile")).id
      : JSON.parse(localStorage.getItem("userIdAndName")).id;

    this.retrieveEmployee(param);
    this.imageCheck(param);
  }

  imageCheck(param) {
    EmployeeAPI.getEmployeeImageCheck(param)
      .then((response) => {
        this.setState({
          check: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
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
              {this.state.check ? (
                <img
                  //className="rounded-circle"
                  src={
                    "http://a25d7841408b245f481a7ddb568dd09f-1591248461.us-east-1.elb.amazonaws.com/employee-service/image/" +
                    employee.id
                  }
                  alt={employee.name}
                  width="80"
                />
              ) : (
                <img
                  // className="rounded-circle"
                  src={"https://e2e-team-b.s3.amazonaws.com/user.jpg"}
                  alt={employee.name}
                  width="80"
                />
              )}
            </div>
            <h4 className="mb-0">{employee.name}</h4>
            <span className="text-muted d-block mb-2">
              {employee.businessTitle}
            </span>
            {JSON.parse(localStorage.getItem("userIdAndName")).id ===
            employee.id ? (
              <UploadImage {...employee} />
            ) : (
              <div></div>
            )}
          </Card>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
function UploadImage({ id }) {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log(file);
    const user = JSON.parse(localStorage.getItem("userIdAndName"));
    const formData = new FormData();
    formData.append("image", file);
    axios
      .post(
        "http://a25d7841408b245f481a7ddb568dd09f-1591248461.us-east-1.elb.amazonaws.com/employee-service/image/" +
          id,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: user ? "Bearer " + user.jwt : "",
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        console.log("image upload successfully");
      })
      .catch((err) => {
        console.log("bro");
        console.log(id);
        console.log(err);
      });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the image here ...</p> : <p>update </p>}
    </div>
  );
}

export default UserDetails;
