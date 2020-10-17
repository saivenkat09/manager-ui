import React, { Component } from "react";
import { Container, Button } from "shards-react";
import { Link } from "react-router-dom";

class NotFound extends Component {
  render() {
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        <div className="error">
          <div className="error__content">
            <h2>404</h2>
            <h3>Page Not Found!</h3>
            <p>
              It seems page not available at this moment. Please try again
              later.
            </p>
            <Button pill tag={Link} to="/home">
              &larr; Go Back
            </Button>
          </div>
        </div>
      </Container>
    );
  }
}

export default NotFound;
