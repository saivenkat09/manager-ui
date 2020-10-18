import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink,
} from "shards-react";

class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = (e) => {
    const { history } = this.props;

    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userIdAndName");
    if (localStorage.getItem("otherUserProfile")) {
      localStorage.removeItem("otherUserProfile");
    }
    if (localStorage.getItem("oup")) {
      localStorage.removeItem("oup");
    }
    history.push("/login");
    console.log("you have logged out");
  };

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  render() {
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={require("./../../../../images/avatars/user.jpg")}
            alt="User"
          />{" "}
          <span className="d-none d-md-inline-block">
            {JSON.parse(localStorage.getItem("userIdAndName")).name
              ? JSON.parse(localStorage.getItem("userIdAndName")).name
              : "Admin"}{" "}
          </span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="edit-user-profile">
            <i className="material-icons">&#xE8B8;</i> Account Setting
          </DropdownItem>

          <DropdownItem divider />
          <DropdownItem className="text-danger">
            <div onClick={(e) => this.handleLogout(e)}>
              <i className="material-icons text-danger">&#xE879;</i> Logout
            </div>
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}

export default withRouter(UserActions);
