import React from "react";
import { Container, Row } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import AllResource from "../components/resource-lite/AllResource";
import AssignResource from "../components/resource-lite/AssignResource";
import UnAssignResource from "../components/resource-lite/UnAssignResource";
import AddResource from "../components/resource-lite/AddResource";
import AllocatedResource from "../components/resource-lite/AllocatedResource";
import ResourceOwnedByAnEmployee from "../components/resource-lite/ResourceOwnedByAnEmployee";

const Resource = () => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle md="12" title="Resource" className="text-sm-auto" />
    </Row>

    <Row style={{ padding: "5%" }}>
      <AllResource />
    </Row>
    <Row style={{ padding: "5%" }}>
      <AllocatedResource />
    </Row>
    <Row style={{ padding: "5%" }}>
      <ResourceOwnedByAnEmployee />
    </Row>
    <Row style={{ padding: "5%" }}>
      <AssignResource />
    </Row>
    <Row style={{ padding: "5%" }}>
      <UnAssignResource />
    </Row>
    <Row style={{ padding: "5%" }}>
      <AddResource />
    </Row>
  </Container>
);

export default Resource;
