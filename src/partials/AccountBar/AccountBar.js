import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Responsive, Menu, Icon } from "semantic-ui-react";
import Aux from "react-aux";

import { attemptSignout } from "../../slices/account/redux/actions";

function AccountBar(props) {
  const { account, router, attemptSignout } = props;

  return (
    <Responsive
      as={Menu}
      minWidth={Responsive.onlyMobile.maxWidth}
      attached="bottom"
    >
      <Menu.Menu position="right">
        {account ? (
          <Aux>
            <Menu.Item>
              <em>Signed in as {account.email}.</em>
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/my-account"
              active={router.location.pathname === "/my-account"}
            >
              <Icon name="settings" /> My account
            </Menu.Item>
            <Menu.Item onClick={attemptSignout}>
              <Icon name="sign out" /> Sign out
            </Menu.Item>
          </Aux>
        ) : (
          <Aux>
            <Menu.Item
              as={Link}
              id="sign-in"
              to="/sign-in"
              active={router.location.pathname === "/sign-in"}
            >
              <Icon name="sign in" /> Sign in
            </Menu.Item>
            <Menu.Item
              as={Link}
              id="sign-up"
              to="/sign-up"
              active={router.location.pathname === "/sign-up"}
            >
              <Icon name="user plus" /> Sign up
            </Menu.Item>
          </Aux>
        )}
      </Menu.Menu>
    </Responsive>
  );
}

export default connect(
  state => ({
    account: state.account,
    router: state.router
  }),
  dispatch => ({
    attemptSignout: () => dispatch(attemptSignout())
  })
)(withRouter(AccountBar));
