import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";

function AccountBar(props) {
  return (
    <Menu attached="bottom" stackable>
      <Menu.Menu position="right">
        <Menu.Item>
          <em>Signed in as Connor Bryan</em>
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/sign-in"
          active={props.location.pathname === "/sign-in"}
        >
          <Icon name="sign in" /> Sign in
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/sign-up"
          active={props.location.pathname === "/sign-up"}
        >
          <Icon name="user plus" /> Sign up
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/my-account"
          active={props.location.pathname === "/my-account"}
        >
          <Icon name="settings" /> My account
        </Menu.Item>
        <Menu.Item as={Link} to="/">
          <Icon name="sign out" /> Sign out
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

export default withRouter(AccountBar);
