import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Sidebar, Menu, Divider, Image } from "semantic-ui-react";
import styled from "styled-components";
import Aux from "react-aux";

import * as config from "../../../config";

const Styles = styled.div`
  .menu .item {
    text-transform: uppercase !important;
    letter-spacing: 0.33rem !important;
  }
  .spaced {
    margin-top: 1.5rem !important;
  }
`;

function MobileNavigation({
  account,
  signout,
  mobileNavigationActive,
  hideMobileNavigation
}) {
  return (
    <Styles>
      <Sidebar
        as={Menu}
        visible={mobileNavigationActive}
        animation="scale down"
        width="wide"
        vertical
      >
        <Menu.Item header>
          <Image size="small" src="/logo.png" />
        </Menu.Item>
        <Divider hidden />
        <Menu.Item header>
          <strong>Navigate</strong>
        </Menu.Item>
        <Menu.Item as={Link} to="/" onClick={hideMobileNavigation}>
          Home
        </Menu.Item>
        {config.NAVIGATION_LINKS.map(({ to, content }, index) => (
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
          icon={config.ICON_SET[config.LINK_TYPES.SHOP]}
          onClick={hideMobileNavigation}
        />
        <Menu.Item
          as={Link}
          to="/artists"
          content="Artists"
          icon={config.ICON_SET[config.LINK_TYPES.ARTIST]}
          onClick={hideMobileNavigation}
        />
        <Menu.Item
          as={Link}
          to="/brands"
          content="Brands"
          icon={config.ICON_SET[config.LINK_TYPES.BRAND]}
          onClick={hideMobileNavigation}
        />
        <Menu.Item
          as={Link}
          to="/pieces"
          content="Pieces"
          icon={config.ICON_SET[config.LINK_TYPES.PIECE]}
          onClick={hideMobileNavigation}
        />
        <Menu.Item className="spaced" header>
          <strong>Account</strong>
        </Menu.Item>
        {account ? (
          <Aux>
            <Menu.Item
              as={Link}
              to="/my-account"
              content="My account"
              icon="user"
              onClick={hideMobileNavigation}
            />
            <Menu.Item
              as={Link}
              to="/"
              content="Sign out"
              icon="sign out"
              onClick={() => {
                hideMobileNavigation();
                signout();
              }}
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
      </Sidebar>
    </Styles>
  );
}

MobileNavigation.propTypes = {
  mobileNavigationActive: PropTypes.bool.isRequired,
  hideMobileNavigation: PropTypes.func.isRequired
};

export default MobileNavigation;
