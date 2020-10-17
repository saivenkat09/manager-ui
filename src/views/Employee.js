import React from "react";
import { Container, Row } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import ReportBy from "../components/user-profile-lite/ReportBy";

const Employee = () => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="Employee" md="12" className="ml-sm-auto mr-sm-auto" />
    </Row>

    <Row style={{ padding: "2%" }}>
      <ReportBy />
    </Row>
  </Container>
);

export default Employee;
