import React, { Component } from "react";
import { Container, Row } from "shards-react";

import PageTitle from "./common/PageTitle";
import UserDetails from "./user-profile-lite/UserDetails";
import UserAccountDetails from "./user-profile-lite/UserAccountDetails";
import UserEducationDetails from "./user-profile-lite/UserEducationDetails";
import UserWorkEx from "./user-profile-lite/UserWorkEx";
import ReportTo from "./user-profile-lite/ReportTo";

class OtherUserProfile extends Component {
  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    localStorage.removeItem("otherUserProfile");
    localStorage.removeItem("oup");
    console.log(localStorage);
    this.props.history.goBack();
  }

  componentWillUnmount() {
    localStorage.removeItem("otherUserProfile");
    localStorage.removeItem("oup");
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title={JSON.parse(localStorage.getItem("otherUserProfile")).name}
            md="12"
            className="ml-sm-auto mr-sm-auto"
          />
          <div onClick={() => this.goBack()}>
            {/* <a style={{ fontSize: "20px" }}>Back</a> */}
            <svg
              width="2em"
              height="2em"
              viewBox="0 0 16 16"
              class="bi bi-arrow-left-square"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
              />
              <path
                fill-rule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
              />
            </svg>
          </div>
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
  }
}

export default OtherUserProfile;
