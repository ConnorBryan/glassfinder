import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Responsive, Sidebar, Menu, Icon } from "semantic-ui-react";
import Aux from "react-aux";

import config from "../../config";
import { hideSidebar } from "../../redux/actions";
import { attemptSignout } from "../../slices/account/redux/actions";
import NavigationItem from "../../components/NavigationItem";

function Slider(props) {
  const { account, router, attemptSignout, sidebar, hideSidebar } = props;

  return (
    <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
      <Sidebar
        as={Menu}
        animation="overlay"
        width="thin"
        visible={sidebar}
        icon="labeled"
        vertical
      >
        {config.navigation.map(item => (
          <NavigationItem
            key={item.key}
            match={props.location.pathname}
            {...item}
          />
        ))}
        {account ? (
          <Aux>
            <Menu.Item>
              <em>Signed in as {account.name}.</em>
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
              to="/sign-in"
              active={router.location.pathname === "/sign-in"}
            >
              <Icon name="sign in" /> Sign in
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/sign-up"
              active={router.location.pathname === "/sign-up"}
            >
              <Icon name="user plus" /> Sign up
            </Menu.Item>
          </Aux>
        )}
        <Menu.Item onClick={hideSidebar}>
          <Icon name="close" /> Close menu
        </Menu.Item>
      </Sidebar>
    </Responsive>
  );
}

Slider.propTypes = {
  location: PropTypes.object
};

export default connect(
  state => ({
    account: state.account,
    router: state.router,
    sidebar: state.sidebar
  }),
  dispatch => ({
    attemptSignout: () => dispatch(attemptSignout()),
    hideSidebar: () => dispatch(hideSidebar())
  })
)(withRouter(Slider));
