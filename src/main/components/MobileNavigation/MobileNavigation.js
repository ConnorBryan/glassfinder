import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Sidebar, Menu, Icon } from "semantic-ui-react";
import styled from "styled-components";
import Aux from "react-aux";

import { ICON_SET, LINK_TYPES, NAVIGATION_LINKS } from "../../config";

const Styles = styled.div`
  .menu .item {
    text-transform: uppercase !important;
    letter-spacing: 0.33rem !important;
  }

  .sidebar {
    max-height: 80vh !important;
  }

  .spaced {
    margin-top: 1.5rem !important;
  }
`;

function MobileNavigation({
  account,
  mobileNavigationActive,
  hideMobileNavigation
}) {
  return (
    <Styles>
      <Sidebar
        as={Menu}
        visible={mobileNavigationActive}
        animation="overlay"
        width="wide"
        vertical
      >
        <Menu.Item header>
          <strong>Navigate</strong>
        </Menu.Item>
        <Menu.Item as={Link} to="/" onClick={hideMobileNavigation}>
          Home
        </Menu.Item>
        {NAVIGATION_LINKS.map(({ to, content }, index) => (
          <Menu.Item
            key={index}
            as={Link}
            to={to}
            content={content}
            onClick={hideMobileNavigation}
          />
        ))}
        <Menu.Item className="spaced" header>
          <strong>Explore</strong>
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/shops"
          content="Shops"
          icon={ICON_SET[LINK_TYPES.SHOP]}
          onClick={hideMobileNavigation}
        />
        <Menu.Item
          as={Link}
          to="/artists"
          content="Artists"
          icon={ICON_SET[LINK_TYPES.ARTIST]}
          onClick={hideMobileNavigation}
        />
        <Menu.Item
          as={Link}
          to="/brands"
          content="Brands"
          icon={ICON_SET[LINK_TYPES.BRAND]}
          onClick={hideMobileNavigation}
        />
        <Menu.Item
          as={Link}
          to="/pieces"
          content="Pieces"
          icon={ICON_SET[LINK_TYPES.PIECE]}
          onClick={hideMobileNavigation}
        />
        <Menu.Item className="spaced" header>
          <strong>Account</strong>
        </Menu.Item>
        {account ? (
          <Aux>
            <Menu.Item
              as={Link}
              to="/"
              content="Sign out"
              icon="sign out"
              onClick={hideMobileNavigation}
            />
            <Menu.Item
              as={Link}
              to="/my-account"
              content="My account"
              icon="user"
              onClick={hideMobileNavigation}
            />
          </Aux>
        ) : (
          <Aux>
            <Menu.Item
              as={Link}
              to="/sign-up"
              content="Sign up"
              icon="user plus"
              onClick={hideMobileNavigation}
            />
            <Menu.Item
              as={Link}
              to="/sign-in"
              content="Sign in"
              icon="sign in"
              onClick={hideMobileNavigation}
            />
          </Aux>
        )}

        <Menu.Item className="spaced" onClick={hideMobileNavigation}>
          <strong>Close</strong>
        </Menu.Item>
      </Sidebar>
    </Styles>
  );
}

MobileNavigation.propTypes = {
  mobileNavigationActive: PropTypes.bool.isRequired,
  hideMobileNavigation: PropTypes.func.isRequired
};

export default MobileNavigation;
