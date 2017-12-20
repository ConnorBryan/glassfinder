import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";
import Aux from "react-aux";

import { signout } from "../../slices/account/redux/actions";

function AccountBar(props) {
  const { account, signout } = props;

  return (
    <Menu attached="bottom" stackable>
      <Menu.Menu position="right">
        {account ? (
          <Aux>
            <Menu.Item>
              <em>Signed in as Connor Bryan</em>
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/my-account"
              active={props.location.pathname === "/my-account"}
            >
              <Icon name="settings" /> My account
            </Menu.Item>
            <Menu.Item onClick={signout}>
              <Icon name="sign out" /> Sign out
            </Menu.Item>
          </Aux>
        ) : (
          <Aux>
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
          </Aux>
        )}
      </Menu.Menu>
    </Menu>
  );
}

export default connect(
  state => ({
    account: state.account
  }),
  dispatch => ({
    signout: () => dispatch(signout())
  })
)(withRouter(AccountBar));
