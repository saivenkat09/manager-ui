import React from "react";
import { Container, Row } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-profile-lite/UserDetails";
import UserAccountDetails from "../components/user-profile-lite/UserAccountDetails";
import UserEducationDetails from "../components/user-profile-lite/UserEducationDetails";
import UserWorkEx from "../components/user-profile-lite/UserWorkEx";
import ReportTo from "../components/user-profile-lite/ReportTo";

const Profile = () => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle
        title="Your Profile"
        md="12"
        className="ml-sm-auto mr-sm-auto"
      />
    </Row>
    <Row>
      <UserDetails />
    </Row>
    <Row>
      <UserAccountDetails />
    </Row>
    <Row>
      <UserEducationDetails />
    </Row>
    <Row>
      <UserWorkEx />
    </Row>
    <Row>
      <ReportTo />
    </Row>
  </Container>
);

export default Profile;
