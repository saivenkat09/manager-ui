import React from "react";
import { Container, Row } from "shards-react";
import Slider from "../components/home-lite/Carousel/Slider";
import OngoingProject from "../components/home-lite/OngoingProject";
import UpcomingProject from "../components/home-lite/UpcomingProject";
import UnallocatedHours from "../components/home-lite/UnallocatedHours";

console.log(localStorage);

const Home = () => (
  <div>
    <div>
      <Slider />
    </div>
    <Container fluid className="main-content-container px-4">
      <Row style={{ padding: "5%" }}>
        <OngoingProject />
      </Row>
      {/* <Row style={{ padding: "5%" }}>
        <UpcomingProject />
      </Row> */}
      <Row style={{ padding: "5%" }}>
        <UnallocatedHours />
      </Row>
    </Container>
  </div>
);

export default Home;
