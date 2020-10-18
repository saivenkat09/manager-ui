import React, { useState } from "react";
import { NavItem, NavLink, Badge, Collapse, DropdownItem } from "shards-react";
import EmployeeAPI from "../../../../MicroserviceAPI/EmployeeAPI";
import { Modal, Button } from "react-bootstrap";

export default class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      notifications: null,
      msgCount: null,
      show: false,
    };

    this.toggleNotifications = this.toggleNotifications.bind(this);
    this.getNotifications = this.getNotifications.bind(this);
    this.handleViewAll = this.handleViewAll.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    EmployeeAPI.noOfUnread(JSON.parse(localStorage.getItem("userIdAndName")).id)
      .then((response) => {
        this.setState({
          msgCount: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handleViewAll() {
    this.setState({
      show: !this.state.show,
      visible: false,
      msgCount: null,
    });
  }

  handleClose() {
    this.setState({
      show: !this.state.show,
    });
  }

  getNotifications() {
    EmployeeAPI.getAllNotifications(
      JSON.parse(localStorage.getItem("userIdAndName")).id
    )
      .then((response) => {
        this.setState({
          notifications: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  toggleNotifications() {
    this.setState({
      visible: !this.state.visible,
      msgCount: null,
    });
    this.getNotifications();

    EmployeeAPI.updateNotificationStatus(
      JSON.parse(localStorage.getItem("userIdAndName")).id
    )
      .then((response) => {})
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { notifications, msgCount, show } = this.state;
    // const temp = require("./notify.json");
    return (
      <NavItem className="border-right dropdown notifications">
        <NavLink
          className="nav-link-icon text-center"
          onClick={this.toggleNotifications}
        >
          <div className="nav-link-icon__wrapper">
            <i className="material-icons">&#xe7f4;</i>

            <Badge pill theme="danger">
              {msgCount > 0 ? msgCount : null}
            </Badge>
          </div>
        </NavLink>
        <Collapse
          open={this.state.visible}
          className="dropdown-menu dropdown-menu-small"
        >
          {notifications &&
            notifications.messages &&
            notifications.messages.slice(0, 5).map((item, idx) => (
              <DropdownItem
                key={idx}
                style={{
                  backgroundColor: item.status == "old" ? "white" : "yellow",
                }}
              >
                <div className="notification__icon-wrapper">
                  <div className="notification__icon">
                    <i className="material-icons">&#xE6E1;</i>
                  </div>
                </div>
                <div className="notification__content">
                  <span className="notification__category"></span>
                  <p>{item.message}</p>
                </div>
              </DropdownItem>
            ))}

          <DropdownItem
            className="notification__all text-center"
            onClick={this.handleViewAll}
          >
            View all Notifications
            <Modal show={show} onHide={this.handleClose} animation={false}>
              <Modal.Header
                style={{
                  backgroundColor: "lightblue",
                }}
              >
                <Modal.Title>Notification</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {notifications &&
                  notifications.messages &&
                  notifications.messages.map((item, idx) => (
                    <ul
                      key={idx}
                      className="list-group list-group-flush"
                      style={{
                        backgroundColor:
                          item.status == "old" ? "white" : "yellow",
                      }}
                    >
                      <div className="container">
                        <div className="row">
                          <div className="list-group-item col-md-12">
                            {item.message}{" "}
                          </div>
                        </div>
                      </div>
                    </ul>
                  ))}
              </Modal.Body>
              <Modal.Footer
                style={{
                  backgroundColor: "lightblue",
                }}
              >
                <Button variant="outline-primary" onClick={this.handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
