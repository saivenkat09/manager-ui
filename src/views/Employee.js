import React from "react";
import { Container, Row } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import ReportBy from "../components/user-profile-lite/ReportBy";
import AllEmployee from "../components/employee-lite/AllEmployee";
import AddEmployee from "../components/employee-lite/AddEmployee";

const Employee = () => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="Employee" md="12" className="ml-sm-auto mr-sm-auto" />
    </Row>
    {JSON.parse(localStorage.getItem("userIdAndName")).role === "EMPLOYEE" ? (
      <div>
        <Row style={{ padding: "5%" }}>
          <ReportBy />
        </Row>
      </div>
    ) : (
      <Row></Row>
    )}
    {JSON.parse(localStorage.getItem("userIdAndName")).role === "ADMIN" ? (
      <div>
        <Row style={{ padding: "5%" }}>
          <AllEmployee />
        </Row>
        <Row style={{ padding: "5%" }}>
          <AddEmployee />
        </Row>
      </div>
    ) : (
      <Row></Row>
    )}
  </Container>
);

export default Employee;
