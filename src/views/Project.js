import React from "react";
import { Container, Row } from "shards-react";

import PageTitle from "../components/common/PageTitle";

import AllProject from "../components/project-lite/AllProject";
import AssignProject from "../components/project-lite/AssignProject";
import UnAssignProject from "../components/project-lite/UnAssignProject";
import PastProject from "../components/project-lite/PastProject";
import AddProject from "../components/project-lite/AddProject";
import OngoingProjectMain from "../components/project-lite/OngoingProjectMain";
import UpcomingProjectMain from "../components/project-lite/UpcomingProjectMain";
import JuniorOngoingProject from "../components/project-lite/JuniorOngoingProject";
import JuniorUpcomingProject from "../components/project-lite/JuniorUpcomingProject";

const Project = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    <Row noGutters className="page-header py-4">
      <PageTitle md="12" title="Project" className="text-sm-left" />
    </Row>
    {JSON.parse(localStorage.getItem("userIdAndName")).role === "ADMIN" ? (
      <div>
        <Row style={{ padding: "5%" }}>
          <AllProject />
        </Row>
      </div>
    ) : (
      <Row></Row>
    )}
    {JSON.parse(localStorage.getItem("userIdAndName")).role === "EMPLOYEE" ? (
      <div>
        <Row style={{ padding: "5%" }}>
          <OngoingProjectMain />
        </Row>
        <Row style={{ padding: "5%" }}>
          <UpcomingProjectMain />
        </Row>
        <Row style={{ padding: "5%" }}>
          <JuniorOngoingProject />
        </Row>
        <Row style={{ padding: "5%" }}>
          <JuniorUpcomingProject />
        </Row>
        <Row style={{ padding: "5%" }}>
          <PastProject />
        </Row>
        <Row style={{ padding: "5%" }}>
          <AssignProject />
        </Row>
        <Row style={{ padding: "5%" }}>
          <UnAssignProject />
        </Row>
        <Row style={{ padding: "5%" }}>
          <AddProject />
        </Row>
      </div>
    ) : (
      <Row></Row>
    )}
  </Container>
);

export default Project;
